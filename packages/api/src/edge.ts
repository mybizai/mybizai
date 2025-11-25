import { aiRouter } from "./router/ai";
import { authRouter } from "./router/auth";
import { businessPlanRouter } from "./router/business-plan";
import { customerRouter } from "./router/customer";
import { helloRouter } from "./router/health_check";
import { stripeRouter } from "./router/stripe";
import { teamsRouter } from "./router/teams";
import { createTRPCRouter } from "./trpc";

export const edgeRouter = createTRPCRouter({
  stripe: stripeRouter,
  hello: helloRouter,
  auth: authRouter,
  customer: customerRouter,
  teams: teamsRouter,
  businessPlan: businessPlanRouter,
  ai: aiRouter,
});
