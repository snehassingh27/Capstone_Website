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
import SimplePdfViewer from "@/components/ui/SimplePdfViewer";

export default function ClientsProjectPage() {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['/api/pages/clients-project'],
    queryFn: () => fetchPageContent('clients-project')
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
      
      return updatePageContent('clients-project', { 
        content: JSON.stringify(updatedContent)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pages/clients-project'] });
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
        <h1 className="section-heading">{pageData.title}</h1>
        <p className="section-subheading">{pageData.subtitle}</p>
      </header>
      
      {/* Timeline sections - Bi-weekly progression */}
      <div className="mb-8 relative">

        <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-500">
          Our Journey With The Knots Studio
        </h2>
        
        {/* Week 1-2 - Creative version with animation and styling */}
        <div className="mb-8 relative">
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center z-10 animate-pulse shadow-lg">
            <div className="text-white font-bold text-center">
              <div className="text-2xl">1-2</div>
              <div className="text-xs -mt-1">WEEKS</div>
            </div>
          </div>
          
          <div className="border-2 border-blue-500 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-4 flex justify-between items-center">
              <div className="ml-16">
                <h3 className="text-xl font-semibold">Launch & Discovery</h3>
                <p className="text-blue-100 text-sm">April 9 - April 23, 2025</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Completed</span>
              </div>
            </div>
            
            <div className="p-8 bg-gradient-to-b from-white to-blue-50 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Documentation on the left */}
              <div className="transform transition-all duration-500 hover:scale-[1.02]">
                <h4 className="text-lg font-semibold mb-4 text-blue-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Project Documentation
                </h4>
                <div className="border rounded-lg p-4 bg-white shadow-md">
                  <div className="flex flex-col items-center">
                    <iframe 
                      src="/The_Knots_Studio_Company_Background.pdf" 
                      className="w-full h-[500px] border-0"
                      title="The Knots Studio Company Background"
                    ></iframe>
                    <a 
                      href="/The_Knots_Studio_Company_Background.pdf" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-colors shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Open PDF
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Client description on the right */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Kickoff & Client Discovery
                </h4>
                <div className="prose prose-blue max-w-none bg-white p-6 rounded-lg shadow-md">
                  <p className="relative pl-6 border-l-4 border-blue-300">
                    <span className="text-blue-600 absolute -left-3 top-0 text-6xl opacity-20">"</span>
                    We kicked off Sprint 1 by forming our team, defining roles, and most importantly—securing our project sponsor. 
                    After exploring multiple options, we partnered with <span className="font-semibold text-blue-700">The Knots Studio</span>, a creative gifting brand based in India.
                  </p>
                  <div className="mt-6 flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="mt-0">
                      Our early focus was all about understanding the client. We dove into their story, services, and goals, 
                      then outlined what's in scope (like building a clean, mobile-friendly website) and what's not 
                      (like handling logistics or social media).
                    </p>
                  </div>
                  
                  <div className="mt-4 flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="mt-0">
                      On the internal side, we set up our Jira board, launched our team website, created a detailed team charter, 
                      and assigned our first Scrum Master. Sprint 1 was all about laying the foundation—now we're ready to build.
                    </p>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      <span className="font-medium">Sprint 1 Complete</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Week 3-4 - Creative styling */}
        <div className="mb-8 relative">
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center z-10 shadow-lg">
            <div className="text-white font-bold text-center">
              <div className="text-2xl">3-4</div>
              <div className="text-xs -mt-1">WEEKS</div>
            </div>
          </div>
          
          <div className="border-2 border-amber-500 rounded-lg overflow-hidden shadow-lg relative">
            <div className="bg-gradient-to-r from-amber-700 to-amber-500 text-white px-6 py-4 flex justify-between items-center">
              <div className="ml-16">
                <h3 className="text-xl font-semibold">Scope & Design</h3>
                <p className="text-amber-100 text-sm">April 24 - May 7, 2025</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Completed</span>
              </div>
            </div>
            
            <div className="p-8 bg-gradient-to-b from-white to-amber-50 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Documentation on the left */}
              <div className="transform transition-all duration-500 hover:scale-[1.02]">
                <h4 className="text-lg font-semibold mb-4 text-amber-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Project Scoping Document
                </h4>
                <div className="border rounded-lg p-4 bg-white shadow-md">
                  <div className="flex flex-col items-center">
                    <iframe 
                      src="/XN_Student_Scoping_Form_Knots_Studio.pdf" 
                      className="w-full h-[500px] border-0"
                      title="XN Student Scoping Guidelines and Form"
                    ></iframe>
                    <a 
                      href="/XN_Student_Scoping_Form_Knots_Studio.pdf" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="mt-4 inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Open PDF
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Project scoping details on the right */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-amber-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  Branding & Scoping
                </h4>
                <div className="prose prose-amber max-w-none bg-white p-6 rounded-lg shadow-md">
                  <p>
                    During Sprint 2, we formalized our project scope through the Experiential Network (XN) Project Submission Form. 
                    We focused on The Knots Studio's unique gifting and knot-themed business identity.
                  </p>
                  
                  <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h5 className="text-lg font-semibold text-amber-800 mb-2">Key Deliverables:</h5>
                    <ul className="list-none space-y-2">
                      {[
                        "Mobile-responsive, SEO-optimized website",
                        "Visually appealing home page showcasing brand story",
                        "Service pages detailing gifting solutions",
                        "Visual gallery of past projects",
                        "Inquiry forms for lead generation",
                        "Client testimonials section",
                        "Documentation for future content updates"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-amber-100 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  

                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Week 5-6 */}
        <div className="mb-8 relative">
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-green-600 rounded-full flex items-center justify-center z-10 shadow-lg opacity-50">
            <div className="text-white font-bold text-center">
              <div className="text-2xl">5-6</div>
              <div className="text-xs -mt-1">WEEKS</div>
            </div>
          </div>
          
          <div className="border-2 border-green-400 border-dashed rounded-lg overflow-hidden shadow-lg relative">
            <div className="bg-gradient-to-r from-green-700 to-green-500 text-white px-6 py-4 flex justify-between items-center">
              <div className="ml-16">
                <h3 className="text-xl font-semibold">Wireframes & Development</h3>
                <p className="text-green-100 text-sm">May 8 - May 21, 2025</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium opacity-50">Coming Soon</span>
              </div>
            </div>
            
            <div className="p-6 bg-white flex justify-center items-center min-h-[200px]">
              <div className="text-center max-w-md">
                <div className="mb-4 w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-green-700 mb-2">Wireframing in Progress</h4>
                <p className="text-gray-600">Our team is currently working on website wireframes and initial code structure. Check back in May for updates!</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Week 7-8 */}
        <div className="mb-8 relative">
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center z-10 shadow-lg opacity-50">
            <div className="text-white font-bold text-center">
              <div className="text-2xl">7-8</div>
              <div className="text-xs -mt-1">WEEKS</div>
            </div>
          </div>
          
          <div className="border-2 border-purple-400 border-dashed rounded-lg overflow-hidden shadow-lg relative">
            <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white px-6 py-4 flex justify-between items-center">
              <div className="ml-16">
                <h3 className="text-xl font-semibold">Core Features</h3>
                <p className="text-purple-100 text-sm">May 22 - June 4, 2025</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium opacity-50">Scheduled</span>
              </div>
            </div>
            
            <div className="p-6 bg-white flex justify-center items-center min-h-[150px]">
              <div className="text-center">
                <div className="mb-3 w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">This phase will focus on implementing core website functionality and initial content.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Week 9-10 */}
        <div className="mb-8 relative">
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center z-10 shadow-lg opacity-50">
            <div className="text-white font-bold text-center">
              <div className="text-2xl">9-10</div>
              <div className="text-xs -mt-1">WEEKS</div>
            </div>
          </div>
          
          <div className="border-2 border-indigo-400 border-dashed rounded-lg overflow-hidden shadow-lg relative">
            <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white px-6 py-4 flex justify-between items-center">
              <div className="ml-16">
                <h3 className="text-xl font-semibold">Refinement & Testing</h3>
                <p className="text-indigo-100 text-sm">June 5 - June 18, 2025</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium opacity-50">Planned</span>
              </div>
            </div>
            
            <div className="p-6 bg-white flex justify-center items-center min-h-[150px]">
              <div className="text-center">
                <div className="mb-3 w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">User testing, refinement of designs, and final polish of all website features.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Week 11-12 */}
        <div className="relative">
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center z-10 shadow-lg opacity-50">
            <div className="text-white font-bold text-center">
              <div className="text-2xl">11-12</div>
              <div className="text-xs -mt-1">WEEKS</div>
            </div>
          </div>
          
          <div className="border-2 border-red-400 border-dashed rounded-lg overflow-hidden shadow-lg relative">
            <div className="bg-gradient-to-r from-red-700 to-red-500 text-white px-6 py-4 flex justify-between items-center">
              <div className="ml-16">
                <h3 className="text-xl font-semibold">Launch & Handover</h3>
                <p className="text-red-100 text-sm">June 19 - June 27, 2025</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium opacity-50">Final Sprint</span>
              </div>
            </div>
            
            <div className="p-6 bg-white flex justify-center items-center min-h-[150px]">
              <div className="text-center">
                <div className="mb-3 w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">Website launch, client training, and final project presentation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
}
