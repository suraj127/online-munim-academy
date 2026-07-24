'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, Library, Settings, Smartphone, Layers, BadgeDollarSign, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Video {
  id: number;
  title: string;
  description: string;
  category: string;
  youtubeUrl: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export default function CategoriesPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data: Video[]) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching videos:', err);
        setLoading(false);
      });
  }, []);

  const coreModules = [
    {
      title: "Software Demo",
      categoryNames: ["Software Setup", "Tips & Tricks", "Troubleshooting", "Installation"],
      icon: <Settings className="w-6 h-6 text-[#FF7A00]" />,
      color: "border-[#FF7A00]/20 hover:border-[#FF7A00]/40 shadow-orange-500/5 hover:shadow-orange-500/10",
      accentColor: "#FF7A00"
    },
    {
      title: "Jewellery App Demo",
      categoryNames: ["Mobile App"],
      icon: <Smartphone className="w-6 h-6 text-[#3B82F6]" />,
      color: "border-[#3B82F6]/20 hover:border-[#3B82F6]/40 shadow-blue-500/5 hover:shadow-blue-500/10",
      accentColor: "#3B82F6"
    },
    {
      title: "Scheme Demo",
      categoryNames: ["Scheme / Kitty"],
      icon: <Layers className="w-6 h-6 text-[#10B981]" />,
      color: "border-[#10B981]/20 hover:border-[#10B981]/40 shadow-green-500/5 hover:shadow-green-500/10",
      accentColor: "#10B981"
    },
    {
      title: "Loan Demo",
      categoryNames: ["Gold Loan / Girvi"],
      icon: <BadgeDollarSign className="w-6 h-6 text-[#EF4444]" />,
      color: "border-[#EF4444]/20 hover:border-[#EF4444]/40 shadow-red-500/5 hover:shadow-red-500/10",
      accentColor: "#EF4444"
    }
  ];

  // Group videos into their corresponding modules
  const groupedModules = coreModules.map(module => {
    const moduleVideos = videos.filter(v => 
      module.categoryNames.includes(v.category) &&
      (v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       v.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return {
      ...module,
      videos: moduleVideos
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040814] px-4 py-12 md:py-24">
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          <div className="h-10 bg-zinc-900 w-1/4 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-zinc-900 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#040814] py-16 md:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-8 mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium backdrop-blur-md">
              <Library className="w-3.5 h-3.5" />
              <span>Full Curriculum</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white">
              Core Training Modules
            </h1>
          </div>

          {/* Catalog Filter */}
          <div className="relative w-full md:w-80">
            <div className="flex items-center bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-zinc-500 mr-2" />
              <input
                type="text"
                placeholder="Search tutorials in modules..."
                className="bg-transparent border-none text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {groupedModules.map((module) => (
            <motion.div key={module.title} variants={cardVariants}>
              <div className={`glass-card p-6 md:p-8 rounded-3xl h-full flex flex-col justify-between border transition-all duration-300 group relative overflow-hidden ${module.color}`}>
                {/* Glowing decorative dot */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20" 
                  style={{ backgroundColor: module.accentColor }}
                />
                
                <div className="space-y-6">
                  {/* Icon and count */}
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {module.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-zinc-400 font-semibold">
                      {module.videos.length} Tutorials Available
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-display text-white group-hover:text-accent transition-colors">
                      {module.title}
                    </h3>
                  </div>

                  {/* Videos Sub-Curriculum List */}
                  {module.videos.length > 0 && (
                    <div className="space-y-2 border-t border-zinc-900/50 pt-5">
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                        {module.videos.map((vid) => (
                          <Link 
                            key={vid.id} 
                            href={`/videos/${vid.id}`}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-accent/20 hover:bg-white/10 transition-all text-left group/item"
                          >
                            <span className="text-xs font-semibold text-zinc-300 group-hover/item:text-white truncate max-w-[70%]">
                              {vid.title}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-accent font-bold">
                              Play <Play className="w-2.5 h-2.5 fill-accent text-accent" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-900/50 flex justify-between items-center text-xs text-zinc-500 font-semibold">
                  <span>Browse Full Module</span>
                  <Link 
                    href={`/videos?category=${encodeURIComponent(module.categoryNames[0])}`}
                    className="flex items-center text-accent group-hover:translate-x-1 transition-transform"
                  >
                    Open Videos <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
