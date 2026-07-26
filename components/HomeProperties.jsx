import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import { fetchProperties } from "@/utils/requests";
import { ArrowRight, Sparkles } from "lucide-react";

const HomeProperties = async () => {
  const properties = await fetchProperties();

  const recentProperties = [...properties]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-14 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-3">
              <Sparkles size={13} />
              Featured Listings
            </div>
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-3">
              Recent{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Properties
              </span>
            </h2>
            <p className="text-slate-500 text-base max-w-md mx-auto">
              Hand-picked rental properties available right now
            </p>
          </div>

          {/* Grid */}
          {recentProperties.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <div className="text-5xl mb-4">🏠</div>
              <p className="font-medium">No properties found at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* View All CTA */}
      <section className="bg-slate-50 pb-14">
        <div className="flex justify-center px-4">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3.5 px-8 rounded-2xl transition-all duration-300 hover:shadow-card-lg hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
          >
            View All Properties
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomeProperties;