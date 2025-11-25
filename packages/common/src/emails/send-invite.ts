import { resend } from "../email";
import { InviteEmail } from "./invite-email";

interface SendInviteParams {
  to: string;
  inviteLink: string;
  invitedByName?: string;
  invitedByEmail: string;
}

export const sendInviteEmail = async ({ to, inviteLink, invitedByName, invitedByEmail }: SendInviteParams) => {
  try {
    await resend.emails.send({
      from: "MyBizAI <onboarding@resend.dev>",
      to,
      subject: "You have been invited to join MyBizAI Team",
      react: InviteEmail({ invitedByEmail, invitedByName, inviteLink }),
    });
  } catch (error) {
    console.error("Error sending invite email:", error);
  }
};
