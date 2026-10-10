"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSliders, FiX, FiArrowRight } from "react-icons/fi";
import { toolsData } from "../data/toolsData";

export default function CompareFloatingBar() {
  const [compareIds, setCompareIds] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateList = () => {
      try {
        const saved = localStorage.getItem("digitools_compare");
        if (saved) {
          setCompareIds(JSON.parse(saved));
        } else {
          setCompareIds([]);
        }
      } catch {
        // Fallback
      }
    };

    updateList();
    window.addEventListener("storage", updateList);
    // Poll occasionally or listen to local updates
    const interval = setInterval(updateList, 2500);

    return () => {
      window.removeEventListener("storage", updateList);
      clearInterval(interval);
    };
  }, []);

  if (!mounted || compareIds.length === 0) return null;

  const tools = toolsData.filter((t) => compareIds.includes(t.id));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-lg w-11/12 animate-fadeIn">
      <div className="bg-slate-900/95 dark:bg-slate-900/95 text-white backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 px-4 shadow-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-purple-600/30 text-purple-400 border border-purple-500/30 shrink-0">
            <FiSliders size={16} />
          </div>

          <div className="flex items-center -space-x-2 shrink-0">
            {tools.slice(0, 4).map((tool) => (
              <div
                key={tool.id}
                className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 p-1 flex items-center justify-center overflow-hidden shadow-2xs"
                title={tool.name}
              >
                <Image
                  src={tool.image}
                  alt={tool.name}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          <div className="min-w-0 hidden sm:block">
            <p className="text-xs font-bold truncate">
              {tools.length} tool{tools.length > 1 ? "s" : ""} selected
            </p>
            <p className="text-[10px] text-slate-400">Ready to compare</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setCompareIds([]);
              localStorage.removeItem("digitools_compare");
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors text-xs"
            title="Clear list"
          >
            <FiX size={14} />
          </button>

          <Link
            href="/compare"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            Compare <FiArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
