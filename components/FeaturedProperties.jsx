import { fetchProperties } from '@/utils/requests';
import FeaturedPropertyCard from './FeaturedPropertyCard';

const FeaturedProperties = async () => {
  const properties = await fetchProperties({
    showFeatured: false,
  });

  return (
    properties.length > 0 && (
      <section className="relative bg-gradient-to-b from-blue-50/50 to-white px-4 py-12 sm:py-16 lg:py-20 overflow-hidden border-b border-slate-100">
        
        {/* Subtle decorative background pattern to make it feel premium */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.25] pointer-events-none" />

        <div className="container-xl lg:container m-auto relative z-10">
          
          {/* Enhanced Header Section */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center justify-center py-1 px-3.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold tracking-widest uppercase mb-4 border border-blue-200">
              Exclusive
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Featured Properties
            </h2>
            <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
              Discover our hand-picked selection of premium real estate, offering exceptional value and unparalleled comfort.
            </p>
          </div>

          {/* Grid Layout (Increased gaps for a cleaner, uncrowded look) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10">
            {properties.map((property) => (
              <FeaturedPropertyCard key={property._id} property={property} />
            ))}
          </div>
          
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;