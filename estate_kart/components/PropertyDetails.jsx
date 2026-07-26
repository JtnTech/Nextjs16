// import { FaCheckCircle, FaBed, FaBath, FaTimesCircle } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { MdSquareFoot } from "react-icons/md";
// import PropertyMap from "./PropertyMap";

// const PropertyDetails = ({ property }) => {
//   return (
//     <main className="space-y-5">

//       {/* ── Card 1: Overview ── */}
//       <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-6 sm:p-8 hover:shadow-card-lg transition-all duration-300">

//         {/* Property Type */}
//         <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-blue-100">
//           {property.type}
//         </span>

//         {/* Property Name */}
//         <h1 className="font-heading font-bold text-slate-900 text-2xl sm:text-3xl lg:text-4xl mb-5 leading-tight">
//           {property.name}
//         </h1>

//         {/* Location */}
//         <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl p-4 mb-8">
//           <FaLocationDot className="text-xl text-orange-500 flex-shrink-0" />
//           <p className="text-orange-700 font-medium text-sm">
//             {property.location.street}, {property.location.city},{" "}
//             {property.location.state}
//           </p>
//         </div>

//         {/* Rates */}
//         <div>
//           <h3 className="font-heading font-bold text-slate-800 text-lg border-b border-slate-200 pb-3 mb-5">
//             Rates &amp; Options
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             {/* Nightly */}
//             <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-5 text-center hover:shadow-card-md hover:scale-[1.02] transition-all duration-300">
//               <p className="text-slate-500 font-semibold text-sm mb-3">Nightly</p>
//               {property.rates.nightly ? (
//                 <h4 className="font-heading font-bold text-2xl text-orange-600">
//                   ₹{property.rates.nightly.toLocaleString()}
//                 </h4>
//               ) : (
//                 <FaTimesCircle className="text-red-400 text-2xl mx-auto" />
//               )}
//             </div>

//             {/* Weekly */}
//             <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 text-center hover:shadow-card-md hover:scale-[1.02] transition-all duration-300">
//               <p className="text-slate-500 font-semibold text-sm mb-3">Weekly</p>
//               {property.rates.weekly ? (
//                 <h4 className="font-heading font-bold text-2xl text-blue-600">
//                   ₹{property.rates.weekly.toLocaleString()}
//                 </h4>
//               ) : (
//                 <FaTimesCircle className="text-red-400 text-2xl mx-auto" />
//               )}
//             </div>

//             {/* Monthly */}
//             <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-5 text-center hover:shadow-card-md hover:scale-[1.02] transition-all duration-300">
//               <p className="text-slate-500 font-semibold text-sm mb-3">Monthly</p>
//               {property.rates.monthly ? (
//                 <h4 className="font-heading font-bold text-2xl text-green-600">
//                   ₹{property.rates.monthly.toLocaleString()}
//                 </h4>
//               ) : (
//                 <FaTimesCircle className="text-red-400 text-2xl mx-auto" />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Card 2: Description + Details ── */}
//       <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-6 sm:p-8 hover:shadow-card-lg transition-all duration-300">

//         {/* Description heading (actual property description) */}
//         <h3 className="font-heading font-bold text-slate-900 text-xl border-b border-slate-200 pb-4 mb-6">
//           About this Property
//         </h3>

//         {/* Property Stats */}
//         <div className="grid grid-cols-3 gap-4 mb-8">
//           <div className="flex flex-col items-center justify-center bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition-all duration-300">
//             <FaBed className="text-3xl text-blue-500 mb-2" />
//             <h4 className="font-heading font-bold text-slate-800 text-xl">{property.beds}</h4>
//             <p className="text-xs text-slate-500">Beds</p>
//           </div>
//           <div className="flex flex-col items-center justify-center bg-emerald-50 rounded-xl p-4 hover:bg-emerald-100 transition-all duration-300">
//             <FaBath className="text-3xl text-emerald-500 mb-2" />
//             <h4 className="font-heading font-bold text-slate-800 text-xl">{property.baths}</h4>
//             <p className="text-xs text-slate-500">Baths</p>
//           </div>
//           <div className="flex flex-col items-center justify-center bg-violet-50 rounded-xl p-4 hover:bg-violet-100 transition-all duration-300">
//             <MdSquareFoot className="text-3xl text-violet-500 mb-2" />
//             <h4 className="font-heading font-bold text-slate-800 text-xl">{property.square_feet}</h4>
//             <p className="text-xs text-slate-500">Sq Ft</p>
//           </div>
//         </div>

