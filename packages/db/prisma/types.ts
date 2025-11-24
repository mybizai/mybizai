import type { ColumnType } from "kysely";
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { SubscriptionPlan, Status } from "./enums";

export type Account = {
  id: Generated<string>;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
};
export type BusinessPlan = {
  id: string;
  userId: string;
  title: string;
  content: unknown;
  status: Generated<string>;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};
export type BusinessProfile = {
  id: string;
  userId: string;
  name: string;
  industry: string;
  website: string | null;
  goals: string[];
  growthPlan: unknown | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};
export type ChatMessage = {
  id: string;
  role: string;
  content: string;
  agentId: string;
  userId: string;
  createdAt: Generated<Timestamp>;
};
export type Customer = {
  id: Generated<number>;
  authUserId: string;
  name: string | null;
  plan: SubscriptionPlan | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  stripeCurrentPeriodEnd: Timestamp | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type K8sClusterConfig = {
  id: Generated<number>;
  name: string;
  location: string;
  authUserId: string;
  plan: Generated<SubscriptionPlan | null>;
  network: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  status: Generated<Status | null>;
  delete: Generated<boolean | null>;
};
export type Session = {
  id: Generated<string>;
  sessionToken: string;
  userId: string;
  expires: Timestamp;
};
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string | null;
  status: Generated<string>;
  type: Generated<string>;
  specialty: string | null;
  efficiency: Generated<number>;
  tasksCompleted: Generated<number>;
  currentProjects: string[];
  userId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};
export type User = {
  id: Generated<string>;
  name: string | null;
  email: string | null;
  emailVerified: Timestamp | null;
  image: string | null;
};
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Timestamp;
};
export type DB = {
  Account: Account;
  BusinessPlan: BusinessPlan;
  BusinessProfile: BusinessProfile;
  ChatMessage: ChatMessage;
  Customer: Customer;
  K8sClusterConfig: K8sClusterConfig;
  Session: Session;
  TeamMember: TeamMember;
  User: User;
  VerificationToken: VerificationToken;
};
