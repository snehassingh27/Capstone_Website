import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { EditableCard } from "@/components/editable-card";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";
import SimplePdfViewer from "@/components/ui/SimplePdfViewer";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useState } from "react";
import { 
  fetchPageContent, 
  updatePageContent, 
  parsePageContent, 
  type TeamCharterPageContent 
} from "@/lib/page-content";

export default function TeamCharterPage() {
  const [showPdf, setShowPdf] = useState(false);
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['/api/pages/team-charter'],
    queryFn: () => fetchPageContent('team-charter')
  });

  const updateMutation = useMutation({
    mutationFn: async ({ 
      section, 
      content 
    }: { 
      section: string; 
      content: string 
    }) => {
      if (!pageData) throw new Error("Page data not available");
      const parsedContent = parsePageContent<TeamCharterPageContent>(pageData.content);
      let updatedContent = { ...parsedContent };

      switch (section) {
        case 'intro':
          updatedContent.intro.content = content;
          break;
        case 'mission':
          updatedContent.mission.content = content;
          break;
        case 'signatures':
          updatedContent.signatures.content = content;
          break;
        default:
          throw new Error(`Unknown section: ${section}`);
      }

      return updatePageContent('team-charter', { 
        content: JSON.stringify(updatedContent)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pages/team-charter'] });
    },
  });

  const handleSaveIntro = async (_: string, content: string) => {
    await updateMutation.mutateAsync({ section: 'intro', content });
  };

  const handleSaveMission = async (_: string, content: string) => {
    await updateMutation.mutateAsync({ section: 'mission', content });
  };

  const handleSaveSignatures = async (_: string, content: string) => {
    await updateMutation.mutateAsync({ section: 'signatures', content });
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
            <div className="space-y-6">
              <Skeleton className="h-40" />
              <Skeleton className="h-80" />
              <Skeleton className="h-40" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pageData) return <div>Error loading page content</div>;

  const content = parsePageContent<TeamCharterPageContent>(pageData.content);

  return (
    <div>
      <header className="mb-6">
        <h1 className="section-heading">{pageData.title}</h1>
        <p className="section-subheading">{pageData.subtitle}</p>
        <div className="mb-4 flex items-center space-x-3">
          <Button 
            onClick={() => setShowPdf(!showPdf)}
            className={`inline-flex items-center ${showPdf ? 'bg-secondary' : 'bg-primary'} text-white hover:bg-primary/90 transition-colors`}
          >
            <FileText className="h-5 w-5 mr-2" />
            {showPdf ? 'Hide PDF Viewer' : 'View Team Charter PDF'}
          </Button>
          
          <a 
            href="/api/documents/team-charter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>
        </div>
        
        {showPdf && (
          <div className="mb-8 mt-6">
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <iframe 
                    src="/api/documents/team-charter" 
                    className="w-full h-[600px] border-0"
                    title="Team Charter PDF"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </header>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#030453]">Project Pilots – The KnotStudio Capstone Team</h2>
          <div className="text-secondary mb-6 max-w-none">
            <p className="text-lg leading-relaxed">The Project Pilots are a team of six graduate students from Northeastern University's Project Management program, collaborating to deliver a real-world capstone project for The KnotStudio. This charter defines our shared purpose, working structure, communication practices, and guiding principles to ensure successful project delivery.</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-[#030453]">Purpose</h2>
            <div className="text-secondary mb-6 max-w-none">
              <p className="text-lg leading-relaxed">Our objective is to plan, manage, and execute a high-quality project using project management tools and methodologies. We are committed to aligning client expectations with academic outcomes through Agile, Scrum, and Waterfall practices.</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-[#030453]">{content.values.title}</h2>
            <ul className="space-y-3 text-secondary text-lg">
              {content.values.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent font-bold mr-2">•</span>
                  <div>
                    <strong>{item.title}:</strong> {item.content}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-[#030453]">{content.agreements.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-secondary mb-2">{content.agreements.communication.title}</h4>
                <ul className="space-y-2 text-secondary text-lg">
                  {content.agreements.communication.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-secondary mb-2">{content.agreements.decisions.title}</h4>
                <ul className="space-y-2 text-secondary text-lg">
                  {content.agreements.decisions.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-[#030453]">{content.conflict.title}</h2>
            <ol className="space-y-3 text-secondary text-lg list-decimal list-inside">
              {content.conflict.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-bold mb-4 text-[#030453]">{content.signatures.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {[
                { name: 'Soumyadeep Dubey', signature: 'Soumyadeep Dubey' },
                { name: 'Sharanya Manchepally', signature: 'S. Manchepally' },
                { name: 'Sneha Singh', signature: 'Sneha Singh' },
                { name: 'Vismitha Vangapally', signature: 'V. Vangapally' },
                { name: 'Akrati Tripathi', signature: 'Akrati T.' },
                { name: 'Deepthi Sri Veggalam', signature: 'D.S. Veggalam' }
              ].map(({ name, signature }, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                  <div className="flex flex-col">
                    <p className="font-bold text-[#030453]">{name}</p>
                    <div className="mt-3 h-8 italic font-medium text-secondary" style={{ fontFamily: 'cursive' }}>
                      {signature}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Signed: April 22, 2025</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
