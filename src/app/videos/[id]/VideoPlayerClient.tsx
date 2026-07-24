'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Clock, ChevronRight, Tag, BookOpen, Share2, CornerDownRight } from 'lucide-react';
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '@/utils/youtube';

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

interface VideoPlayerClientProps {
  initialId: number;
}

export default function VideoPlayerClient({ initialId }: VideoPlayerClientProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all videos and set active video
  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data: Video[]) => {
        setVideos(data);
        const current = data.find((v: Video) => v.id === initialId) || data[0];
        setActiveVideo(current);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching video list:', err);
        setLoading(false);
      });
  }, [initialId]);

  // Handle playlist video select (instant transition without reload)
  const handleSelectVideo = (video: Video) => {
    setActiveVideo(video);
    // Smooth scroll to top of player
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040814] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent" />
      </div>
    );
  }

  if (!activeVideo) {
    return (
      <div className="min-h-screen bg-[#040814] flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-white mb-2">Video Not Found</h2>
        <p className="text-zinc-400 mb-6">The video tutorial you are trying to view does not exist.</p>
        <Link href="/videos" className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
          Back to Videos Catalog
        </Link>
      </div>
    );
  }

  // Related videos: same category, excluding active video
  const relatedVideos = videos
    .filter((v) => v.category === activeVideo.category && v.id !== activeVideo.id)
    .slice(0, 4);

  // Fallback recommended videos if none in same category
  const recommendedVideos = relatedVideos.length > 0 
    ? relatedVideos 
    : videos.filter((v) => v.id !== activeVideo.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#040814] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs md:text-sm text-zinc-500 mb-6 font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/videos" className="hover:text-white transition-colors">Videos</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/videos?category=${encodeURIComponent(activeVideo.category)}`} className="hover:text-accent transition-colors text-accent/80">
            {activeVideo.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
          <span className="text-zinc-300 truncate max-w-[200px] md:max-w-sm hidden sm:inline">{activeVideo.title}</span>
        </nav>

        {/* 2 Column Main Player Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Iframe Player & Video Info (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Embed Player */}
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <iframe
                src={getYouTubeEmbedUrl(activeVideo.youtubeUrl, true)}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Title & Meta details */}
            <div className="glass p-6 md:p-8 rounded-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs text-accent font-semibold uppercase">
                  <Tag className="w-3.5 h-3.5" /> {activeVideo.category}
                </span>
                <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  activeVideo.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                  activeVideo.difficulty === 'Intermediate' ? 'bg-orange-500/10 text-orange-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {activeVideo.difficulty}
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-400 font-medium ml-auto">
                  <Clock className="w-4 h-4" /> {activeVideo.duration}
                </span>
              </div>

              <h1 className="text-xl md:text-3xl font-extrabold font-display text-white">
                {activeVideo.title}
              </h1>

              <div className="text-xs text-zinc-500 border-b border-zinc-900 pb-3 flex justify-between items-center">
                <span>Published on {activeVideo.createdAt}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Share link copied to clipboard!');
                  }}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share Tutorial
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Tutorial Details</h3>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans">
                  {activeVideo.description}
                </p>
              </div>
            </div>

            {/* Related Videos list below */}
            <div className="space-y-6 pt-4">
              <h3 className="text-lg md:text-xl font-bold font-display text-white flex items-center gap-2">
                <CornerDownRight className="w-5 h-5 text-accent" /> Recommended Tutorials
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recommendedVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    className="group text-left"
                  >
                    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full border border-zinc-900 hover:border-accent/10">
                      <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden">
                        <img
                          src={getYouTubeThumbnail(video.youtubeUrl)}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                          <Play className="w-10 h-10 rounded-full bg-accent text-zinc-950 flex items-center justify-center font-bold" />
                        </div>
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-zinc-300">
                          {video.duration}
                        </span>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-1">
                        <span className="text-[9px] uppercase font-bold text-accent">{video.category}</span>
                        <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-accent transition-colors">
                          {video.title}
                        </h4>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Column 2: Sidebar Playlist (1/3 width) */}
          <div className="space-y-4">
            <div className="glass p-5 rounded-3xl border border-zinc-900/60 max-h-[85vh] overflow-y-auto flex flex-col">
              <div className="border-b border-zinc-900 pb-3 mb-4">
                <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-accent" /> Course Playlist
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">Select a video below to watch instantly</p>
              </div>

              {/* Videos Playlist list */}
              <div className="space-y-2 overflow-y-auto pr-1">
                {videos.map((video, index) => {
                  const isActive = video.id === activeVideo.id;
                  return (
                    <button
                      key={video.id}
                      onClick={() => handleSelectVideo(video)}
                      className={`w-full flex gap-3 p-2.5 rounded-2xl text-left border transition-all ${
                        isActive
                          ? 'bg-primary/10 border-accent/30 text-white'
                          : 'bg-zinc-900/40 border-transparent hover:bg-zinc-900/80 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="relative w-20 aspect-video rounded-lg overflow-hidden flex-shrink-0 border border-zinc-800">
                        <img
                          src={getYouTubeThumbnail(video.youtubeUrl)}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                            <Play className="w-5 h-5 text-accent fill-accent animate-pulse" />
                          </div>
                        )}
                      </div>
                      
                      <div className="min-w-0 flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className={`text-xs font-bold truncate ${isActive ? 'text-accent' : 'text-white'}`}>
                            {index + 1}. {video.title}
                          </h4>
                          <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded bg-zinc-950 text-zinc-400">
                            {video.category}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[9px] text-zinc-500 mt-1">
                          <span>{video.duration}</span>
                          <span>{video.difficulty}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
