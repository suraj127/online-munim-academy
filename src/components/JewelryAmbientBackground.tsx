'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function JewelryAmbientBackground() {
  // Generate random sparkles/gold dust particles
  const particles = Array.from({ length: 28 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 2,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 9 + 7
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* High-Resolution Luxury Jewelry Background Image */}
      <div 
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat opacity-[0.16] filter blur-[4px] scale-[1.03]"
        style={{ 
          backgroundImage: "url('/premium-jewelry-bg.png')",
          backgroundPositionY: "20%" 
        }}
      />
      
      {/* Radial and Linear Gradient Masks for Maximum Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040814]/80 via-[#040814]/30 to-[#040814]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#040814]/40 to-[#040814]" />

      {/* Slow Drifting Gold Dust / Diamond Shimmer Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFE2B7] opacity-25 shadow-[0_0_8px_rgba(255,122,0,0.4)]"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y
          }}
          animate={{
            y: [0, -70, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.1, 0.35, 0.1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
