"use client";

import Pricing from "../../Components/Pricing";
import ComparisonMatrix from "../../Components/ComparisonMatrix";
import Faq from "../../Components/Faq";

export default function StandalonePricingPage() {
  return (
    <div className="py-8">
      <Pricing />
      <ComparisonMatrix />
      <Faq />
    </div>
  );
}
