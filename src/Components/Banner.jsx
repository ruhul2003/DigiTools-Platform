"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoPlayOutline } from "react-icons/io5";
import { FiSearch, FiZap, FiShield, FiArrowRight } from "react-icons/fi";

export default function Banner({ onSearchSubmit }) {
  const [query, setQuery] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(query);
    }
    const elem = document.getElementById("products");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-slate-100 dark:border-slate-800/80 bg-linear-to-b from-slate-50/70 via-transparent to-transparent dark:from-slate-900/40">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-500/10 dark:bg-purple-500/15 blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        {/* Left Column: Copy & Actions */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 border border-purple-200/80 dark:border-purple-800/80 shadow-2xs mb-6">
            <IoMdRadioButtonOn className="animate-pulse text-purple-600 dark:text-purple-400" />
            <span>Enterprise Suite • 200+ Vetted Software Tools & Blueprints</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Supercharge Your <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-purple-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Digital Velocity
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
            Gain immediate access to premium AI writers, vetted automation blueprints, conversion-focused design templates, and freelancer operating systems. Clean, minimal, and engineered for velocity.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearch} className="mt-8 w-full max-w-xl relative flex items-center">
            <div className="absolute left-4 text-slate-400">
              <FiSearch size={18} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI writing, blueprints, templates, career kits..."
              className="w-full pl-11 pr-32 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              Explore
            </button>
          </form>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3.5 mt-8">
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-sm shadow-purple-500/20 active:scale-95 transition-all text-xs sm:text-sm"
            >
              Browse Catalog <FiArrowRight />
            </a>
            <button
              onClick={() => setShowVideoModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all"
            >
              <IoPlayOutline size={18} className="text-purple-600 dark:text-purple-400" />
              Watch 2-Min Demo
            </button>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-purple-200 dark:border-purple-800/80 bg-purple-50/50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-semibold text-xs sm:text-sm hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all"
            >
              Live Playground →
            </Link>
          </div>

          {/* Trust points */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <FiZap className="text-amber-500" /> Instant Cloud Dispatch
            </span>
            <span className="flex items-center gap-1.5">
              <FiShield className="text-emerald-500" /> Commercial Unlimited License
            </span>
          </div>
        </div>

        {/* Right Column: Visual Showcase */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
          <div className="relative mx-auto w-full rounded-3xl p-3 bg-linear-to-br from-purple-200/50 via-indigo-100/30 to-transparent dark:from-purple-900/30 dark:via-slate-800/40 dark:to-transparent border border-purple-200/60 dark:border-purple-800/40 shadow-2xl">
            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 aspect-4/3 flex items-center justify-center">
              <Image
                src="/assets/banner.png"
                alt="DigiTools Dashboard Showcase"
                width={650}
                height={480}
                priority
                className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Floating Highlight Tag */}
            <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:left-4 glass-panel px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">50+ New Assets Added</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Updated for this release</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Demo */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 border border-slate-200 dark:border-slate-800 relative shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Platform Walkthrough Demo</h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                Close ✕
              </button>
            </div>
            <div className="aspect-video w-full bg-slate-950 rounded-2xl flex flex-col items-center justify-center text-white p-8 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-purple-600/90 flex items-center justify-center mb-4 cursor-pointer shadow-xl shadow-purple-500/50 hover:scale-110 transition-transform">
                <IoPlayOutline size={32} className="ml-1" />
              </div>
              <p className="text-sm font-semibold">Interactive Platform Overview</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Discover how DigiTools streamlines your creative workflow from ideation to final client delivery.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}