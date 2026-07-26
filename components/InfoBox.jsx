import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Infobox = ({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-slate-800",
  ButtonInfo,
  isLoading = false, // Added optional isLoading prop
  children,
}) => {
  /* Map old bg classes to premium gradient variants */
  const gradientMap = {
    "bg-gray-100":   "from-slate-50 to-slate-100 border-slate-200",
    "bg-blue-100":   "from-blue-50 to-indigo-100 border-blue-200",
    "bg-blue-500":   "from-blue-500 to-blue-600",
    "bg-black":      "from-slate-800 to-slate-900",
  };

  const cardGradient = gradientMap[backgroundColor] ?? "from-slate-50 to-slate-100 border-slate-200";
  const btnGradient  = ButtonInfo?.backgroundColor === "bg-blue-500"
    ? "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-glow-sm"
    : "from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800";

  const accentColor = backgroundColor === "bg-blue-100"
    ? "from-blue-500 to-indigo-500"
    : "from-slate-500 to-slate-700";

  /* ── Skeleton Loading Layout ── */
  if (isLoading) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${cardGradient} p-7 shadow-card flex flex-col gap-4 animate-pulse`}
      >
        {/* Accent stripe at top */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentColor} rounded-t-2xl`}
        />

        {/* Content Skeletons */}
        <div>
          {/* Heading block */}
          <div className="h-8 bg-slate-400/20 dark:bg-slate-700/40 rounded-lg w-2/3 mb-3" />
          
          {/* Paragraph blocks */}
          <div className="space-y-2.5">
            <div className="h-4 bg-slate-400/20 dark:bg-slate-700/40 rounded-md w-full" />
            <div className="h-4 bg-slate-400/20 dark:bg-slate-700/40 rounded-md w-5/6" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="mt-auto pt-1">
          <div className="h-[38px] w-36 bg-slate-400/20 dark:bg-slate-700/40 rounded-xl" />
        </div>
      </div>
    );
  }

  /* ── Original Render Output ── */
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${cardGradient} p-7 shadow-card hover:shadow-card-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-4`}
    >
      {/* Accent stripe at top */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentColor} rounded-t-2xl`}
      />

      {/* Content */}
      <div>
        <h2 className={`font-heading font-bold text-2xl ${textColor} mb-2`}>
          {heading}
        </h2>
        <p className={`${textColor} opacity-75 text-sm leading-relaxed`}>
          {children}
        </p>
      </div>

      {/* Button */}
      <div className="mt-auto pt-1">
        <Link
          href={ButtonInfo.link}
          className={`inline-flex items-center gap-2 bg-gradient-to-r ${btnGradient} text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-250 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2`}
        >
          {ButtonInfo.text}
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
};

export default Infobox;