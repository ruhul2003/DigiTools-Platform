"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("digitools_cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch {
      // Local storage fallback
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("digitools_cart", JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  const showToast = (message, type = "success") => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showToast(`Updated quantity for ${product.name}!`, "info");
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`${product.name} added to cart!`, "success");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        showToast(`${item.name} removed from cart.`, "error");
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon("");
    setDiscountPercent(0);
  };

  const applyCoupon = (code) => {
    const trimmed = (code || "").trim().toUpperCase();
    if (trimmed === "DIGI20" || trimmed === "PROMO20") {
      setDiscountPercent(20);
      setAppliedCoupon(trimmed);
      showToast("Coupon applied! 20% discount added.", "success");
      return { success: true, message: "20% discount applied!" };
    }
    if (trimmed === "HALF50") {
      setDiscountPercent(50);
      setAppliedCoupon(trimmed);
      showToast("Special 50% discount activated!", "success");
      return { success: true, message: "50% discount applied!" };
    }
    showToast("Invalid promo code. Try DIGI20", "error");
    return { success: false, message: "Invalid promo code" };
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        appliedCoupon,
        discountPercent,
        applyCoupon,
        subtotal,
        discountAmount,
        total,
        showToast,
      }}
    >
      {children}
      {/* Universal Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div
            className={`px-5 py-3 rounded-2xl shadow-2xl text-white font-medium text-sm flex items-center gap-3 backdrop-blur-md ${
              toastMessage.type === "success"
                ? "bg-emerald-600/95 shadow-emerald-500/25"
                : toastMessage.type === "error"
                ? "bg-rose-600/95 shadow-rose-500/25"
                : "bg-purple-600/95 shadow-purple-500/25"
            }`}
          >
            <span>{toastMessage.type === "success" ? "✓" : toastMessage.type === "error" ? "✕" : "ℹ"}</span>
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
