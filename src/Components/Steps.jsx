"use client";

import Image from "next/image";
import { useState } from "react";
import { FiCheckCircle, FiCompass, FiShield, FiSend } from "react-icons/fi";

const stepsList = [
  {
    step: 1,
    title: "Browse & Select",
    subtitle: "Explore our curated inventory",
    description: "Search by use-case, filter by category, and inspect detailed specs, live previews, and customer ratings.",
    icon: "/assets/user.png",
    detail: "Over 200+ ready-to-use digital assets"
  },
  {
    step: 2,
    title: "Instant Cloud Access",
    subtitle: "Checkout in under 60 seconds",
    description: "Unlock immediate download links, cloud integrations, and commercial usage licenses with zero friction.",
    icon: "/assets/package.png",
    detail: "Lifetime access & free minor updates"
  },
  {
    step: 3,
    title: "Deploy & Supercharge",
    subtitle: "Accelerate your production",
    description: "Integrate the tools into your daily workflow, automate tedious routines, and ship client deliverables faster.",
    icon: "/assets/rocket.png",
    detail: "Boost creative output by 400%"
  }
];

export default function Steps() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-20 w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
          How It Works
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          Get Started in 3 Simple Steps
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          From discovery to deployment in minutes. No complex setups or endless onboarding cycles.
        </p>
      </div>

      {/* Grid of 3 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {stepsList.map((item) => (
          <div
            key={item.step}
            onMouseEnter={() => setActiveStep(item.step)}
            className={`rounded-3xl p-8 border transition-all duration-300 relative flex flex-col justify-between ${
              activeStep === item.step
                ? "bg-white dark:bg-slate-900 border-purple-400 dark:border-purple-600 shadow-xl shadow-purple-500/10 -translate-y-2"
                : "bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            {/* Step Number Badge */}
            <div className="flex items-center justify-between mb-8">
              <span
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-colors ${
                  activeStep === item.step
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                0{item.step}
              </span>

              <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <FiCheckCircle size={12} /> {item.detail}
              </span>
            </div>

            {/* Step Icon */}
            <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-slate-800 p-3 flex items-center justify-center mb-6 border border-purple-100/80 dark:border-slate-700">
              <Image
                src={item.icon}
                alt={item.title}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-1">
                {item.subtitle}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}