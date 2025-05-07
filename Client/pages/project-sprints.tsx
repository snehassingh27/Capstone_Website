import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { EditableCard } from "@/components/editable-card";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  fetchPageContent,
  updatePageContent,
  parsePageContent,
  type ProjectSprintsPageContent,
} from "@/lib/page-content";

export default function ProjectSprintsPage() {
  const { data: pageData, isLoading: isLoadingPage } = useQuery({
    queryKey: ["/api/pages/project-sprints"],
    queryFn: () => fetchPageContent("project-sprints"),
  });

  const { data: sprints, isLoading: isLoadingSprints } = useQuery({
    queryKey: ["/api/sprints"],
    queryFn: async () => {
      const res = await fetch("/api/sprints");
      if (!res.ok) throw new Error("Failed to fetch sprints");
      return res.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ content }: { content: string }) => {
      return updatePageContent("project-sprints", { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/pages/project-sprints"],
      });
    },
  });

  const handleSaveOverview = async (title: string, updatedContent: string) => {
    try {
      if (!pageData) throw new Error("Page data not available");
      const parsedContent = parsePageContent<ProjectSprintsPageContent>(
        pageData.content,
      );
      const updatedContentObj = {
        ...parsedContent,
        intro: {
          ...parsedContent.intro,
          content: updatedContent,
        },
      };

      await updateMutation.mutateAsync({
        content: JSON.stringify(updatedContentObj),
      });
    } catch (error) {
      console.error("Error updating content:", error);
      throw error;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "status-completed";
      case "in progress":
        return "status-in-progress";
      case "planned":
        return "status-planned";
      default:
        return "";
    }
  };

  const getRowClass = (status: string) => {
    if (status.toLowerCase() === "planned") {
      return "bg-gray-200";
    }
    return "";
  };

  if (isLoadingPage || isLoadingSprints) {
    return (
      <div>
        <div className="mb-6">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-20 w-full mb-8" />
            <Skeleton className="h-80 mb-8" />
            <Skeleton className="h-60" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pageData || !sprints) return <div>Error loading page content</div>;

  const content = parsePageContent<ProjectSprintsPageContent>(pageData.content);

  return (
    <div>
      <header className="mb-6">
        <h1 className="section-heading">{pageData.title}</h1>
      </header>

      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Sprint
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Key Deliverables
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sprints.map((sprint: any) => (
                  <tr key={sprint.id} className={getRowClass(sprint.status)}>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary">
                        {sprint.name}
                      </div>
                      <div className="text-xs text-secondary">
                        {sprint.subtitle}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm text-secondary">
                        {sprint.dateRange}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <Badge
                        className={cn(
                          "status-badge",
                          getStatusBadgeClass(sprint.status),
                        )}
                      >
                        {sprint.status.toLowerCase() === "completed" ? (
                          <span className="flex items-center">
                            <svg 
                              className="w-4 h-4 mr-1 text-green-600" 
                              fill="currentColor" 
                              viewBox="0 0 20 20" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                            Completed
                          </span>
                        ) : (
                          sprint.status
                        )}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <ul className="text-sm text-secondary list-disc list-inside">
                        {sprint.deliverables.map(
                          (deliverable: string, index: number) => (
                            <li key={index}>{deliverable}</li>
                          ),
                        )}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
