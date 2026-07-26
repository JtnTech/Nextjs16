"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

const PROPERTY_TYPES = [
  "All",
  "Apartment",
  "Studio",
  "Condo",
  "House",
  "Cabin Or Cottage",
  "Loft",
  "Room",
  "Other",
];

const PropertySearchForm = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === "" && propertyType === "All") {
      router.push("/properties");
    } else {
      const query = `?location=${location}&propertyType=${propertyType}`;
      router.push(`/properties/search-results${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full"
      role="search"
      aria-label="Property search"
    >
      {/* Location Input */}
      <div className="relative flex-1">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
          <Search size={16} strokeWidth={2} />
        </span>
        <input
          type="text"
          id="location"
          placeholder="City, state, or keyword…"
          className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/95 text-slate-800 placeholder-slate-400 text-sm font-medium border border-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 shadow-sm"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          autoComplete="off"
        />
      </div>

      {/* Property Type Select */}
      <div className="relative sm:w-44">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <select
          id="property-type"
          className="appearance-none w-full px-4 pr-9 py-3 rounded-xl bg-white/95 text-slate-800 text-sm font-medium border border-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 shadow-sm cursor-pointer"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
          <ChevronDown size={15} strokeWidth={2.5} />
        </span>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="btn-primary sm:w-auto w-full px-5 py-3 rounded-xl text-sm bg-transparent text-white border border-blue-500"
        aria-label="Search properties"
      >
        <Search size={15} strokeWidth={2.5} />
        Search
      </button>
    </form>
  );
};

export default PropertySearchForm;
