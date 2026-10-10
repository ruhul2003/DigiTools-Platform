"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiHeart, FiEye, FiShoppingCart, FiStar, FiSliders } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/CurrencyContext";

export default function ToolCard({ tool, onQuickView }) {
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const isBookmarked = isInWishlist(tool.id);
  const isInCart = cartItems.some((item) => item.id === tool.id);

  return (
    <div className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-900/60 transition-all duration-300 hover:-translate-y-1 relative">
      {/* Top Bar: Category Pill & Bookmark */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
          {tool.category}
        </span>
        <div className="flex items-center gap-1.5">
          {tool.badge && (
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200">
              {tool.badge}
            </span>
          )}
          <Link
            href={`/compare?add=${tool.id}`}
            title="Compare tool"
            aria-label="Compare tool"
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-purple-600 transition-colors"
          >
            <FiSliders size={14} />
          </Link>
          <button
            onClick={() => toggleWishlist(tool.id)}
            aria-label="Save to Wishlist"
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-500 transition-colors"
          >
            <FiHeart size={15} className={isBookmarked ? "fill-rose-500 text-rose-500" : ""} />
          </button>
        </div>
      </div>

      {/* Product Image & Quick View Hover Overlay */}
      <div className="relative aspect-4/3 w-full rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-6 overflow-hidden mb-5">
        <Image
          src={tool.image}
          alt={tool.name}
          width={88}
          height={88}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick View Button overlay */}
        <button
          onClick={() => onQuickView(tool)}
          className="absolute bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5 shadow-md"
        >
          <FiEye size={13} /> Quick View
        </button>
      </div>

      {/* Meta: Rating and Downloads */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
        <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
          <FiStar size={13} className="fill-amber-400 text-amber-400" /> {tool.rating}
          <span className="text-slate-400 font-normal">({tool.reviewCount})</span>
        </span>
        <span className="text-[11px]">{tool.downloads} downloads</span>
      </div>

      {/* Title & Description */}
      <Link href={`/tools/${tool.id}`} className="block group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
          {tool.name}
        </h3>
      </Link>
      <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
        {tool.description}
      </p>

      {/* Key Highlights list */}
      {tool.highlights && (
        <ul className="mt-4 space-y-1.5 border-t border-slate-100 dark:border-slate-800/80 pt-3 text-xs text-slate-600 dark:text-slate-400">
          {tool.highlights.slice(0, 2).map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <FiCheck className="text-emerald-500 shrink-0 text-xs" />
              <span className="line-clamp-1 text-[11px]">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Price & CTA Action */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {formatPrice(tool.price)}
            </span>
            {tool.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(tool.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium text-slate-500">
            /{tool.period}
          </span>
        </div>

        <button
          onClick={() => addToCart(tool)}
          className={`px-3.5 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
            isInCart
              ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
              : "bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/20"
          }`}
        >
          {isInCart ? (
            <>
              <FiCheck size={13} /> Added
            </>
          ) : (
            <>
              <FiShoppingCart size={13} /> Add
            </>
          )}
        </button>
      </div>
    </div>
  );
}
