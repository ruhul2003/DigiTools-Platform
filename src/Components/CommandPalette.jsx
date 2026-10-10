"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiSearch,
  FiX,
  FiArrowRight,
  FiCompass,
  FiSliders,
  FiHeart,
  FiShoppingCart,
  FiSun,
  FiMoon,
  FiCpu,
  FiDollarSign,
} from "react-icons/fi";
import { toolsData } from "../data/toolsData";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { useCurrency } from "../context/CurrencyContext";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  const { setIsCartOpen, showToast } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency, formatPrice } = useCurrency();

  // Handle open event and keyboard shortcut (Cmd+K / Ctrl+K / Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Filter tools
  const matchingTools = toolsData.filter((tool) => {
    const q = query.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q)
    );
  });

  const handleNavigate = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/60 backdrop-blur-md transition-opacity animate-fadeIn"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 dark:border-slate-800 gap-3">
          <FiSearch className="text-purple-600 dark:text-purple-400 shrink-0" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a tool name, category, or command..."
            className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <FiX size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {/* Quick Actions if query is empty */}
          {!query && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                Quick Navigation & Controls
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleNavigate("/playground")}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <FiCpu className="text-purple-600" /> Live Interactive Playground
                  </span>
                  <FiArrowRight size={12} className="text-slate-400" />
                </button>
                <button
                  onClick={() => handleNavigate("/compare")}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <FiSliders className="text-indigo-600" /> Compare Tools Matrix
                  </span>
                  <FiArrowRight size={12} className="text-slate-400" />
                </button>
                <button
                  onClick={() => handleNavigate("/wishlist")}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <FiHeart className="text-rose-500" /> Saved Wishlist ({wishlist.length})
                  </span>
                  <FiArrowRight size={12} className="text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <FiShoppingCart className="text-emerald-500" /> Open Shopping Cart
                  </span>
                  <FiArrowRight size={12} className="text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    toggleTheme();
                    showToast(`Switched to ${theme === "dark" ? "Light" : "Dark"} mode`, "info");
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left"
                >
                  <span className="flex items-center gap-2.5">
                    {theme === "dark" ? <FiSun className="text-amber-400" /> : <FiMoon className="text-slate-600" />}
                    Toggle Theme ({theme === "dark" ? "Light" : "Dark"})
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Action</span>
                </button>
                <button
                  onClick={() => {
                    const nextCurr = currency === "USD" ? "EUR" : currency === "EUR" ? "GBP" : "USD";
                    setCurrency(nextCurr);
                    showToast(`Currency changed to ${nextCurr}`, "info");
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <FiDollarSign className="text-purple-500" /> Currency: {currency} (Click to cycle)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{currency}</span>
                </button>
              </div>
            </div>
          )}

          {/* Matching Tools List */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
              {query ? `Search Results (${matchingTools.length})` : "Featured Catalog Tools"}
            </p>
            {matchingTools.length > 0 ? (
              <div className="space-y-1.5">
                {(query ? matchingTools : matchingTools.slice(0, 5)).map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleNavigate(`/tools/${tool.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 flex items-center justify-center shrink-0">
                        <Image
                          src={tool.image}
                          alt={tool.name}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400">
                          {tool.name}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {tool.category} • {tool.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {formatPrice(tool.price)}
                      </span>
                      <FiArrowRight className="text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                No tools or commands found matching &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>DigiTools Instant Command Launcher</span>
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1 py-0.5 bg-white dark:bg-slate-700 rounded border text-[10px]">↑</kbd> <kbd className="px-1 py-0.5 bg-white dark:bg-slate-700 rounded border text-[10px]">↓</kbd> to navigate</span>
            <span><kbd className="px-1 py-0.5 bg-white dark:bg-slate-700 rounded border text-[10px]">ESC</kbd> to exit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
