import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";
import { 
  fetchPageContent, 
  updatePageContent, 
  parsePageContent,
  type BasicPageContent 
} from "@/lib/page-content";
import { cn } from "@/lib/utils";
import knotStudioMeeting from "../assets/images/knot-studio-meeting.png";
import dssMeeting from "../assets/images/dss-meeting.png";

export default function CollaborationPage() {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['/api/pages/collaboration'],
    queryFn: () => fetchPageContent('collaboration')
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
        default:
          throw new Error(`Unknown field: ${field}`);
      }
      
      return updatePageContent('collaboration', { 
        content: JSON.stringify(updatedContent)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pages/collaboration'] });
    },
  });

  const handleSaveIntro = async (_: string, content: string) => {
    await updateMutation.mutateAsync({ field: 'intro', content });
  };

  // Removed handleSavePlaceholder as we no longer need it

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

  const content = parsePageContent<BasicPageContent>(pageData.content); // Only using intro now

  return (
    <div>
      <header className="mb-6">
        <h1 className="section-heading">{pageData.title}</h1>
      </header>
      
      <Card>
        <CardContent className="p-6">
          
          <div className="mb-8">
            <div className="flex items-center mb-6 bg-gradient-to-r from-indigo-50 to-transparent p-3 rounded-lg border-l-4 border-indigo-500">
              <div className="bg-indigo-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary">Sponsor Selection Meetings</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* KnotStudio Meeting Section */}
              <div className="border rounded-lg overflow-hidden shadow-md">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b">
                  <h3 className="text-lg font-medium text-primary">The Knot Studio (Selected)</h3>
                </div>
                <div className="p-4">
                  <div className="mb-4 rounded overflow-hidden border">
                    <img 
                      src={knotStudioMeeting} 
                      alt="Meeting with Aarthy Balachandran from The Knot Studio" 
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Meeting with Aarthy Balachandran, Founder</p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-primary mb-2">Meeting Outcome</h4>
                    <p className="text-secondary mb-3">
                      After productive discussions, we chose to collaborate with The Knot Studio for our capstone project. Their gifting startup 
                      aligned perfectly with our team's skills and offered a compelling challenge to design a clean, modern, 
                      mobile-friendly, and SEO-optimized business website.
                    </p>
                    <p className="text-secondary">
                      Aarthy Balachandran, the founder, provided clear objectives and remained accessible for ongoing collaboration,
                      making this partnership ideal for our capstone project goals.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Dassault Systems Meeting Section */}
              <div className="border rounded-lg overflow-hidden shadow-md">
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 border-b">
                  <h3 className="text-lg font-medium text-primary">Dassault Systems (Not Selected)</h3>
                </div>
                <div className="p-4">
                  <div className="mb-4 rounded overflow-hidden border">
                    <img 
                      src={dssMeeting} 
                      alt="Meeting with Dassault Systems team" 
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Team meeting with DSS representatives</p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-primary mb-2">Company Overview</h4>
                    <p className="text-secondary mb-3">
                      Dassault Systems is a leading architectural design firm specializing in computer-aided design and drafting solutions, 
                      offering comprehensive architectural visualization and planning services.
                    </p>
                    <h4 className="font-semibold text-primary mb-2">Decision Rationale</h4>
                    <p className="text-secondary">
                      After thorough discussion with the team, we decided not to proceed with DSS as our primary sponsor. 
                      While the company offered promising opportunities, several of their projects were confidential and limited 
                      in the details they could share, which made it challenging to align with our learning objectives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Collaboration section removed as requested */}
        </CardContent>
      </Card>
    </div>
  );
}
