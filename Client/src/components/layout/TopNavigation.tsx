import React, { useState, useEffect } from 'react';
import { Link, useRoute, useLocation } from 'wouter';
import { ProjectLogo } from '@/components/ui/ProjectLogo';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminMode } from '@/hooks/use-admin-mode';

interface NavItem {
  name: string;
  href: string;
}

export function TopNavigation() {
  const { adminMode, toggleAdminMode } = useAdminMode();
  const [showWelcome, setShowWelcome] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === '/';
  
  const navItems: NavItem[] = [
    { name: 'HOME', href: '/' },
    { name: 'TEAM', href: '/team' },
    { name: 'PROJECT SPRINTS', href: '/project-sprints' },
    { name: 'COLLABORATION', href: '/collaboration' },
    { name: 'RETROSPECTIVE', href: '/retrospective' },
    { name: 'STATUS REPORT', href: '/status-report' },
    { name: 'JIRA', href: '/jira' },
    { name: 'CLIENT\'S PROJECT', href: '/clients-project' },
  ];

  // Show welcome animation after a small delay, only on the home page
  useEffect(() => {
    if (isHomePage) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowWelcome(false);
    }
  }, [isHomePage]);

  return (
    <header className="bg-white border-b">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Logo and Title Banner */}
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-6">
            <div className="scale-[1.8] transform">
              <ProjectLogo />
            </div>
            <div className="flex flex-col">
              <h1 className="text-5xl font-bold leading-tight text-primary">PROJECT PILOTS</h1>
              <p className="text-xl font-semibold text-secondary italic">Where Innovation Takes Off.</p>
            </div>
          </div>
          
          <div className="flex-1 flex justify-end items-center">
            <Button
              variant={adminMode ? "default" : "ghost"}
              size="icon"
              onClick={toggleAdminMode}
              className="ml-4"
              title={adminMode ? "Disable edit mode" : "Enable edit mode"}
            >
              <Settings className={`h-5 w-5 ${adminMode ? 'text-white' : 'text-primary'}`} />
            </Button>
          </div>
        </div>
        
        {/* Horizontal Navigation Menu */}
        <nav className="py-3 border-t border-blue-100">
          <ul className="flex justify-between px-2">
            {navItems.map((item) => {
              const [isActive] = useRoute(item.href === '/' ? item.href : item.href + '*');
              return (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a
                      className={`text-base font-bold py-2 px-3 transition-all duration-200 rounded hover:bg-secondary/10 hover:text-primary ${
                        isActive 
                          ? 'text-primary border-b-2 border-accent' 
                          : 'text-secondary'
                      }`}
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Welcome Animation - Only shown on the home page */}
        {isHomePage && (
          <div className={`py-5 mt-2 text-center transition-all duration-1000 ease-in-out ${showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <h2 className="relative text-4xl md:text-5xl font-bold overflow-hidden tracking-wide text-accent">
              <span className="inline-block welcome-text-animation">W</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '0.1s' }}>e</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '0.2s' }}>l</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '0.3s' }}>c</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '0.4s' }}>o</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '0.5s' }}>m</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '0.6s' }}>e</span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '0.7s' }}>t</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '0.8s' }}>o</span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '0.9s' }}>O</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '1.0s' }}>u</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '1.1s' }}>r</span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '1.2s' }}>C</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '1.3s' }}>a</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '1.4s' }}>p</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '1.5s' }}>s</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '1.6s' }}>t</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '1.7s' }}>o</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '1.8s' }}>n</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '1.9s' }}>e</span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '2.0s' }}>P</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '2.1s' }}>r</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '2.2s' }}>o</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '2.3s' }}>j</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '2.4s' }}>e</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '2.5s' }}>c</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '2.6s' }}>t</span>
              <span className="inline-block welcome-text-animation" style={{ animationDelay: '2.7s', fontSize: '120%' }}>!</span>
            </h2>
            <div className="h-1 w-48 mx-auto mt-4 bg-gradient-to-r from-secondary via-accent to-highlight rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </header>
  );
}