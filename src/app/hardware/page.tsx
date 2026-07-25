'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Printer, ShieldAlert, Cpu, Rss, HelpCircle, HardDrive, Check, Tag } from 'lucide-react';
import JewelryAmbientBackground from '@/components/JewelryAmbientBackground';

interface HardwareItem {
  id: number;
  category: 'reader' | 'printer' | 'tag' | 'gate';
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  images: string[];
  icon: React.ReactNode;
}

const HARDWARE_ITEMS: HardwareItem[] = [
  {
    id: 1,
    category: 'reader',
    title: 'Seuic Handheld RFID Scanner',
    subtitle: 'High-Density Showroom Inventory Terminal',
    description: 'Industrial-grade handheld computer built for rapid jewelry stock counts. Leverages advanced anti-collision algorithms to capture hundreds of tags simultaneously, replacing manual counting with automated efficiency.',
    specs: [
      'UHF RFID + 2D High-Speed Barcode scanner',
      'Anti-collision read rate up to 200+ tags/sec',
      'Long-life hot-swappable battery backup',
      'Rugged IP65 drop-proof ergonomic housing'
    ],
    images: [
      '/images/hardware/seuic-scanner-1.png',
      '/images/hardware/seuic-scanner-2.png',
      '/images/hardware/seuic-scanner-3.png'
    ],
    icon: <ScanLine className="w-5 h-5 text-primary" />
  },
  {
    id: 2,
    category: 'printer',
    title: 'TSC T820 RFID Barcode Printer',
    subtitle: 'Thermal Transfer RFID Label Encoder',
    description: 'Enterprise desktop printer optimized for jewelry tag calibration and encoding. Ideal for printing and programming high-sensitivity UHF RFID dumbbell/ring labels with flawless accuracy.',
    specs: [
      'RAIN UHF RFID encoding (EPC Gen2 v2)',
      'High print resolution up to 300 DPI',
      'Adjustable antenna for small-form-factor tags',
      'Color LCD screen with menu navigation'
    ],
    images: [
      '/images/hardware/tsc-t820-1.png',
      '/images/hardware/tsc-t820-2.png',
      '/images/hardware/tsc-t820-3.png'
    ],
    icon: <Printer className="w-5 h-5 text-accent" />
  },
  {
    id: 3,
    category: 'tag',
    title: 'One-Time Use RFID Tags',
    subtitle: 'Adhesive Dumbbell Jewelry Labels',
    description: 'Tamper-evident adhesive RFID tags designed for delicate items like rings, chains, and earrings. Built-in micro-chips deliver high signal sensitivity, ensuring reliable scanning even in metal-dense jewelry trays.',
    specs: [
      'Non-transferable adhesive tail locks',
      'Jewelry-optimized UHF RFID inlay',
      'High-performance chip readable from multiple angles',
      'Safe for gold, silver, and platinum surfaces'
    ],
    images: [
      '/images/hardware/one-time-tag.webp'
    ],
    icon: <Cpu className="w-5 h-5 text-emerald-400" />
  },
  {
    id: 4,
    category: 'tag',
    title: 'Reusable AM + RFID Hard Tags',
    subtitle: 'Dual-Frequency Security Clamps',
    description: 'Combines anti-theft AM (Acousto-Magnetic 58 KHz) protection with high-precision RFID tracking. Clips securely onto jewelry hangers without adhesive, making them easy to detach and re-program at check-out.',
    specs: [
      'Dual AM (58 KHz) & UHF RFID technology',
      'Adhesive-free scratch-resistant lock design',
      'Quick magnetic detachment at POS checkout',
      'Re-writable chip for cost-effective reuse'
    ],
    images: [
      '/images/hardware/reusable-am-rfid-tag.png'
    ],
    icon: <Rss className="w-5 h-5 text-orange-400" />
  },
  {
    id: 5,
    category: 'tag',
    title: 'PVC RFID Reusable Tags',
    subtitle: 'Durable Waterproof Jewelry Loop Tags',
    description: 'Long-lasting PVC hang tags embedded with rewriteable UHF RFID chips. Easily looped onto necklaces, watches, and bracelets, providing a highly cost-effective, reusable tagging solution without leaving any sticky residue.',
    specs: [
      'Sturdy scratch-resistant PVC construction',
      'Flexible string/loop attachment options',
      'Rewriteable EPC memory for infinite reuse',
      'Waterproof and fade-resistant print surface'
    ],
    images: [
      '/images/hardware/pvc-reusable-tag-1.png',
      '/images/hardware/pvc-reusable-tag-2.jpg'
    ],
    icon: <Tag className="w-5 h-5 text-indigo-400" />
  },
  {
    id: 6,
    category: 'gate',
    title: 'AM + RFID Security Gate',
    subtitle: 'Loss Prevention walk-through Pedestal',
    description: 'Exit gate combining EAS AM theft detection and item-level RFID monitoring. Generates instant alerts for unauthorized movements, identifying exactly which item has left the showroom area.',
    specs: [
      'Simultaneous AM shoplifting & RFID scan detection',
      'Ultra-wide detection corridor spacing',
      'Automated real-time inventory loss reports',
      'Polished acrylic premium aesthetic design'
    ],
    images: [
      '/images/hardware/rfid-gate.jpg'
    ],
    icon: <ShieldAlert className="w-5 h-5 text-red-400" />
  }
];

