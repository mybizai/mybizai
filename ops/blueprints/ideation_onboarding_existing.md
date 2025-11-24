# Blueprint: Existing Entrepreneur Onboarding Flow

## 1. Overview
This workflow is designed for users who select "I have an existing business" during onboarding. Unlike the "New Idea" flow which focuses on validation and brainstorming, this flow focuses on **Optimization, Scaling, and Problem Solving**.

## 2. User Persona
- **Type**: Small Business Owner / Solopreneur / Startup Founder
- **Mindset**: Pragmatic, busy, looking for specific solutions or growth strategies.
- **Goal**: Increase revenue, solve a specific operational bottleneck, or pivot.

## 3. User Flow

### Step 1: Business Profile (The "Who")
*   **Business Name** & **Website URL** (Optional, for scraping context later)
*   **Industry/Niche** (Dropdown + Custom)
*   **Business Model** (B2B, B2C, SaaS, E-commerce, Service, etc.)
*   **Years in Business** (<1, 1-3, 3-5, 5+)

### Step 2: Current Status (The "Where")
*   **Team Size** (Just me, 2-5, 5-10, 10+)
*   **Approximate Revenue** (Pre-revenue, <$50k, $50k-$250k, $250k-$1M, $1M+)
*   **Key Metrics** (What do they track? Traffic, Leads, Sales, Churn?)

### Step 3: The Challenge (The "What")
*   **Primary Goal** (Select one):
    *   Increase Revenue / Sales
    *   Improve Efficiency / Operations
    *   Expand to New Markets
    *   Launch New Product/Service
    *   Fix a Crisis (Churn, Cashflow)
*   **Open Text Input**: "Describe your biggest current headache in 1-2 sentences."

## 4. AI Analysis (The "Brain")
The AI (MiniMax-m2) will act as a **Strategic Consultant**.

### System Prompt Persona
> "You are an expert business consultant with decades of experience in scaling companies. Your goal is to analyze the user's current business status and provide actionable, high-impact strategies to overcome their specific challenges. Be direct, data-driven, and encouraging."

### Output Structure
1.  **Executive Summary**: Assessment of their current position.
2.  **SWOT Analysis** (Generated based on industry + challenge).
3.  **3 Strategic Pillars**: Three distinct paths they can take to solve their challenge.
4.  **Immediate Action Plan**: 3-5 steps to take *this week*.

## 5. UI/UX Requirements
*   **Wizard Style**: Similar to "New Idea" but with a more professional, "Dashboard" aesthetic.
*   **Data Visualization**: If they provide metrics, visualize them immediately (even if simple bars).
*   **"Connect Data" Upsell**: Future placeholder for connecting Stripe/Analytics directly.

## 6. Technical Architecture
*   **Route**: `/dashboard/onboarding/existing`
*   **Store**: `useBusinessStore` (distinct from `BrainstormStore`)
*   **API**: `/api/ai/consult` (New endpoint)
