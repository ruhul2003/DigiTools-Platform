"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiHeart, FiEye, FiShoppingCart, FiStar, FiSliders, FiArrowRight } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/CurrencyContext";

export default function ToolListItem({ tool, onQuickView }) {
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const isBookmarked = isInWishlist(tool.id);
  const isInCart = cartItems.some((item) => item.id === tool.id);

  return (
    <div className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-900/60 transition-all duration-300">
      {/* Left: Thumbnail & Details */}
      <div className="flex items-start sm:items-center gap-5 min-w-0 flex-1">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 p-2.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Image
            src={tool.image}
            alt={tool.name}
            width={60}
            height={60}
            className="object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
              {tool.category}
            </span>
            {tool.badge && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200">
                {tool.badge}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 ml-1">
              <FiStar size={12} className="fill-amber-400 text-amber-400" />
              <span className="font-bold">{tool.rating}</span>
              <span className="text-slate-400">({tool.reviewCount})</span>
            </span>
          </div>

          <Link href={`/tools/${tool.id}`} className="block group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {tool.name}
            </h3>
          </Link>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-1 max-w-2xl leading-relaxed">
            {tool.description}
          </p>

          {/* Highlights pills */}
          {tool.highlights && (
            <div className="hidden lg:flex items-center gap-3 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              {tool.highlights.slice(0, 2).map((item, idx) => (
                <span key={idx} className="flex items-center gap-1.5 truncate">
                  <FiCheck className="text-emerald-500 shrink-0 text-xs" />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Price, Actions */}
      <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
        <div className="text-left md:text-right">
          <div className="flex items-baseline gap-1.5 md:justify-end">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {formatPrice(tool.price)}
            </span>
            {tool.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(tool.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-500">
            /{tool.period}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuickView(tool)}
            title="Quick view"
            aria-label="Quick view"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <FiEye size={15} />
          </button>

          <Link
            href={`/compare?add=${tool.id}`}
            title="Compare tool"
            aria-label="Compare tool"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-purple-600 transition-colors"
          >
            <FiSliders size={15} />
          </Link>

          <button
            onClick={() => toggleWishlist(tool.id)}
            aria-label="Bookmark Wishlist"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors"
          >
            <FiHeart size={15} className={isBookmarked ? "fill-rose-500 text-rose-500" : ""} />
          </button>

          <button
            onClick={() => addToCart(tool)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
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
    </div>
  );
}
