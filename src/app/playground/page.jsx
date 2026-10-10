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
  FiShare2,
  FiGlobe,
  FiCheckCircle,
  FiTerminal,
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

  // 6. Social Media Meta Tag Generator State
  const [metaTitle, setMetaTitle] = useState("DigiTools Platform — Curated Digital Assets & AI Tools");
  const [metaDescription, setMetaDescription] = useState("Access 200+ vetted software tools, automation blueprints, and UI kits engineered for high-velocity creators and teams.");
  const [metaUrl, setMetaUrl] = useState("https://digitools.io");
  const [metaImage, setMetaImage] = useState("https://digitools.io/assets/banner.png");
  const [metaAuthor, setMetaAuthor] = useState("@digitools");
  const [previewSocial, setPreviewSocial] = useState("google"); // "google" | "twitter" | "facebook"

  // 7. JSON Formatter & Validator State
  const [jsonInput, setJsonInput] = useState(`{\n  "name": "DigiTools Platform",\n  "version": "2.0.0",\n  "tier": "enterprise",\n  "toolsCount": 200,\n  "features": [\n    "Neural Text Synthesis",\n    "Vector Icon Studio",\n    "Webhook Blueprints"\n  ],\n  "active": true\n}`);
  const [formattedJson, setFormattedJson] = useState("");
  const [jsonError, setJsonError] = useState(null);
  const [indentSpaces, setIndentSpaces] = useState(2);

  const handleFormatJson = (spaces = indentSpaces) => {
    try {
      const parsed = JSON.parse(jsonInput);
      const res = JSON.stringify(parsed, null, spaces);
      setFormattedJson(res);
      setJsonError(null);
      showToast("JSON formatted & validated successfully!", "success");
    } catch (err) {
      setJsonError(err.message);
      showToast("Invalid JSON syntax!", "error");
    }
  };

  const handleMinifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const res = JSON.stringify(parsed);
      setFormattedJson(res);
      setJsonError(null);
      showToast("JSON minified cleanly!", "info");
    } catch (err) {
      setJsonError(err.message);
      showToast("Invalid JSON syntax!", "error");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 min-h-[80vh]">
      {/* Playground Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
          Live Interactive Sandbox
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          DigiTools Live Playground
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Test interactive utilities directly in your browser. From neural text synthesis and vector icon customization to SEO meta tags and JSON validators.
        </p>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 max-w-fit mx-auto">
          <button
            onClick={() => setActiveTool("ai-writer")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTool === "ai-writer"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FiCpu /> AI Copy
          </button>
          <button
            onClick={() => setActiveTool("color-palette")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTool === "color-palette"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FiDroplet /> Palette Studio
          </button>
          <button
            onClick={() => setActiveTool("markdown")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTool === "markdown"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FiFileText /> Markdown Lab
          </button>
          <button
            onClick={() => setActiveTool("rate-calc")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTool === "rate-calc"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FiDollarSign /> Rate Calculator
          </button>
          <button
            onClick={() => setActiveTool("svg-studio")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTool === "svg-studio"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FiCode /> SVG Studio
          </button>
          <button
            onClick={() => setActiveTool("meta-tags")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTool === "meta-tags"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FiShare2 /> Meta Tags
          </button>
          <button
            onClick={() => setActiveTool("json-formatter")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTool === "json-formatter"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FiTerminal /> JSON Lab
          </button>
        </div>
      </div>

      {/* Main Interactive Screen */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xs">
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

        {/* TOOL 6: META TAG & OPENGRAPH STUDIO */}
        {activeTool === "meta-tags" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FiShare2 className="text-purple-600" /> SEO & Social Meta Tag Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Configure your social cards, preview live appearances on Google, Twitter, and LinkedIn, and copy validated HTML markup.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Page Title (Max 60 chars)
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Page title for SEO and social shares..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Meta Description (Max 160 chars)
                </label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Detailed summary shown in search results and social cards..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Canonical Page URL
                  </label>
                  <input
                    type="url"
                    value={metaUrl}
                    onChange={(e) => setMetaUrl(e.target.value)}
                    placeholder="https://yourdomain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Twitter Creator Handle
                  </label>
                  <input
                    type="text"
                    value={metaAuthor}
                    onChange={(e) => setMetaAuthor(e.target.value)}
                    placeholder="@handle"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  OpenGraph Image URL (1200x630 recommended)
                </label>
                <input
                  type="url"
                  value={metaImage}
                  onChange={(e) => setMetaImage(e.target.value)}
                  placeholder="https://yourdomain.com/og-image.png"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                />
              </div>
            </div>

            {/* Right: Live Preview & HTML Code */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 p-6 flex flex-col justify-between">
              <div>
                {/* Platform tabs */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 mb-5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Live Preview
                  </span>
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setPreviewSocial("google")}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        previewSocial === "google"
                          ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewSocial("twitter")}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        previewSocial === "twitter"
                          ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      Twitter / X
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewSocial("facebook")}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        previewSocial === "facebook"
                          ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      LinkedIn
                    </button>
                  </div>
                </div>

                {/* Card Mockup */}
                {previewSocial === "google" && (
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
                    <p className="text-[11px] text-slate-400 truncate">{metaUrl}</p>
                    <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer truncate">
                      {metaTitle}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {metaDescription}
                    </p>
                  </div>
                )}

                {previewSocial === "twitter" && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                    <div className="h-36 bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold p-4 text-center">
                      <FiGlobe size={24} className="mr-2" />
                      <span>{metaTitle}</span>
                    </div>
                    <div className="p-3.5 space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase font-mono">{metaUrl.replace("https://", "")}</p>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{metaTitle}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{metaDescription}</p>
                    </div>
                  </div>
                )}

                {previewSocial === "facebook" && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                    <div className="h-36 bg-slate-800 flex items-center justify-center text-white text-xs p-4 text-center">
                      <FiShare2 size={24} className="mr-2 text-purple-400" />
                      <span>{metaTitle}</span>
                    </div>
                    <div className="p-3.5 space-y-1 bg-slate-50 dark:bg-slate-800/60">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">{metaUrl.replace("https://", "")}</p>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{metaTitle}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{metaDescription}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* One Click Copy HTML Button */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    const htmlCode = `<!-- Primary Meta Tags -->\n<title>${metaTitle}</title>\n<meta name="title" content="${metaTitle}">\n<meta name="description" content="${metaDescription}">\n\n<!-- Open Graph / Facebook -->\n<meta property="og:type" content="website">\n<meta property="og:url" content="${metaUrl}">\n<meta property="og:title" content="${metaTitle}">\n<meta property="og:description" content="${metaDescription}">\n<meta property="og:image" content="${metaImage}">\n\n<!-- Twitter -->\n<meta property="twitter:card" content="summary_large_image">\n<meta property="twitter:url" content="${metaUrl}">\n<meta property="twitter:title" content="${metaTitle}">\n<meta property="twitter:description" content="${metaDescription}">\n<meta property="twitter:image" content="${metaImage}">\n<meta name="twitter:creator" content="${metaAuthor}">`;
                    copyToClipboard(htmlCode);
                  }}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FiCopy /> Copy HTML Meta Tags
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 7: JSON FORMATTER & VALIDATOR */}
        {activeTool === "json-formatter" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FiTerminal className="text-purple-600" /> JSON Validator & Formatter
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Paste minified or unformatted JSON to validate syntax and prettify.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Raw JSON Input
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Indent:</span>
                    <button
                      type="button"
                      onClick={() => { setIndentSpaces(2); handleFormatJson(2); }}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${indentSpaces === 2 ? "bg-purple-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                    >
                      2 spaces
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIndentSpaces(4); handleFormatJson(4); }}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${indentSpaces === 4 ? "bg-purple-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                    >
                      4 spaces
                    </button>
                  </div>
                </div>
                <textarea
                  rows={12}
                  value={jsonInput}
                  onChange={(e) => {
                    setJsonInput(e.target.value);
                    setJsonError(null);
                  }}
                  placeholder="Paste JSON payload here..."
                  className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {jsonError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <span>✕ Syntax Error:</span>
                  <span className="font-mono text-[11px] truncate">{jsonError}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleFormatJson()}
                  className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FiCheckCircle /> Validate & Beautify
                </button>
                <button
                  type="button"
                  onClick={handleMinifyJson}
                  className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
                >
                  Minify
                </button>
              </div>
            </div>

            {/* Right: Formatted Output */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Formatted Output
                    </span>
                    {formattedJson && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                        Valid JSON
                      </span>
                    )}
                  </div>
                  {formattedJson && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formattedJson)}
                      className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline"
                    >
                      <FiCopy /> Copy Output
                    </button>
                  )}
                </div>

                <div className="h-[290px] overflow-y-auto p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre shadow-inner">
                  {formattedJson || (
                    <span className="text-slate-400 italic">
                      Click &ldquo;Validate & Beautify&rdquo; to generate formatted JSON with syntax indentation.
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-400">
                <span>RFC 8259 Standard Compliant</span>
                <span>{formattedJson ? `${formattedJson.length} characters` : "Idle"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
