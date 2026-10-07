import { FiUsers, FiBox, FiStar, FiDownloadCloud } from "react-icons/fi";

const stats = [
  {
    icon: FiUsers,
    value: "50,000+",
    label: "Active Creators",
    description: "Designers, writers & developers"
  },
  {
    icon: FiBox,
    value: "200+",
    label: "Curated Tools",
    description: "Tested and production-ready"
  },
  {
    icon: FiStar,
    value: "4.9 / 5.0",
    label: "Customer Rating",
    description: "Over 8,500 verified reviews"
  },
  {
    icon: FiDownloadCloud,
    value: "1.2 Million",
    label: "Assets Downloaded",
    description: "Across 140+ countries"
  }
];

export default function Ratings() {
  return (
    <section className="relative -mt-4 z-20 w-11/12 max-w-7xl mx-auto mb-16">
      <div className="rounded-3xl bg-linear-to-r from-purple-700 via-indigo-700 to-purple-800 text-white p-8 md:p-12 shadow-2xl shadow-purple-900/25 border border-purple-500/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-purple-400/20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center ${
                  idx !== 0 ? "pt-6 sm:pt-0 lg:pl-6" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 text-purple-200">
                  <Icon size={24} />
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  {stat.value}
                </h3>
                <p className="mt-1 text-base font-semibold text-purple-100">
                  {stat.label}
                </p>
                <p className="text-xs text-purple-200/80 mt-1 max-w-[200px]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}