import Link from 'next/link';
import { GraduationCap, MessageSquare, Phone, Mail, Shield, Scale } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link href="/" className="group hover:opacity-95 transition-opacity inline-block">
              <Logo size="sm" />
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm">
              The premier learning platform for Online Munim ERP Software. Streamline your jewelry billing, purchase, stock tracking, and hallmark compliance.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://youtube.com/@onlinemunim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300"
                title="Subscribe to YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-green-500 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Videos
                </Link>
              </li>

              <li>
                <Link href="/support" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex flex-col text-xs md:text-sm text-zinc-400 gap-1">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>+91 85509 58585</span>
                </span>
                <span className="flex items-center gap-2 pl-6">
                  <span>+91 98606 18508</span>
                </span>
              </li>
              <li className="flex items-center text-xs md:text-sm text-zinc-400 gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>info@omunim.com.in</span>
              </li>
              <li className="flex items-center text-xs md:text-sm text-zinc-400 gap-2">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span>Mon - Sat: 10AM to 7PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright / policy links */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs">
            &copy; {currentYear} Online Munim Academy. All rights reserved. Built with Next.js.
          </p>
          <div className="flex space-x-6">
            <Link href="/support" className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-xs transition-colors">
              <Scale className="w-3.5 h-3.5" /> Privacy Policy
            </Link>
            <Link href="/support" className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-xs transition-colors">
              <Shield className="w-3.5 h-3.5" /> Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
