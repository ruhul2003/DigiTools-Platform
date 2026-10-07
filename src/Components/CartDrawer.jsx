"use client";

import Image from "next/image";
import { useState } from "react";
import { FiX, FiTrash2, FiPlus, FiMinus, FiTag, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountPercent,
    discountAmount,
    total,
    appliedCoupon,
    applyCoupon,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon);
    setInputCoupon("");
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiShoppingBag className="text-purple-600 dark:text-purple-400" size={20} />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Your Shopping Cart
              </h2>
              <span className="text-xs bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-slate-800 flex items-center justify-center text-purple-600 mb-4">
                  <FiShoppingBag size={28} />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Your cart is empty</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                  Discover our suite of curated digital products, AI tools, and templates.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors shadow-sm"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-800 p-2 flex items-center justify-center border border-slate-200/60 dark:border-slate-700 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
                      ${item.price} <span className="text-[10px] text-slate-400 font-normal">/{item.period}</span>
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs"
                      >
                        <FiMinus size={10} />
                      </button>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs"
                      >
                        <FiPlus size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Remove item"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon (use DIGI20)"
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs">
                  <span>Coupon &quot;{appliedCoupon}&quot; active ({discountPercent}% off)</span>
                  <span className="font-bold">-${discountAmount}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Total Due</span>
                  <span className="text-purple-600 dark:text-purple-400">${total}</span>
                </div>
              </div>

              {/* Checkout & Clear Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  Proceed to Checkout <FiArrowRight />
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-center text-xs text-slate-400 hover:text-rose-500 transition-colors"
                >
                  Clear entire cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
