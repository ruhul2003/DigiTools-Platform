"use client";

import { useState } from "react";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { FiSun, FiMoon, FiHeart, FiMenu, FiX, FiLayers } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { cartItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme, mounted } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-[#090d16]/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="w-11/12 max-w-7xl mx-auto py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/30 group-hover:scale-105 transition-transform">
                <FiLayers size={22} />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Digi<span className="text-purple-600 dark:text-purple-400">Tools</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm text-slate-600 dark:text-slate-300">
            <Link href="/#products" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Catalog
            </Link>
            <Link href="/playground" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5">
              Playground
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                LIVE
              </span>
            </Link>
            <Link href="/#pricing" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Pricing
            </Link>
            <Link href="/#testimonials" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Reviews
            </Link>
            <Link href="/#faq" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            >
              {mounted && theme === "dark" ? <FiSun size={18} className="text-amber-400" /> : <FiMoon size={18} />}
            </button>

            {/* Wishlist Link / Counter */}
            <Link
              href="/#products"
              aria-label="Wishlist"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 relative transition-colors"
            >
              <FiHeart size={18} className={wishlist.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 relative transition-colors"
            >
              <CiShoppingCart size={22} className="stroke-1" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white rounded-full text-xs font-bold flex items-center justify-center animate-scale">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Login Button */}
            <button
              onClick={() => { setAuthMode("login"); setShowAuthModal(true); }}
              className="hidden sm:inline-flex text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2"
            >
              Sign In
            </button>

            {/* CTA Button */}
            <button
              onClick={() => { setAuthMode("signup"); setShowAuthModal(true); }}
              className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-purple-500/20 active:scale-95 transition-all"
            >
              Get Started
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-md px-6 py-6 space-y-4">
            <Link
              href="/#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600"
            >
              Catalog
            </Link>
            <Link
              href="/playground"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600"
            >
              Tool Playground
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600"
            >
              Pricing Plans
            </Link>
            <Link
              href="/#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600"
            >
              Customer Reviews
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600"
            >
              Frequently Asked Questions
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600"
            >
              Contact Support
            </Link>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-3">
              <button
                onClick={() => { setShowAuthModal(true); setAuthMode("login"); setMobileMenuOpen(false); }}
                className="w-1/2 py-2.5 text-center text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700"
              >
                Sign In
              </button>
              <button
                onClick={() => { setShowAuthModal(true); setAuthMode("signup"); setMobileMenuOpen(false); }}
                className="w-1/2 py-2.5 text-center text-sm font-semibold rounded-xl bg-purple-600 text-white"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Simulated Sign In / Sign Up Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-8 relative shadow-2xl">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <FiX size={22} />
            </button>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {authMode === "login" ? "Welcome Back to DigiTools" : "Create DigiTools Account"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {authMode === "login"
                  ? "Access your saved purchases, licenses, and downloads."
                  : "Join 50,000+ creators speeding up their workflows."}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(authMode === "login" ? "Signed in successfully!" : "Account created successfully!");
                setShowAuthModal(false);
              }}
              className="space-y-4"
            >
              {authMode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 transition-all"
              >
                {authMode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              {authMode === "login" ? (
                <>
                  Don&apos;t have an account yet?{" "}
                  <button
                    onClick={() => setAuthMode("signup")}
                    className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
                  >
                    Sign Up Free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setAuthMode("login")}
                    className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}