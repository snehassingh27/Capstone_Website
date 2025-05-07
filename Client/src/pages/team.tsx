import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { EditableCard } from "@/components/editable-card";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";
import { 
  fetchPageContent, 
  updatePageContent, 
  parsePageContent, 
  type TeamPageContent,
  type TeamCharterPageContent 
} from "@/lib/page-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText } from "lucide-react";
import { useState } from "react";

// Import team member images from the attached assets
import akratiImage from "@assets/image_1746340994921.png";
import deepthi_sharanya_image from "@assets/image_1746341243962.png";
import snehaImage from "@assets/image_1746340578257.png";
import sharanyaImage from "@assets/image_1746340879870.png";
import soumyadeepImage from "@assets/image_1746340927449.png";
import vismithaImage from "@assets/image_1746341187005.png";

export default function TeamPage() {
  const [showPdf, setShowPdf] = useState(false);
  
  const { data: pageData, isLoading: isLoadingPage } = useQuery({
    queryKey: ['/api/pages/team'],
    queryFn: () => fetchPageContent('team')
  });
  
  const { data: charterData, isLoading: isLoadingCharter } = useQuery({
    queryKey: ['/api/pages/team-charter'],
    queryFn: () => fetchPageContent('team-charter')
  });

  const updateMutation = useMutation({
    mutationFn: async ({ content }: { content: string }) => {
      return updatePageContent('team', { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pages/team'] });
    },
  });

  const handleSaveContent = async (title: string, updatedContent: string) => {
    try {
      if (!pageData) throw new Error("Page data not available");
      
      const parsedContent = parsePageContent<TeamPageContent>(pageData.content);
      const updatedContentObj = {
        ...parsedContent,
        intro: {
          ...parsedContent.intro,
          content: updatedContent
        }
      };
      
      await updateMutation.mutateAsync({ 
        content: JSON.stringify(updatedContentObj)
      });
    } catch (error) {
      console.error("Error updating content:", error);
      throw error;
    }
  };

  // States to track expanded member cards
  const [expandedMembers, setExpandedMembers] = useState<Record<string, boolean>>({});

  const toggleMemberExpand = (memberId: string) => {
    setExpandedMembers(prev => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  // Team member data based on attached images
  const teamMembers = [
    {
      id: "sneha",
      name: "Sneha Singh",
      role: "Project Manager",
      description: "Hi, I'm Sneha, a Project Manager who still believes in the power of good old-fashioned talking to people. Whether I'm building sprints in Jira, untangling Gantt charts, or herding cross-functional teams like a boss, I try to make tech projects feel a little less robotic and a lot more human.",
      skills: ["Agile", "Scrum", "Waterfall", "MS Project", "Jira"],
      image: snehaImage,
      fullBio: "Past life: Planned 1000+ events filled with glitter, glam, and the occasional WiFi crisis. Current life: Leading Agile, Scrum, and Waterfall projects with MS Project, Jira, and an unshakable belief that \"Done\" is the best word in the dictionary."
    },
    {
      id: "sharanya",
      name: "Sharanya",
      role: "Senior Project Coordinator",
      description: "Sharanya holds a Bachelor's degree in Industrial Engineering and brings over five years of experience from Amazon, where she specialized in stakeholder management, vendor and brand relations, strategic planning, and operational optimization.",
      skills: ["Stakeholder Management", "Strategic Planning", "Cross-functional Leadership"],
      image: sharanyaImage,
      fullBio: "Her expertise lies in driving cross-functional initiatives, streamlining processes, and leading teams toward impactful outcomes. Outside of work, Sharanya enjoys experimenting in the kitchen, is passionate about exploring new experiences, and has recently developed an interest in pickleball."
    },
    {
      id: "soumyadeep",
      name: "Soumyadeep Dubey",
      role: "Agile Specialist",
      description: "Hi, I'm Soumyadeep Dubey, a Master's student in Project Management at Northeastern University, focusing on Agile methodologies. I bring hands-on experience in process improvement, Lean Six Sigma, and technical project coordination, with a background in mechanical engineering.",
      skills: ["Agile", "Lean Six Sigma", "Process Improvement", "MS Project", "JIRA"],
      image: soumyadeepImage,
      fullBio: "At Entegris, I'm driving safety, standardization, and efficiency initiatives. Previously, I led CI and production optimization projects at Pratik Packers. I'm skilled in tools like MS Project, JIRA, Tableau, and hold certifications in Project Management and AI."
    },
    {
      id: "akrati",
      name: "Akrati Tripathi",
      role: "Project Manager",
      description: "Hi, I'm Akrati Tripathi — a biotechnology enthusiast turned project management professional with a passion for solving real-world problems. My background blends scientific curiosity with strategic thinking, allowing me to approach challenges with both precision and creativity.",
      skills: ["Project Management", "Strategic Thinking", "Collaboration"],
      image: akratiImage,
      fullBio: "I thrive in collaborative environments, love building purposeful solutions, and bring positive energy and adaptability to every project I'm a part of."
    },
    {
      id: "vismitha",
      name: "Vismitha Vangapally",
      role: "Technical Project Manager",
      description: "I am Vismitha Vangapally, a results-driven Project Management professional with a Bachelor's degree in Information Technology and currently pursuing a Master's in Project Management. I bring a unique blend of technical knowledge and strategic thinking.",
      skills: ["Scrum", "Stakeholder Communication", "Technical Project Management"],
      image: vismithaImage,
      fullBio: "With hands-on experience in project coordination, stakeholder communication, and Agile methodologies, I've contributed to successful project execution by managing schedules, facilitating meetings, and supporting risk management efforts. My background includes working cross-functionally with teams to drive collaboration, remove blockers, and maintain clear documentation—ensuring project goals are met on time and within scope."
    },
    {
      id: "deepthi",
      name: "Deepthi Sri Veggalam",
      role: "Construction Management Specialist",
      description: "I am Deepthi Sri Veggalam, a graduate student pursuing a Master's in Project Management with a concentration in Construction Management at Northeastern University. With a professional background as an Architectural Project Manager, I bring hands-on experience in end-to-end project execution.",
      skills: ["Construction Management", "Agile", "MS Project", "Lean Six Sigma"],
      image: deepthi_sharanya_image,
      fullBio: "My work has spanned commercial, residential, and infrastructure projects, with a strong focus on delivering quality outcomes within tight timelines and budgets. I am skilled in Agile methodologies and proficient in tools like MS Project, Primavera P6, and BIM 360, with certifications in construction scheduling, estimating, and Lean Six Sigma. Outside my professional profile, I'm a passionate artist and a music-driven individual who finds creativity and inspiration through painting and rhythm."
    }
  ];

  if (isLoadingPage || isLoadingCharter) {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pageData || !charterData) return <div>Error loading page content</div>;

  const content = parsePageContent<TeamPageContent>(pageData.content);
  const charterContent = parsePageContent<TeamCharterPageContent>(charterData.content);

  return (
    <div>
      <header className="mb-8">
        <h1 className="section-heading">Meet Project Pilots</h1>
        <p className="text-lg text-foreground mb-6">
          Our diverse team brings together expertise in project management, technology, and business analysis to deliver exceptional results for The Knots Studio.
        </p>
        
        {/* Removed EditableCard to avoid duplicate "Meet Project Pilots" title */}
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
        {teamMembers.map((member) => {
          const isExpanded = expandedMembers[member.id] || false;
          
          return (
            <Card key={member.id} className="border border-gray-200 shadow-md overflow-hidden transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5">
                    <div className="w-full h-full min-h-[200px] bg-gradient-to-b from-primary/5 to-primary/10 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="w-full md:w-3/5 p-5">
                    <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
                    <p className="text-secondary font-medium text-sm mb-3">{member.role}</p>
                    
                    <p className="text-foreground text-sm mb-4 line-clamp-3">
                      {member.description}
                    </p>
                    
                    {isExpanded && (
                      <div className="mt-3 text-foreground text-sm">
                        <p>{member.fullBio}</p>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-2 mb-2">
                      {member.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleMemberExpand(member.id)}
                      className="mt-2 text-secondary hover:text-primary hover:bg-primary/5 transition-colors text-xs p-0 h-auto"
                    >
                      {isExpanded ? "Show Less" : "Know More"} <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Team Charter Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4 pb-2 border-b border-gray-200">Team Charter</h2>
        <p className="text-lg text-foreground mb-6">
          {charterContent.intro.content}
        </p>
        
        <div className="mb-6 flex items-center space-x-3">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-sm border-primary/10">
            <h3 className="text-xl font-bold text-primary mb-3">{charterContent.mission.title}</h3>
            <p className="text-gray-700">{charterContent.mission.content}</p>
          </Card>
          
          <Card className="p-6 shadow-sm border-primary/10">
            <h3 className="text-xl font-bold text-primary mb-3">{charterContent.values.title}</h3>
            <div className="space-y-4">
              {charterContent.values.items.map((item, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-secondary">{item.title}</h4>
                  <p className="text-gray-700">{item.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <div className="mb-8">
          <Card className="p-6 shadow-sm border-primary/10">
            <h3 className="text-xl font-bold text-primary mb-3">{charterContent.agreements.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-secondary mb-2">{charterContent.agreements.communication.title}</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {charterContent.agreements.communication.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-secondary mb-2">{charterContent.agreements.decisions.title}</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {charterContent.agreements.decisions.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mb-6">
          <Card className="p-6 shadow-sm border-primary/10">
            <h3 className="text-xl font-bold text-primary mb-3">{charterContent.conflict.title}</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {charterContent.conflict.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
        
        <Card className="p-6 shadow-sm border-primary/10 bg-primary/5">
          <h3 className="text-xl font-bold text-primary mb-3">{charterContent.signatures.title}</h3>
          <p className="text-gray-700 italic">{charterContent.signatures.content}</p>
        </Card>
      </div>
    </div>
  );
}
