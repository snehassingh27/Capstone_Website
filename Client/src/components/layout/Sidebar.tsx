import { Link, useLocation } from "wouter";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { 
  Home,
  Users,
  FileText,
  Zap,
  Lightbulb,
  UsersRound,
  CheckSquare,
  Briefcase,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminMode } from "@/hooks/use-admin-mode";

interface SidebarProps {
  className?: string;
}

type NavItem = {
  name: string;
  href: string;
  icon: JSX.Element;
};

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  const { adminMode, toggleAdminMode } = useAdminMode();

  const navItems: NavItem[] = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Team", href: "/team", icon: <Users className="h-5 w-5" /> },
    { name: "Team Charter", href: "/team-charter", icon: <FileText className="h-5 w-5" /> },
    { name: "Project Sprints", href: "/project-sprints", icon: <Zap className="h-5 w-5" /> },
    { name: "Retrospective", href: "/retrospective", icon: <Lightbulb className="h-5 w-5" /> },
    { name: "Collaboration", href: "/collaboration", icon: <UsersRound className="h-5 w-5" /> },
    { name: "Jira", href: "/jira", icon: <CheckSquare className="h-5 w-5" /> },
    { name: "Client's Project", href: "/clients-project", icon: <Briefcase className="h-5 w-5" /> },
  ];

  return (
    <aside className={cn("bg-primary text-white w-64 min-h-screen flex-shrink-0 flex flex-col", className)}>
      <div className="p-4 border-b border-gray-700">
        <Logo />
      </div>
      
      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <a 
                  className={cn(
                    "sidebar-link",
                    location === item.href && "active"
                  )}
                >
                  <span className="sidebar-icon">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700 mt-auto">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mt-1">12-Week Capstone Project</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleAdminMode}
            title={adminMode ? "Disable editing mode" : "Enable editing mode"}
          >
            <Settings className={cn(
              "h-5 w-5 text-gray-400",
              adminMode && "text-accent"
            )} />
          </Button>
        </div>
      </div>
    </aside>
  );
}
