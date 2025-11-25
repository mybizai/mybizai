import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import * as Icons from "@saasfly/ui/icons";

interface InviteEmailProps {
  invitedByEmail: string;
  invitedByName?: string;
  teamName?: string;
  inviteLink: string;
}

export const InviteEmail = ({
  invitedByEmail,
  invitedByName,
  teamName = "MyBizAI Team",
  inviteLink,
}: InviteEmailProps) => (
  <Html>
    <Head />
    <Preview>
      You have been invited to join {teamName}.
    </Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="mx-auto py-5 pb-12">
          <Icons.Logo className="m-auto block h-10 w-10" />
          <Text className="text-base">Hello,</Text>
          <Text className="text-base">
            {invitedByName || invitedByEmail} has invited you to join {teamName} on MyBizAI.
          </Text>
          <Section className="my-5 text-center">
            <Button
              className="inline-block rounded-md bg-zinc-900 px-4 py-2 text-base text-white no-underline"
              href={inviteLink}
            >
              Join Team
            </Button>
          </Section>
          <Text className="text-base">
             If you were not expecting this invitation, you can ignore this email.
          </Text>
          <Hr className="my-4 border-t-2 border-gray-300" />
          <Text className="text-sm text-gray-600">MyBizAI</Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default InviteEmail;