export default function HardwarePage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'reader' | 'printer' | 'tag' | 'gate'>('all');
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  });

  const filteredItems = HARDWARE_ITEMS.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const handleThumbnailClick = (itemId: number, imgIndex: number) => {
    setActiveImageIndexes((prev) => ({
      ...prev,
      [itemId]: imgIndex
    }));
  };

  const filterTabs = [
    { id: 'all', label: 'All Hardware' },
    { id: 'reader', label: 'RFID Readers' },
    { id: 'printer', label: 'RFID Printers' },
    { id: 'tag', label: 'Security & Tags' },
    { id: 'gate', label: 'Exit Gates' }
  ];

  return (
    <div className="relative min-h-screen bg-[#040814] py-16 md:py-24 overflow-hidden">
      <JewelryAmbientBackground />

      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header section */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium backdrop-blur-md">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Showroom Hardware</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white">Supported RFID Hardware</h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Integrate certified scanners, tag encoders, tags, and exit security gates directly with your Online Munim inventory ecosystem.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-102'
                  : 'bg-white/5 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white backdrop-blur-md'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hardware Items List */}
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const currentImgIdx = activeImageIndexes[item.id] || 0;
              const currentImg = item.images[currentImgIdx];

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  key={item.id}
                  className="glass p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Gallery Column */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-xl group">
                      <Image
                        src={currentImg}
                        alt={item.title}
                        fill
                        sizes="(max-w-768px) 100vw, 450px"
                        priority={item.id <= 2}
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-103"
                      />
                    </div>

                    {/* Thumbnail list for multiple images */}
                    {item.images.length > 1 && (
                      <div className="flex gap-3 justify-center">
                        {item.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleThumbnailClick(item.id, idx)}
                            className={`relative w-16 h-12 rounded-lg overflow-hidden border transition-all duration-200 bg-zinc-900 cursor-pointer ${
                              idx === currentImgIdx
                                ? 'border-primary scale-105 shadow-md shadow-primary/10'
                                : 'border-white/10 hover:border-white/25 hover:scale-102'
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`${item.title} thumbnail ${idx + 1}`}
                              fill
                              sizes="64px"
                              className="object-contain p-1"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Info Column */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider">
                        {item.icon}
                        <span>{item.category === 'tag' ? 'Tag' : item.category === 'gate' ? 'Security Gate' : item.category}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white leading-tight">
                        {item.title}
                      </h2>
                      <p className="text-primary text-xs md:text-sm font-semibold tracking-wide uppercase">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-white text-xs font-bold uppercase tracking-widest">Key Specifications</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-zinc-400">
                        {item.specs.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/20">
                              <Check className="w-3.5 h-3.5 text-primary" />
                            </span>
                            <span className="leading-snug">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Note / FAQ Banner */}
        <div className="glass p-6 md:p-8 rounded-3xl border border-accent/25 shadow-[0_0_15px_rgba(59,130,246,0.08)] mt-16 flex flex-col md:flex-row items-center gap-5 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="flex-grow space-y-1">
            <h3 className="text-lg font-bold font-display text-white">Need hardware purchase or integration assistance?</h3>
            <p className="text-zinc-400 text-sm">
              Our hardware specialists help setup the correct label sizes, calibrate scanners, and configure security gates inside your showroom. Contact support for direct guidance.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
