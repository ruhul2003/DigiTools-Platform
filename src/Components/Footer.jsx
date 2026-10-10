"use client";

import { useState } from "react";
import Link from "next/link";
import { FiLayers, FiGithub, FiTwitter, FiLinkedin, FiDisc, FiCheckCircle, FiCopy, FiCheck, FiGift, FiArrowRight } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { useCurrency, AVAILABLE_CURRENCIES } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { currency, setCurrency } = useCurrency();
  const { applyCoupon, showToast } = useCart();
  const [voucherEmail, setVoucherEmail] = useState("");
  const [generatedVoucher, setGeneratedVoucher] = useState("");
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  const handleGenerateVoucher = (e) => {
    e.preventDefault();
    if (!voucherEmail || !voucherEmail.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    const code = "DIGI15-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    setGeneratedVoucher(code);
    showToast(`VIP 15% voucher created: ${code}`, "success");
  };

  const handleCopyVoucher = () => {
    if (!generatedVoucher) return;
    navigator.clipboard?.writeText(generatedVoucher);
    setCopiedVoucher(true);
    showToast("Voucher code copied to clipboard!", "success");
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

  const handleApplyToCart = () => {
    if (!generatedVoucher) return;
    applyCoupon(generatedVoucher);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-12">
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

            {/* Interactive Newsletter Voucher Box */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-md">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-1">
                <FiGift /> VIP Insider Club
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Join our private newsletter to generate an instant 15% discount voucher.
              </p>
              {!generatedVoucher ? (
                <form onSubmit={handleGenerateVoucher} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={voucherEmail}
                    onChange={(e) => setVoucherEmail(e.target.value)}
                    placeholder="creator@domain.com"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shrink-0 cursor-pointer transition-colors"
                  >
                    Get Voucher
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-purple-800/60">
                    <span className="font-mono text-xs font-bold text-purple-300">
                      {generatedVoucher}
                    </span>
                    <button
                      onClick={handleCopyVoucher}
                      className="px-2.5 py-1 rounded-lg bg-purple-600/30 text-purple-300 hover:bg-purple-600 hover:text-white text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedVoucher ? <FiCheck /> : <FiCopy />} {copiedVoucher ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <button
                    onClick={handleApplyToCart}
                    className="w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    Apply Discount to Cart Now
                  </button>
                </div>
              )}
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
              <li>
                <Link href="/compare" className="text-purple-400 hover:text-purple-300 transition-colors font-semibold">
                  Compare Tools Matrix →
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
                <Link href="/wishlist" className="hover:text-purple-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-400 transition-colors">
                  Contact Support
                </Link>
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
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} DigiTools Platform. Engineered for high-velocity creators.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Commercial Licensing</span>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
            <span className="text-slate-500 px-2 font-medium">Currency:</span>
            {AVAILABLE_CURRENCIES.map((curr) => (
              <button
                key={curr.code}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-0.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  currency.code === curr.code
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {curr.code} ({curr.symbol})
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}