import { Resend } from "resend";
import { enquirySchema } from "@/lib/enquiry";
import { siteConfig } from "@/lib/site";

/**
 * Where the two booking forms post. Validates, then emails the front desk.
 *
 * Both forms were stubs that showed "Your message has been received" and sent
 * nothing anywhere, so every patient who submitted one was waiting for a call
 * nobody knew to make. This is what they post to now.
 *
 * Resend only sends. Receiving and replying stay on the existing helpdesk@ajsmc.in
 * mailbox on the VPS, so the front desk's workflow does not change: enquiries land
 * in the inbox they already watch, and Reply goes straight to the patient.
 */

// Node, not edge: the Resend SDK expects it, and this route is not latency-critical.
export const runtime = "nodejs";
// Never cached — every call must actually run.
export const dynamic = "force-dynamic";

/**
 * A crude flood guard, and honest about being crude.
 *
 * The map lives in one server instance's memory, so with several instances warm a
 * determined flooder gets a few times this allowance, and a cold start forgets
 * everything. It is not a security boundary; it is enough to stop a stuck submit
 * button or a naive script from filling the helpdesk inbox. The real protection for
 * abuse is Vercel's firewall in front of this route.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  // Decide before recording, and record only what is allowed through. Pushing first
  // meant a refused request still landed a timestamp, so the window slid forward on
  // every retry and a patient who hit the limit could never wait it out — the bucket
  // refilled itself from the very attempts it was rejecting.
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Bound the map so a long-lived instance under a spray of IPs cannot grow without limit.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return Response.json(
      { ok: false, error: first?.message ?? "Please check the form and try again." },
      { status: 400 },
    );
  }

  const { name, phone, email, department, message, source, ref_token, preferredDate } = parsed.data;

  // Honeypot tripped. Answer exactly as if it worked — a bot told it was caught is a
  // bot that comes back with the field left empty.
  //
  // But log it, and log it loudly. This branch throws away a real submission if it ever
  // fires on a person, and it returns the same shape as success, so without this line
  // the hospital could not tell a blocked bot from a silently swallowed patient.
  if (ref_token && ref_token.length > 0) {
    console.warn(
      `[enquiry] honeypot tripped — submission discarded. If this ever coincides with a real patient complaint, suspect autofill. name=${JSON.stringify(name)} dept=${JSON.stringify(department)}`,
    );
    return Response.json({ ok: true });
  }

  // Checked here rather than first: a malformed submission deserves a validation error
  // whether or not email happens to be configured, and answering everything with the
  // same 503 made the validation impossible to see.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Loud in the log, gentle to the patient: they get the phone number rather than a
    // false confirmation, which is the entire reason this route replaced the stub.
    console.error("[enquiry] RESEND_API_KEY is not set — enquiry not sent");
    return Response.json(
      {
        ok: false,
        error: "Online booking is not available right now.",
        phone: siteConfig.phone,
      },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests. Please call us instead.", phone: siteConfig.phone },
      { status: 429 },
    );
  }

  const where = source === "home" ? "home page" : "contact page";
  const lines = [
    `Name:       ${name}`,
    `Phone:      ${phone}`,
    `Email:      ${email || "not given"}`,
    `Department: ${department}`,
    ...(preferredDate ? [`Preferred:   ${preferredDate}`] : []),
    "",
    message ? `Message:\n${message}` : "Message: none",
    "",
    `— submitted from the ${where} on ${siteConfig.url}`,
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Must be a domain verified in Resend. `send.` is a subdomain on purpose: it keeps
      // the root SPF record, which the VPS mailboxes depend on, untouched.
      from: `${siteConfig.name} Website <enquiry@send.ajsmc.in>`,
      to: [siteConfig.email],
      // Reply goes to the patient, not to the website, so the front desk can just hit
      // Reply. Omitted when they did not give an email, rather than sent to a blank.
      ...(email ? { replyTo: email } : {}),
      subject: `Appointment enquiry — ${department} — ${name}`,
      text: lines.join("\n"),
      html: `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#0C2E6E">
  <h2 style="margin:0 0 14px;font-size:18px">New enquiry from the ${escapeHtml(where)}</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
    <tr><td style="padding:3px 18px 3px 0;color:#5A6B8C">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>
    <tr><td style="padding:3px 18px 3px 0;color:#5A6B8C">Phone</td><td><a href="tel:${escapeHtml(phone.replace(/[^\d+]/g, ""))}">${escapeHtml(phone)}</a></td></tr>
    <tr><td style="padding:3px 18px 3px 0;color:#5A6B8C">Email</td><td>${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : "not given"}</td></tr>
    <tr><td style="padding:3px 18px 3px 0;color:#5A6B8C">Department</td><td>${escapeHtml(department)}</td></tr>
    ${preferredDate ? `<tr><td style="padding:3px 18px 3px 0;color:#5A6B8C">Preferred date</td><td><strong>${escapeHtml(preferredDate)}</strong></td></tr>` : ""}
  </table>
  ${message ? `<p style="margin:16px 0 0"><span style="color:#5A6B8C">Message</span><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>` : ""}
</div>`,
    });

    if (error) {
      console.error("[enquiry] Resend rejected the send:", error);
      return Response.json(
        { ok: false, error: "We could not send that just now.", phone: siteConfig.phone },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] send threw:", err);
    return Response.json(
      { ok: false, error: "We could not send that just now.", phone: siteConfig.phone },
      { status: 502 },
    );
  }
}
