import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { MainLayout } from "@/components/layout/MainLayout";
import HomePage from "@/pages/home";
import TeamPage from "@/pages/team";
import ProjectSprints from "@/pages/project-sprints";
import Retrospective from "@/pages/retrospective";
import Collaboration from "@/pages/collaboration";
import StatusReport from "@/pages/status-report";
import Jira from "@/pages/jira";
import ClientsProject from "@/pages/clients-project";
import EditContent from "@/pages/edit-content";
import { AdminModeProvider } from "@/hooks/use-admin-mode";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/team" component={TeamPage} />
      <Route path="/project-sprints" component={ProjectSprints} />
      <Route path="/collaboration" component={Collaboration} />
      <Route path="/retrospective" component={Retrospective} />
      <Route path="/status-report" component={StatusReport} />
      <Route path="/jira" component={Jira} />
      <Route path="/clients-project" component={ClientsProject} />
      <Route path="/admin/edit-content" component={EditContent} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AdminModeProvider>
      <TooltipProvider>
        <MainLayout>
          <Router />
        </MainLayout>
        <Toaster />
      </TooltipProvider>
    </AdminModeProvider>
  );
}

export default App;
