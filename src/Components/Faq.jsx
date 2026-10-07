"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FiChevronDown, FiHelpCircle, FiSearch, FiMessageSquare } from "react-icons/fi";
import { faqData } from "../data/faqData";

const categories = ["All", "General", "Billing", "Licensing", "Technical"];

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState([1]); // First FAQ opened by default

  const toggleAccordion = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchCat =
        activeCategory === "All" || item.category === activeCategory;
      const matchQuery =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="py-20 w-11/12 max-w-5xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
          Got Questions?
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Everything you need to know about plans, commercial licensing, asset formats, and client rights.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-purple-100 dark:bg-purple-950 text-purple-600" : ""
                    }`}
                  >
                    <FiChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              No questions found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Still need help callout */}
      <div className="mt-12 p-6 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/70 dark:border-purple-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
            <FiHelpCircle size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Still have questions?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Our support engineers and licensing team are available 24/7.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-purple-300 text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <FiMessageSquare /> Ask a Question
        </Link>
      </div>
    </section>
  );
}
