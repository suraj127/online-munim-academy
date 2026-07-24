'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function JewelryAmbientBackground() {
  // Generate random sparkles/gold dust particles
  const particles = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 2,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 6
  }));

  // Handcrafted premium jewelry vector paths (100x100 viewport)
  const shapes = [
    {
      // Diamond Cut Outlines
      path: "M50 15 L75 35 L50 85 L25 35 Z M25 35 L75 35 M37.5 35 L50 15 L62.5 35 L50 85 Z",
      x: "12%",
      y: "15%",
      size: 90,
      color: "stroke-[#FF7A00]/15",
      duration: 35
    },
    {
      // Luxury Engagement Ring
      path: "M50 45 C61 45 70 54 70 65 C70 76 61 85 50 85 C39 85 30 76 30 65 C30 54 39 45 50 45 Z M50 45 L50 25 L42 32 L50 18 L58 32 L50 25",
      x: "82%",
      y: "22%",
      size: 110,
      color: "stroke-[#3B82F6]/15",
      duration: 40
    },
    {
      // Sparkle Star 1
      path: "M50 20 Q50 50 20 50 Q50 50 50 80 Q50 50 80 50 Q50 50 50 20 Z",
      x: "70%",
      y: "45%",
      size: 50,
      color: "stroke-[#FF7A00]/20",
      duration: 25
    },
    {
      // Gemstone Octagon
      path: "M40 15 L60 15 L85 40 L85 60 L60 85 L40 85 L15 60 L15 40 Z M15 40 L85 40 M15 60 L85 60 M40 15 L40 85 M60 15 L60 85",
      x: "8%",
      y: "55%",
      size: 80,
      color: "stroke-[#3B82F6]/10",
      duration: 45
    },
    {
      // Sparkle Star 2
      path: "M50 25 Q50 50 25 50 Q50 50 50 75 Q50 50 75 50 Q50 50 50 25 Z",
      x: "28%",
      y: "75%",
      size: 65,
      color: "stroke-[#FF7A00]/15",
      duration: 30
    },
    {
      // Fine Jewelry Necklace Pendant
      path: "M30 20 Q50 45 70 20 M50 42 L50 65 L40 75 L50 85 L60 75 Z",
      x: "85%",
      y: "70%",
      size: 100,
      color: "stroke-[#3B82F6]/15",
      duration: 50
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Slow Drifting Gold Dust / Diamond Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFE2B7] opacity-25 shadow-[0_0_8px_rgba(255,122,0,0.5)]"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating Outlined Jewelry Vector Objects */}
      {shapes.map((s, idx) => (
        <motion.div
          key={idx}
          className="absolute hidden sm:block"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, idx % 2 === 0 ? 15 : -15, 0]
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className={`w-full h-full ${s.color} fill-none`}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={s.path} />
          </svg>
        </motion.div>
      ))}

      {/* Radial soft lighting focus behind hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF7A00]/5 to-[#3B82F6]/5 rounded-full filter blur-[140px] opacity-60" />
    </div>
  );
}
