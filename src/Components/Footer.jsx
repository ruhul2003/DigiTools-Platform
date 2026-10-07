"use client";

import Link from "next/link";
import { FiLayers, FiGithub, FiTwitter, FiLinkedin, FiDisc, FiCheckCircle } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="w-11/12 max-w-7xl mx-auto pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <FiLayers size={20} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Digi<span className="text-purple-400">Tools</span>
              </span>
            </Link>

            <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Curated suite of production-grade digital tools, templates, AI assistants, and automation blueprints built to help creators and teams execute with precision.
            </p>

            {/* System Status indicator */}
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational • 99.98% Uptime</span>
            </div>
          </div>

          {/* Catalog Columns */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/#products" className="hover:text-purple-400 transition-colors">
                  AI Writing Assistant
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-purple-400 transition-colors">
                  Design Templates Pack
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-purple-400 transition-colors">
                  Automation Blueprint OS
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-purple-400 transition-colors">
                  ATS Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-purple-400 hover:text-purple-300 transition-colors font-semibold">
                  Interactive Playground →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/#pricing" className="hover:text-purple-400 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-purple-400 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-purple-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">
                  Affiliate Program (Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Socials & Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Community
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Connect with 50k+ creators, share tips, and vote on upcoming tools.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-purple-600 hover:text-white transition-colors"
              >
                <FaXTwitter size={15} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-pink-600 hover:text-white transition-colors"
              >
                <FaInstagram size={15} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <FaFacebook size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} DigiTools Platform. Engineered for high-velocity creators.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Commercial Licensing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}