import { TopNavigation } from "./TopNavigation";
import { useAdminMode } from "@/hooks/use-admin-mode";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { adminMode } = useAdminMode();

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavigation />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        {adminMode && (
          <div className="mx-auto max-w-7xl m-4">
            <Alert variant="destructive" className="border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <AlertDescription className="text-orange-700">
                Edit mode is active. You can now edit content by clicking on sections.
              </AlertDescription>
            </Alert>
          </div>
        )}
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
