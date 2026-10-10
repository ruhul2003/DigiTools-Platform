"use client";

import { useState } from "react";
import { FiX, FiCheckCircle, FiShield, FiLock, FiDownload, FiCreditCard, FiKey, FiCopy, FiCheck, FiFileText } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    total,
    clearCart,
    showToast,
  } = useCart();
  const { currency, formatPrice } = useCurrency();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [purchasedSnapshot, setPurchasedSnapshot] = useState([]);
  const [licenseKeys, setLicenseKeys] = useState([]);
  const [copiedKey, setCopiedKey] = useState(null);
  const [orderTotalFormatted, setOrderTotalFormatted] = useState("");

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

    const snapshot = cartItems.length > 0
      ? [...cartItems]
      : [{ id: "starter", name: "Pro Platform Access Pass", price: 29 }];

    const generatedId = "DT-" + Math.floor(100000 + Math.random() * 900000);
    const keys = snapshot.map((item) => ({
      toolName: item.name,
      licenseKey: `DT-${item.name.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-2026`,
    }));

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setOrderId(generatedId);
      setPurchasedSnapshot(snapshot);
      setLicenseKeys(keys);
      setOrderTotalFormatted(formatPrice(total > 0 ? total : 29));
      clearCart();
      showToast("Order completed successfully! License keys generated.", "success");
    }, 1200);
  };

  const handleDownloadReceipt = () => {
    const receiptData = {
      orderId,
      date: new Date().toISOString(),
      customer: {
        name: formData.name,
        email: formData.email,
      },
      paymentMethod: "Credit Card (Simulated 256-bit SSL)",
      totalPaid: orderTotalFormatted,
      currency: typeof currency === "object" ? currency?.code : currency,
      itemsPurchased: purchasedSnapshot.map((item) => ({
        name: item.name,
        price: formatPrice(item.price),
      })),
      licenseKeys: licenseKeys.map((k) => ({
        product: k.toolName,
        key: k.licenseKey,
      })),
      supportContact: "support@digitools.io",
    };

    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DigiTools_Receipt_${orderId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Receipt downloaded successfully!", "success");
  };

  const handleCopyKey = (key) => {
    navigator.clipboard?.writeText(key);
    setCopiedKey(key);
    showToast("License key copied to clipboard!", "success");
    setTimeout(() => setCopiedKey(null), 2500);
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
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
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
                <span>Items ({cartItems.length > 0 ? cartItems.length : 1})</span>
                <span>{formatPrice(total > 0 ? total : 29)}</span>
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
                className="w-full mt-4 py-3.5 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay ${formatPrice(total > 0 ? total : 29)} & Unlock Downloads`
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-3">
                <FiShield /> 14-day money back guarantee • Instant digital dispatch
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <FiCheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Order Confirmed!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Receipt & licenses dispatched to{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.email}</span>.
            </p>

            <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs space-y-1 text-left">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">Order ID:</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">Amount Paid:</span>
                <span className="font-bold text-slate-900 dark:text-white">{orderTotalFormatted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">Status:</span>
                <span className="text-emerald-600 font-medium">Complete • License Active</span>
              </div>
            </div>

            {/* Generated License Keys */}
            {licenseKeys.length > 0 && (
              <div className="mt-4 text-left">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <FiKey className="text-purple-600" /> Digital License Keys
                </h4>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {licenseKeys.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/60 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-purple-800 dark:text-purple-300 truncate">
                          {item.toolName}
                        </p>
                        <p className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
                          {item.licenseKey}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopyKey(item.licenseKey)}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 text-[10px] font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-50 flex items-center gap-1 shrink-0 cursor-pointer"
                        title="Copy Key"
                      >
                        {copiedKey === item.licenseKey ? (
                          <>
                            <FiCheck className="text-emerald-500" /> Copied
                          </>
                        ) : (
                          <>
                            <FiCopy /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={handleDownloadReceipt}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FiFileText size={15} /> Download Receipt Summary (.json)
              </button>
              <button
                onClick={() => {
                  alert("Downloading demo asset bundle zip file...");
                }}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <FiDownload size={15} /> Download All Purchased Assets (.zip)
              </button>
              <button
                onClick={handleClose}
                className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
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
