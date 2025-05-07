import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ChevronRight } from "lucide-react";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import reportSummaryImage from "@assets/image_1746549756081.png";

// Bi-weekly status report data structure
interface StatusReportWeek {
  id: string;
  title: string;
  period: string;
  accomplishments: string[];
  challenges: string[];
  upcomingTasks: string[];
  notes?: string;
  reportPdf?: boolean;
}

export default function StatusReportPage() {
  const [selectedReport, setSelectedReport] = useState("week3-4");

  // Status reports for weeks 3-12
  const statusReports: StatusReportWeek[] = [
    {
      id: "week3-4",
      title: "Week 3 & 4: Project Initiation",
      period: "February 5 - February 18, 2025",
      accomplishments: [],
      challenges: [],
      upcomingTasks: [],
      reportPdf: true
    },
    {
      id: "week5-6",
      title: "Week 5 & 6: Requirements Gathering",
      period: "February 19 - March 4, 2025",
      accomplishments: [
        "Completed detailed requirements documentation",
        "Conducted competitive analysis of similar websites",
        "Created initial wireframes for key pages",
        "Established technical requirements and constraints",
        "Conducted second client meeting with requirements review"
      ],
      challenges: [
        "Balancing client expectations with project timeline",
        "Prioritizing features for initial release",
        "Technical limitations requiring creative solutions"
      ],
      upcomingTasks: [
        "Finalize project scope document",
        "Begin sprint planning for development phase",
        "Create detailed design mockups",
        "Establish testing protocols and success criteria"
      ]
    },
    {
      id: "week7-8",
      title: "Week 7 & 8: Design & Planning",
      period: "March 5 - March 18, 2025",
      accomplishments: [
        "Finalized design mockups for all primary pages",
        "Created content strategy and initial content plan",
        "Established technical architecture and database schema",
        "Completed first sprint planning session",
        "Presented design concepts to client with positive feedback"
      ],
      challenges: [
        "Integrating client feedback while maintaining design consistency",
        "Resource allocation for specialized design tasks",
        "Technical decisions around hosting and deployment"
      ],
      upcomingTasks: [
        "Begin development sprints",
        "Finalize content requirements and gather assets from client",
        "Set up development environment and CI/CD pipeline",
        "Create detailed test cases for first milestone features"
      ]
    },
    {
      id: "week9-10",
      title: "Week 9 & 10: Development Sprint 1",
      period: "March 19 - April 1, 2025",
      accomplishments: [
        "Completed development of core site structure and navigation",
        "Implemented responsive layouts for all planned pages",
        "Created database connections and basic API endpoints",
        "Conducted first internal demo with team feedback",
        "Established testing environment for QA process"
      ],
      challenges: [
        "Technical issues with responsive design on multiple device sizes",
        "Integration challenges with content management system",
        "Performance optimization for image-heavy pages"
      ],
      upcomingTasks: [
        "Continue development of feature set per sprint plan",
        "Begin integration testing for completed components",
        "Prepare for mid-project client review",
        "Update project timeline based on current progress"
      ]
    },
    {
      id: "week11-12",
      title: "Week 11 & 12: Development & Testing",
      period: "April 2 - April 15, 2025",
      accomplishments: [
        "Completed implementation of all core features",
        "Conducted comprehensive testing across devices and browsers",
        "Implemented feedback from mid-project client review",
        "Optimized site performance and accessibility",
        "Created user documentation and site maintenance guide"
      ],
      challenges: [
        "Late-stage design change requests requiring rapid adaptation",
        "Cross-browser compatibility issues requiring additional development",
        "Ensuring consistent performance across all page types"
      ],
      upcomingTasks: [
        "Prepare for final client presentation",
        "Conduct final QA testing and bug fixes",
        "Create deployment plan for production environment",
        "Develop training materials for client team",
        "Complete project documentation and handover materials"
      ],
      notes: "Final two weeks before project completion - focus on quality assurance and client handover preparations."
    }
  ];
  
  // Find the selected report
  const currentReport = statusReports.find(report => report.id === selectedReport) || statusReports[0];

  return (
    <div>
      <header className="mb-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="section-heading mb-1 text-blue-900">Bi-Weekly Status Reports</h1>
            <p className="text-blue-700 mb-0">
              Tracking project progress and milestones in two-week increments
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center bg-white px-4 py-2 rounded-md border border-blue-200 shadow-sm">
              <Calendar className="text-blue-500 mr-2 h-5 w-5" />
              <span className="text-blue-800 font-medium">Spring 2025</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mb-8 relative">
        <div className="w-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-lg p-4">
          <div className="flex justify-center items-center overflow-x-auto py-6 no-scrollbar">
            <div className="flex space-x-6 md:space-x-8">
              {statusReports.map((report, index) => (
                <div 
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`relative cursor-pointer group transition-all duration-300 ease-in-out
                    ${selectedReport === report.id 
                      ? 'scale-110 z-10' 
                      : 'opacity-80 hover:opacity-100 hover:scale-105'}`}
                >
                  <div className={`px-4 py-3 rounded-lg shadow-lg bg-gradient-to-br 
                    ${selectedReport === report.id 
                      ? 'from-blue-600 to-blue-900 text-white shadow-blue-500/50' 
                      : 'from-blue-100 to-blue-300 text-blue-900 shadow-blue-200/50 group-hover:from-blue-200 group-hover:to-blue-400'}`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center">
                        <Calendar className={`w-4 h-4 mr-1 ${selectedReport === report.id ? 'text-white' : 'text-blue-700 group-hover:text-blue-800'}`} />
                        <span className="font-bold text-xs md:text-sm">WEEK{report.id.substring(4).replace('-', ' & ')}</span>
                      </div>
                      {selectedReport === report.id && (
                        <div className="h-1 w-10 bg-white rounded-full mt-1 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  {index < statusReports.length - 1 && (
                    <ChevronRight className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Tabs value={selectedReport} onValueChange={setSelectedReport} className="w-full">
        <div className="hidden">
          <TabsList className="hidden">
            {statusReports.map((report) => (
              <TabsTrigger
                key={report.id}
                value={report.id}
              >
                {report.id}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {statusReports.map((report) => (
          <TabsContent key={report.id} value={report.id} className="m-0">
            <Card className="border-primary/10">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-primary">{report.title}</h2>
                  <p className="text-secondary italic">{report.period}</p>
                </div>

                {report.id === "week3-4" ? (
                  <div className="w-full mb-4">
                    {/* No content for Week 3-4 */}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Accomplishments
                      </h3>
                      <ul className="list-disc list-inside space-y-2">
                        {report.accomplishments.map((item, i) => (
                          <li key={i} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <h3 className="text-lg font-semibold text-amber-700 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Challenges
                      </h3>
                      <ul className="list-disc list-inside space-y-2">
                        {report.challenges.map((item, i) => (
                          <li key={i} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Upcoming Tasks
                      </h3>
                      <ul className="list-disc list-inside space-y-2">
                        {report.upcomingTasks.map((item, i) => (
                          <li key={i} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {report.notes && report.id !== "week3-4" && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Notes</h3>
                    <p className="text-gray-600">{report.notes}</p>
                  </div>
                )}
                
                {report.reportPdf && (
                  <div className="mt-6">
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-700 mr-4">Formal Status Report</h3>
                      <a 
                        href={`/api/documents/status-report-${report.id}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Full PDF Report
                      </a>
                    </div>
                    
                    <Card className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center">
                          <iframe 
                            src={`/api/documents/status-report-${report.id}`}
                            className="w-full h-[600px] border-0"
                            title={`Status Report ${report.title}`}
                          ></iframe>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>


    </div>
  );
}