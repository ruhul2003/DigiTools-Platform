"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiHeart, FiEye, FiShoppingCart, FiStar } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ToolCard({ tool, onQuickView }) {
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isBookmarked = isInWishlist(tool.id);
  const isInCart = cartItems.some((item) => item.id === tool.id);

  return (
    <div className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-900 transition-all duration-300 hover:-translate-y-1.5 relative">
      {/* Top Bar: Badge & Bookmark */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">
          {tool.category}
        </span>
        <div className="flex items-center gap-1.5">
          {tool.badge && (
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              {tool.badge}
            </span>
          )}
          <button
            onClick={() => toggleWishlist(tool.id)}
            aria-label="Save to Wishlist"
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-500 transition-colors"
          >
            <FiHeart size={16} className={isBookmarked ? "fill-rose-500 text-rose-500" : ""} />
          </button>
        </div>
      </div>

      {/* Product Image & Quick View Hover Overlay */}
      <div className="relative aspect-4/3 w-full rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center p-6 overflow-hidden mb-5">
        <Image
          src={tool.image}
          alt={tool.name}
          width={90}
          height={90}
          className="object-contain group-hover:scale-110 transition-transform duration-300"
        />

        {/* Quick View Button overlay */}
        <button
          onClick={() => onQuickView(tool)}
          className="absolute bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5 shadow-md"
        >
          <FiEye size={14} /> Quick View
        </button>
      </div>

      {/* Meta: Rating and Downloads */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
        <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
          <FiStar size={13} className="fill-amber-400 text-amber-400" /> {tool.rating}
          <span className="text-slate-400 font-normal">({tool.reviewCount})</span>
        </span>
        <span>{tool.downloads} active users</span>
      </div>

      {/* Title & Description */}
      <Link href={`/tools/${tool.id}`} className="block group-hover:text-purple-600 transition-colors">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
          {tool.name}
        </h3>
      </Link>
      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
        {tool.description}
      </p>

      {/* Key Highlights list */}
      {tool.highlights && (
        <ul className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-xs text-slate-600 dark:text-slate-400">
          {tool.highlights.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <FiCheck className="text-emerald-500 shrink-0 text-xs" />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Price & CTA Action */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ${tool.price}
            </span>
            {tool.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${tool.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-slate-500">
            billed {tool.period}
          </span>
        </div>

        <button
          onClick={() => addToCart(tool)}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-xs ${
            isInCart
              ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
              : "bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/20"
          }`}
        >
          {isInCart ? (
            <>
              <FiCheck size={14} /> Added
            </>
          ) : (
            <>
              <FiShoppingCart size={14} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
