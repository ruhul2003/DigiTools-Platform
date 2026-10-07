"use client";

import { useState, useMemo } from "react";
import ToolCard from "./ToolCard";
import QuickViewModal from "./QuickViewModal";
import { toolsData, categoriesList } from "../data/toolsData";
import { useWishlist } from "../context/WishlistContext";
import { FiSearch, FiSliders, FiHeart, FiRefreshCw } from "react-icons/fi";

export default function Catalog({ initialSearch = "" }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("popular");
  const [onlyWishlist, setOnlyWishlist] = useState(false);
  const [quickViewTool, setQuickViewTool] = useState(null);

  const { wishlist } = useWishlist();

  // Filter and sort items
  const filteredTools = useMemo(() => {
    return toolsData
      .filter((tool) => {
        // Category filter
        const matchCategory =
          selectedCategory === "All" || tool.category === selectedCategory;

        // Search query filter
        const matchSearch =
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchQuery.toLowerCase());

        // Wishlist filter
        const matchWishlist = !onlyWishlist || wishlist.includes(tool.id);

        return matchCategory && matchSearch && matchWishlist;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        // Default: popular (by reviewCount)
        return b.reviewCount - a.reviewCount;
      });
  }, [selectedCategory, searchQuery, sortBy, onlyWishlist, wishlist]);

  return (
    <section id="products" className="py-20 w-11/12 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
          Curated Catalog
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          Explore Our Digital Suite
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Tested, production-grade tools, templates, and automation setups. Built for creators, agencies, and high-growth makers.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs mb-10 space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Controls Row: Search, Wishlist Toggle, Sort By */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* Wishlist only toggle */}
            <button
              onClick={() => setOnlyWishlist(!onlyWishlist)}
              className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                onlyWishlist
                  ? "border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <FiHeart className={onlyWishlist ? "fill-rose-500 text-rose-500" : ""} size={14} />
              Wishlist ({wishlist.length})
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <FiSliders className="text-slate-400" size={14} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onQuickView={(item) => setQuickViewTool(item)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto">
          <p className="text-4xl mb-3">🔍</p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No tools match your criteria</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Try resetting your search query or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setOnlyWishlist(false);
            }}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors"
          >
            <FiRefreshCw size={12} /> Reset Filters
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewTool && (
        <QuickViewModal
          product={quickViewTool}
          onClose={() => setQuickViewTool(null)}
        />
      )}
    </section>
  );
}
