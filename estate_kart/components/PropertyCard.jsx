import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const PropertyCard = ({ property, loading = false }) => {
  // ── Render Skeleton State if Loading ──
  if (loading) {
    return (
      <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card flex flex-col animate-pulse">
        {/* Skeleton Image Area */}
        <div className="relative aspect-[16/10] bg-slate-200" />

        {/* Skeleton Card Body */}
        <div className="flex flex-col flex-1 p-4">
          {/* Skeleton Title Lines */}
          <div className="space-y-2 mb-4">
            <div className="h-4.5 bg-slate-200 rounded-md w-11/12" />
            <div className="h-4.5 bg-slate-200 rounded-md w-2/3" />
          </div>

          {/* Skeleton Stats Row */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-4 bg-slate-200 rounded w-14" />
            <div className="h-4 bg-slate-200 rounded w-14" />
            <div className="h-4 bg-slate-200 rounded w-14" />
          </div>

          {/* Skeleton Rate Pills */}
          <div className="flex gap-1.5 mb-5">
            <div className="h-5 bg-slate-200 rounded-full w-14" />
            <div className="h-5 bg-slate-200 rounded-full w-14" />
          </div>

          {/* Skeleton Divider */}
          <div className="border-t border-slate-100 mb-3" />

          {/* Skeleton Location + CTA Button Row */}
          <div className="flex items-center justify-between gap-3 mt-auto">
            <div className="h-3.5 bg-slate-200 rounded w-1/3" />
            <div className="h-8 bg-slate-200 rounded-xl w-20 flex-shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  // ── Original Logic and Normal Component Render ──
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) return `₹${rates.monthly.toLocaleString()}/mo`;
    if (rates.weekly)  return `₹${rates.weekly.toLocaleString()}/wk`;
    if (rates.nightly) return `₹${rates.nightly.toLocaleString()}/night`;
    return null;
  };

  const rate = getRateDisplay();

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">

      {/* ── Image ── */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <Image
          src={property.images[0]}
          alt={property.name || "Property image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Price badge */}
        {rate && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-blue-700 font-bold text-sm px-3 py-1.5 rounded-xl shadow-md border border-blue-100 font-heading">
            {rate}
          </div>
        )}

        {/* Property type badge */}
        <div className="absolute top-3 left-3">
          <span className="badge bg-slate-900/80 backdrop-blur-sm text-white border border-white/10 text-[11px]">
            {property.type}
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-4">

        {/* Title */}
        <h3 className="font-heading font-bold text-slate-800 text-base leading-snug mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
          {property.name}
        </h3>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
          <span className="flex items-center gap-1.5">
            <FaBed className="text-blue-400 text-sm" />
            <span className="font-medium text-slate-700">{property.beds}</span>
            <span className="text-slate-400 hidden sm:inline">Beds</span>
          </span>
          <span className="flex items-center gap-1.5">
            <FaBath className="text-cyan-400 text-sm" />
            <span className="font-medium text-slate-700">{property.baths}</span>
            <span className="text-slate-400 hidden sm:inline">Baths</span>
          </span>
          <span className="flex items-center gap-1.5">
            <FaRulerCombined className="text-violet-400 text-sm" />
            <span className="font-medium text-slate-700">{property.square_feet}</span>
            <span className="text-slate-400 hidden sm:inline">sqft</span>
          </span>
        </div>

        {/* Rate pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {property.rates.nightly && (
            <span className="badge badge-success text-[11px]">Nightly</span>
          )}
          {property.rates.weekly && (
            <span className="badge badge-primary text-[11px]">Weekly</span>
          )}
          {property.rates.monthly && (
            <span className="badge badge-warning text-[11px]">Monthly</span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 mb-3" />

        {/* Location + CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs min-w-0">
            <FaMapMarkerAlt className="text-orange-400 flex-shrink-0" />
            <span className="truncate text-slate-600 font-medium">
              {property.location.city}, {property.location.state}
            </span>
          </div>

          <Link
            href={`/properties/${property._id}`}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 hover:shadow-glow-sm whitespace-nowrap flex-shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
            aria-label={`View details for ${property.name}`}
          >
            Details
            <ArrowRight size={12} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;