//         {/* Description text */}
//         {property.description && (
//           <div className="border-l-4 border-blue-500 bg-blue-50/60 rounded-r-xl p-4">
//             <p className="text-slate-700 leading-7 text-sm">
//               <span className="font-semibold text-slate-900">Overview: </span>
//               {property.description}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* ── Card 3: Amenities ── */}
//      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mt-6 hover:shadow-xl transition-all duration-300">
//         <h3 className="text-2xl font-bold text-gray-800 border-b border-blue-300 pb-4 mb-6">
//           Amenities
//         </h3>

//         <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
//           {property.amenities.map((amenity, index) => (
//             <li
//               key={index}
//               className="flex items-center p-3 rounded-xl hover:bg-green-50 transition-all duration-300 cursor-pointer"
//             >
//               <FaCheckCircle className="text-green-500 text-xl mr-3 flex-shrink-0" />
//               <span className="text-gray-700 font-medium">{amenity}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* ── Card 4: Map ── */}
//      <div className="bg-white z-10 p-6 rounded-lg shadow-md mt-6">
//          {/* <pre>{JSON.stringify(property, null, 2)}</pre> */}

//          <PropertyMap property={property} />
//       </div>
//     </main>
//   );
// };

// export default PropertyDetails;
// // 


import { FaCheckCircle, FaBed, FaBath, FaTimesCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdSquareFoot } from "react-icons/md";
import PropertyMap from "./PropertyMap";

