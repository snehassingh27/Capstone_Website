import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertPageContentSchema, 
  insertTeamMemberSchema, 
  insertSprintSchema, 
  insertQuickNavItemSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import multer from "multer";
import path from "path";
import fs from "fs";

// Set up multer for file uploads
const storage_local = multer.memoryStorage();
const upload = multer({ storage: storage_local });

export async function registerRoutes(app: Express): Promise<Server> {
  // Base API route
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // Page Content Routes
  app.get("/api/pages", async (_req: Request, res: Response) => {
    try {
      const pages = await storage.getAllPageContents();
      res.json(pages);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/:pageName", async (req: Request, res: Response) => {
    try {
      const { pageName } = req.params;
      const page = await storage.getPageContent(pageName);
      
      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }
      
      res.json(page);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  app.post("/api/pages", async (req: Request, res: Response) => {
    try {
      const pageData = insertPageContentSchema.parse(req.body);
      const newPage = await storage.createPageContent(pageData);
      res.status(201).json(newPage);
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create page" });
    }
  });

  app.patch("/api/pages/:pageName", async (req: Request, res: Response) => {
    try {
      const { pageName } = req.params;
      const pageData = insertPageContentSchema.partial().parse(req.body);
      
      const updatedPage = await storage.updatePageContent(pageName, pageData);
      
      if (!updatedPage) {
        return res.status(404).json({ error: "Page not found" });
      }
      
      res.json(updatedPage);
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to update page" });
    }
  });

  // Team Member Routes
  app.get("/api/team-members", async (_req: Request, res: Response) => {
    try {
      const members = await storage.getAllTeamMembers();
      res.json(members);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.get("/api/team-members/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      
      const member = await storage.getTeamMember(id);
      
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      
      res.json(member);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch team member" });
    }
  });

  app.post("/api/team-members", async (req: Request, res: Response) => {
    try {
      const memberData = insertTeamMemberSchema.parse(req.body);
      const newMember = await storage.createTeamMember(memberData);
      res.status(201).json(newMember);
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create team member" });
    }
  });

  app.patch("/api/team-members/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      
      const memberData = insertTeamMemberSchema.partial().parse(req.body);
      const updatedMember = await storage.updateTeamMember(id, memberData);
      
      if (!updatedMember) {
        return res.status(404).json({ error: "Team member not found" });
      }
      
      res.json(updatedMember);
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to update team member" });
    }
  });

  app.delete("/api/team-members/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      
      const success = await storage.deleteTeamMember(id);
      
      if (!success) {
        return res.status(404).json({ error: "Team member not found" });
      }
      
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: "Failed to delete team member" });
    }
  });

  // Sprint Routes
  app.get("/api/sprints", async (_req: Request, res: Response) => {
    try {
      const sprints = await storage.getAllSprints();
      res.json(sprints);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch sprints" });
    }
  });

  app.get("/api/sprints/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      
      const sprint = await storage.getSprint(id);
      
      if (!sprint) {
        return res.status(404).json({ error: "Sprint not found" });
      }
      
      res.json(sprint);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch sprint" });
    }
  });

  app.post("/api/sprints", async (req: Request, res: Response) => {
    try {
      const sprintData = insertSprintSchema.parse(req.body);
      const newSprint = await storage.createSprint(sprintData);
      res.status(201).json(newSprint);
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create sprint" });
    }
  });

  app.patch("/api/sprints/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      
      const sprintData = insertSprintSchema.partial().parse(req.body);
      const updatedSprint = await storage.updateSprint(id, sprintData);
      
      if (!updatedSprint) {
        return res.status(404).json({ error: "Sprint not found" });
      }
      
      res.json(updatedSprint);
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to update sprint" });
    }
  });

  app.delete("/api/sprints/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      
      const success = await storage.deleteSprint(id);
      
      if (!success) {
        return res.status(404).json({ error: "Sprint not found" });
      }
      
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: "Failed to delete sprint" });
    }
  });

  // Quick Navigation Item Routes
  app.get("/api/quick-nav-items", async (_req: Request, res: Response) => {
    try {
      const items = await storage.getAllQuickNavItems();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch quick navigation items" });
    }
  });

  app.post("/api/quick-nav-items", async (req: Request, res: Response) => {
    try {
      const itemData = insertQuickNavItemSchema.parse(req.body);
      const newItem = await storage.createQuickNavItem(itemData);
      res.status(201).json(newItem);
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create quick navigation item" });
    }
  });

  app.patch("/api/quick-nav-items/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      
      const itemData = insertQuickNavItemSchema.partial().parse(req.body);
      const updatedItem = await storage.updateQuickNavItem(id, itemData);
      
      if (!updatedItem) {
        return res.status(404).json({ error: "Quick navigation item not found" });
      }
      
      res.json(updatedItem);
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to update quick navigation item" });
    }
  });

  app.delete("/api/quick-nav-items/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      
      const success = await storage.deleteQuickNavItem(id);
      
      if (!success) {
        return res.status(404).json({ error: "Quick navigation item not found" });
      }
      
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: "Failed to delete quick navigation item" });
    }
  });

  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      res.json({ success: true, userId: user.id });
    } catch (err) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Route to serve the Team Charter PDF
  app.get("/api/documents/team-charter", (req: Request, res: Response) => {
    try {
      // Use absolute path from root directory
      const filePath = path.join(process.cwd(), "attached_assets", "Capstone Team Charter Updated With Review Week 5-6 Edit Final With Changes.pdf");
      
      if (!fs.existsSync(filePath)) {
        console.error("PDF file not found at:", filePath);
        return res.status(404).json({ error: "Document not found" });
      }
      
      console.log(`Serving PDF from: ${filePath}`);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename=team-charter.pdf');
      
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (err) {
      console.error("Error serving PDF:", err);
      res.status(500).json({ error: "Failed to serve document" });
    }
  });
  
  // Route to serve the Status Report PDF for Week 3-4
  app.get("/api/documents/status-report-week3-4", (req: Request, res: Response) => {
    try {
      // Use absolute path from root directory
      const filePath = path.join(process.cwd(), "attached_assets", "Project Pilot Team Status Report for Client.pdf");
      
      if (!fs.existsSync(filePath)) {
        console.error("PDF file not found at:", filePath);
        return res.status(404).json({ error: "Document not found" });
      }
      
      console.log(`Serving PDF from: ${filePath}`);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename=status-report-week3-4.pdf');
      
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (err) {
      console.error("Error serving PDF:", err);
      res.status(500).json({ error: "Failed to serve document" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
