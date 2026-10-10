"use client";

import { useState } from "react";
import { FiCheck, FiZap, FiArrowRight } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "annual"
  const { showToast, setIsCheckoutOpen } = useCart();
  const { formatPrice } = useCurrency();

  const isAnnual = billingCycle === "annual";

  const handleSelectPlan = (planName) => {
    showToast(`Selected ${planName} plan! Processing checkout...`, "success");
    setIsCheckoutOpen(true);
  };

  return (
    <section id="pricing" className="py-20 w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
          Flexible Subscriptions
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          Transparent, Predictable Pricing
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Upgrade or cancel whenever you want. Every tier includes commercial licenses, community access, and security updates.
        </p>

        {/* Billing Cycle Switcher */}
        <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
              !isAnnual
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isAnnual
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Annual Billing
            <span className="text-[10px] bg-amber-300 text-amber-950 font-black px-2 py-0.5 rounded-full">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Starter Plan */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between shadow-xs hover:border-purple-300 dark:hover:border-purple-900 transition-all hover:-translate-y-1">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Personal Free
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Starter</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Essential utilities for independent experimentation.
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{formatPrice(0)}</span>
              <span className="text-xs text-slate-500 font-medium">/month forever</span>
            </div>

            <ul className="mt-8 space-y-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-6">
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-emerald-500 shrink-0" />
                <span>Access to 10 community tools</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-emerald-500 shrink-0" />
                <span>Basic export formats (TXT, JSON)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-emerald-500 shrink-0" />
                <span>Community Discord support</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 line-through">
                <FiCheck className="text-slate-300 shrink-0" />
                <span>Commercial team license</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 line-through">
                <FiCheck className="text-slate-300 shrink-0" />
                <span>Custom API endpoints</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan("Starter")}
            className="mt-8 w-full py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
          >
            Get Started Free
          </button>
        </div>

        {/* Pro Plan - Highlighted */}
        <div className="rounded-3xl bg-linear-to-b from-purple-600 to-indigo-700 text-white p-8 flex flex-col justify-between shadow-xl shadow-purple-500/25 relative scale-105 z-10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-300 text-amber-950 font-black text-[11px] shadow-md tracking-wider uppercase">
            Most Popular
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                Professional
              </span>
              <span className="flex items-center gap-1 text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                <FiZap /> Fast Setup
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-1">Pro Suite</h3>
            <p className="text-xs text-purple-100 mt-2">
              For freelancers, indie hackers, and creative professionals.
            </p>

            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold text-white">
                {formatPrice(isAnnual ? 23 : 29)}
              </span>
              <span className="text-xs text-purple-200 font-medium">
                /month {isAnnual && `(billed ${formatPrice(276)}/yr)`}
              </span>
            </div>

            <ul className="mt-8 space-y-3 text-xs text-purple-100 border-t border-purple-400/30 pt-6">
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-white shrink-0 font-bold" />
                <span>Unlimited access to 200+ tools & templates</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-white shrink-0 font-bold" />
                <span>Commercial client license included</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-white shrink-0 font-bold" />
                <span>High-resolution 4K & RAW asset downloads</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-white shrink-0 font-bold" />
                <span>Priority email and ticket support (2hr response)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-white shrink-0 font-bold" />
                <span>Early beta access to new tools</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan("Pro")}
            className="mt-8 w-full py-3.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 font-extrabold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Start 14-Day Free Trial <FiArrowRight />
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between shadow-xs hover:border-purple-300 dark:hover:border-purple-900 transition-all hover:-translate-y-1">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Agency & Team
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Enterprise</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              For teams requiring custom integrations and dedicated support.
            </p>

            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {formatPrice(isAnnual ? 79 : 99)}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                /month {isAnnual && `(billed ${formatPrice(948)}/yr)`}
              </span>
            </div>

            <ul className="mt-8 space-y-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-6">
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-emerald-500 shrink-0" />
                <span>Everything in Pro Suite included</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-emerald-500 shrink-0" />
                <span>Team collaboration (up to 15 seats)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-emerald-500 shrink-0" />
                <span>Full REST API and webhook dispatching</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-emerald-500 shrink-0" />
                <span>Dedicated account manager & 99.9% SLA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="text-emerald-500 shrink-0" />
                <span>Custom white-label branding</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan("Enterprise")}
            className="mt-8 w-full py-3.5 rounded-xl border border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 font-bold text-xs transition-colors"
          >
            Contact Enterprise Sales
          </button>
        </div>
      </div>
    </section>
  );
}