import { z } from "zod";
import { departments } from "@/lib/site";

/**
 * What the two booking forms send, and the only shape the API route will accept.
 *
 * Shared so the client can reject an obviously bad field before a round trip and the
 * server can reject everything again on arrival — the client-side pass is a courtesy
 * to the patient, never a guarantee, since anyone can post to the route directly.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is too long."),
  // Indian mobile and landline numbers, with or without +91, spaces or dashes. Deliberately
  // loose: a patient mistyping their own number is a lost appointment, and a wrong number
  // fails at the call anyway, but a field that rejects a valid number fails immediately.
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a phone number we can call you on.")
    .max(20, "That phone number is too long.")
    .regex(/^[+\d][\d\s\-()]{5,19}$/, "Please enter a valid phone number."),
  email: z
    .string()
    .trim()
    .max(120)
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),
  department: z
    .string()
    .trim()
    .refine((v) => (departments as readonly string[]).includes(v), "Please choose a department."),
  message: z.string().trim().max(2000, "Please keep the message under 2000 characters.").optional(),
  /**
   * Only the home page form asks for this, so it is optional rather than required —
   * a schema that demanded it would reject every contact-page enquiry. Kept as the
   * raw yyyy-mm-dd the date input produces; the front desk reads it, nothing parses it.
   */
  preferredDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a valid date.")
    .optional()
    .or(z.literal("")),
  /** Which form it came from, so the subject line tells the front desk where to look. */
  source: z.enum(["home", "contact"]),
  /**
   * Honeypot. Hidden from people and from screen readers, so a human never fills it;
   * bots fill every field they find.
   *
   * The name is deliberately meaningless. It was `company` once, with a matching
   * "Company" label, which is precisely the token Chrome's address-profile autofill
   * and every password manager reach for — so a patient accepting an autofill
   * suggestion filled the honeypot, had their enquiry dropped, and was shown a
   * confirmation anyway. That is the exact failure this route exists to prevent, and
   * it must never be reintroduced: keep this name semantically empty, and never give
   * the input a human-readable label.
   */
  ref_token: z.string().max(200).optional(),
});

export type Enquiry = z.infer<typeof enquirySchema>;

/** The field name of the honeypot, shared so the form and the route cannot drift apart. */
export const HONEYPOT_FIELD = "ref_token";
