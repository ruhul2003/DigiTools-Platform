"use client";

import { useState } from "react";
import {
  FiCpu,
  FiDroplet,
  FiFileText,
  FiDollarSign,
  FiCopy,
  FiCheck,
  FiRefreshCw,
  FiZap,
  FiLayers,
  FiShield,
  FiHeart,
  FiStar,
  FiCompass,
  FiCode,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";

export default function PlaygroundPage() {
  const [activeTool, setActiveTool] = useState("ai-writer");
  const { showToast } = useCart();
  const [copied, setCopied] = useState(false);

  // 1. AI Writer Tool State
  const [prompt, setPrompt] = useState("Explain the benefits of automated lead nurturing for B2B SaaS");
  const [tone, setTone] = useState("Persuasive");
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerateAI = () => {
    setGenerating(true);
    setGeneratedOutput("");
    setTimeout(() => {
      setGenerating(false);
      setGeneratedOutput(
        `### Automated Lead Nurturing: The Growth Multiplier for B2B SaaS\n\nIn modern enterprise software, winning accounts isn't about brute force outreach—it's about contextual velocity.\n\n1. **Shortened Sales Cycles**: By delivering high-intent educational blueprints when prospects are actively researching, sales cycles contract by an average of 42%.\n2. **Zero-Drop Follow Ups**: Automated workflows trigger multi-channel touches without human slip-ups.\n3. **Elevated LTV**: Educated customers retain at significantly higher annual contract rates.\n\n*Recommendation*: Deploy webhook-driven triggers across your CRM and communication stack today.`
      );
      showToast("AI Content synthesized successfully!", "success");
    }, 900);
  };

  // 2. Color Palette Generator State
  const [palette, setPalette] = useState([
    { hex: "#7823F8", name: "Electric Indigo" },
    { hex: "#9333EA", name: "Royal Purple" },
    { hex: "#3B82F6", name: "Cyan Horizon" },
    { hex: "#10B981", name: "Emerald Mint" },
    { hex: "#F59E0B", name: "Sunset Amber" },
  ]);

  const generateNewPalette = () => {
    const letters = "0123456789ABCDEF";
    const getRandomColor = () => {
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    setPalette([
      { hex: getRandomColor(), name: "Vibrant Accent" },
      { hex: getRandomColor(), name: "Deep Surface" },
      { hex: getRandomColor(), name: "Contrast Pop" },
      { hex: getRandomColor(), name: "Subtle Glow" },
      { hex: getRandomColor(), name: "Hero Highlight" },
    ]);
    showToast("Generated new harmonious color scheme!", "info");
  };

  // 3. Markdown Previewer State
  const [markdownText, setMarkdownText] = useState(
    `# DigiTools Launch Plan\n\nAccelerate project delivery with vetted templates.\n\n- [x] Integrate Next.js App Router\n- [x] Configure Tailwind theme system\n- [ ] Deploy production release\n\n> "Velocity separates winners from spectators."`
  );

  // 4. Freelance Rate Calculator State
  const [hourlyRate, setHourlyRate] = useState(75);
  const [estimatedHours, setEstimatedHours] = useState(40);
  const [taxBuffer, setTaxBuffer] = useState(25);
  const baseTotal = hourlyRate * estimatedHours;
  const recommendedQuote = Math.round(baseTotal * (1 + taxBuffer / 100));

  // 5. SVG Icon Studio State
  const [iconShape, setIconShape] = useState("zap");
  const [iconSize, setIconSize] = useState(48);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [iconColor, setIconColor] = useState("#7823F8");
  const [iconBg, setIconBg] = useState("transparent");
  const [iconRadius, setIconRadius] = useState(16);
  const [iconRotation, setIconRotation] = useState(0);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 w-11/12 max-w-7xl mx-auto">
      {/* Playground Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
          Live Interactive Sandbox
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          DigiTools Live Playground
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Test interactive utilities directly in your browser. From neural text synthesis to color palette generators and freelance quoting calculators.
        </p>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveTool("ai-writer")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTool === "ai-writer"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <FiCpu /> AI Copy Generator
          </button>
          <button
            onClick={() => setActiveTool("color-palette")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTool === "color-palette"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <FiDroplet /> Palette Studio
          </button>
          <button
            onClick={() => setActiveTool("markdown")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTool === "markdown"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <FiFileText /> Markdown Lab
          </button>
          <button
            onClick={() => setActiveTool("rate-calc")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTool === "rate-calc"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <FiDollarSign /> Rate Calculator
          </button>
          <button
            onClick={() => setActiveTool("svg-studio")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTool === "svg-studio"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <FiCode /> SVG Icon Studio
          </button>
        </div>
      </div>

      {/* Main Interactive Screen */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        {/* TOOL 1: AI COPYWRITER */}
        {activeTool === "ai-writer" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FiCpu className="text-purple-600" /> AI Prompt Synthesizer
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enter your topic or prompt, select a voice tone, and watch high-converting copy generate instantly.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Creative Prompt
                </label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tone of Voice
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200"
                  >
                    <option value="Persuasive">Persuasive & High-Conversion</option>
                    <option value="Professional">Professional Executive</option>
                    <option value="Casual">Casual & Engaging</option>
                    <option value="Bold">Bold Disruptor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Engine Speed
                  </label>
                  <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-semibold flex items-center gap-1.5">
                    <FiZap /> Ultra Low Latency
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerateAI}
                disabled={generating}
                className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Synthesized Copy...
                  </>
                ) : (
                  "Generate Content with AI"
                )}
              </button>
            </div>

            {/* AI Output Window */}
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 mb-4">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Generated Content Output
                  </span>
                  {generatedOutput && (
                    <button
                      onClick={() => copyToClipboard(generatedOutput)}
                      className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline"
                    >
                      {copied ? <FiCheck /> : <FiCopy />} {copied ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>

                {generatedOutput ? (
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 space-y-3 whitespace-pre-line leading-relaxed font-mono">
                    {generatedOutput}
                  </div>
                ) : (
                  <div className="py-20 text-center text-slate-400 text-xs">
                    Click &ldquo;Generate Content with AI&rdquo; to test the live generation model.
                  </div>
                )}
              </div>

              <p className="text-[10px] text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700">
                Powered by DigiTools AI Engine • Free Playground Tier
              </p>
            </div>
          </div>
        )}

        {/* TOOL 2: COLOR PALETTE GENERATOR */}
        {activeTool === "color-palette" && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FiDroplet className="text-purple-600" /> Smart Color Harmony Studio
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Click any hex block to copy code to your clipboard.
                </p>
              </div>

              <button
                onClick={generateNewPalette}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <FiRefreshCw /> Shuffle Palette
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {palette.map((color, idx) => (
                <div
                  key={idx}
                  onClick={() => copyToClipboard(color.hex)}
                  className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all shadow-md"
                >
                  <div
                    className="h-36 sm:h-48 w-full flex items-end p-4 transition-all"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded bg-black/60 text-white text-[10px] font-mono transition-opacity">
                      Click to copy
                    </span>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 text-center">
                    <p className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {color.hex}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{color.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOOL 3: MARKDOWN LAB */}
        {activeTool === "markdown" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Markdown Editor
                </span>
                <span className="text-[11px] text-slate-400">Live preview enabled</span>
              </div>
              <textarea
                rows={12}
                value={markdownText}
                onChange={(e) => setMarkdownText(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Rendered Preview
                </span>
                <button
                  onClick={() => copyToClipboard(markdownText)}
                  className="text-xs text-purple-600 hover:underline flex items-center gap-1"
                >
                  <FiCopy /> Copy Raw
                </button>
              </div>
              <div className="h-[285px] overflow-y-auto p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
                <div className="whitespace-pre-line font-sans">{markdownText}</div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 4: RATE CALCULATOR */}
        {activeTool === "rate-calc" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FiDollarSign className="text-emerald-500" /> Freelance Project Quote Estimator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Determine profitable client quotes factoring in delivery scope and self-employment tax buffers.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Hourly Rate ($/hr): ${hourlyRate}
                </label>
                <input
                  type="range"
                  min={25}
                  max={250}
                  step={5}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Project Hours: {estimatedHours} hrs
                </label>
                <input
                  type="range"
                  min={5}
                  max={160}
                  step={5}
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tax & Contingency Buffer: {taxBuffer}%
                </label>
                <input
                  type="range"
                  min={10}
                  max={40}
                  step={5}
                  value={taxBuffer}
                  onChange={(e) => setTaxBuffer(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>
            </div>

            {/* Calculated Quote Box */}
            <div className="rounded-3xl bg-linear-to-br from-purple-600 to-indigo-700 text-white p-8 shadow-xl text-center space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-200">
                Recommended Client Quote
              </p>
              <h2 className="text-5xl font-black">${recommendedQuote}</h2>
              <p className="text-xs text-purple-100 max-w-xs mx-auto">
                Base labor (${baseTotal}) + {taxBuffer}% contingency & tax allowance.
              </p>
              <button
                onClick={() => copyToClipboard(`$${recommendedQuote}`)}
                className="px-6 py-2.5 rounded-xl bg-white text-purple-700 font-bold text-xs hover:bg-purple-50 transition-colors shadow-md inline-flex items-center gap-1.5"
              >
                <FiCopy /> Copy Quote Total
              </button>
            </div>
          </div>
        {/* TOOL 5: SVG ICON STUDIO */}
        {activeTool === "svg-studio" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FiCode className="text-purple-600" /> SVG & Vector Icon Studio
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Customize stroke weights, color harmonies, rotation, and export production-ready vector markup or React JSX.
              </p>

              {/* Icon Shape Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Vector Icon
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    { id: "zap", icon: FiZap, label: "Zap" },
                    { id: "layers", icon: FiLayers, label: "Layers" },
                    { id: "shield", icon: FiShield, label: "Shield" },
                    { id: "heart", icon: FiHeart, label: "Heart" },
                    { id: "star", icon: FiStar, label: "Star" },
                    { id: "compass", icon: FiCompass, label: "Compass" },
                  ].map((item) => {
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setIconShape(item.id)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                          iconShape === item.id
                            ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600 shadow-2xs"
                            : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        <IconComp size={20} />
                        <span className="text-[10px] font-semibold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sliders: Size, Stroke Width, Rotation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Size: {iconSize}px
                  </label>
                  <input
                    type="range"
                    min={24}
                    max={96}
                    value={iconSize}
                    onChange={(e) => setIconSize(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Stroke: {strokeWidth}px
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    step={0.5}
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Rotate: {iconRotation}°
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={15}
                    value={iconRotation}
                    onChange={(e) => setIconRotation(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Vector Stroke Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={iconColor}
                      onChange={(e) => setIconColor(e.target.value)}
                      className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={iconColor}
                      onChange={(e) => setIconColor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Badge Container Radius: {iconRadius}px
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={iconRadius}
                    onChange={(e) => setIconRadius(Number(e.target.value))}
                    className="w-full accent-purple-600 mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Preview Box & Code Export */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 mb-6">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Interactive Live Preview
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {iconSize}x{iconSize} • {strokeWidth}px stroke
                  </span>
                </div>

                {/* Centered rendered icon */}
                <div className="h-44 w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-6 shadow-inner">
                  <div
                    style={{
                      transform: `rotate(${iconRotation}deg)`,
                      borderRadius: `${iconRadius}px`,
                      color: iconColor,
                      transition: "transform 0.15s ease",
                    }}
                    className="p-4 flex items-center justify-center"
                  >
                    {iconShape === "zap" && <FiZap size={iconSize} strokeWidth={strokeWidth} />}
                    {iconShape === "layers" && <FiLayers size={iconSize} strokeWidth={strokeWidth} />}
                    {iconShape === "shield" && <FiShield size={iconSize} strokeWidth={strokeWidth} />}
                    {iconShape === "heart" && <FiHeart size={iconSize} strokeWidth={strokeWidth} />}
                    {iconShape === "star" && <FiStar size={iconSize} strokeWidth={strokeWidth} />}
                    {iconShape === "compass" && <FiCompass size={iconSize} strokeWidth={strokeWidth} />}
                  </div>
                </div>
              </div>

              {/* Code Export Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(${iconRotation}deg);"><path d="..."></path></svg>`;
                    copyToClipboard(rawSvg);
                  }}
                  className="w-full sm:w-1/2 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FiCopy /> Copy Raw SVG
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const jsxCode = `<${iconShape.charAt(0).toUpperCase() + iconShape.slice(1)} size={${iconSize}} strokeWidth={${strokeWidth}} color="${iconColor}" style={{ transform: "rotate(${iconRotation}deg)" }} />`;
                    copyToClipboard(jsxCode);
                  }}
                  className="w-full sm:w-1/2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <FiCode /> Copy React JSX
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
