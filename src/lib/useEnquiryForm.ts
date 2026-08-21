"use client";

import { useState, type FormEvent } from "react";
import { HONEYPOT_FIELD } from "@/lib/enquiry";

type Status = "idle" | "sending" | "sent" | "error";

/** What the patient actually sent, kept so the confirmation can name it back to them. */
export type SentEnquiry = { name: string; department: string; phone: string };

/**
 * The submit behaviour both booking forms share.
 *
 * It lives here rather than in either component because there are two of them — the
 * home page and the contact page — and they were previously two copies of the same
 * do-nothing stub that drifted apart in their wording. One implementation means a fix
 * to the error handling, or to which fields are sent, cannot land on one form and miss
 * the other.
 *
 * Fields are read off the form element with FormData rather than held in React state:
 * the inputs are uncontrolled, so the browser's own autofill, validation and reset all
 * keep working, and there is no re-render on every keystroke.
 */
export function useEnquiryForm(source: "home" | "contact") {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  // Captured before form.reset() wipes the fields, so the confirmation can say
  // "Thank you, <name>" and repeat the department back — reading it off the form
  // afterwards would only ever find empty inputs.
  const [sent, setSent] = useState<SentEnquiry | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
          department: String(data.get("department") ?? ""),
          message: String(data.get("message") ?? ""),
          preferredDate: String(data.get("preferredDate") ?? ""),
          [HONEYPOT_FIELD]: String(data.get(HONEYPOT_FIELD) ?? ""),
          source,
        }),
      });
      const body = await res.json().catch(() => null);

      if (res.ok && body?.ok) {
        setSent({
          name: String(data.get("name") ?? "").trim(),
          department: String(data.get("department") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
        });
        setStatus("sent");
        form.reset();
        return;
      }
      // Never claim success on a failure — the whole reason this route exists is that
      // the old stub told patients their message had been received when it had not.
      setError(body?.error ?? "We could not send that just now.");
      setStatus("error");
    } catch {
      setError("Check your connection and try again.");
      setStatus("error");
    }
  }

  return {
    status,
    error,
    sent,
    handleSubmit,
    reset: () => {
      setSent(null);
      setError(null);
      setStatus("idle");
    },
  };
}
