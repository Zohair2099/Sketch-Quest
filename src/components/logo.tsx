import React from 'react';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center font-headline ${className}`}>
      <Image 
        src="/logo.png" 
        alt="SketchQuest Logo" 
        width={32} 
        height={32} 
        className="mr-2"
      />
      <span className="text-2xl font-bold text-foreground">SketchQuest</span>
    </div>
  );
}
