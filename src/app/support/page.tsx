'use client';

import { useState } from 'react';
import { PhoneCall, MessageCircle, Mail, MonitorPlay, ChevronDown, CheckCircle, HelpCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    id: 1,
    question: "How do I calibrate my TSC or Zebra barcode tag printer?",
    answer: "Go to the Barcode category, open the printer configuration tutorials, check the sensor calibration guides, adjust the label gap values, and run page setup test tags."
  },
  {
    id: 2,
    question: "How is interest calculated in the Gold Loan / Girvi module?",
    answer: "The Girvi module lets you configure dynamic money lending profiles. You can set daily, monthly, or annualized interest rates, record scrap gold valuations, and let the ledger calculate balances automatically."
  },
  {
    id: 3,
    question: "What is required to register Hallmark HUID compliance?",
    answer: "You can configure HUID under the Hallmark module. Add the 6-digit Hallmark HUID code when listing jewelry items; it will automatically print on customer invoices to stay fully compliant."
  },
  {
    id: 4,
    question: "How do I secure my database with Google Drive backups?",
    answer: "Set up the Cloud Backup Scheduler to sync your database folders automatically to Google Drive at the end of each day. Make sure your Google account sync preferences are active."
  },
  {
    id: 5,
    question: "How do I issue metal and track wastage for Karigars?",
    answer: "The Karigar Module allows you to issue gold or silver bars/scrap to craftsmen. When they return the finished jewelry, you enter the net weight and melting loss. The system automatically balances the metal ledger and accounts for wastage wages."
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  
  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const channels = [
    {
      title: "WhatsApp Support",
      description: "Chat with a technician instantly for minor issues.",
      value: "+91 85509 58585",
      actionText: "Open WhatsApp Chat",
      icon: <MessageCircle className="w-6 h-6 text-green-400" />,
      href: "https://wa.me/918550958585",
      bgHover: "hover:border-green-500/30 hover:shadow-green-500/5"
    },
    {
      title: "Call Support Helpline",
      description: "Speak directly with our support team (10AM to 7PM).",
      value: "+91 98606 18508",
      actionText: "Call Tech Support",
      icon: <PhoneCall className="w-6 h-6 text-cyan-400" />,
      href: "tel:+919860618508",
      bgHover: "hover:border-cyan-500/30 hover:shadow-cyan-500/5"
    },
    {
      title: "Email Support Tickets",
      description: "For licensing issues, queries, or billing audits.",
      value: "info@omunim.com.in",
      actionText: "Compose Email Ticket",
      icon: <Mail className="w-6 h-6 text-blue-400" />,
      href: "mailto:info@omunim.com.in",
      bgHover: "hover:border-blue-500/30 hover:shadow-blue-500/5"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#040814] py-16 md:py-24">
      {/* Ambient glowing dots */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Support Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support Desk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white">Help & Assistance</h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-sans">
            Need help? Contact our dedicated support team, launch a remote desktop support session, or check our FAQs below.
          </p>
        </div>

        {/* Important IVR Update Announcement Banner */}
        <div className="glass p-6 rounded-3xl border border-[#FF7A00]/25 shadow-[0_0_15px_rgba(255,122,0,0.1)] mb-12 flex flex-col md:flex-row items-center gap-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FF7A00]/10 to-[#3B82F6]/5 rounded-bl-full opacity-50" />
          <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/10 border border-[#FF7A00]/20 flex items-center justify-center text-xl flex-shrink-0 animate-bounce">
            📢
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:+918550958585" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF7A00]/30 text-white font-semibold text-xs md:text-sm transition-all hover:scale-[1.01]">
              📞 +91 85509 58585
            </a>
            <a href="tel:+919860618508" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#3B82F6]/30 text-white font-semibold text-xs md:text-sm transition-all hover:scale-[1.01]">
              📞 +91 98606 18508
            </a>
          </div>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {channels.map((ch, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className={`glass-card p-6 rounded-3xl border border-zinc-900 transition-all flex flex-col justify-between h-full ${ch.bgHover}`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                  {ch.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{ch.title}</h3>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">{ch.description}</p>
                </div>
                <div className="text-xs font-semibold text-zinc-300 bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-900 truncate">
                  {ch.value}
                </div>
              </div>
              
              <div className="mt-6">
                <a
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/15 border border-white/5 text-white transition-colors"
                >
                  {ch.actionText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2 Column FAQ & Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: FAQ Accordions (7/12 width) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold font-display text-white border-b border-zinc-900 pb-3 mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-3">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="glass border border-zinc-900 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left text-white hover:text-accent font-semibold text-sm md:text-base transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 pt-1 text-zinc-400 text-xs md:text-sm leading-relaxed border-t border-zinc-900/50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Sign-In Portal Access (5/12 width) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass p-6 md:p-8 rounded-3xl border border-[#FF7A00]/15 relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/5 rounded-bl-full filter blur-xl animate-pulse" />
              <div className="space-y-4 relative z-10">
                <h2 className="text-xl font-bold font-display text-white border-b border-zinc-900 pb-3 flex items-center gap-2">
                  <span className="text-[#FF7A00]">👤</span> Account & Registration
                </h2>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  To register your jewelry store profile, sign up for a new software account, manage your billing subscription licenses, or log in to your active cloud server, visit our official Online Munim portal.
                </p>
              </div>
              
              <div className="mt-8 relative z-10">
                <a
                  href="https://omunim.com/signin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FF7A00] to-[#FF9E00] hover:from-[#FF8A00] hover:to-[#FFB400] text-zinc-950 shadow-lg shadow-orange-500/10 transition-all hover:scale-[1.01]"
                >
                  Go to Sign-In Portal <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
