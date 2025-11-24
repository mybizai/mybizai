# Technical Specification

## 1. Architecture Overview

MyBizAI is a full-stack, monorepo application built with Next.js, TypeScript, and a collection of modern, enterprise-grade tools. The architecture is designed to be modular, scalable, and maintainable, with a clear separation of concerns between the different parts of the application.

### 1.1. Monorepo Structure

The project is organized as a Turborepo monorepo, with the following key directories:

- **`apps/`**: Contains the main applications.
  - **`nextjs/`**: The primary Next.js web application.
- **`packages/`**: Contains shared libraries and modules.
  - **`api/`**: tRPC API definitions and routers.
  - **`auth/`**: Authentication logic and utilities (NextAuth.js or Clerk).
  - **`db/`**: Database schema (Prisma).
  - **`stripe/`**: Stripe integration and payment logic.
  - **`ui/`**: Shared React components (Shadcn UI).

### 1.2. Data Flow

1. **Client-Side:** The Next.js application uses tRPC to make type-safe API calls to the backend.
2. **API Layer:** The tRPC API, located in the `packages/api` directory, handles incoming requests and calls the appropriate database queries or AI models.
3. **Database Layer:** The `packages/db` directory contains the Prisma schema for database modeling.

## 2. Data Models

The core data models are defined in the `packages/db/prisma/schema.prisma` file. The key models include:

- **`User`**: Stores user information, including authentication details.
- **`Subscription`**: Manages user subscriptions and their status.
- **`Usage`**: Tracks user usage of AI models for billing and analytics.

```prisma
// Example schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  // ... other user fields
}

model Subscription {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  // ... other subscription fields
}

model Usage {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  model         String
  tokens        Int
  // ... other usage fields
}
```

## 3. Key Technical Components

### 3.1. Authentication

Authentication is handled by NextAuth.js or Clerk, providing a flexible and secure way to manage user authentication.

### 3.2. Payments

Stripe is integrated for payment processing, with the `packages/stripe` module encapsulating the logic for handling subscriptions, webhooks, and usage-based billing.

### 3.3. API

The API is built with tRPC, which enables end-to-end type safety between the client and server. The tRPC routers are defined in `packages/api` and consumed by the Next.js application.

### 3.4. AI Model Integration

The boilerplate provides a clear and documented process for integrating custom AI models. This includes a dedicated API route for handling AI requests and a flexible architecture that can accommodate different AI model providers.
