import React from 'react';
import bannerPath from '@assets/wmremove-transformed.png';

export function BannerImage({ className }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <img 
        src={bannerPath} 
        alt="Team collaboration" 
        className="w-full h-auto object-cover rounded-lg shadow-md" 
      />
    </div>
  );
}