import { 
  users, type User, type InsertUser,
  pageContents, type PageContent, type InsertPageContent,
  teamMembers, type TeamMember, type InsertTeamMember,
  sprints, type Sprint, type InsertSprint,
  quickNavItems, type QuickNavItem, type InsertQuickNavItem
} from "@shared/schema";

// Storage interface for the application
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Page contents
  getPageContent(pageName: string): Promise<PageContent | undefined>;
  getAllPageContents(): Promise<PageContent[]>;
  createPageContent(content: InsertPageContent): Promise<PageContent>;
  updatePageContent(pageName: string, content: Partial<InsertPageContent>): Promise<PageContent | undefined>;
  
  // Team members
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  getAllTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;
  
  // Sprints
  getSprint(id: number): Promise<Sprint | undefined>;
  getAllSprints(): Promise<Sprint[]>;
  createSprint(sprint: InsertSprint): Promise<Sprint>;
  updateSprint(id: number, sprint: Partial<InsertSprint>): Promise<Sprint | undefined>;
  deleteSprint(id: number): Promise<boolean>;
  
  // Quick navigation items
  getQuickNavItem(id: number): Promise<QuickNavItem | undefined>;
  getAllQuickNavItems(): Promise<QuickNavItem[]>;
  createQuickNavItem(item: InsertQuickNavItem): Promise<QuickNavItem>;
  updateQuickNavItem(id: number, item: Partial<InsertQuickNavItem>): Promise<QuickNavItem | undefined>;
  deleteQuickNavItem(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private pageContents: Map<string, PageContent>;
  private teamMembers: Map<number, TeamMember>;
  private sprints: Map<number, Sprint>;
  private quickNavItems: Map<number, QuickNavItem>;
  private currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.pageContents = new Map();
    this.teamMembers = new Map();
    this.sprints = new Map();
    this.quickNavItems = new Map();
    this.currentId = {
      users: 1,
      teamMembers: 1,
      sprints: 1,
      quickNavItems: 1
    };
    
    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Default user
    this.createUser({
      username: "admin",
      password: "admin123" // In a real app, this would be hashed
    });
    
    // Default page contents
    const defaultPages = [
      {
        pageName: "home",
        title: "Project Documentation Hub",
        subtitle: "Comprehensive documentation for our 12-week capstone project",
        content: JSON.stringify({
          intro: {
            title: "Welcome to Project Pilots",
            content: "This documentation hub serves as the central repository for all artifacts, progress updates, and deliverables related to our 12-week capstone project. Navigate through the different sections using the sidebar to explore team information, project sprints, and more."
          },
          projectScope: {
            title: "Project Scope: Scope of Work",
            content: "We're partnering with The Knots Studio, a heart-first, style-savvy gifting startup from Bangalore- to design a clean, modern business website that reflects the brand's charm and purpose. With a strong offline presence and a flair for curating thoughtful bulk gifts, The Knots Studio is ready to step confidently into the digital space. Our scope includes crafting a mobile-friendly, SEO-optimized website that showcases their story, services, and stunning gifting galleries, while making it super easy for potential clients to discover, connect, and fall in love with their offerings. This platform won't just look good, it'll work hard behind the scenes to support lead generation, trust-building, and long-term growth."
          },
          timeline: {
            title: "Project Timeline",
            content: "12 weeks (January 15 - April 8, 2025)",
            progress: 75,
            currentWeek: "Week 9 of 12"
          },
          updates: {
            title: "Latest Updates",
            items: [
              "Sprint 4 completed with all deliverables",
              "Team retrospective scheduled for April 22",
              "Client presentation draft submitted"
            ]
          }
        })
      },
      {
        pageName: "team",
        title: "Meet Project Pilots",
        subtitle: "The dedicated members behind this project",
        content: JSON.stringify({
          intro: {
            title: "Meet Project Pilots",
            content: ""
          }
        })
      },
      {
        pageName: "team-charter",
        title: "Team Charter",
        subtitle: "Our guiding principles and project governance",
        content: JSON.stringify({
          intro: {
            title: "Project Pilots – The KnotStudio Capstone Team",
            content: "The Project Pilots are a team of six graduate students from Northeastern University's Project Management program, collaborating to deliver a real-world capstone project for The KnotStudio. This charter defines our shared purpose, working structure, communication practices, and guiding principles to ensure successful project delivery."
          },
          mission: {
            title: "Purpose",
            content: "Our objective is to plan, manage, and execute a high-quality project using project management tools and methodologies. We are committed to aligning client expectations with academic outcomes through Agile, Scrum, and Waterfall practices."
          },
          values: {
            title: "Team Composition & Strengths",
            items: [
              {
                title: "Team Composition",
                content: "Our team members bring varied experience from event planning, IT, construction, biotech, and operations. We rotate the role of Scrum Master weekly to foster shared leadership and learning."
              },
              {
                title: "Scrum Master",
                content: "Leads weekly planning, progress tracking, and team coordination."
              },
              {
                title: "Developer Team",
                content: "Executes project deliverables with responsibilities adjusted weekly based on the project phase."
              },
              {
                title: "Team Strengths",
                content: "Our team demonstrates strong organizational, analytical, and execution skills. Strengths like coaching and self-leadership contribute to positive morale and accountability."
              },
              {
                title: "Growth Areas",
                content: "Recognizing areas for growth in strategic thinking and creative problem-solving, we proactively balance team responsibilities to develop in these areas."
              }
            ]
          },
          agreements: {
            title: "Tools & Communication",
            communication: {
              title: "Platforms",
              items: [
                "Microsoft Teams (documentation, meetings)",
                "Email (formal updates)",
                "WhatsApp (real-time updates)"
              ]
            },
            decisions: {
              title: "Meetings",
              items: [
                "Mondays: Virtual team meeting",
                "Wednesdays: In-class check-in",
                "Saturdays: Informal WhatsApp updates",
                "Thursdays: Weekly client check-in (virtual)"
              ]
            }
          },
          conflict: {
            title: "Ground Rules & Conflict Resolution",
            items: [
              "Attendance is mandatory at all meetings unless excused in advance.",
              "All assigned work must be completed on time. Missed contributions are addressed progressively through team support, discussion, and potential escalation.",
              "Drafts are expected 48 hours prior to deadlines for peer review.",
              "Final versions are submitted to the shared drive at least 4 hours before the official deadline.",
              "Conflicts are addressed respectfully through open dialogue. If needed, the Scrum Master will mediate. If unresolved, the matter is escalated to the faculty advisor.",
              "Major decisions are made through team consensus. For urgent or minor matters, the current Scrum Master or designated lead may make the call after brief consultation."
            ]
          },
          signatures: {
            title: "Team Member Signatures",
            content: "By signing this charter, each team member agrees to uphold these principles throughout the project."
          }
        })
      },
      {
        pageName: "project-sprints",
        title: "Project Sprints",
        subtitle: "",
        content: JSON.stringify({
          intro: {
            title: "Project Sprints Timeline",
            content: ""
          },
          currentSprint: {
            title: "Current Sprint Details",
            name: "Sprint 2: Sponsor Research & Scope",
            date: "April 23 - May 7, 2025",
            status: "Completed",
            goals: [
              "Gather sponsor information for The Knots Studio",
              "Update team charter with client requirements",
              "Create draft scope document",
              "Prepare weekly status reports",
              "Conduct initial client needs analysis"
            ],
            progress: 100,
            tasks: "10 of 10 tasks completed (100%)",
            metrics: [
              { name: "Stories", value: "12/12" },
              { name: "Story Points", value: "45/45" },
              { name: "Tasks Completed", value: "10" }
            ]
          }
        })
      },
      {
        pageName: "retrospective",
        title: "Retrospective",
        subtitle: "Team reflections and continuous improvement",
        content: JSON.stringify({
          intro: {
            title: "Sprint Retrospectives",
            content: "Regular reflection on our process, achievements, and areas for improvement"
          },
          placeholder: "Detailed retrospective content will be added following each sprint completion."
        })
      },
      {
        pageName: "collaboration",
        title: "Collaboration",
        subtitle: "",
        content: JSON.stringify({
          intro: {
            title: "Team Collaboration",
            content: ""
          },
          placeholder: "Collaboration documentation is currently being updated."
        })
      },
      {
        pageName: "jira",
        title: "Jira Integration",
        subtitle: "Task tracking and project management",
        content: JSON.stringify({
          intro: {
            title: "Jira Dashboard",
            content: "Integration with our project management system"
          },
          placeholder: "Jira integration is in progress."
        })
      },
      {
        pageName: "clients-project",
        title: "Client's Project",
        subtitle: "Details about our client and project scope",
        content: JSON.stringify({
          intro: {
            title: "Client Project Overview",
            content: "Information about our client and the project requirements"
          },
          placeholder: "Client project information is currently being updated."
        })
      }
    ];
    
    defaultPages.forEach(page => {
      const pageContent: PageContent = {
        id: 0, // Will be replaced
        pageName: page.pageName,
        title: page.title,
        subtitle: page.subtitle || "",
        content: page.content,
        lastUpdated: new Date(),
        version: 1
      };
      this.pageContents.set(page.pageName, pageContent);
    });
    
    // Default team members
    const defaultTeamMembers = [
      {
        name: "Jane Doe",
        role: "Project Manager",
        description: "Experienced in leading cross-functional teams and ensuring project deliverables meet timelines.",
        initials: "JD",
        skills: ["Leadership", "Agile", "Communication"]
      },
      {
        name: "John Smith",
        role: "Lead Developer",
        description: "Focused on architecture and implementation of technical solutions with a focus on scalability.",
        initials: "JS",
        skills: ["Full-Stack", "API Design", "Cloud"]
      },
      {
        name: "Amy Lee",
        role: "UX Designer",
        description: "Creates user-centered designs with a focus on accessibility and intuitive interactions.",
        initials: "AL",
        skills: ["UI/UX", "Prototyping", "User Research"]
      },
      {
        name: "Michael Johnson",
        role: "Data Analyst",
        description: "Specializes in data modeling, analysis, and creating insightful visualizations for decision making.",
        initials: "MJ",
        skills: ["Analytics", "Data Science", "Visualization"]
      },
      {
        name: "Sarah Parker",
        role: "Business Analyst",
        description: "Bridges technical and business requirements, ensuring solutions align with stakeholder needs.",
        initials: "SP",
        skills: ["Requirements", "Documentation", "Testing"]
      }
    ];
    
    defaultTeamMembers.forEach(member => {
      this.createTeamMember(member);
    });
    
    // Default sprints
    const defaultSprints = [
      {
        name: "Sprint 1",
        subtitle: "Team Setup & Foundation",
        dateRange: "Apr 9 - Apr 22, 2025",
        status: "Completed",
        deliverables: [
          "Team member bios and profiles", 
          "Team name and identity", 
          "Project website setup", 
          "Team charter creation",
          "Sprint planning",
          "Create Jira Scrum board"
        ]
      },
      {
        name: "Sprint 2",
        subtitle: "Sponsor Research & Scope",
        dateRange: "Apr 23 - May 7, 2025",
        status: "Completed",
        deliverables: [
          "Sponsor information gathering", 
          "Charter updates", 
          "Client scope requirements", 
          "Draft scope document",
          "Status reports",
          "Team retrospective"
        ]
      },
      {
        name: "Sprint 3",
        subtitle: "Project Planning & Tasks",
        dateRange: "May 8 - May 21, 2025",
        status: "Planned",
        deliverables: [
          "Detailed project planning", 
          "Task assignments", 
          "Technical requirements", 
          "Stakeholder communication plan"
        ]
      },
      {
        name: "Sprint 4",
        subtitle: "Design & Development",
        dateRange: "May 22 - Jun 4, 2025",
        status: "Planned",
        deliverables: [
          "Website mockups", 
          "Branding guidelines", 
          "Content development", 
          "Initial prototype"
        ]
      },
      {
        name: "Sprint 5",
        subtitle: "Implementation & Testing",
        dateRange: "Jun 5 - Jun 18, 2025",
        status: "Planned",
        deliverables: [
          "Core functionality implementation", 
          "Content integration", 
          "User testing", 
          "Optimization"
        ]
      },
      {
        name: "Sprint 6",
        subtitle: "Final Delivery & Presentation",
        dateRange: "Jun 19 - Jun 27, 2025",
        status: "Planned",
        deliverables: [
          "Final testing", 
          "Client deliverable preparation", 
          "Documentation completion", 
          "Capstone presentation"
        ]
      }
    ];
    
    defaultSprints.forEach(sprint => {
      this.createSprint(sprint);
    });
    
    // Default quick nav items
    const defaultQuickNavItems = [
      {
        name: "Team",
        icon: "users",
        link: "/team"
      },
      {
        name: "Sprints",
        icon: "zap",
        link: "/project-sprints"
      },
      {
        name: "Retrospective",
        icon: "lightbulb",
        link: "/retrospective"
      },
      {
        name: "Client Project",
        icon: "briefcase",
        link: "/clients-project"
      }
    ];
    
    defaultQuickNavItems.forEach(item => {
      this.createQuickNavItem(item);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Page content methods
  async getPageContent(pageName: string): Promise<PageContent | undefined> {
    return this.pageContents.get(pageName);
  }

  async getAllPageContents(): Promise<PageContent[]> {
    return Array.from(this.pageContents.values());
  }

  async createPageContent(content: InsertPageContent): Promise<PageContent> {
    const pageContent: PageContent = {
      ...content,
      id: 0, // Placeholder, not really used
      lastUpdated: new Date(),
    };
    this.pageContents.set(content.pageName, pageContent);
    return pageContent;
  }

  async updatePageContent(pageName: string, content: Partial<InsertPageContent>): Promise<PageContent | undefined> {
    const existingContent = this.pageContents.get(pageName);
    if (!existingContent) return undefined;

    const updatedContent: PageContent = {
      ...existingContent,
      ...content,
      lastUpdated: new Date(),
      version: existingContent.version + 1
    };
    
    this.pageContents.set(pageName, updatedContent);
    return updatedContent;
  }

  // Team member methods
  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentId.teamMembers++;
    const teamMember: TeamMember = { ...member, id };
    this.teamMembers.set(id, teamMember);
    return teamMember;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const existingMember = this.teamMembers.get(id);
    if (!existingMember) return undefined;

    const updatedMember: TeamMember = { ...existingMember, ...member };
    this.teamMembers.set(id, updatedMember);
    return updatedMember;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    return this.teamMembers.delete(id);
  }

  // Sprint methods
  async getSprint(id: number): Promise<Sprint | undefined> {
    return this.sprints.get(id);
  }

  async getAllSprints(): Promise<Sprint[]> {
    return Array.from(this.sprints.values());
  }

  async createSprint(sprint: InsertSprint): Promise<Sprint> {
    const id = this.currentId.sprints++;
    const newSprint: Sprint = { ...sprint, id };
    this.sprints.set(id, newSprint);
    return newSprint;
  }

  async updateSprint(id: number, sprint: Partial<InsertSprint>): Promise<Sprint | undefined> {
    const existingSprint = this.sprints.get(id);
    if (!existingSprint) return undefined;

    const updatedSprint: Sprint = { ...existingSprint, ...sprint };
    this.sprints.set(id, updatedSprint);
    return updatedSprint;
  }

  async deleteSprint(id: number): Promise<boolean> {
    return this.sprints.delete(id);
  }

  // Quick nav item methods
  async getQuickNavItem(id: number): Promise<QuickNavItem | undefined> {
    return this.quickNavItems.get(id);
  }

  async getAllQuickNavItems(): Promise<QuickNavItem[]> {
    return Array.from(this.quickNavItems.values());
  }

  async createQuickNavItem(item: InsertQuickNavItem): Promise<QuickNavItem> {
    const id = this.currentId.quickNavItems++;
    const newItem: QuickNavItem = { ...item, id };
    this.quickNavItems.set(id, newItem);
    return newItem;
  }

  async updateQuickNavItem(id: number, item: Partial<InsertQuickNavItem>): Promise<QuickNavItem | undefined> {
    const existingItem = this.quickNavItems.get(id);
    if (!existingItem) return undefined;

    const updatedItem: QuickNavItem = { ...existingItem, ...item };
    this.quickNavItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteQuickNavItem(id: number): Promise<boolean> {
    return this.quickNavItems.delete(id);
  }
}

export const storage = new MemStorage();
