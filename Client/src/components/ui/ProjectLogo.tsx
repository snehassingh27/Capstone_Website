import React from 'react';
import logoPath from '@assets/ChatGPT Image Apr 20, 2025, 05_48_28 PM.png';

export function ProjectLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img src={logoPath} alt="Project Pilots Logo" className="h-12" />
    </div>
  );
}