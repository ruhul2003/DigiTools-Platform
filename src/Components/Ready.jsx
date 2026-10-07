"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiMail } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function Ready() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please provide a valid email address.", "error");
      return;
    }
    setSubscribed(true);
    showToast("Subscribed! Check your inbox for your 20% discount code.", "success");
    setEmail("");
  };

  return (
    <section className="py-16 w-11/12 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-purple-700 via-indigo-700 to-purple-800 text-white p-8 sm:p-14 lg:p-20 text-center shadow-2xl shadow-purple-900/30">
        {/* Glow ambient background effect */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xs text-purple-200 mb-6 border border-white/20">
            Join The DigiTools Network
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Ready to Supercharge Your Workflow?
          </h2>

          <p className="mt-5 text-sm sm:text-base text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Join 50,000+ designers, engineers, and creators who ship work 4x faster with our curated suite of digital tools.
          </p>

          {/* Newsletter / Direct Access Form */}
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for 20% off..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-md"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-lg shadow-amber-500/30 whitespace-nowrap"
              >
                Claim 20% Off
              </button>
            </form>
          ) : (
            <div className="mt-8 p-4 rounded-2xl bg-white/15 backdrop-blur-sm max-w-md mx-auto text-xs sm:text-sm flex items-center justify-center gap-2">
              <FiCheckCircle className="text-emerald-300 text-lg" />
              <span>Promo code <strong>DIGI20</strong> has been applied to your cart!</span>
            </div>
          )}

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#products"
              className="px-7 py-3 rounded-2xl bg-white text-purple-700 hover:bg-purple-50 font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              Browse Products <FiArrowRight />
            </a>
            <a
              href="#pricing"
              className="px-7 py-3 rounded-2xl bg-purple-900/60 hover:bg-purple-900/80 text-white font-semibold text-xs sm:text-sm border border-purple-400/40 transition-all"
            >
              Compare Plans
            </a>
          </div>

          {/* Trust Guarantees */}
          <p className="mt-8 text-xs text-purple-200/80">
            14-day free trial • No credit card required • Cancel anytime • Instant access
          </p>
        </div>
      </div>
    </section>
  );
}