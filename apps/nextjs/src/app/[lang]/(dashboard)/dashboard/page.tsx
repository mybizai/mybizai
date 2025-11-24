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

import { db } from "@saasfly/db";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{
    lang: Locale;
  }>;
}) {
  const { lang } = await params;

  let userId = (await auth()).userId;
  if (!userId) {
    userId = "user_mock_dev";
  }

  const profile = await db.selectFrom("BusinessProfile")
    .selectAll()
    .select("growthPlan")
    .where("userId", "=", userId)
    .executeTakeFirst();

  const dict = await getDictionary(lang);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="MyBizAI Command Center"
        text="Monitor and manage your autonomous business empire."
      />
      <AgentDashboard initialProfile={profile} />
    </DashboardShell>
  );
}
