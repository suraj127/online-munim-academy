import { NextResponse } from 'next/server';

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  videoCount: number;
}

const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Installation",
    description: "Install Online Munim desktop client, SQL database drivers, and local runtime.",
    icon: "Download",
    videoCount: 2
  },
  {
    id: 2,
    name: "Software Setup",
    description: "Initial settings, company creation, print templates, and fiscal year configurations.",
    icon: "Settings",
    videoCount: 3
  },
  {
    id: 3,
    name: "Billing",
    description: "Master quick retail billing, thermal receipt layout setup, and billing templates.",
    icon: "ReceiptText",
    videoCount: 3 // Shifted Scheme/Kitty out
  },
  {
    id: 4,
    name: "Purchase",
    description: "Record purchases, supplier profiles, inward batch management, and barcode printing.",
    icon: "ShoppingCart",
    videoCount: 2
  },
  {
    id: 5,
    name: "Sales",
    description: "Manage retail sales, wholesale orders, cash desk reconciliation, and sales returns.",
    icon: "BadgeDollarSign",
    videoCount: 2
  },
  {
    id: 6,
    name: "Inventory",
    description: "Stock adjustment, stock transfer between branches, low-stock warnings, and tracking.",
    icon: "Box",
    videoCount: 3
  },
  {
    id: 7,
    name: "Barcode",
    description: "Generate unique product barcodes, format design layout, and print on thermal labels.",
    icon: "Barcode",
    videoCount: 2
  },
  {
    id: 8,
    name: "RFID",
    description: "Configure RFID reader hardware, batch tag items, and execute stock audit in seconds.",
    icon: "Radio",
    videoCount: 7
  },
  {
    id: 9,
    name: "GST",
    description: "Configure HSN/SAC codes, state-wise taxes (CGST/SGST/IGST), and return reporting.",
    icon: "Percent",
    videoCount: 2
  },
  {
    id: 10,
    name: "Reports",
    description: "Export sales ledgers, GST summaries, inventory valuations, and audit logs to Excel.",
    icon: "FileBarChart",
    videoCount: 3
  },
  {
    id: 11,
    name: "Accounting",
    description: "Balance sheets, cash flow tracking, ledger accounts, and manual journal entries.",
    icon: "Calculator",
    videoCount: 1 // Shifted Loan out, added Simplify Loan
  },
  {
    id: 12,
    name: "Hallmark",
    description: "Gold/Silver Hallmark standard settings, HUID tracking, and karat purity configurations.",
    icon: "Award",
    videoCount: 2
  },
  {
    id: 13,
    name: "Order Module",
    description: "Customer custom design orders, deposit vouchers, delivery scheduling, and updates.",
    icon: "FileText",
    videoCount: 2
  },
  {
    id: 14,
    name: "Karigar Module",
    description: "Track worker metal issuance, return weights, wastage, pure gold balancing, and wages.",
    icon: "Users",
    videoCount: 3
  },
  {
    id: 15,
    name: "Mobile App",
    description: "Sync mobile dashboard, live sales notifications, and offline access controls.",
    icon: "Smartphone",
    videoCount: 2
  },
  {
    id: 16,
    name: "Cloud",
    description: "Setup automatic daily Google Drive backup, Cloud replication, and restore procedures.",
    icon: "Cloud",
    videoCount: 2
  },
  {
    id: 17,
    name: "User Management",
    description: "Add cashiers, assign specific module permissions, and audit logs monitoring.",
    icon: "UserCheck",
    videoCount: 2
  },
  {
    id: 18,
    name: "Troubleshooting",
    description: "Fix printer driver mismatches, database index issues, and offline sync conflicts.",
    icon: "AlertCircle",
    videoCount: 3
  },
  {
    id: 19,
    name: "Tips & Tricks",
    description: "Power-user keyboard shortcuts, rapid barcode scan setup, and billing macros.",
    icon: "Sparkles",
    videoCount: 4
  },
  {
    id: 20,
    name: "Scheme / Kitty",
    description: "Manage customer monthly savings schemes, collection ledgers, and scheme maturity payouts.",
    icon: "Layers",
    videoCount: 1
  },
  {
    id: 21,
    name: "Gold Loan / Girvi",
    description: "Track pawn-brokering, gold collateral weights, interest calculation schedules, and loan approvals.",
    icon: "BadgeDollarSign",
    videoCount: 3
  }
];

export async function GET() {
  return NextResponse.json(CATEGORIES);
}
