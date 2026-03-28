"use server";

import { Resend } from "resend";
import WaitlistConfirmationEmail from "@/emails/waitlist-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface WaitlistSubmission {
  email: string;
  source: string;
  submittedAt: string;
}

export interface WaitlistResult {
  success: boolean;
  message: string;
}

/**
 * Submit an email to the waitlist.
 * Adds the contact to the Resend audience and sends a notification email.
 */
const EMAIL_MAX_LENGTH = 254;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCES = ["hero", "cta", "nav", "footer"];

export async function submitToWaitlist(
  submission: WaitlistSubmission,
): Promise<WaitlistResult> {
  try {
    const email = submission.email.trim().toLowerCase();
    if (
      !email ||
      email.length > EMAIL_MAX_LENGTH ||
      !EMAIL_REGEX.test(email)
    ) {
      return { success: false, message: "Please enter a valid email address." };
    }

    const source = ALLOWED_SOURCES.includes(submission.source)
      ? submission.source
      : "unknown";

    // Create contact in Resend for tracking
    const { error: contactError } = await resend.contacts.create({
      email,
      firstName: "",
      lastName: "",
    });

    // Ignore "already exists" errors, fail on others
    if (contactError && !contactError.message?.includes("already")) {
      console.error("[Waitlist] Contact error:", contactError);
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }

    // Send confirmation email to user
    const { error } = await resend.emails.send({
      from: "TenantComms <waitlist@tenantcomms.com>",
      to: email,
      subject: "You're on the waitlist — TenantComms",
      react: WaitlistConfirmationEmail({ email, source }),
    });

    if (error) {
      console.error("[Waitlist] Resend error:", error);
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }

    return {
      success: true,
      message: "You\u2019re on the list. We\u2019ll be in touch before launch.",
    };
  } catch (err) {
    console.error("[Waitlist] Error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
