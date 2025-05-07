import { apiRequest } from "./queryClient";
import { type PageContent, insertPageContentSchema } from "@shared/schema";
import { z } from "zod";

// Schema to validate the page content update request
export const updatePageContentSchema = insertPageContentSchema.partial();
export type UpdatePageContent = z.infer<typeof updatePageContentSchema>;

// Helper function to fetch a specific page content
export async function fetchPageContent(pageName: string): Promise<PageContent> {
  const response = await fetch(`/api/pages/${pageName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch page content for ${pageName}`);
  }
  return response.json();
}

// Helper function to update a specific page content
export async function updatePageContent(pageName: string, content: UpdatePageContent): Promise<PageContent> {
  const response = await apiRequest("PATCH", `/api/pages/${pageName}`, content);
  return response.json();
}

// Helper function to parse JSON content from a page
export function parsePageContent<T>(content: string): T {
  try {
    return JSON.parse(content) as T;
  } catch (error) {
    console.error("Failed to parse page content:", error);
    throw new Error("Invalid page content format");
  }
}

// Types for specific page content structures
export interface HomePageContent {
  intro: {
    title: string;
    content: string;
  };
  projectScope: {
    title: string;
    content: string;
  };
  timeline: {
    title: string;
    content: string;
    progress: number;
    currentWeek: string;
  };
  updates: {
    title: string;
    items: string[];
  };
}

export interface TeamPageContent {
  intro: {
    title: string;
    content: string;
  };
}

export interface TeamCharterPageContent {
  intro: {
    title: string;
    content: string;
  };
  mission: {
    title: string;
    content: string;
  };
  values: {
    title: string;
    items: {
      title: string;
      content: string;
    }[];
  };
  agreements: {
    title: string;
    communication: {
      title: string;
      items: string[];
    };
    decisions: {
      title: string;
      items: string[];
    };
  };
  conflict: {
    title: string;
    items: string[];
  };
  signatures: {
    title: string;
    content: string;
  };
}

export interface ProjectSprintsPageContent {
  intro: {
    title: string;
    content: string;
  };
  currentSprint: {
    title: string;
    name: string;
    date: string;
    status: string;
    goals: string[];
    progress: number;
    tasks: string;
    metrics: {
      name: string;
      value: string;
    }[];
  };
}

export interface BasicPageContent {
  intro: {
    title: string;
    content: string;
  };
  placeholder?: string;
}
