import { NextResponse } from 'next/server';
import { fetchLatestYouTubeVideos } from '@/utils/youtubeSync';

export interface Video {
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

const VIDEOS: Video[] = [
  {
    id: 1,
    title: "Online Munim Complete Software Training Walkthrough",
    description: "A comprehensive video guide containing complete training of Online Munim Jewellery ERP billing software. Learn every function step-by-step.",
    category: "Tips & Tricks",
    youtubeUrl: "https://youtu.be/ffboqfNn4ns",
    featured: true,
    duration: "17:29",
    difficulty: "Beginner",
    createdAt: "2026-07-24"
  },
  {
    id: 2,
    title: "Jewellery Shop Firm & Store Profile Configuration",
    description: "Learn how to setup your jewelry shop firm profiles, contact numbers, address headers, and fiscal details inside Online Munim.",
    category: "Software Setup",
    youtubeUrl: "https://youtu.be/CO3ZmDHUtlE",
    duration: "12:15",
    difficulty: "Beginner",
    createdAt: "2026-07-23"
  },
  {
    id: 3,
    title: "How to Setup and Update Live Gold & Silver Rates",
    description: "Set up automatically updated gold, silver, and platinum board rates inside your retail jewelry showroom.",
    category: "Tips & Tricks",
    youtubeUrl: "https://youtu.be/bkunQSsqInY",
    duration: "05:40",
    difficulty: "Beginner",
    createdAt: "2026-07-22"
  },
  {
    id: 4,
    title: "Jewelry Inventory & Dynamic Stock Management",
    description: "How to manage raw gold, finished jewelry, weight tags, item listings, and categories in the inventory manager.",
    category: "Inventory",
    youtubeUrl: "https://youtu.be/xnf_Par-VB0",
    duration: "18:30",
    difficulty: "Intermediate",
    createdAt: "2026-07-20"
  },
  {
    id: 5,
    title: "Point of Sale (POS) Retail Sales Management",
    description: "Complete checkout flow: barcode scanning, discount rules, UPI / cash split payments, and generating customer sales bills.",
    category: "Sales",
    youtubeUrl: "https://youtu.be/RNq5BYGC9PU",
    duration: "15:45",
    difficulty: "Beginner",
    createdAt: "2026-07-19"
  },
  {
    id: 6,
    title: "Customer Custom Order Booking & Advances",
    description: "Log customized jewelry requests, accept advances (gold/cash deposits), schedule delivery dates, and issue receipt vouchers.",
    category: "Order Module",
    youtubeUrl: "https://youtu.be/uopEEZ9NGI4",
    duration: "10:10",
    difficulty: "Intermediate",
    createdAt: "2026-07-18"
  },
  {
    id: 7,
    title: "Artisan (Karigar) Weight & Wastage Balancing",
    description: "Detailed walkthrough of worker operations: issuing metal, receiving ornaments, calculating melting loss, and balancing worker ledger books.",
    category: "Karigar Module",
    youtubeUrl: "https://youtu.be/zyHPjkb17Aw",
    duration: "21:05",
    difficulty: "Advanced",
    createdAt: "2026-07-16"
  },
  {
    id: 8,
    title: "Old Gold Purchasing & Metal Exchange Valuation",
    description: "How to accept old gold from customers, calculate purity conversions (Tunch value), make weight deductions, and adjust billing totals.",
    category: "Billing",
    youtubeUrl: "https://youtu.be/ecyKPCz3dzI",
    duration: "14:50",
    difficulty: "Intermediate",
    createdAt: "2026-07-15"
  },
  {
    id: 9,
    title: "Designing Custom Tax Invoices & Thermal Print layouts",
    description: "Customization guide for invoices: format borders, load store logo, adjust column fields, and set thermal print template dimensions.",
    category: "Software Setup",
    youtubeUrl: "https://youtu.be/TXFFdvNywfU",
    duration: "08:12",
    difficulty: "Intermediate",
    createdAt: "2026-07-14"
  },
  {
    id: 10,
    title: "Jewelry Gold Savings Scheme & Chit Fund (Kitty) Management",
    description: "Organize customer monthly installment saving schemes, track collection details, and configure discount rules on maturity purchases.",
    category: "Scheme / Kitty",
    youtubeUrl: "https://youtu.be/yrr0Un9Ql00",
    duration: "11:20",
    difficulty: "Intermediate",
    createdAt: "2026-07-12"
  },
  {
    id: 11,
    title: "Girvi Gold Loan Management & Interest Ledger Setup",
    description: "Complete guide on pawn brokering: logging gold collateral weights, interest rate calculation schedules, and tracking loan approvals.",
    category: "Gold Loan / Girvi",
    youtubeUrl: "https://youtu.be/yyUDIRchXT0",
    duration: "16:30",
    difficulty: "Advanced",
    createdAt: "2026-07-10"
  },
  {
    id: 12,
    title: "Creating Premium Jewelry Estimations & Quotations",
    description: "Learn how to prepare formal sales quotations and cost estimates for high-value client designs before executing final invoicing.",
    category: "Sales",
    youtubeUrl: "https://youtu.be/WM82u4qR3WQ",
    duration: "07:45",
    difficulty: "Beginner",
    createdAt: "2026-07-09"
  },
  {
    id: 13,
    title: "TSC Label Barcode Printer Configuration",
    description: "Setup TSC thermal printers for labeling. Calibrate label sensors, adjust media parameters, and alignment print settings.",
    category: "Barcode",
    youtubeUrl: "https://youtu.be/OScDwGqPUoI",
    duration: "09:30",
    difficulty: "Intermediate",
    createdAt: "2026-07-08"
  },
  {
    id: 14,
    title: "Zebra Barcode Printer Layout & Label Setup",
    description: "Configure Zebra thermal printers. Setup custom print tags and margins for jewelry labels.",
    category: "Barcode",
    youtubeUrl: "https://youtu.be/koHpWryxYyY",
    duration: "08:50",
    difficulty: "Intermediate",
    createdAt: "2026-07-07"
  },
  {
    id: 15,
    title: "Initial Material Stock & Tag Weight Setup",
    description: "Configure your initial stock weights, item tags, and master records settings when starting on Online Munim.",
    category: "Inventory",
    youtubeUrl: "https://youtu.be/Kbddugheiqg",
    duration: "13:10",
    difficulty: "Beginner",
    createdAt: "2026-07-05"
  },
  {
    id: 16,
    title: "Online Munim Core Preferences & Global Controls",
    description: "Understand the core software configuration menu. Toggles access parameters, printer drivers, and security settings.",
    category: "Software Setup",
    youtubeUrl: "https://youtu.be/FKv4nHJ2uKs",
    duration: "10:15",
    difficulty: "Beginner",
    createdAt: "2026-07-04"
  },
  {
    id: 17,
    title: "Multi-Client SQL Database Connectivity Sync Settings",
    description: "Configure database setups. Setup connection URLs, sync schedules, and solve multi-client server index errors.",
    category: "Troubleshooting",
    youtubeUrl: "https://youtu.be/k-_YO4jPH2I",
    duration: "11:40",
    difficulty: "Advanced",
    createdAt: "2026-07-03"
  },
  {
    id: 18,
    title: "Gold Hallmark HUID Setup & Bill Printing Compliance",
    description: "Register 6-digit Hallmark HUID numbers on item lists, verify status online, and output legal compliance fields on bills.",
    category: "Hallmark",
    youtubeUrl: "https://youtu.be/2JfF59ecWM0",
    duration: "06:20",
    difficulty: "Beginner",
    createdAt: "2026-07-02"
  },
  {
    id: 19,
    title: "Jewellers App: Premium Jewellery Billing App Demo",
    description: "Watch a complete feature walkthrough of the Jewellers App. Sync showroom bills, design catalogs, and client accounts directly on mobile.",
    category: "Mobile App",
    youtubeUrl: "https://youtu.be/OYA0xEOOXBw",
    duration: "05:15",
    difficulty: "Beginner",
    createdAt: "2026-06-30"
  },
  {
    id: 20,
    title: "Double-Entry Accounting & Ledger Balance Audit",
    description: "Learn how to audit cash drawers, create manual journal entries, track customer payments, and review balance sheets.",
    category: "Accounting",
    youtubeUrl: "https://youtu.be/ffboqfNn4ns",
    duration: "15:20",
    difficulty: "Advanced",
    createdAt: "2026-06-25"
  },
  
  // Real Youtube Shorts from User (12 items)
  {
    id: 21,
    title: "Smart Jewellery Inventory Management Using RFID Technology",
    description: "Optimize stock auditing and mapping inside your retail showroom.",
    category: "RFID",
    youtubeUrl: "https://youtube.com/shorts/FxUdRryW1vU",
    short: true,
    duration: "00:35",
    difficulty: "Beginner",
    createdAt: "2026-07-24"
  },
  {
    id: 22,
    title: "Scan 1000 Jewellery Items in Seconds with RFID Technology!",
    description: "Watch a live demonstration of massive gold ornament tag scans.",
    category: "RFID",
    youtubeUrl: "https://youtube.com/shorts/YPapOJVbVTA",
    short: true,
    duration: "00:40",
    difficulty: "Beginner",
    createdAt: "2026-07-24"
  },
  {
    id: 23,
    title: "Still searching for missing jewellery manually? 🤔",
    description: "Proximity stock locating and missing gold item resolution tutorial.",
    category: "RFID",
    youtubeUrl: "https://youtube.com/shorts/D5sNxunBRW8",
    short: true,
    duration: "00:30",
    difficulty: "Beginner",
    createdAt: "2026-07-23"
  },
  {
    id: 24,
    title: "Jewellery Shop Theft Caught! This RFID Gate Stopped the Theft Instantly 🚨",
    description: "Ensure showroom safety using standard entry/exit RFID alarm poles.",
    category: "RFID",
    youtubeUrl: "https://youtube.com/shorts/H83IRarSk4I",
    short: true,
    duration: "00:45",
    difficulty: "Intermediate",
    createdAt: "2026-07-23"
  },
  {
    id: 25,
    title: "How RFID Gate Works in Palmonas Jewellery Shop | Live Demo 💎",
    description: "Live demonstration of scanning and security gates in action.",
    category: "RFID",
    youtubeUrl: "https://youtube.com/shorts/48Vy73Nfw04",
    short: true,
    duration: "00:50",
    difficulty: "Intermediate",
    createdAt: "2026-07-22"
  },
  {
    id: 26,
    title: "Jewellery Software Gold Loan Setup Explained 🔥",
    description: "Pawn brokerage setup, daily/monthly interest scales, and client logs.",
    category: "Gold Loan / Girvi",
    youtubeUrl: "https://youtube.com/shorts/L9BjlNDVoXw",
    short: true,
    duration: "00:25",
    difficulty: "Beginner",
    createdAt: "2026-07-22"
  },
  {
    id: 27,
    title: "Smart Gold Loan Software for Modern Businesses",
    description: "Pawn-brokering ledger accounting, metal deposits, and fiscal years.",
    category: "Gold Loan / Girvi",
    youtubeUrl: "https://youtube.com/shorts/-Nf0O2i0gE0",
    short: true,
    duration: "00:40",
    difficulty: "Beginner",
    createdAt: "2026-07-21"
  },
  {
    id: 28,
    title: "RFID Jewellery Stock Tally Software Demo",
    description: "Live demo of batch-tag weight audits and Excel sheets export.",
    category: "RFID",
    youtubeUrl: "https://youtube.com/shorts/R10bMspsBII",
    short: true,
    duration: "00:55",
    difficulty: "Intermediate",
    createdAt: "2026-07-21"
  },
  {
    id: 29,
    title: "How RFID Reader Works for Jewellery Business",
    description: "How to use handheld scanner grips to update store stocks.",
    category: "RFID",
    youtubeUrl: "https://youtube.com/shorts/x_0Lje_HtKk",
    short: true,
    duration: "00:45",
    difficulty: "Beginner",
    createdAt: "2026-07-20"
  },
  {
    id: 30,
    title: "How to Create a Professional Jewellery Invoice",
    description: "Billing with customer images, HUID registry, and discounts.",
    category: "Billing",
    youtubeUrl: "https://youtube.com/shorts/cBHeUOsoQTs",
    short: true,
    duration: "00:50",
    difficulty: "Beginner",
    createdAt: "2026-07-20"
  },
  {
    id: 31,
    title: "How Jewellers Can Sell Jewellery Online During Festival Season",
    description: "Launch your showroom's e-commerce digital store catalog in 5 minutes.",
    category: "Mobile App",
    youtubeUrl: "https://youtube.com/shorts/a5s1uwoVfAI",
    short: true,
    duration: "00:59",
    difficulty: "Advanced",
    createdAt: "2026-07-19"
  },
  {
    id: 32,
    title: "Fast & Accurate Jewellery Billing System",
    description: "Speed up retail POS checkout times and print compliance fields.",
    category: "Billing",
    youtubeUrl: "https://youtube.com/shorts/3FmMesDYEm4",
    short: true,
    duration: "00:52",
    difficulty: "Intermediate",
    createdAt: "2026-07-18"
  },
  {
    id: 33,
    title: "Wholesale Stock Management in Omunim Jewellery Software",
    description: "Covers adding wholesale stock, stock reports, inventory editing, and converting wholesale lot stock to retail item tags.",
    category: "Inventory",
    youtubeUrl: "https://youtu.be/rn657QoSfME",
    featured: true,
    duration: "14:20",
    difficulty: "Intermediate",
    createdAt: "2026-08-11"
  },
  {
    id: 34,
    title: "How to Sell Products on Online Munim (omunim.com)",
    description: "Complete practical guide covering user setup, single and multi-item sales, direct sales, URD/old gold purchases, and sales reports.",
    category: "Sales",
    youtubeUrl: "https://youtu.be/rZfTTwQcQec",
    duration: "16:45",
    difficulty: "Beginner",
    createdAt: "2026-08-11"
  },
  {
    id: 35,
    title: "Learn How to Manage Retail Stock Effortlessly",
    description: "Comprehensive tutorial on managing retail stock, item tagging, stock level updates, and generating instant inventory reports.",
    category: "Inventory",
    youtubeUrl: "https://youtu.be/PItMYLF-Bj8",
    duration: "11:30",
    difficulty: "Beginner",
    createdAt: "2026-08-11"
  }
];

export async function GET() {
  try {
    // Dynamically fetch latest uploads from Online Munim YouTube Channel
    const fetchedVideos = await fetchLatestYouTubeVideos('@OnlineMunim');

    if (fetchedVideos && fetchedVideos.length > 0) {
      // Deduplicate: Filter out videos that already exist in VIDEOS array
      const existingUrls = new Set(
        VIDEOS.map((v) => {
          const match = v.youtubeUrl.match(/(?:youtu\.be\/|watch\?v=|shorts\/)([^#&?]*)/);
          return match ? match[1] : v.youtubeUrl;
        })
      );

      const newUniqueVideos = fetchedVideos.filter((fv) => {
        const match = fv.youtubeUrl.match(/(?:youtu\.be\/|watch\?v=|shorts\/)([^#&?]*)/);
        const id = match ? match[1] : fv.youtubeUrl;
        return !existingUrls.has(id);
      });

      // Combine newly synced videos at top with seed dataset
      const combinedVideos = [...newUniqueVideos, ...VIDEOS];
      return NextResponse.json(combinedVideos);
    }
  } catch (error) {
    console.error('Error auto-syncing YouTube feed:', error);
  }

  // Fallback to internal dataset
  return NextResponse.json(VIDEOS);
}
