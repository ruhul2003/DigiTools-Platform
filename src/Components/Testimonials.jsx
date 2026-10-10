"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiStar, FiCheckCircle, FiEdit3, FiX, FiFilter } from "react-icons/fi";
import { initialTestimonials } from "../data/testimonialsData";
import { useCart } from "../context/CartContext";

export default function Testimonials() {
  const [reviews, setReviews] = useState(initialTestimonials);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { showToast } = useCart();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("digitools_testimonials");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    rating: 5,
    toolUsed: "AI Writing Pro",
    content: "",
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.content) return;

    const newReview = {
      id: Date.now(),
      name: formData.name,
      role: formData.role || "Creator",
      company: formData.company || "Independent",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      rating: Number(formData.rating),
      date: "Just now",
      toolUsed: formData.toolUsed,
      content: formData.content,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem("digitools_testimonials", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setShowReviewModal(false);
    showToast("Thank you for your feedback! Review published.", "success");
    setFormData({
      name: "",
      role: "",
      company: "",
      rating: 5,
      toolUsed: "AI Writing Pro",
      content: "",
    });
  };

  const filteredReviews = ratingFilter === "all"
    ? reviews
    : reviews.filter((r) => r.rating === Number(ratingFilter));

  return (
    <section id="testimonials" className="py-20 w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
            Real Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Trusted by 50,000+ Creators & Teams
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            See how top makers and agencies accelerate their output with DigiTools.
          </p>
        </div>

        <button
          onClick={() => setShowReviewModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md shadow-purple-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <FiEdit3 size={15} /> Write a Review
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1.5 shrink-0">
          <FiFilter size={13} /> Filter:
        </span>
        {[
          { label: "All Reviews", value: "all", count: reviews.length },
          { label: "5-Star Rating", value: "5", count: reviews.filter((r) => r.rating === 5).length },
          { label: "4-Star Rating", value: "4", count: reviews.filter((r) => r.rating === 4).length },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setRatingFilter(tab.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer shrink-0 border ${
              ratingFilter === tab.value
                ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            {tab.label}{" "}
            <span
              className={`text-[10px] ml-1 px-1.5 py-0.5 rounded-full ${
                ratingFilter === tab.value
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredReviews.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-800 transition-all duration-300"
          >
            <div>
              {/* Stars & Tool badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <FiStar key={i} size={14} className="fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                  {item.toolUsed}
                </span>
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                &ldquo;{item.content}&rdquo;
              </p>
            </div>

            {/* Author Meta */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {item.name}
                  </h4>
                  <FiCheckCircle className="text-emerald-500 shrink-0 text-xs" title="Verified Customer" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {item.role} • {item.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Submit Your Review
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Share your experience with the DigiTools community.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jordan Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Title / Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Product Manager"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Studio"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={5}>5 - Extraordinary</option>
                    <option value={4}>4 - Great Value</option>
                    <option value={3}>3 - Good</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tool Evaluated
                  </label>
                  <select
                    value={formData.toolUsed}
                    onChange={(e) => setFormData({ ...formData, toolUsed: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="AI Writing Pro">AI Writing Pro</option>
                    <option value="Design Templates">Design Templates</option>
                    <option value="Automation Toolkit">Automation Toolkit</option>
                    <option value="Resume Builder Pro">Resume Builder Pro</option>
                    <option value="Freelancer Toolkit">Freelancer Toolkit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="How did DigiTools help your business or personal projects?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md shadow-purple-500/25 transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
