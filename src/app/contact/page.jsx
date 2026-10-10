"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMail, FiMessageCircle, FiPhoneCall, FiSend, FiCheckCircle } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Commercial Licensing",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Message received! A representative will reply within 2 hours.", "success");
  };

  return (
    <div className="py-16 w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          We&apos;re Here to Help
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Questions regarding custom enterprise licensing, API integration keys, or billing inquiries? Our global support team is available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact info channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Direct Channels
            </h3>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
                <FiMail size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Email Inquiries</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">support@digitools.io</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Average response under 2 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
                <FiMessageCircle size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Community Discord</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">discord.gg/digitools</p>
                <p className="text-[11px] text-slate-400 mt-0.5">50,000+ active creators</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
                <FiPhoneCall size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Enterprise Phone</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">+1 (800) 555-DIGI</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Dedicated for Enterprise tier</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-linear-to-br from-purple-600 to-indigo-700 text-white p-6 shadow-md">
            <h4 className="text-sm font-bold">Looking for quick answers?</h4>
            <p className="text-xs text-purple-100 mt-1">
              Browse our comprehensive FAQ section covering commercial usage, file downloads, and refunds.
            </p>
            <Link
              href="/#faq"
              className="inline-block mt-4 text-xs font-bold text-white underline hover:text-purple-200"
            >
              Browse Knowledge Base →
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-lg">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Taylor Morgan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="taylor@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Commercial Licensing">Commercial Licensing Questions</option>
                    <option value="Enterprise Quote">Enterprise Quote & Team Access</option>
                    <option value="Technical Support">Technical Support / Asset Download</option>
                    <option value="Partnership">Creator Partnership & Submissions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Detailed Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project requirements or question..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <FiSend /> Send Message
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <FiCheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Message Dispatched!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold">{formData.name}</span>. An engineer or account specialist has been assigned and will reply to <span className="font-semibold">{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
