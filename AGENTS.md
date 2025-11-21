# Repository Guidelines

## Project Structure & Module Organization
This repository is a Turborepo monorepo managed with Bun (`bun@1.1.10`). The primary customer app lives in `apps/nextjs` (Next.js 14 + Contentlayer), while `apps/auth-proxy` wraps shared auth routes. Shared domain logic sits under `packages/` (`api`, `auth`, `db`, `stripe`, `ui`, `common`); update exports through each package's `src/index.ts`. Configuration baselines (ESLint, Prettier, Tailwind, TS) are in `tooling/`. Product references and copy live in `docs/`, and UI mock artifacts reside in `mocks/`.

## Build, Test, and Development Commands
Install dependencies with `bun install`. Run `bun run dev` for concurrent workspace development (loads `.env.local` through `with-env` helpers); use `bun run dev:web` when Stripe processes are not needed. `bun run build` executes `turbo build` across packages, and `bun run lint`, `bun run typecheck`, and `bun run format` gate quality (lint leverages ESLint + `manypkg`). Scope checks to a workspace with `bunx turbo run lint --filter=@saasfly/nextjs` (swap the filter as needed).

## Coding Style & Naming Conventions
TypeScript is required across apps and packages. Prettier runs via `@saasfly/prettier-config` (two-space indent, trailing commas, double quotes); do not override per-file. ESLint presets in `tooling/eslint-config` extend Next.js/React rules—fix warnings before requesting review. Route segments in `apps/nextjs/src/app` stay kebab-case, React components remain PascalCase, hooks use `useCamelCase`, and utility modules should stay kebab-case as well (e.g., `generate-pattern.ts`). Tailwind tokens should come from `tooling/tailwind-config` and local `tailwind.config.ts` extension files.

## Testing Guidelines
Automated tests are not yet wired, so `bun run lint` and `bun run typecheck` act as the current safety net. When adding coverage, place unit specs alongside source (`*.test.ts(x)` or `__tests__/`) and document any new runner in the relevant `package.json`. Until a shared harness lands (recommended: Vitest + Testing Library for UI, Playwright for end-to-end), include manual verification steps in PR descriptions.

## Commit & Pull Request Guidelines
Write imperative, scoped commit messages (e.g., "Add onboarding wizard API"). Before pushing, run format, lint, typecheck, and any package-specific scripts you touched (`bun run db:push`, `bun run build`, etc.). Pull requests should link their tracking issue, summarise functional changes, list verification steps, and add UI screenshots or updated mock references for visual work. Flag schema or Stripe contract changes so reviewers can run the matching setup commands.
