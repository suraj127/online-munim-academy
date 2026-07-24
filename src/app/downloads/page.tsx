'use client';

import { useState } from 'react';
import { Download, Search, FileText, Settings, Layers, RefreshCw, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DownloadItem {
  id: number;
  title: string;
  description: string;
  fileSize: string;
  fileType: 'PDF' | 'EXE' | 'TXT' | 'XLSX';
  category: 'Guides' | 'Installation' | 'Compliance' | 'Templates';
  updatedAt: string;
}

const DOWNLOAD_ITEMS: DownloadItem[] = [
  {
    id: 1,
    title: "Online Munim Quick Setup Guide",
    description: "Step-by-step documentation detailing initial configuration, database setups, and shop profile settings.",
    fileSize: "4.2 MB",
    fileType: "PDF",
    category: "Guides",
    updatedAt: "2026-07-15"
  },
  {
    id: 2,
    title: "Desktop Client Windows Setup Installer",
    description: "Latest stable offline desktop installer client. Requires .NET Framework 4.8+ and SQL Server LocalDB runtime.",
    fileSize: "68.4 MB",
    fileType: "EXE",
    category: "Installation",
    updatedAt: "2026-07-24"
  },
  {
    id: 3,
    title: "Fiscal Year Balance Sheet Closure Manual",
    description: "Guide on how to close ledger balances, declare opening stock for new fiscal periods, and clear audit caches.",
    fileSize: "2.1 MB",
    fileType: "PDF",
    category: "Guides",
    updatedAt: "2026-03-30"
  },
  {
    id: 4,
    title: "RFID Hardware Device Integration Guide",
    description: "Comprehensive list of supported RFID reader drivers, baud rates settings, tag calibration, and printer setups.",
    fileSize: "5.5 MB",
    fileType: "PDF",
    category: "Guides",
    updatedAt: "2026-07-20"
  },
  {
    id: 5,
    title: "Hallmark (HUID) Government Compliance Checklist",
    description: "Quick reference card outlining the legal requirements, bill configurations, and online audit logging procedures.",
    fileSize: "1.8 MB",
    fileType: "PDF",
    category: "Compliance",
    updatedAt: "2026-06-12"
  },
  {
    id: 6,
    title: "Release Notes - Software Version v4.8.12",
    description: "Detailed changelog outlining recent speed optimizations, barcode scanning macros, and reports export fixes.",
    fileSize: "120 KB",
    fileType: "TXT",
    category: "Compliance",
    updatedAt: "2026-07-22"
  },
  {
    id: 7,
    title: "Jewelry ERP Training Brochure",
    description: "Overview of all core/premium modules, hardware compatibility lists, and training contact lists.",
    fileSize: "8.4 MB",
    fileType: "PDF",
    category: "Guides",
    updatedAt: "2026-05-18"
  },
  {
    id: 8,
    title: "Karigar Metal Weight Wastage Calculator",
    description: "Pre-configured Excel template to calculate raw weight wastage, melting loss balances, and workers salaries.",
    fileSize: "450 KB",
    fileType: "XLSX",
    category: "Templates",
    updatedAt: "2026-07-02"
  }
];

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const categories = ['All', 'Guides', 'Installation', 'Compliance', 'Templates'];

  const filteredDownloads = DOWNLOAD_ITEMS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (item: DownloadItem) => {
    setDownloadingId(item.id);
    // Simulate a brief download delay
    setTimeout(() => {
      setDownloadingId(null);
      
      // Perform dynamic mock file download trigger
      const link = document.createElement('a');
      link.href = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;
      link.setAttribute('download', `${item.title.replace(/\s+/g, '_')}.${item.fileType.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileCheck className="w-6 h-6 text-red-400" />;
      case 'EXE':
        return <Settings className="w-6 h-6 text-blue-400" />;
      case 'XLSX':
        return <FileText className="w-6 h-6 text-emerald-400" />;
      default:
        return <FileText className="w-6 h-6 text-zinc-400" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040814] py-16 md:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium backdrop-blur-md">
            <Download className="w-3.5 h-3.5 animate-bounce" />
            <span>Resource Database</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white">Downloads Hub</h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
            Access user manuals, software installers, compliance check-sheets, and worksheets to boost your efficiency.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="glass p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/10'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-zinc-500 mr-2" />
              <input
                type="text"
                placeholder="Search downloads..."
                className="bg-transparent border-none text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-xs text-zinc-500 hover:text-white">Clear</button>
              )}
            </div>
          </div>
        </div>

        {/* Downloads Listing */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredDownloads.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-zinc-950 rounded-2xl border border-zinc-900"
              >
                <Layers className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-base font-bold text-white">No files found</h3>
                <p className="text-zinc-500 text-xs mt-1">Try updating your filters or search keywords.</p>
              </motion.div>
            ) : (
              filteredDownloads.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="glass-card p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-zinc-900"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                      {getFileIcon(item.fileType)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm md:text-base font-bold text-white">{item.title}</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase font-semibold">
                          {item.fileType}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-accent/10 text-accent font-medium">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-xs md:text-sm max-w-2xl leading-relaxed">{item.description}</p>
                      <div className="flex gap-3 text-[10px] text-zinc-500">
                        <span>Updated: {item.updatedAt}</span>
                        <span>Size: {item.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(item)}
                    disabled={downloadingId !== null}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      downloadingId === item.id
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-primary border-primary/20 hover:bg-primary/95 text-white hover:scale-[1.02] shadow-lg shadow-primary/10'
                    }`}
                  >
                    {downloadingId === item.id ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </>
                    )}
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
