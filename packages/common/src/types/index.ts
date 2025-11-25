export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: number;
  suggestions?: { id: string; label: string }[];
}