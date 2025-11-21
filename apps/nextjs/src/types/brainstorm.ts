export type Role = 'user' | 'ai';

export interface Suggestion {
    id: string;
    label: string;
    value: string;
    type: 'industry' | 'business_model' | 'feature' | 'name' | 'action';
}

export interface Message {
    id: string;
    role: Role;
    content: string;
    timestamp: number;
    suggestions?: Suggestion[];
    isStreaming?: boolean;
}

export interface BusinessIdea {
    id: string;
    title: string;
    description: string;
    industry?: string;
    businessModel?: string;
    targetAudience?: string;
    uniqueValueProp?: string;
    revenueStreams?: string[];
    marketingChannels?: string[];
    status: 'draft' | 'in_review' | 'approved';
    createdAt: number;
    updatedAt: number;
}

export interface BrainstormSession {
    id: string;
    idea: BusinessIdea;
    messages: Message[];
    step: 'init' | 'industry' | 'model' | 'refinement' | 'crystallization';
}
