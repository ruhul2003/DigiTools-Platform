"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FiHeart,
  FiShoppingCart,
  FiTrash2,
  FiArrowRight,
  FiStar,
  FiCheck,
  FiSliders,
  FiCompass,
} from "react-icons/fi";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { toolsData } from "../../data/toolsData";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart, cartItems, showToast } = useCart();
  const { formatPrice } = useCurrency();

  const savedTools = toolsData.filter((t) => wishlist.includes(t.id));
  const recommendedTools = toolsData.slice(0, 4);

  const totalWishlistValue = savedTools.reduce((acc, t) => acc + t.price, 0);

  const handleAddAllToCart = () => {
    if (savedTools.length === 0) return;
    savedTools.forEach((tool) => {
      addToCart(tool);
    });
    showToast(`Added all ${savedTools.length} saved tools to your cart!`, "success");
  };

  return (
    <div className="py-12 w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 min-h-[75vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200/60 dark:border-rose-800/60 mb-3">
            <FiHeart className="fill-rose-500 text-rose-500" />
            <span>Saved Collections</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Your Saved Wishlist
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Keep track of software tools, blueprints, and templates for future projects.
          </p>
        </div>

        {savedTools.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleAddAllToCart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm shadow-purple-500/20 active:scale-95 transition-all"
            >
              <FiShoppingCart /> Add All to Cart ({formatPrice(totalWishlistValue)})
            </button>
            <button
              onClick={() => {
                if (confirm("Clear all items from your wishlist?")) {
                  clearWishlist();
                  showToast("Wishlist cleared.", "info");
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 text-xs font-semibold transition-colors"
            >
              <FiTrash2 size={14} /> Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {savedTools.length > 0 ? (
        <div className="pt-8">
          <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <span className="font-bold text-slate-900 dark:text-white">{savedTools.length}</span> saved item{savedTools.length > 1 ? "s" : ""}
            </span>
            <span>
              Estimated Value: <span className="font-extrabold text-slate-900 dark:text-white">{formatPrice(totalWishlistValue)}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedTools.map((tool) => {
              const inCart = cartItems.some((c) => c.id === tool.id);
              return (
                <div
                  key={tool.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-900/60 transition-all duration-300 relative group"
                >
                  <div>
                    {/* Top actions */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {tool.category}
                      </span>
                      <button
                        onClick={() => toggleWishlist(tool.id)}
                        title="Remove from wishlist"
                        aria-label="Remove from wishlist"
                        className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-500 transition-colors"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-4/3 w-full rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-6 mb-5">
                      <Image
                        src={tool.image}
                        alt={tool.name}
                        width={80}
                        height={80}
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Title & Info */}
                    <Link href={`/tools/${tool.id}`} className="block group-hover:text-purple-600 transition-colors">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                        {tool.name}
                      </h3>
                    </Link>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Bottom Price & Add to Cart */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {formatPrice(tool.price)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">/{tool.period}</span>
                    </div>

                    <button
                      onClick={() => addToCart(tool)}
                      className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
                        inCart
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {inCart ? <FiCheck size={13} /> : <FiShoppingCart size={13} />}
                      {inCart ? "In Cart" : "Move to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center mx-auto mb-5 shadow-2xs">
            <FiHeart size={30} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Your wishlist is empty
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
            Explore our curated catalog of AI tools, automation blueprints, and UI kits to bookmark your favorites.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              Browse Catalog <FiArrowRight />
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              <FiCompass /> Try Playground
            </Link>
          </div>

          {/* Curated Recommendations */}
          <div className="mt-16 text-left border-t border-slate-200/80 dark:border-slate-800 pt-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 text-center">
              Trending Software Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedTools.map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between gap-3 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 p-1.5 flex items-center justify-center shrink-0">
                      <Image
                        src={rec.image}
                        alt={rec.name}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <Link href={`/tools/${rec.id}`} className="font-semibold text-xs text-slate-900 dark:text-white hover:text-purple-600 truncate block">
                        {rec.name}
                      </Link>
                      <span className="text-[11px] text-purple-600 font-bold">
                        {formatPrice(rec.price)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleWishlist(rec.id)}
                    aria-label="Add to wishlist"
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <FiHeart size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
