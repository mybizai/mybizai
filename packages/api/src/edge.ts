import { authRouter } from "./router/auth";
import { customerRouter } from "./router/customer";
import { helloRouter } from "./router/health_check";
import { k8sRouter } from "./router/k8s";
import { stripeRouter } from "./router/stripe";
import { teamMembersRouter } from "./router/teamMembers";
import { teamsRouter } from "./router/teams";
import { projectsRouter } from "./router/projects";
import { tasksRouter } from "./router/tasks";
import { createTRPCRouter } from "./trpc";

export const edgeRouter = createTRPCRouter({
  stripe: stripeRouter,
  hello: helloRouter,
  k8s: k8sRouter,
  auth: authRouter,
  customer: customerRouter,
  teamMembers: teamMembersRouter,
  teams: teamsRouter,
  projects: projectsRouter,
  tasks: tasksRouter,
});