const PropertyDetails = ({ property, isLoading = false }) => {
  /* ── Skeleton Loading Layout ── */
  if (isLoading) {
    return (
      <main className="space-y-5 animate-pulse">
        {/* Card 1 Skeleton: Overview */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-6 sm:p-8">
          <div className="h-6 w-20 bg-slate-200 rounded-full mb-4" />
          <div className="h-10 bg-slate-200 rounded-xl w-3/4 mb-5" />
          <div className="h-14 bg-slate-100 border border-slate-200/60 rounded-xl w-full mb-8" />
          <div className="h-6 bg-slate-200 rounded w-36 mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="h-28 bg-slate-50 border border-slate-100 rounded-2xl" />
            <div className="h-28 bg-slate-50 border border-slate-100 rounded-2xl" />
            <div className="h-28 bg-slate-50 border border-slate-100 rounded-2xl" />
          </div>
        </div>

        {/* Card 2 Skeleton: Description + Details */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-6 sm:p-8">
          <div className="h-6 bg-slate-200 rounded w-44 mb-6" />
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="h-24 bg-slate-50 rounded-xl" />
            <div className="h-24 bg-slate-50 rounded-xl" />
            <div className="h-24 bg-slate-50 rounded-xl" />
          </div>
          <div className="h-16 bg-slate-50 rounded-r-xl border-l-4 border-slate-200 w-full" />
        </div>

        {/* Card 3 Skeleton: Amenities */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mt-6">
          <div className="h-7 bg-slate-200 rounded w-32 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-50 rounded-xl w-full" />
            ))}
          </div>
        </div>

        {/* Card 4 Skeleton: Map */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 h-80 bg-slate-50 border border-slate-100" />
      </main>
    );
  }

  /* ── Original Render Output ── */
  return (
    <main className="space-y-5">

      {/* ── Card 1: Overview ── */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-6 sm:p-8 hover:shadow-card-lg transition-all duration-300">

        {/* Property Type */}
        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-blue-100">
          {property.type}
        </span>

        {/* Property Name */}
        <h1 className="font-heading font-bold text-slate-900 text-2xl sm:text-3xl lg:text-4xl mb-5 leading-tight">
          {property.name}
        </h1>

        {/* Location */}
        <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl p-4 mb-8">
          <FaLocationDot className="text-xl text-orange-500 flex-shrink-0" />
          <p className="text-orange-700 font-medium text-sm">
            {property.location.street}, {property.location.city},{" "}
            {property.location.state}
          </p>
        </div>

        {/* Rates */}
        <div>
          <h3 className="font-heading font-bold text-slate-800 text-lg border-b border-slate-200 pb-3 mb-5">
            Rates &amp; Options
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Nightly */}
            <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-5 text-center hover:shadow-card-md hover:scale-[1.02] transition-all duration-300">
              <p className="text-slate-500 font-semibold text-sm mb-3">Nightly</p>
              {property.rates.nightly ? (
                <h4 className="font-heading font-bold text-2xl text-orange-600">
                  ₹{property.rates.nightly.toLocaleString()}
                </h4>
              ) : (
                <FaTimesCircle className="text-red-400 text-2xl mx-auto" />
              )}
            </div>

            {/* Weekly */}
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 text-center hover:shadow-card-md hover:scale-[1.02] transition-all duration-300">
              <p className="text-slate-500 font-semibold text-sm mb-3">Weekly</p>
              {property.rates.weekly ? (
                <h4 className="font-heading font-bold text-2xl text-blue-600">
                  ₹{property.rates.weekly.toLocaleString()}
                </h4>
              ) : (
                <FaTimesCircle className="text-red-400 text-2xl mx-auto" />
              )}
            </div>

            {/* Monthly */}
            <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-5 text-center hover:shadow-card-md hover:scale-[1.02] transition-all duration-300">
              <p className="text-slate-500 font-semibold text-sm mb-3">Monthly</p>
              {property.rates.monthly ? (
                <h4 className="font-heading font-bold text-2xl text-green-600">
                  ₹{property.rates.monthly.toLocaleString()}
                </h4>
              ) : (
                <FaTimesCircle className="text-red-400 text-2xl mx-auto" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Card 2: Description + Details ── */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-6 sm:p-8 hover:shadow-card-lg transition-all duration-300">

        {/* Description heading (actual property description) */}
        <h3 className="font-heading font-bold text-slate-900 text-xl border-b border-slate-200 pb-4 mb-6">
          About this Property
        </h3>

        {/* Property Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center justify-center bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition-all duration-300">
            <FaBed className="text-3xl text-blue-500 mb-2" />
            <h4 className="font-heading font-bold text-slate-800 text-xl">{property.beds}</h4>
            <p className="text-xs text-slate-500">Beds</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-emerald-50 rounded-xl p-4 hover:bg-emerald-100 transition-all duration-300">
            <FaBath className="text-3xl text-emerald-500 mb-2" />
            <h4 className="font-heading font-bold text-slate-800 text-xl">{property.baths}</h4>
            <p className="text-xs text-slate-500">Baths</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-violet-50 rounded-xl p-4 hover:bg-violet-100 transition-all duration-300">
            <MdSquareFoot className="text-3xl text-violet-500 mb-2" />
            <h4 className="font-heading font-bold text-slate-800 text-xl">{property.square_feet}</h4>
            <p className="text-xs text-slate-500">Sq Ft</p>
          </div>
        </div>

        {/* Description text */}
        {property.description && (
          <div className="border-l-4 border-blue-500 bg-blue-50/60 rounded-r-xl p-4">
            <p className="text-slate-700 leading-7 text-sm">
              <span className="font-semibold text-slate-900">Overview: </span>
              {property.description}
            </p>
          </div>
        )}
      </div>

      {/* ── Card 3: Amenities ── */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mt-6 hover:shadow-xl transition-all duration-300">
        <h3 className="text-2xl font-bold text-gray-800 border-b border-blue-300 pb-4 mb-6">
          Amenities
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {property.amenities.map((amenity, index) => (
            <li
              key={index}
              className="flex items-center p-3 rounded-xl hover:bg-green-50 transition-all duration-300 cursor-pointer"
            >
              <FaCheckCircle className="text-green-500 text-xl mr-3 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{amenity}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Card 4: Map ── */}
      <div className="bg-white z-10 p-6 rounded-lg shadow-md mt-6">
         {/* <pre>{JSON.stringify(property, null, 2)}</pre> */}

         <PropertyMap property={property} />
      </div>
    </main>
  );
};

export default PropertyDetails;