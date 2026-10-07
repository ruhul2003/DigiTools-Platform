"use client";

import Image from "next/image";
import Link from "next/link";
import { FiX, FiCheck, FiHeart, FiShoppingCart, FiStar, FiArrowRight } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isItemInCart = cartItems.some((i) => i.id === product.id);
  const isBookmarked = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Product Image & Badges */}
          <div className="w-full md:w-5/12 flex flex-col items-center">
            <div className="w-full aspect-square rounded-2xl bg-purple-50 dark:bg-slate-800 flex items-center justify-center p-6 border border-slate-100 dark:border-slate-700/60 relative overflow-hidden group">
              <Image
                src={product.image}
                alt={product.name}
                width={180}
                height={180}
                className="object-contain group-hover:scale-105 transition-transform"
              />
              <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-yellow-400 text-yellow-950 shadow-xs">
                {product.badge || "Featured"}
              </span>
            </div>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`mt-4 w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isBookmarked
                  ? "border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900"
                  : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <FiHeart className={isBookmarked ? "fill-rose-500 text-rose-500" : ""} />
              {isBookmarked ? "Bookmarked in Wishlist" : "Save to Wishlist"}
            </button>
          </div>

          {/* Details Column */}
          <div className="w-full md:w-7/12 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              {product.category}
            </span>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {product.name}
            </h3>

            {/* Rating & Downloads */}
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <FiStar className="fill-amber-400" /> {product.rating}
              </span>
              <span>•</span>
              <span>{product.reviewCount} reviews</span>
              <span>•</span>
              <span>{product.downloads} downloads</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs font-semibold text-slate-500">
                /{product.period}
              </span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* Key highlights list */}
            {product.highlights && (
              <div className="mt-4 space-y-1.5">
                <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Included Features:
                </p>
                {product.highlights.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <FiCheck className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 py-3 px-5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <FiShoppingCart />
                {isItemInCart ? "Add Another to Cart" : "Add to Cart"}
              </button>

              <Link
                href={`/tools/${product.id}`}
                onClick={onClose}
                className="py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
              >
                View Full Page <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
