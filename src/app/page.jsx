"use client";

import { useState } from "react";
import Banner from "../Components/Banner";
import Ratings from "../Components/Ratings";
import Catalog from "../Components/Catalog";
import Steps from "../Components/Steps";
import Pricing from "../Components/Pricing";
import ComparisonMatrix from "../Components/ComparisonMatrix";
import Testimonials from "../Components/Testimonials";
import Faq from "../Components/Faq";
import Ready from "../Components/Ready";

export default function HomePage() {
  const [initialSearch, setInitialSearch] = useState("");

  const handleHeroSearch = (term) => {
    setInitialSearch(term);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Banner onSearchSubmit={handleHeroSearch} />
      <Ratings />
      <Catalog initialSearch={initialSearch} />
      <Steps />
      <Pricing />
      <ComparisonMatrix />
      <Testimonials />
      <Faq />
      <Ready />
    </div>
  );
}
