import { authRouter } from "./router/auth";
import { businessPlanRouter } from "./router/business-plan";
import { customerRouter } from "./router/customer";
import { helloRouter } from "./router/health_check";
import { stripeRouter } from "./router/stripe";
import { createTRPCRouter } from "./trpc";

export const edgeRouter = createTRPCRouter({
  stripe: stripeRouter,
  hello: helloRouter,
  auth: authRouter,
  customer: customerRouter,
  businessPlan: businessPlanRouter,
});
