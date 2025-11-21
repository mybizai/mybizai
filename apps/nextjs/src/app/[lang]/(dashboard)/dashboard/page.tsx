import React from "react";
import { redirect } from "next/navigation";

import { authOptions, getCurrentUser } from "@saasfly/auth";

import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { AgentDashboard } from "~/components/agent-dashboard";
import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{
    lang: Locale;
  }>;
}) {
  const { lang } = await params;
  // const user = await getCurrentUser();
  // if (!user) {
  //   redirect(authOptions?.pages?.signIn ?? "/login-clerk");
  // }

  const dict = await getDictionary(lang);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="MyBizAI Command Center"
        text="Monitor and manage your autonomous business empire."
      />
      <AgentDashboard />
    </DashboardShell>
  );
}
