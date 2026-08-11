'use client';

import { useState } from 'react';
import { Bell, Download, Play, X, ExternalLink, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginIssueModal() {
  const [isOpen, setIsOpen] = useState(false);
  const downloadUrl = "http://billingerp.in/online_munim_v486.zip";
  const videoUrl = "https://www.youtube.com/watch?v=iRvCKiaDgGI&t=17s";
  const embedVideoUrl = "https://www.youtube.com/embed/iRvCKiaDgGI?start=17&autoplay=1";

  const handleDownload = () => {
    window.open(downloadUrl, '_blank');
  };

  return (
    <>
      {/* Navbar & Floating Trigger Bell Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-400 hover:text-amber-300 hover:bg-amber-500/25 transition-all duration-300 group flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
        title="Offline Software Login Issue Alert"
        aria-label="Software Login Alert"
      >
        <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform text-amber-400" />
        
        {/* Pulse Badge */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-zinc-950"></span>
        </span>

        <span className="hidden lg:inline-block text-xs font-bold text-amber-300">
          Login Alert
        </span>
      </button>

      {/* Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Content Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#0B0F38] via-[#0E154B] to-[#070A28] border-2 border-amber-500/40 rounded-3xl shadow-2xl shadow-amber-500/20 overflow-hidden text-white my-auto p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white border border-white/10 transition-all z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Header Tag & Title */}
                <div className="space-y-3 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                      OFFLINE SOFTWARE NOTICE
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Latest Build v2.7.486
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    Are you facing login issue in your existing offline software?
                  </h2>

                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                    Watch the step-by-step update video below and download the latest build (v2.7.486) to fix login issues immediately.
                  </p>
                </div>

                {/* Attached YouTube Video */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
                    <span className="flex items-center gap-1.5">
                      <Play className="w-4 h-4 text-red-500 fill-current" />
                      Tutorial Video Guide: How to Update
                    </span>
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white flex items-center gap-1 underline"
                    >
                      Open on YouTube <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-amber-500/30 bg-black shadow-2xl">
                    <iframe
                      src={embedVideoUrl}
                      title="Are you facing login issue in your existing offline software video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleDownload}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all transform hover:scale-[1.02] cursor-pointer"
                  >
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>📥 Download Build v2.7.486</span>
                  </button>

                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 font-bold text-xs sm:text-sm transition-all hover:scale-[1.02]"
                  >
                    <Play className="w-4 h-4 fill-current text-red-400" />
                    <span>Watch Full Video</span>
                  </a>
                </div>

                {/* Footer Disclaimer */}
                <div className="pt-2 border-t border-white/10 text-center text-xs text-zinc-400">
                  Note: This update applies to existing offline software users.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
