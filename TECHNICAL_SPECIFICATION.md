# Technical Specification

## 1. Architecture Overview

MyBizAI is a full-stack, monorepo application built with Next.js, TypeScript, and a collection of modern, enterprise-grade tools. The architecture is designed for modularity, scalability, and a superior developer experience, leveraging the power of a Turborepo setup.

### 1.1. Monorepo Structure

The project is organized as a Turborepo monorepo, with a clear separation between applications and shared packages:

*   **`apps/`**:
    *   **`nextjs/`**: The main Next.js web application, which serves both the marketing site and the authenticated user dashboard.
*   **`packages/`**:
    *   **`api/`**: tRPC API definitions and routers.
    *   **`auth/`**: Authentication logic (Clerk & NextAuth.js).
    *   **`db/`**: Database schema (Prisma) and query logic.
    *   **`stripe/`**: Stripe integration for subscription management.
    *   **`ui/`**: A shared React component library built with Shadcn UI.
*   **`tooling/`**: Shared configurations for ESLint, Prettier, and Tailwind CSS.

### 1.2. Data Flow

1.  **Client-Side:** The Next.js frontend uses tRPC to make end-to-end type-safe API calls to the backend.
2.  **API Layer:** The tRPC API, defined in `packages/api`, handles incoming requests, performs business logic, and interacts with the database.
3.  **Database Layer:** The database is managed by Prisma, which provides an ORM and schema management. The Prisma schema is located in `packages/db/prisma/schema.prisma`.

## 2. Data Models

The core data models, defined in the Prisma schema, are designed to support the platform's extensive features:

*   **`User`**: Manages user data, authentication, and profile information.
*   **`Team`**: Represents a team of users.
*   **`TeamMembership`**: A join table for users and teams, including roles and permissions.
*   **`Project`**: Represents a business plan or project.
*   **`Subscription`**: Manages the user's or team's subscription plan via Stripe.
*   **AI-related models**: Additional models will be required to store data related to AI-generated content, such as `BrainstormSession`, `FinancialProjection`, and `MarketAnalysis`.

## 3. Key Technical Components

### 3.1. Authentication

The application uses both Clerk and NextAuth.js for authentication, providing a robust and flexible system for user management, including 2FA and social logins.

### 3.2. Payments

Stripe is deeply integrated for subscription management, supporting multiple tiers (Standard, Pro, Business) with both monthly and yearly pricing options. The integration is managed in the `packages/stripe` module.

### 3.3. UI & Design System

The UI is built with a custom design system based on Shadcn UI and Tailwind CSS. The Tailwind configuration includes a branded "mybiz" color palette, ensuring a consistent and polished look and feel.

### 3.4. Analytics

Product analytics are handled by PostHog, allowing for detailed tracking of user behavior and feature usage.

### 3.5. Operations & Documentation

The project includes dedicated directories for `ops/` and `docs/`, indicating a commitment to structured operations and comprehensive documentation.

## 4. Environment Configuration

The application is configured via environment variables, as defined in the `.env.example` file. This includes credentials for Stripe, NextAuth, Clerk, Resend, and PostHog.
