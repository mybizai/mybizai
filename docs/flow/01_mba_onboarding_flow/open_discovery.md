graph TD
    %% Nodes Configuration
    classDef user fill:#333,stroke:#fff,stroke-width:1px,color:#fff;
    classDef ai fill:#111,stroke:#d4af37,stroke-width:2px,color:#d4af37;
    classDef background fill:#222,stroke:#666,stroke-width:1px,color:#ddd,stroke-dasharray: 5 5;

    %% Phase 1: The Welcome (Atmosphere)
    Start((User Arrives)) --> Persona[Preference Selection:<br/>Masculine / Feminine / Neutral]:::ai
    Persona --> NameCapture[Capture Name & Lock IP]:::ai
    NameCapture --> TheOpenFloor["The Open Floor:<br/>'How can we be of service today?'"]:::ai

    %% Phase 2: The Listening (Triage)
    TheOpenFloor --> UserInput[/User Speaks Freely/ :::user]
    UserInput --> AIAnalysis{AI Sentiment &<br/>Intent Analysis}:::background

    %% Phase 3: The Adaptive Paths (Fluid)
    AIAnalysis -- "I have no idea" --> ExplorerPath[The Explorer Path:<br/>'Let's Brainstorm & Dream']:::ai
    AIAnalysis -- "I have a concept" --> ValidatorPath[The Validator Path:<br/>'Let's Stress-Test the Idea']:::ai
    AIAnalysis -- "I have a business" --> OptimizerPath[The Optimizer Path:<br/>'Let's Find the Pain Points']:::ai

    %% Phase 4: The Interaction (The Dance)
    ExplorerPath --> Cameo1[Cameo: MyIntelligenceAI<br/>offers market trend data]:::ai
    ValidatorPath --> Cameo2[Cameo: MyStrategyAI<br/>offers feasibility check]:::ai
    OptimizerPath --> Cameo3[Cameo: MyOperationsAI<br/>offers efficiency check]:::ai

    %% Phase 5: The Value Drop (No Ask)
    Cameo1 --> Gift["The Gift:<br/>Relevant E-Book / Case Study / Data Brief"]:::ai
    Cameo2 --> Gift
    Cameo3 --> Gift

    %% Phase 6: The Next Step (The Soft Close)
    Gift --> CheckIn{"Are you ready to go deeper,<br/>or do you need time?"}:::ai
    CheckIn -- "Go Deeper" --> LiveSession[Continue to Full Interview]:::ai
    CheckIn -- "Need Time" --> Schedule[Schedule Future Session<br/>(Link sent to IP/Email)]:::ai
