# MyBizAI: Developer Overview

## 1. Introduction & Architecture

This document provides a technical overview of the MyBizAI project, designed to get developers up to speed on the architecture, standards, and roadmap.

MyBizAI is a full-stack, monorepo application built with a modern, enterprise-grade stack. The architecture is designed for modularity, scalability, and a superior developer experience.

### 1.1. Monorepo Structure (Turborepo)

The project is organized as a Turborepo monorepo, with a clear separation between applications (`apps/`) and shared packages (`packages/`).

*   **`apps/`**:
    *   **`nextjs/`**: The main Next.js web application.
*   **`packages/`**:
    *   **`api/`**: tRPC API definitions and routers.
    *   **`auth/`**: Authentication logic (Clerk & NextAuth.js).
    *   **`db/`**: Database schema (Prisma) and query logic.
    *   **`stripe/`**: Stripe integration for subscription management.
    *   **`ui/`**: Shared React component library (Shadcn UI).
*   **`tooling/`**: Shared configurations for ESLint, Prettier, and Tailwind CSS.

### 1.2. Tech Stack

*   **Framework:** Next.js (App Directory)
*   **Language:** TypeScript
*   **Monorepo:** Turborepo
*   **Authentication:** Clerk & NextAuth.js
*   **Database:** PostgreSQL with Prisma
*   **Payments:** Stripe
*   **UI:** Shadcn UI, Tailwind CSS
*   **Analytics:** PostHog
*   **Email:** Resend

## 2. Getting Started

1.  **Install Dependencies:** `bun install`
2.  **Environment Variables:** Copy `.env.example` to `.env.local` and populate the required variables.
3.  **Run Development Server:** `bun run dev`

## 3. Development Standards

### 3.1. Coding Style

*   **TypeScript:** Required across the entire codebase.
*   **Prettier & ESLint:** We use shared configurations from the `tooling/` directory. Run `bun run format` and `bun run lint` before committing.
*   **Naming Conventions:**
    *   React Components: `PascalCase`
    *   Hooks: `useCamelCase`
    *   Route Segments: `kebab-case`
    *   Utility Modules: `kebab-case`

### 3.2. Commit & Pull Request Guidelines

*   **Commit Messages:** Use imperative, scoped messages (e.g., "feat(api): Add user profile endpoint").
*   **Pull Requests:** Link the tracking issue, summarize changes, and provide manual verification steps.

### 3.3. Testing

Automated testing is not yet fully implemented. `bun run lint` and `bun run typecheck` are the primary quality gates for now.

## 4. Development Roadmap

The following is a high-level overview of our development priorities. For a more detailed breakdown, see `TODO.md`.

### High Priority: Core Functionality

*   **Implement Core AI Features:**
    *   AI-powered brainstorming and idea generation.
    *   Collaborative business plan editor.
    *   Competitive analysis and market research visualization.
    *   AI-assisted financial projections.
*   **Build Project & Team Management:**
    *   Project tracking system.
    *   Task delegation and management.
    *   Real-time collaboration editor.
*   **Finalize Subscription & Billing:**
    *   Full Stripe integration for all subscription tiers.
    *   User-facing billing and subscription management dashboard.

### Medium Priority: User Experience & Growth

*   **Onboarding & User Experience:**
    *   Guided onboarding flow.
    *   Brand identity kit builder.
    *   Custom report generator.
*   **Marketing & Community:**
    *   Public-facing blog and resource library.
    *   Community forum.
    *   Referral program.

### Low Priority: Long-Term & Foundational

*   **Formalize Documentation:** Create a centralized, searchable documentation site.
*   **Automated Testing:** Implement a robust testing strategy (unit, integration, and end-to-end).
*   **Organize Mocks:** Restructure the `mocks/` directory.

## 5. Areas for Improvement

The following are areas that have been identified for improvement, as detailed in `IMPROVEMENT_SUGGESTIONS.md`:

*   **Mocks:** Consolidate and organize the `mocks/` directory.
*   **Documentation:** Formalize the project documentation.
*   **Environment Variables:** Add comments to `.env.example`.
*   **UI Package:** Integrate Storybook into the `packages/ui` directory.
