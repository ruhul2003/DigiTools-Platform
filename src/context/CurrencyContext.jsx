"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext(null);

export const currencies = {
  USD: { code: "USD", symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { code: "GBP", symbol: "£", rate: 0.79, label: "GBP (£)" },
};

export const AVAILABLE_CURRENCIES = Object.values(currencies);

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState("USD");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("digitools_currency");
      if (saved && currencies[saved]) {
        setCurrencyState(saved);
      }
    } catch {
      // Local storage fallback
    }
  }, []);

  const setCurrency = (code) => {
    if (currencies[code]) {
      setCurrencyState(code);
      try {
        localStorage.setItem("digitools_currency", code);
      } catch {
        // Ignore
      }
    }
  };

  const formatPrice = (usdAmount) => {
    const curr = currencies[currency] || currencies.USD;
    const converted = Math.round(usdAmount * curr.rate);
    return `${curr.symbol}${converted}`;
  };

  const currentCurrency = currencies[currency] || currencies.USD;

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currentCurrency,
        formatPrice,
        availableCurrencies: Object.values(currencies),
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
