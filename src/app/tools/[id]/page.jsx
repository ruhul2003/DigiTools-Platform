"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toolsData } from "../../../data/toolsData";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import {
  FiArrowLeft,
  FiCheck,
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiDownload,
  FiShield,
  FiRefreshCw,
  FiLayers,
  FiExternalLink
} from "react-icons/fi";

export default function ToolDetailPage({ params }) {
  const unwrappedParams = use(params);
  const toolId = Number(unwrappedParams.id);
  const tool = toolsData.find((t) => t.id === toolId);

  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState("overview");

  if (!tool) {
    return notFound();
  }

  const isInCart = cartItems.some((item) => item.id === tool.id);
  const isBookmarked = isInWishlist(tool.id);
  const relatedTools = toolsData.filter((t) => t.id !== tool.id).slice(0, 3);

  return (
    <div className="py-10 w-11/12 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
        <Link href="/" className="hover:text-purple-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/#products" className="hover:text-purple-600 transition-colors">
          Catalog
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-semibold">
          {tool.name}
        </span>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Visual Showcase & Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 flex flex-col items-center justify-center relative shadow-sm">
            <span className="absolute top-6 left-6 text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              {tool.badge || "Featured Tool"}
            </span>

            <div className="w-56 h-56 sm:w-72 sm:h-72 relative flex items-center justify-center">
              <Image
                src={tool.image}
                alt={tool.name}
                width={260}
                height={260}
                priority
                className="object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="w-full mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <FiShield className="text-emerald-500" /> Vetted Clean Codebase
              </span>
              <span className="flex items-center gap-1.5">
                <FiRefreshCw className="text-purple-500" /> Free Continuous Updates
              </span>
            </div>
          </div>

          {/* Interactive Information Tabs */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <button
                onClick={() => setActiveTab("overview")}
                className={`text-xs sm:text-sm font-bold pb-2 transition-colors relative ${
                  activeTab === "overview"
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Comprehensive Overview
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`text-xs sm:text-sm font-bold pb-2 transition-colors relative ${
                  activeTab === "specs"
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Technical Specifications
              </button>
            </div>

            <div className="pt-6">
              {activeTab === "overview" ? (
                <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>{tool.longDescription || tool.description}</p>
                  <h4 className="font-bold text-slate-900 dark:text-white pt-2">
                    Key Capabilities & Value Props:
                  </h4>
                  <ul className="space-y-2">
                    {tool.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <FiCheck className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {Object.entries(tool.specs || {}).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60"
                    >
                      <p className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                        {key}
                      </p>
                      <p className="font-bold text-slate-900 dark:text-white mt-1">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Purchase Card */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              {tool.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {tool.name}
            </h1>

            {/* Rating & Social metrics */}
            <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                <FiStar className="fill-amber-400 text-amber-400" /> {tool.rating}
              </span>
              <span>•</span>
              <span>{tool.reviewCount} customer ratings</span>
              <span>•</span>
              <span>{tool.downloads} active users</span>
            </div>

            {/* Price section */}
            <div className="mt-6 p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    ${tool.price}
                  </span>
                  {tool.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ${tool.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-slate-500">
                    /{tool.period}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                  Save {Math.round((1 - tool.price / (tool.originalPrice || tool.price * 1.5)) * 100)}% with instant activation
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold text-xs">
                In Stock
              </span>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => addToCart(tool)}
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
                  isInCart
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25"
                    : "bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/25"
                }`}
              >
                <FiShoppingCart size={18} />
                {isInCart ? "Item in Cart • Add Another" : `Add to Cart - $${tool.price}`}
              </button>

              <button
                onClick={() => toggleWishlist(tool.id)}
                className={`w-full py-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isBookmarked
                    ? "border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <FiHeart className={isBookmarked ? "fill-rose-500 text-rose-500" : ""} />
                {isBookmarked ? "Saved in Your Wishlist" : "Bookmark to Wishlist"}
              </button>
            </div>

            {/* Guarantee badges */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <FiCheck className="text-emerald-500" />
                <span>Instant digital dispatch via email</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className="text-emerald-500" />
                <span>Commercial client use license included</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className="text-emerald-500" />
                <span>14-day 100% money back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Related Digital Tools
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Complementary assets creators frequently bundle together.
            </p>
          </div>
          <Link
            href="/#products"
            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
          >
            View All Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedTools.map((rel) => (
            <div
              key={rel.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-4 hover:border-purple-300 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 flex items-center justify-center shrink-0">
                <Image
                  src={rel.image}
                  alt={rel.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {rel.name}
                </h4>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
                  ${rel.price} <span className="text-[10px] text-slate-400 font-normal">/{rel.period}</span>
                </p>
                <Link
                  href={`/tools/${rel.id}`}
                  className="inline-block text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-purple-600 mt-1"
                >
                  Inspect details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
