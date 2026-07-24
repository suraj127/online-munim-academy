'use client';

import React from 'react';

interface LogoProps {
  showText?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ showText = true, className = '', size = 'md' }: LogoProps) {
  // Size mapping
  const sizeClasses = {
    sm: { svg: 'w-10 h-10', text: 'text-sm' },
    md: { svg: 'w-14 h-14', text: 'text-lg md:text-xl' },
    lg: { svg: 'w-24 h-24', text: 'text-3xl' }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Dynamic Mascot SVG */}
      <svg
        viewBox="0 0 100 100"
        className={`${currentSize.svg} flex-shrink-0 filter drop-shadow-[0_0_8px_rgba(255,122,0,0.25)]`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            @keyframes logo-blink {
              0%, 90%, 100% {
                transform: scaleY(1);
              }
              95% {
                transform: scaleY(0.15);
              }
            }
            .logo-eye-left {
              animation: logo-blink 4s infinite;
              transform-origin: center;
              transform-box: fill-box;
            }
            .logo-eye-right {
              animation: logo-blink 4s infinite;
              transform-origin: center;
              transform-box: fill-box;
              animation-delay: 0.15s;
            }
            .logo-glow-orange {
              filter: drop-shadow(0 0 3px rgba(255, 122, 0, 0.6));
            }
          `}
        </style>

        {/* Outer Circle (Neon Orange Double Rings) */}
        <circle
          cx="50"
          cy="50"
          r="43"
          stroke="#FF7A00"
          strokeWidth="1.5"
          fill="none"
          className="logo-glow-orange opacity-95"
        />
        <circle
          cx="50"
          cy="50"
          r="39"
          stroke="#FF7A00"
          strokeWidth="0.8"
          fill="none"
          opacity="0.75"
        />

        {/* Robot Body / Base Chest (Dark Blue) */}
        <path
          d="M 28 55 C 33 49, 67 49, 72 55 C 76 65, 24 65, 28 55 Z"
          fill="#0D2A4A"
          stroke="#FF7A00"
          strokeWidth="0.6"
        />

        {/* Robot Face Capsule (Off-white face with neon orange border) */}
        <rect
          x="28"
          y="31"
          width="44"
          height="23"
          rx="10"
          stroke="#FF7A00"
          strokeWidth="2.5"
          fill="#FFFBEB"
          className="logo-glow-orange"
        />

        {/* Robot Antenna */}
        <line
          x1="50"
          y1="31"
          x2="50"
          y2="24"
          stroke="#FF7A00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="22"
          r="2.5"
          fill="#FF7A00"
          className="logo-glow-orange"
        />

        {/* Left Eye (Dark Blue Caret) */}
        <path
          d="M 37 46 L 42 41 L 47 46"
          stroke="#0F172A"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="logo-eye-left"
        />

        {/* Right Eye (Green Caret) */}
        <path
          d="M 53 46 L 58 41 L 63 46"
          stroke="#10B981"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="logo-eye-right"
        />
      </svg>

      {/* Glowing Brand Text */}
      {showText && (
        <span className={`font-bold font-display tracking-wide flex flex-col sm:flex-row sm:items-center ${currentSize.text}`}>
          <span className="flex items-center">
            <span className="text-[#FF7A00] drop-shadow-[0_0_6px_rgba(255,122,0,0.4)] mr-1.5">Online</span>
            <span className="text-[#3B82F6] drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]">Munim</span>
          </span>
          <span className="text-zinc-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:ml-2 mt-0.5 sm:mt-0 opacity-80">
            Tutorial
          </span>
        </span>
      )}
    </div>
  );
}
