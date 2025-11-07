import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center font-headline ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 text-primary"
      >
        <path
          d="M16 2.66663L3.33331 9.33329L16 16L28.6666 9.33329L16 2.66663Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33331 22.6667L16 29.3334L28.6666 22.6667"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33331 16L16 22.6667L28.6666 16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-2xl font-bold text-foreground">SketchQuest</span>
    </div>
  );
}
