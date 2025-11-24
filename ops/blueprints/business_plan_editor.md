# Blueprint: Business Plan Editor (Phase 2)

## 1. Overview
The core of Phase 2 is the "Business Plan Editor," a structured environment where users turn their brainstormed ideas into a formal document. It is not just a text editor; it is an AI-assisted writing workspace.

## 2. Core Features

### Structured Sections
The plan is divided into standard business plan chapters:
1.  **Executive Summary**
2.  **Company Overview**
3.  **Market Analysis**
4.  **Products & Services**
5.  **Marketing Strategy**
6.  **Financial Plan**

### AI Co-Pilot
*   **"Draft This Section"**: Button to generate a first draft based on the Brainstorming session context.
*   **"Expand" / "Shorten" / "Rewrite"**: Context menu tools for selected text.
*   **Context Sidebar**: Always-visible summary of the "Big Idea" so the user (and AI) stays aligned.

### Rich Text Editing
*   Bold, Italic, Lists, Headers.
*   Tables (crucial for Financial Plan).
*   Export to PDF / Docx.

## 3. Technical Stack
*   **Editor Framework**: Tiptap (Headless wrapper for ProseMirror) is recommended for React + Next.js.
    *   Highly customizable.
    *   Great support for AI extensions.
*   **State Management**: Zustand (sync with `BrainstormStore` data).
*   **Persistence**: Auto-save to database (PostgreSQL via Prisma).

## 4. Data Model
```prisma
model BusinessPlan {
  id        String   @id @default(cuid())
  userId    String
  title     String
  content   Json     // Structured JSON content (Tiptap format)
  status    String   // DRAFT, COMPLETED
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 5. Tasks for Parallel Team
1.  Set up Tiptap editor with basic toolbar.
2.  Create the `BusinessPlan` database schema.
3.  Implement "Generate Draft" API endpoint (calls MiniMax with specific prompt).
4.  Build the Section Navigation sidebar.
