'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Play, SlidersHorizontal, Search, RefreshCw, X, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getYouTubeThumbnail } from '@/utils/youtube';

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

// Main content component that uses useSearchParams
function VideosListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial values from URL
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialDifficulty = searchParams.get('difficulty') || '';

  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state if URL changes - using render-time checking to avoid ESLint warnings
  const [lastSearchParams, setLastSearchParams] = useState(searchParams);

  if (searchParams !== lastSearchParams) {
    setLastSearchParams(searchParams);
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setSelectedDifficulty(searchParams.get('difficulty') || '');
  }

  // Fetch initial APIs
  useEffect(() => {
    async function loadData() {
      try {
        const [vRes, cRes] = await Promise.all([
          fetch('/api/videos'),
          fetch('/api/categories'),
        ]);
        const vData = await vRes.json();
        const cData = await cRes.json();
        setVideos(vData);
        setCategories(cData);
      } catch (err) {
        console.error('Error loading videos listing:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter videos in-memory
  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === '' || video.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesDifficulty =
      selectedDifficulty === '' || video.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDifficulty('');
    router.push('/videos');
  };

  const handleCategorySelect = (catName: string) => {
    const newCat = selectedCategory === catName ? '' : catName;
    setSelectedCategory(newCat);
    updateUrlParams({ category: newCat });
  };

  const handleDifficultySelect = (diffName: string) => {
    const newDiff = selectedDifficulty === diffName ? '' : diffName;
    setSelectedDifficulty(newDiff);
    updateUrlParams({ difficulty: newDiff });
  };

  const updateUrlParams = (updated: { category?: string; search?: string; difficulty?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (updated.category !== undefined) {
      if (updated.category) params.set('category', updated.category);
      else params.delete('category');
    }
    if (updated.search !== undefined) {
      if (updated.search) params.set('search', updated.search);
      else params.delete('search');
    }
    if (updated.difficulty !== undefined) {
      if (updated.difficulty) params.set('difficulty', updated.difficulty);
      else params.delete('difficulty');
    }
    
    router.push(`/videos?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-8 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white">Watch Tutorials</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Browse our full library of software training videos.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-96">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
            <Search className="w-5 h-5 text-zinc-500 mr-2" />
            <input
              type="text"
              placeholder="Search by title, category, keyword..."
              className="bg-transparent border-none text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                updateUrlParams({ search: e.target.value });
              }}
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); updateUrlParams({ search: '' }); }}>
                <X className="w-4 h-4 text-zinc-500 hover:text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Layout Split */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Filters Sidebar (Desktop) */}
        <div className="hidden lg:block w-64 flex-shrink-0 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold uppercase text-zinc-400 tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </h3>
              {(selectedCategory || selectedDifficulty || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-accent hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Clear All
                </button>
              )}
            </div>
            
            {/* Active Filters list */}
            {(selectedCategory || selectedDifficulty || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory && (
                  <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-accent">
                    Category: {selectedCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategorySelect(selectedCategory)} />
                  </span>
                )}
                {selectedDifficulty && (
                  <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-accent font-medium">
                    {selectedDifficulty}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => handleDifficultySelect(selectedDifficulty)} />
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase text-zinc-500 tracking-wide">Difficulty Level</h4>
            <div className="flex flex-col space-y-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                const isSelected = selectedDifficulty.toLowerCase() === lvl.toLowerCase();
                return (
                  <button
                    key={lvl}
                    onClick={() => handleDifficultySelect(lvl)}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Sidebar List */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase text-zinc-500 tracking-wide">Categories</h4>
            <div className="flex flex-col space-y-1 max-h-[400px] overflow-y-auto pr-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                      isSelected
                        ? 'bg-zinc-800 text-accent border border-accent/20'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-500 ml-2">
                      {cat.videoCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Filters Toggle Button */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-medium text-white"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters & Categories
          </button>
          {(selectedCategory || selectedDifficulty || searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        {/* Mobile Filters Drawer */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-6 space-y-6 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Difficulty */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-zinc-500">Difficulty</h4>
                  <div className="flex flex-col space-y-1.5">
                    {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                      const isSelected = selectedDifficulty.toLowerCase() === lvl.toLowerCase();
                      return (
                        <button
                          key={lvl}
                          onClick={() => {
                            handleDifficultySelect(lvl);
                            setShowMobileFilters(false);
                          }}
                          className={`text-left px-3 py-2 rounded-lg text-xs ${
                            isSelected ? 'bg-primary text-white' : 'bg-zinc-900 text-zinc-400'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Categories Scroll */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-zinc-500">Categories</h4>
                  <div className="flex flex-col space-y-1.5 max-h-40 overflow-y-auto">
                    {categories.map((cat) => {
                      const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            handleCategorySelect(cat.name);
                            setShowMobileFilters(false);
                          }}
                          className={`text-left px-3 py-2 rounded-lg text-xs truncate ${
                            isSelected ? 'bg-zinc-800 text-accent' : 'bg-zinc-900 text-zinc-400'
                          }`}
                        >
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Column: Videos Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-video bg-zinc-900 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-20 bg-zinc-950 rounded-3xl border border-zinc-900">
              <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">No tutorials found</h3>
              <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto">
                {"We couldn't find any matches matching your search criteria. Try removing filters or changing search keywords."}
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 px-6 py-2.5 bg-white text-zinc-950 font-semibold rounded-xl text-sm hover:bg-accent transition-colors"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredVideos.map((video) => (
                <motion.div
                  layout
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/videos/${video.id}`} className="group">
                    <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col justify-between border border-zinc-900 hover:border-accent/20">
                      {/* Thumbnail Container */}
                      <div className="relative aspect-video w-full bg-zinc-900 border-b border-white/5 overflow-hidden">
                        <img
                          src={getYouTubeThumbnail(video.youtubeUrl)}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Play Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                          <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center text-zinc-950 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-accent/20">
                            <Play className="w-6 h-6 fill-current ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-zinc-300 font-semibold">
                          {video.duration}
                        </span>
                      </div>

                      {/* Video Info */}
                      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 font-medium">
                              <Tag className="w-3 h-3 text-accent" /> {video.category}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              video.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border border-green-500/15' :
                              video.difficulty === 'Intermediate' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/15' :
                              'bg-red-500/10 text-red-400 border border-red-500/15'
                            }`}>
                              {video.difficulty}
                            </span>
                          </div>
                          <h3 className="text-base font-bold font-display text-white line-clamp-1 group-hover:text-accent transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                            {video.description}
                          </p>
                        </div>

                        {/* Card metadata footer */}
                        <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500 font-semibold">
                          <span>Added {video.createdAt}</span>
                          <span className="text-accent group-hover:underline flex items-center gap-0.5">
                            Watch Video <Play className="w-2.5 h-2.5 fill-current" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Wrapper to handle Suspense boundary for useSearchParams
export default function VideosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#040814] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent" />
      </div>
    }>
      <VideosListContent />
    </Suspense>
  );
}
