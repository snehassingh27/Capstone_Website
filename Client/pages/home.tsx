import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { EditableCard } from "@/components/editable-card";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";
import { Calendar, Clock } from "lucide-react";
import { BannerImage } from "@/components/ui/BannerImage";
import { 
  fetchPageContent, 
  updatePageContent, 
  parsePageContent, 
  type HomePageContent 
} from "@/lib/page-content";

export default function HomePage() {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['/api/pages/home'],
    queryFn: () => fetchPageContent('home')
  });

  const updateMutation = useMutation({
    mutationFn: async ({ field, content }: { field: string, content: string }) => {
      if (!pageData) throw new Error("Page data not loaded");
      
      const parsedContent = parsePageContent<HomePageContent>(pageData.content);
      let updatedContent = {...parsedContent};
      
      if (field === 'intro') {
        updatedContent.intro.content = content;
      } else if (field === 'projectScope') {
        // Initialize projectScope if it doesn't exist
        if (!updatedContent.projectScope) {
          updatedContent.projectScope = {
            title: "Project Scope: Scope of Work",
            content: ""
          };
        }
        updatedContent.projectScope.content = content;
      }
      
      return updatePageContent('home', { 
        content: JSON.stringify(updatedContent)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pages/home'] });
    },
  });

  if (isLoading) {
    return (
      <div>
        <div className="mb-6">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-64 w-full mb-8" />
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-20 w-full mb-8" />
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pageData) return <div>Error loading page content</div>;

  const content = parsePageContent<HomePageContent>(pageData.content);

  const handleSaveIntro = async (_: string, updatedContent: string) => {
    await updateMutation.mutateAsync({ field: 'intro', content: updatedContent });
  };
  
  const handleSaveProjectScope = async (_: string, updatedContent: string) => {
    await updateMutation.mutateAsync({ field: 'projectScope', content: updatedContent });
  };

  // Project runs from April 9th for 12 weeks
  const projectStartDate = new Date(2025, 3, 9); // April 9, 2025
  const projectEndDate = new Date(2025, 5, 27);  // June 27, 2025 (end date)
  const today = new Date(2025, 4, 4);            // Simulated "today" date of May 4, 2025
  
  // Calculate how many weeks have passed
  const weeksPassed = Math.floor((today.getTime() - projectStartDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const totalWeeks = 12;
  const progress = Math.min(Math.round((weeksPassed / totalWeeks) * 100), 100);

  // Bi-weekly timeline
  const biweeklyTimeline = [
    { weeks: "Week 1-2", dates: "Apr 9 - Apr 23, 2025", task: "Project planning and research" },
    { weeks: "Week 3-4", dates: "Apr 24 - May 7, 2025", task: "Design and foundation implementation" },
    { weeks: "Week 5-6", dates: "May 8 - May 21, 2025", task: "Core functionality development" },
    { weeks: "Week 7-8", dates: "May 22 - Jun 4, 2025", task: "Feature enhancement and testing" },
    { weeks: "Week 9-10", dates: "Jun 5 - Jun 18, 2025", task: "Quality assurance and validation" },
    { weeks: "Week 11-12", dates: "Jun 19 - Jun 27, 2025", task: "Final presentation preparation" },
  ];

  // Determine current period
  const currentPeriodIndex = Math.floor(weeksPassed / 2);
  const isInProgress = currentPeriodIndex < biweeklyTimeline.length;

  return (
    <div>
      {/* Full-width hero banner with subtle animation */}
      <div className="mb-10 overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-xl">
        <BannerImage />
      </div>
      
      <Card className="border-0 shadow-md bg-gradient-to-br from-white to-blue-50/40">
        <CardContent className="p-6 sm:p-8">
          
          {/* Inspiring Team Slogan */}
          <div className="mb-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "hsl(var(--project-heading))" }}>Together We Innovate, Together We Excel</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Our capstone project unites our diverse skills in a collaborative journey where 
              creativity meets technical excellence.
            </p>
          </div>
          
          {/* Editable Project Scope */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <h2 className="project-heading">Project Scope: Scope of Work</h2>
            </div>
            <div className="p-5 rounded-lg border border-blue-100 bg-blue-50/40 shadow-sm">
              <p className="project-text">
                {content.projectScope?.content || "We're partnering with The Knots Studio, a heart-first, style-savvy gifting startup from Bangalore- to design a clean, modern business website that reflects the brand's charm and purpose. With a strong offline presence and a flair for curating thoughtful bulk gifts, The Knots Studio is ready to step confidently into the digital space. Our scope includes crafting a mobile-friendly, SEO-optimized website that showcases their story, services, and stunning gifting galleries, while making it super easy for potential clients to discover, connect, and fall in love with their offerings. This platform won't just look good, it'll work hard behind the scenes to support lead generation, trust-building, and long-term growth."}
              </p>
              {content.projectScope && <button 
                onClick={() => handleSaveProjectScope("", content.projectScope?.content || "")}
                className="text-xs text-primary hover:text-secondary transition-colors duration-200 mt-3 float-right"
              >
                Edit
              </button>}
            </div>
          </div>
          
          {/* Project Timeline */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 mr-3" style={{ color: "hsl(var(--project-heading))" }} />
              <h2 className="project-heading">Project Timeline</h2>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6 shadow-sm">
              <div className="flex justify-between mb-2 text-sm text-blue-700">
                <span>Project Start: April 9, 2025</span>
                <span>Project End: June 27, 2025</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full shadow-inner" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-center text-sm font-medium text-blue-700">
                Week {weeksPassed+1} of 12 ({progress}% Complete)
              </div>
            </div>
            
            <div className="space-y-4">
              {biweeklyTimeline.map((period, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border transform transition-all duration-300 hover:shadow-md ${
                    index === currentPeriodIndex 
                      ? 'bg-secondary/20 border-secondary/30' 
                      : index < currentPeriodIndex 
                        ? 'bg-highlight/30 border-highlight/40' 
                        : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`rounded-full w-7 h-7 flex items-center justify-center mr-3 shadow-sm ${
                      index === currentPeriodIndex 
                        ? 'bg-secondary text-white' 
                        : index < currentPeriodIndex 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      {index < currentPeriodIndex ? '✓' : index === currentPeriodIndex ? '→' : (index + 1)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-primary">{period.weeks}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {period.dates}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-1">{period.task}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Editable Project Overview */}
          <div className="mt-10">
            <div className="flex items-center mb-4">
              <h2 className="project-heading">Project Overview</h2>
            </div>
            <div className="p-5 rounded-lg border border-blue-100 bg-blue-50/40 shadow-sm">
              <p className="project-text">
                {content.intro?.content}
              </p>
              <button 
                onClick={() => handleSaveIntro("", content.intro.content || "")}
                className="text-xs text-primary hover:text-secondary transition-colors duration-200 mt-3 float-right"
              >
                Edit
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
