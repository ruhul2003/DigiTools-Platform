"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FiSliders,
  FiX,
  FiPlus,
  FiCheck,
  FiStar,
  FiShoppingCart,
  FiArrowRight,
  FiTrash2,
  FiInfo,
} from "react-icons/fi";
import { toolsData } from "../../data/toolsData";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";

function CompareContent() {
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState([1, 4, 2]); // default 3 tools
  const { addToCart, cartItems, showToast } = useCart();
  const { formatPrice } = useCurrency();

  // Load from localStorage or URL param
  useEffect(() => {
    try {
      const saved = localStorage.getItem("digitools_compare");
      let list = saved ? JSON.parse(saved) : [1, 4, 2];

      const addParam = searchParams.get("add");
      if (addParam) {
        const idToAdd = Number(addParam);
        if (toolsData.some((t) => t.id === idToAdd) && !list.includes(idToAdd)) {
          if (list.length >= 4) {
            list = [...list.slice(1), idToAdd];
          } else {
            list = [...list, idToAdd];
          }
        }
      }
      setSelectedIds(list);
      localStorage.setItem("digitools_compare", JSON.stringify(list));
    } catch {
      // Local fallback
    }
  }, [searchParams]);

  const saveList = (newList) => {
    setSelectedIds(newList);
    try {
      localStorage.setItem("digitools_compare", JSON.stringify(newList));
    } catch {
      // Ignore
    }
  };

  const handleAddTool = (id) => {
    const numId = Number(id);
    if (!selectedIds.includes(numId)) {
      if (selectedIds.length >= 4) {
        showToast("Maximum 4 tools can be compared at once.", "info");
        return;
      }
      saveList([...selectedIds, numId]);
      showToast("Tool added to comparison matrix!", "success");
    }
  };

  const handleRemoveTool = (id) => {
    if (selectedIds.length <= 1) {
      showToast("You need at least 1 tool in the comparison view.", "info");
      return;
    }
    saveList(selectedIds.filter((item) => item !== id));
  };

  const comparedTools = toolsData.filter((t) => selectedIds.includes(t.id));
  const availableToAdd = toolsData.filter((t) => !selectedIds.includes(t.id));

  // Extract all unique spec keys across compared tools
  const allSpecKeys = Array.from(
    new Set(comparedTools.flatMap((t) => Object.keys(t.specs || {})))
  );

  return (
    <div className="py-12 w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 min-h-[80vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/60 mb-3">
            <FiSliders className="text-purple-600" />
            <span>Interactive Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Side-by-Side Tool Comparison
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Compare features, licensing, performance metrics, and pricing to pick the ideal toolkit.
          </p>
        </div>

        {/* Add more tools selector */}
        {availableToAdd.length > 0 && selectedIds.length < 4 && (
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-500 hidden sm:inline">
              Add Tool:
            </label>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAddTool(e.target.value);
                  e.target.value = "";
                }
              }}
              defaultValue=""
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xs"
            >
              <option value="" disabled>
                + Select Tool to Compare
              </option>
              {availableToAdd.map((tool) => (
                <option key={tool.id} value={tool.id}>
                  {tool.name} ({tool.category}) — {formatPrice(tool.price)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {comparedTools.length > 0 ? (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800">
                <th className="py-6 px-4 w-48 text-slate-400 font-semibold uppercase tracking-wider text-[11px] bg-slate-50/50 dark:bg-slate-900/50 rounded-tl-2xl">
                  Tool Overview
                </th>
                {comparedTools.map((tool) => {
                  const inCart = cartItems.some((c) => c.id === tool.id);
                  return (
                    <th
                      key={tool.id}
                      className="py-6 px-6 min-w-[260px] align-top bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {tool.category}
                        </span>
                        {comparedTools.length > 1 && (
                          <button
                            onClick={() => handleRemoveTool(tool.id)}
                            title="Remove from comparison"
                            className="p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <FiX size={15} />
                          </button>
                        )}
                      </div>

                      <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 p-2 flex items-center justify-center mb-3">
                        <Image
                          src={tool.image}
                          alt={tool.name}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>

                      <Link href={`/tools/${tool.id}`} className="font-bold text-base text-slate-900 dark:text-white hover:text-purple-600 truncate block">
                        {tool.name}
                      </Link>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 font-normal leading-relaxed">
                        {tool.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                            {formatPrice(tool.price)}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-normal">
                            /{tool.period}
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(tool)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
                            inCart
                              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                              : "bg-purple-600 hover:bg-purple-700 text-white"
                          }`}
                        >
                          {inCart ? <FiCheck size={13} /> : <FiShoppingCart size={13} />}
                          {inCart ? "In Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {/* Ratings */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                <td className="py-4 px-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/30">
                  Rating & Reviews
                </td>
                {comparedTools.map((tool) => (
                  <td key={tool.id} className="py-4 px-6 border-l border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                      <FiStar className="fill-amber-400 text-amber-400" size={13} /> {tool.rating}
                      <span className="font-normal text-slate-400 text-[11px]">({tool.reviewCount} reviews)</span>
                    </span>
                  </td>
                ))}
              </tr>

              {/* Active Downloads */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                <td className="py-4 px-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/30">
                  Active Users
                </td>
                {comparedTools.map((tool) => (
                  <td key={tool.id} className="py-4 px-6 border-l border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    {tool.downloads} creators
                  </td>
                ))}
              </tr>

              {/* Key Highlights */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                <td className="py-4 px-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/30 align-top">
                  Key Capabilities
                </td>
                {comparedTools.map((tool) => (
                  <td key={tool.id} className="py-4 px-6 border-l border-slate-100 dark:border-slate-800 align-top">
                    <ul className="space-y-2">
                      {tool.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                          <FiCheck className="text-emerald-500 shrink-0 mt-0.5" size={13} />
                          <span className="text-[11px] leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Technical Specifications */}
              {allSpecKeys.map((key) => (
                <tr key={key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/30">
                    {key}
                  </td>
                  {comparedTools.map((tool) => (
                    <td key={tool.id} className="py-3.5 px-6 border-l border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                      {tool.specs?.[key] || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-20 text-center text-slate-400">
          No tools selected for comparison.
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading comparison matrix...</div>}>
      <CompareContent />
    </Suspense>
  );
}
