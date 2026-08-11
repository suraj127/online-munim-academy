'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Play, ArrowRight, Clock, Award, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { getYouTubeThumbnail } from '@/utils/youtube';
import Logo from '@/components/Logo';
import JewelryAmbientBackground from '@/components/JewelryAmbientBackground';

interface Video {
  id: number;
  title: string;
  description: string;
  category: string;
  youtubeUrl: string;
  featured?: boolean;
  short?: boolean;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  videoCount: number;
}

// Helper to render icon by name
const CategoryIcon = ({ name, className }: { name: string; className: string }) => {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredShortId, setHoveredShortId] = useState<number | null>(null);
  const [showSplash, setShowSplash] = useState(false);
  const shortsContainerRef = useRef<HTMLDivElement>(null);
  const hardwareContainerRef = useRef<HTMLDivElement>(null);

  const scrollShorts = (direction: 'left' | 'right') => {
    if (shortsContainerRef.current) {
      const scrollAmount = 320;
      shortsContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollHardware = (direction: 'left' | 'right') => {
    if (hardwareContainerRef.current) {
      const scrollAmount = 320;
      hardwareContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Only show splash screen on the very first visit in the session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (!hasSeenSplash) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [videosRes, catsRes] = await Promise.all([
          fetch('/api/videos'),
          fetch('/api/categories'),
        ]);
        const videosData = await videosRes.json();
        const catsData = await catsRes.json();
        setVideos(videosData);
        setCategories(catsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const longVideos = videos.filter((v) => !v.short);
  const featuredVideo = longVideos.find((v) => v.featured) || longVideos[0] || videos[0];
  const latestVideos = longVideos.slice(0, 4);

  const popularTargetIds = ['ffboqfNn4ns', 'xnf_Par-VB0', 'uopEEZ9NGI4', 'RNq5BYGC9PU'];
  const popularVideosFound = popularTargetIds
    .map((id) => videos.find((v) => v.youtubeUrl.includes(id)))
    .filter((v): v is Video => v !== undefined);
  const popularVideos = popularVideosFound.length > 0 ? popularVideosFound : longVideos.slice(0, 4);

  const displayedCategories = categories.slice(0, 6);
  const shortVideos = videos.filter((v) => v.short);

  const coreModules = [
    {
      title: "Software Demo",
      description: "Master initial settings, company profiles, custom tax invoices, print layouts, and core configuration controls.",
      categoryName: "Software Setup",
      icon: "Settings",
      videoCount: 3,
    },
    {
      title: "Jewellery App Demo",
      description: "Connect your showroom database to our mobile catalog. Toggles access parameters, live sales graphs, and item lists.",
      categoryName: "Mobile App",
      icon: "Smartphone",
      videoCount: 2,
    },
    {
      title: "Scheme Demo",
      description: "Set up monthly gold schemes, calculate interest yields, collect kitty amounts, and manage client maturity settlements.",
      categoryName: "Scheme / Kitty",
      icon: "Layers",
      videoCount: 2,
    },
    {
      title: "Loan Demo",
      description: "Log pawn-brokering loans, track client gold ornaments, compute daily/monthly interest, and generate Girvi balances.",
      categoryName: "Gold Loan / Girvi",
      icon: "BadgeDollarSign",
      videoCount: 2,
    }
  ];

  const homepageHardware = [
    {
      title: 'Seuic Handheld RFID Scanner',
      category: 'RFID Reader',
      image: '/images/hardware/seuic-scanner-1.png',
      icon: 'ScanLine',
      color: 'text-primary'
    },
    {
      title: 'TSC T820 RFID Barcode Printer',
      category: 'RFID Printer',
      image: '/images/hardware/tsc-t820-1.png',
      icon: 'Printer',
      color: 'text-accent'
    },
    {
      title: 'One-Time Use RFID Tags',
      category: 'RFID Tag',
      image: '/images/hardware/one-time-tag.webp',
      icon: 'Cpu',
      color: 'text-emerald-400'
    },
    {
      title: 'Reusable AM + RFID Hard Tags',
      category: 'Security Tag',
      image: '/images/hardware/reusable-am-rfid-tag.png',
      icon: 'Rss',
      color: 'text-orange-400'
    },
    {
      title: 'PVC RFID Reusable Tags',
      category: 'RFID Loop Tag',
      image: '/images/hardware/pvc-reusable-tag-1.png',
      icon: 'Tag',
      color: 'text-indigo-400'
    },
    {
      title: 'AM + RFID Security Gate',
      category: 'Exit Security Gate',
      image: '/images/hardware/rfid-gate.jpg',
      icon: 'ShieldAlert',
      color: 'text-red-400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040814] px-4 py-12 md:py-24">
        <div className="max-w-7xl mx-auto space-y-12 animate-pulse">
          <div className="h-64 md:h-96 bg-zinc-900 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 bg-zinc-900 w-1/4 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video bg-zinc-900 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#040814] overflow-hidden">
      <JewelryAmbientBackground />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-7xl font-extrabold font-display leading-tight tracking-tight text-white">
            Master Online Munim <br />
            <span className="bg-gradient-to-r from-[#FF7A00] to-[#3B82F6] bg-clip-text text-transparent">
              Software
            </span>
          </h1>

          <p className="text-zinc-400 text-base md:text-xl max-w-3xl mx-auto font-sans leading-relaxed">
            Learn everything with professional step-by-step tutorials. Become an expert in online munim jewelry ERP, billing, and accounting systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/videos"
              className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/95 text-white font-medium shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-white" />
              Watch Tutorials
            </Link>
            <Link
              href="/categories"
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-md"
            >
              Browse Categories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Video (Responsive Grid Card) */}
      {featuredVideo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-950/40 backdrop-blur-md p-6 md:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Ambient glows behind the columns */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="relative z-10 space-y-5 lg:col-span-7 text-left flex flex-col justify-center">
              <div>
                <span className="px-3 py-1 rounded bg-accent/90 text-zinc-950 text-xs font-bold uppercase tracking-wider">
                  Featured Tutorial
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold font-display text-white group-hover:text-primary transition-colors duration-300">
                {featuredVideo.title}
              </h2>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl">
                {featuredVideo.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">{featuredVideo.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredVideo.duration}</span>
                <span className="flex items-center gap-1"><Award className="w-4 h-4" /> {featuredVideo.difficulty}</span>
              </div>
              <div className="pt-2">
                <Link
                  href={`/videos/${featuredVideo.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-semibold hover:bg-primary hover:text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Watching Now
                </Link>
              </div>
            </div>

            {/* Video Thumbnail Section */}
            <div className="lg:col-span-5 w-full relative z-10">
              <Link
                href={`/videos/${featuredVideo.id}`}
                className="block relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 group/thumbnail shadow-xl bg-zinc-900 cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/thumbnail:scale-105"
                  style={{ backgroundImage: `url(${getYouTubeThumbnail(featuredVideo.youtubeUrl)})` }} 
                />
                <div className="absolute inset-0 bg-black/40 group-hover/thumbnail:bg-black/20 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-2xl transition-all duration-500 scale-90 group-hover/thumbnail:scale-100 group-hover/thumbnail:bg-accent relative">
                    <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping group-hover/thumbnail:bg-accent/40" />
                    <Play className="w-6 h-6 fill-current relative z-10 ml-0.5" />
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </section>
      ) }

      {/* Featured Categories (Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white">Core Training Modules</h2>
            <p className="text-zinc-400 text-sm mt-1">Browse tutorials by specific software features.</p>
          </div>
          <Link href="/categories" className="flex items-center text-accent hover:text-white text-sm font-medium transition-colors">
            View All Categories <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 -mx-4 px-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0 md:px-0 md:mx-0 md:overflow-x-visible md:snap-none"
        >
          {coreModules.map((module) => (
            <motion.div 
              key={module.title} 
              variants={itemVariants}
              className="shrink-0 snap-start w-[280px] sm:w-[320px] md:w-auto md:shrink md:snap-none"
            >
              <Link href={`/videos?category=${encodeURIComponent(module.categoryName)}`}>
                <div className="glass-card p-5 md:p-6 rounded-2xl h-full flex flex-col justify-between group">
                  <div className="space-y-3 md:space-y-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                      <CategoryIcon name={module.icon} className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold font-display text-white group-hover:text-accent transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-zinc-400 text-xs md:text-sm mt-1 line-clamp-2 md:line-clamp-3 leading-relaxed">{module.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-6 flex justify-between items-center text-xs text-zinc-500 font-medium border-t border-zinc-900/50 pt-3 md:pt-4">
                    <span>{module.videoCount} Videos Available</span>
                    <span className="flex items-center text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse <ChevronRight className="w-4 h-4 text-accent ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* YouTube Shorts / Reels Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white flex items-center gap-2">
              Quick Tips & Shorts
            </h2>
          </div>
          {/* Scroll Navigation Arrows */}
          <div className="flex gap-2 relative z-10">
            <button
              onClick={() => scrollShorts('left')}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <Icons.ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollShorts('right')}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <Icons.ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div 
          ref={shortsContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {shortVideos.map((video) => {
            const isHovered = hoveredShortId === video.id;
            const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
            const match = video.youtubeUrl.match(ytRegExp);
            const videoId = (match && match[2].length === 11) ? match[2] : '';
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;

            return (
              <div
                key={video.id}
                onMouseEnter={() => setHoveredShortId(video.id)}
                onMouseLeave={() => setHoveredShortId(null)}
                className="relative aspect-[9/16] w-48 md:w-56 rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950 flex-shrink-0 group hover:border-accent/30 shadow-2xl transition-all duration-300 transform hover:scale-[1.01]"
              >
                {isHovered && videoId ? (
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    className="absolute inset-0 w-full h-full border-0 pointer-events-none scale-105"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center text-zinc-950 shadow-lg">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </>
                )}

                {/* Bottom text overlay */}
                <Link href={`/videos/${video.id}`} className="absolute inset-x-0 bottom-0 p-4 text-left z-20 flex flex-col justify-end gap-1.5 pointer-events-auto">
                  <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-accent text-zinc-950 font-bold uppercase w-max tracking-wider">
                    Shorts
                  </span>
                  <h3 className="text-sm font-bold font-display text-white line-clamp-2 leading-snug group-hover:text-accent transition-colors">
                    {video.title}
                  </h3>
                  <span className="text-[10px] text-zinc-400 font-semibold">{video.duration}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest Videos Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white">Latest Videos</h2>
          </div>
          <Link href="/videos" className="flex items-center text-accent hover:text-white text-sm font-medium transition-colors">
            View All Videos <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 -mx-4 px-4 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:pb-0 sm:px-0 sm:mx-0 sm:overflow-x-visible sm:snap-none">
          {latestVideos.map((video) => (
            <Link 
              key={video.id} 
              href={`/videos/${video.id}`} 
              className="group shrink-0 snap-start w-[280px] sm:w-auto sm:shrink sm:snap-none"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="relative aspect-video w-full bg-zinc-900 border-b border-white/5">
                  <img
                    src={getYouTubeThumbnail(video.youtubeUrl)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center text-zinc-950 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-accent/20">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-zinc-300 font-medium">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-semibold uppercase">
                      {video.category}
                    </span>
                    <h3 className="text-sm font-bold font-display text-white line-clamp-2 group-hover:text-accent transition-colors">
                      {video.title}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500 font-medium border-t border-zinc-900 pt-3">
                    <span>{video.createdAt}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      video.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                      video.difficulty === 'Intermediate' ? 'bg-orange-500/10 text-orange-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {video.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Videos Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white">Popular Tutorials</h2>
          </div>
          <Link href="/videos?difficulty=Advanced" className="flex items-center text-accent hover:text-white text-sm font-medium transition-colors">
            Advanced Guides <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 -mx-4 px-4 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:pb-0 sm:px-0 sm:mx-0 sm:overflow-x-visible sm:snap-none">
          {popularVideos.map((video) => (
            <Link 
              key={video.id} 
              href={`/videos/${video.id}`} 
              className="group shrink-0 snap-start w-[280px] sm:w-auto sm:shrink sm:snap-none"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col justify-between">
                <div className="relative aspect-video w-full bg-zinc-900 border-b border-white/5">
                  <img
                    src={getYouTubeThumbnail(video.youtubeUrl)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-primary/20">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-zinc-300 font-medium">
                    {video.duration}
                  </span>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-semibold uppercase">
                        {video.category}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        video.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                        video.difficulty === 'Intermediate' ? 'bg-orange-500/10 text-orange-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {video.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-display text-white line-clamp-1 group-hover:text-accent transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-zinc-400 text-xs line-clamp-2">{video.description}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-500">
                    <span>Uploaded {video.createdAt}</span>
                    <span className="text-accent group-hover:underline flex items-center gap-0.5">
                      Watch Video <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Showroom Hardware Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white flex items-center gap-2">
              <Icons.HardDrive className="w-5 h-5 text-primary animate-pulse" /> Supported RFID Hardware
            </h2>
          </div>
          {/* Scroll Navigation Arrows */}
          <div className="flex gap-2 relative z-10">
            <button
              onClick={() => scrollHardware('left')}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <Icons.ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollHardware('right')}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <Icons.ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div 
          ref={hardwareContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {homepageHardware.map((hw, idx) => (
            <Link 
              key={idx} 
              href="/hardware" 
              className="group shrink-0 snap-start w-64 md:w-72 bg-zinc-950/40 border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all duration-300 backdrop-blur-md shadow-lg"
            >
              <div className="relative aspect-video w-full rounded-xl bg-zinc-900 overflow-hidden border border-white/5 mb-4">
                <img
                  src={hw.image}
                  alt={hw.title}
                  className="w-full h-full object-contain p-2 group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-1.5">
                  <span className={`p-1 rounded bg-white/5 border border-white/5 ${hw.color}`}>
                    <CategoryIcon name={hw.icon} className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{hw.category}</span>
                </div>
                <h3 className="text-sm font-bold font-display text-white line-clamp-1 group-hover:text-primary transition-colors">
                  {hw.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Loading Splash Screen overlay */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#040814] flex flex-col items-center justify-center gap-8"
          >
            {/* Glowing background */}
            <div className="absolute w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px]" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="relative z-10 flex flex-col items-center gap-6"
            >
              <Logo size="lg" showText={true} />
              <div className="w-56 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5 mt-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF7A00] to-[#3B82F6]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.8, ease: "easeInOut" }}
                />
              </div>
              <span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest animate-pulse">
                Initializing Online Munim...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
