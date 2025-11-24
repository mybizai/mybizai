# Blueprint: Existing Business Owner Flow

## Objective
To provide a tailored onboarding and "ideation" experience for established business owners, helping them identify needs (marketing, automation, expansion) and guiding them into a customized dashboard journey.

## User Journey

### 1. Entry Point
- **Location**: `/dashboard/onboarding` (or a modal on first login).
- **Selection**: User chooses between:
  - "I have a new business idea" (Current Flow)
  - "I have an established business" (New Flow)

### 2. Business Profiling (The "Ideation" for Existing Owners)
A wizard-style interface to gather context.

#### Step 1: Business Identity
- **Business Name**
- **Industry / Niche**
- **Website URL** (Optional - for auto-scraping context later)
- **Years in Business**

#### Step 2: Current Challenges & Goals (Multi-select)
- **Growth & Expansion**: "I want to expand to new markets" or "I need funding".
- **Marketing & Sales**: "I need more leads" or "I want to automate social media".
- **Operations & Efficiency**: "I want to automate manual tasks" or "I need better team management".
- **Strategy & Analysis**: "I need to understand my competitors" or "I need a business valuation".

#### Step 3: AI Analysis
- **Action**: AI analyzes the inputs (and potentially scrapes the website if provided).
- **Output**: A "Strategic Roadmap" or "Growth Plan" instead of a "Business Plan".
  - *Example*: "Based on your goal to expand, we recommend starting with Market Research and a Competitor Analysis."

### 3. Customized Dashboard
Based on the selected goals, the dashboard highlights relevant tools.

- **If Marketing selected**: Highlight "Marketing", "Brand Identity", "Content Creator AI".
- **If Operations selected**: Highlight "Teams", "Integrations", "Automation".
- **If Expansion selected**: Highlight "Business Plans", "Financial Projections".

## Technical Implementation

### Components
- `BusinessOnboardingWizard`: New component for the multi-step form.
- `BusinessProfileStore`: Zustand store to hold business data.
- `GrowthPlanGenerator`: Service to call AI for the roadmap.

### Data Model
- Update `User` or create `BusinessProfile` model in Prisma:
  - `businessName`
  - `industry`
  - `goals` (JSON)
  - `stage` ("established")

### Navigation
- Add "Onboarding" route.
- Redirect new users to Onboarding if no profile exists.

## Next Steps
1.  Scaffold `BusinessOnboardingWizard`.
2.  Implement the "Choice" screen (New vs Existing).
3.  Build the "Business Profiling" steps.
4.  Connect to AI for "Growth Plan" generation.
