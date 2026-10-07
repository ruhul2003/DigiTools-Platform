"use client";

import { useState } from "react";
import { FiX, FiCheckCircle, FiShield, FiLock, FiDownload, FiCreditCard } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    total,
    clearCart,
    showToast,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({
    name: "Alex Taylor",
    email: "alex.taylor@example.com",
    cardNumber: "•••• •••• •••• 4242",
    exp: "12/28",
    cvc: "888",
  });

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      const generatedId = "DT-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      clearCart();
      showToast("Order completed successfully!", "success");
    }, 1400);
  };

  const handleClose = () => {
    setSuccess(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <FiX size={20} />
        </button>

        {!success ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <FiLock size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Secure Checkout
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  256-Bit SSL Encrypted Payment Simulation
                </p>
              </div>
            </div>

            {/* Order Brief */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-6 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                <span>Items ({cartItems.length})</span>
                <span>${total}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Instant digital access delivered immediately to your email.
              </p>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address for Delivery
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                  <span>Credit Card</span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <FiCreditCard /> Simulated
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Expiration
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.exp}
                    onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cvc}
                    onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3.5 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay $${total} & Unlock Downloads`
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-3">
                <FiShield /> 14-day money back guarantee • Instant digital dispatch
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <FiCheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Order Confirmed!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Thank you for choosing DigiTools. Your receipt and license key have been emailed to{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.email}</span>.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-purple-50 dark:bg-slate-800 border border-purple-100 dark:border-slate-700 text-xs space-y-2">
              <p className="font-bold text-purple-700 dark:text-purple-300">
                Order ID: {orderId}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Status: Complete • Cloud License Active
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => {
                  alert("Downloading demo asset bundle zip file...");
                }}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <FiDownload size={15} /> Download All Purchased Assets (.zip)
              </button>
              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
              >
                Back to DigiTools
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
