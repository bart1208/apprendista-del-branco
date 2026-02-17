"use client";

export interface KnowledgeItem {
  id: string;
  type: "logic" | "vision" | "fact";
  content: string;
  timestamp: number;
}

export const saveKnowledge = (item: Omit<KnowledgeItem, "id" | "timestamp">) => {
  if (typeof window === "undefined") return;
  
  const existing = getKnowledge();
  const newItem: KnowledgeItem = {
    ...item,
    id: Math.random().toString(36).substring(2, 9),
    timestamp: Date.now(),
  };
  
  const updated = [newItem, ...existing];
  localStorage.setItem("branco_knowledge", JSON.stringify(updated));
  return newItem;
};

export const getKnowledge = (): KnowledgeItem[] => {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem("branco_knowledge");
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const clearKnowledge = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("branco_knowledge");
};
