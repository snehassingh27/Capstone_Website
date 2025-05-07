import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Project pages content
export const pageContents = pgTable("page_contents", {
  id: serial("id").primaryKey(),
  pageName: text("page_name").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  content: text("content").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  version: integer("version").default(1).notNull(),
});

export const insertPageContentSchema = createInsertSchema(pageContents).omit({
  id: true,
  lastUpdated: true,
});

export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type PageContent = typeof pageContents.$inferSelect;

// Team members
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  description: text("description"),
  initials: text("initials").notNull(),
  skills: text("skills").array(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
});

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

// Project sprints
export const sprints = pgTable("sprints", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subtitle: text("subtitle"),
  dateRange: text("date_range").notNull(),
  status: text("status").notNull(),
  deliverables: text("deliverables").array(),
});

export const insertSprintSchema = createInsertSchema(sprints).omit({
  id: true,
});

export type InsertSprint = z.infer<typeof insertSprintSchema>;
export type Sprint = typeof sprints.$inferSelect;

// Quick navigation items on home page
export const quickNavItems = pgTable("quick_nav_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  link: text("link").notNull(),
});

export const insertQuickNavItemSchema = createInsertSchema(quickNavItems).omit({
  id: true,
});

export type InsertQuickNavItem = z.infer<typeof insertQuickNavItemSchema>;
export type QuickNavItem = typeof quickNavItems.$inferSelect;
