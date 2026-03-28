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
 * Sends a confirmation notification to waitlist@tenantcomms.com via Resend.
 */
export async function submitToWaitlist(
  submission: WaitlistSubmission
): Promise<WaitlistResult> {
  try {
    const { error } = await resend.emails.send({
      from: "TenantComms <waitlist@tenantcomms.com>",
      to: ["waitlist@tenantcomms.com"],
      subject: `New waitlist signup: ${submission.email}`,
      react: WaitlistConfirmationEmail({
        email: submission.email,
        source: submission.source,
      }),
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
