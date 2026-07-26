import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface RedactedTextProps {
  children: React.ReactNode;
  className?: string;
}

export function RedactedText({ children, className }: RedactedTextProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onClick={() => setRevealed(!revealed)}
      className={cn(
        "cursor-pointer transition-all duration-300 relative inline-block px-1 select-none",
        revealed 
          ? "bg-black/10 text-current" 
          : "bg-[#1a1208] text-[#1a1208] pointer-events-auto",
        className
      )}
      title="Classified - Hover to reveal"
    >
      {/* Hand-drawn marker effect edges when redacted */}
      {!revealed && (
        <>
          <div className="absolute inset-0 bg-black mix-blend-multiply opacity-90 rounded-sm" />
          <div className="absolute -inset-[2px] border border-black/20 rounded-sm pointer-events-none" />
        </>
      )}
      <span className={revealed ? "opacity-100" : "opacity-0"}>
        {children}
      </span>
    </span>
  );
}
