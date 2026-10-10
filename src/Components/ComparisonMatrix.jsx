"use client";

import { useState } from "react";
import { FiCheck, FiMinus, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useCurrency } from "../context/CurrencyContext";

const comparisonData = [
  {
    category: "Asset Access & Libraries",
    items: [
      { name: "Community Free Tools", starter: "10 Tools", pro: "All 200+ Tools", enterprise: "All 200+ & Custom" },
      { name: "Monthly Stock Downloads", starter: "5 downloads", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Vector & Figma Design Kits", starter: "Basic preview", pro: "2,000+ files", enterprise: "Full design system" },
      { name: "4K Video & Raw Audio B-Roll", starter: false, pro: true, enterprise: true },
    ]
  },
  {
    category: "AI & Automation Capabilities",
    items: [
      { name: "AI Word Generations", starter: "5,000 words/mo", pro: "Unlimited", enterprise: "Unlimited Dedicated" },
      { name: "ATS Resume Scans", starter: "2 scans", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Web Scraping & Webhook Recipes", starter: false, pro: "50+ Workflows", enterprise: "Custom Pipelines" },
      { name: "API Rate Limits", starter: "None", pro: "60 req/min", enterprise: "1,000 req/min" },
    ]
  },
  {
    category: "Licensing & Rights",
    items: [
      { name: "Personal Non-Commercial Use", starter: true, pro: true, enterprise: true },
      { name: "Client Work Commercial License", starter: false, pro: true, enterprise: true },
      { name: "Resale of Derived End Products", starter: false, pro: true, enterprise: true },
      { name: "White-Label & Custom Branding", starter: false, pro: false, enterprise: true },
    ]
  },
  {
    category: "Support & Infrastructure",
    items: [
      { name: "Community Forum & Discord", starter: true, pro: true, enterprise: true },
      { name: "Priority Support Response Time", starter: "Best effort", pro: "Under 2 hours", enterprise: "15 min SLA" },
      { name: "Team Seats Included", starter: "1 user", pro: "3 users", enterprise: "Up to 15 users" },
      { name: "Dedicated Account Strategist", starter: false, pro: false, enterprise: true },
    ]
  }
];

export default function ComparisonMatrix() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { formatPrice } = useCurrency();

  return (
    <section className="py-12 w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Full Plan Specification Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Deep dive into technical quotas, licensing terms, and support commitments.
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                Hide Details <FiChevronUp />
              </>
            ) : (
              <>
                Expand Matrix <FiChevronDown />
              </>
            )}
          </button>
        </div>

        {isExpanded && (
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-4 pr-6 w-1/3">Capability</th>
                  <th className="py-4 px-4 text-center">Starter ({formatPrice(0)})</th>
                  <th className="py-4 px-4 text-center text-purple-600 dark:text-purple-400 font-bold bg-purple-50/50 dark:bg-purple-950/20 rounded-t-xl">
                    Pro ({formatPrice(29)})
                  </th>
                  <th className="py-4 px-4 text-center">Enterprise ({formatPrice(99)})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {comparisonData.map((section, sIdx) => (
                  <div key={sIdx} className="contents">
                    <tr className="bg-slate-50/80 dark:bg-slate-800/40">
                      <td colSpan={4} className="py-3 px-3 font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                        {section.category}
                      </td>
                    </tr>
                    {section.items.map((item, iIdx) => (
                      <tr key={iIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="py-3.5 pr-6 font-medium text-slate-700 dark:text-slate-300">
                          {item.name}
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-600 dark:text-slate-400">
                          {typeof item.starter === "boolean" ? (
                            item.starter ? (
                              <FiCheck className="inline text-emerald-500 font-bold" size={16} />
                            ) : (
                              <FiMinus className="inline text-slate-300 dark:text-slate-600" size={16} />
                            )
                          ) : (
                            item.starter
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center font-semibold text-purple-700 dark:text-purple-300 bg-purple-50/30 dark:bg-purple-950/10">
                          {typeof item.pro === "boolean" ? (
                            item.pro ? (
                              <FiCheck className="inline text-emerald-500 font-bold" size={16} />
                            ) : (
                              <FiMinus className="inline text-slate-300" size={16} />
                            )
                          ) : (
                            item.pro
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-600 dark:text-slate-400">
                          {typeof item.enterprise === "boolean" ? (
                            item.enterprise ? (
                              <FiCheck className="inline text-emerald-500 font-bold" size={16} />
                            ) : (
                              <FiMinus className="inline text-slate-300 dark:text-slate-600" size={16} />
                            )
                          ) : (
                            item.enterprise
                          )}
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
