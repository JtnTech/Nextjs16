// import PropertySearchForm from '@/components/PropertySearchForm';
// import Properties from '@/components/Properties';
// import { SlidersHorizontal } from 'lucide-react';

// const PropertiesPage = async () => {
//   return (
//     <>
//       {/* ── Search Header ── */}
//       <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-7 shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="mb-4 flex items-center gap-2">
//             <SlidersHorizontal size={16} className="text-blue-300" />
//             <span className="text-blue-200 text-sm font-semibold tracking-wide uppercase">
//               Filter Properties
//             </span>
//           </div>
//           <PropertySearchForm />
//         </div>
//       </section>

//       {/* ── Listing Grid ── */}
//       <Properties />
//     </>
//   );
// };

// export default PropertiesPage;

import { Suspense } from 'react'; // Imported Suspense
import PropertySearchForm from '@/components/PropertySearchForm';
import Properties from '@/components/Properties';
import { SlidersHorizontal } from 'lucide-react';

/* ── Listing Grid Skeleton Loader ── */
const PropertiesSkeleton = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      {/* Skeleton Header Title */}
      <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded-lg w-48 mb-6" />

      {/* Grid structure mirroring the standard card display layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 p-4 flex flex-col gap-4 shadow-sm"
          >
            {/* Image Box */}
            <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
            
            {/* Tag info block */}
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            
            {/* Main Title lines */}
            <div className="space-y-2">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            </div>

            {/* Spec lines (Beds, baths, sqft placeholders) */}
            <div className="flex gap-4 pt-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12" />
            </div>

            {/* Card Action footer line */}
            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-24" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PropertiesPage = async () => {
  return (
    <>
      {/* ── Search Header ── */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-7 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-blue-300" />
            <span className="text-blue-200 text-sm font-semibold tracking-wide uppercase">
              Filter Properties
            </span>
          </div>
          <PropertySearchForm />
        </div>
      </section>

      {/* ── Listing Grid wrapped with Loading Suspense ── */}
      <Suspense fallback={<PropertiesSkeleton />}>
        <Properties />
      </Suspense>
    </>
  );
};

export default PropertiesPage;