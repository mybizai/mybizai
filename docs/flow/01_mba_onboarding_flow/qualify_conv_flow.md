graph TD
    UserOutput["User: 'Unstructured Input'"] --> Analyzer{AI Analysis Engine}
    
    Analyzer -->|Keywords: Idea, Start, Concept| PathA[Path A: The Architect]
    Analyzer -->|Keywords: Chaos, Fix, Broken| PathB[Path B: The Surgeon]
    Analyzer -->|Keywords: Scale, Crush, Win| PathC[Path C: The General]
    
    PathA --> ResponseA["'Let's stress-test the model.<br/>MyFinanceAI is ready.'"]
    PathB --> ResponseB["'Let's isolate the bottleneck.<br/>MyOperationsAI is ready.'"]
    PathC --> ResponseC["'Let's analyze the competition.<br/>MyIntelligenceAI is ready.'"]
    
    ResponseA --> ValueHook["The Value Hook:<br/>'I can build your Roadmap now.'"]
    ResponseB --> ValueHook
    ResponseC --> ValueHook
    
    ValueHook --> EmailCapture["'Where shall I send<br/>the Executive Brief?'"]
