import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { EditableCard } from "@/components/editable-card";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";
import { 
  fetchPageContent, 
  updatePageContent, 
  parsePageContent,
  type BasicPageContent 
} from "@/lib/page-content";
import jiraBoard from "../assets/images/jira-board.png";
import jiraMascot from "../assets/images/jira-mascot.png";

export default function JiraPage() {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['/api/pages/jira'],
    queryFn: () => fetchPageContent('jira')
  });

  const updateMutation = useMutation({
    mutationFn: async ({ field, content }: { field: string, content: string }) => {
      if (!pageData) throw new Error("Page data not available");
      const parsedContent = parsePageContent<BasicPageContent>(pageData.content);
      let updatedContent: BasicPageContent;
      
      switch (field) {
        case 'intro':
          updatedContent = {
            ...parsedContent,
            intro: {
              ...parsedContent.intro,
              content
            }
          };
          break;
        case 'placeholder':
          updatedContent = {
            ...parsedContent,
            placeholder: content
          };
          break;
        default:
          throw new Error(`Unknown field: ${field}`);
      }
      
      return updatePageContent('jira', { 
        content: JSON.stringify(updatedContent)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pages/jira'] });
    },
  });

  const handleSaveIntro = async (_: string, content: string) => {
    await updateMutation.mutateAsync({ field: 'intro', content });
  };

  const handleSavePlaceholder = async (_: string, content: string) => {
    await updateMutation.mutateAsync({ field: 'placeholder', content });
  };

  if (isLoading) {
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
            <Skeleton className="h-40" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pageData) return <div>Error loading page content</div>;

  const content = parsePageContent<BasicPageContent>(pageData.content);

  return (
    <div>
      <header className="mb-6">
        <h1 className="section-heading">Jira Integration</h1>
      </header>
      
      {/* Jira Mascot Banner - Full width at the top */}
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <img 
          src={jiraMascot} 
          alt="Jira Mascot" 
          className="w-full h-auto"
        />
      </div>
      
      <Card>
        <CardContent className="p-6">
          
          {/* Jira Board with text to the left and image to the right */}
          <div className="flex flex-col items-center justify-center gap-6 mb-8">
            <a 
              href="https://sneha-singh.atlassian.net/jira/software/projects/PP/boards/2?atlOrigin=eyJpIjoiZTQwNGZjNmNlMTJiNDRjM2FhODFmMTc5Zjg3Y2IyYjIiLCJwIjoiaiJ9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-3xl font-bold mb-4 flex items-center underline hover:text-[#2200CC]"
              style={{ color: "#2200CC" }}
            >
              Jira Board Link
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <div className="w-full max-w-2xl border rounded-lg overflow-hidden shadow-md p-3 bg-white">
              <a 
                href="https://sneha-singh.atlassian.net/jira/software/projects/PP/boards/2?atlOrigin=eyJpIjoiZTQwNGZjNmNlMTJiNDRjM2FhODFmMTc5Zjg3Y2IyYjIiLCJwIjoiaiJ9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <img 
                  src={jiraBoard} 
                  alt="Jira Project Board showing sprint tasks" 
                  className="w-full h-auto rounded hover:opacity-90 transition-opacity"
                  style={{ maxHeight: "300px", objectFit: "contain" }}
                />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
