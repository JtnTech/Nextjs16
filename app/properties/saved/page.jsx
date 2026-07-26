"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Saved Properties
            </h1>
            <p className="mt-1 w-fit rounded border border-blue-300 bg-blue-50 px-3 py-1 text-sm text-gray-700">
              {loading
                ? "Loading your items..."
                : properties.length
                ? `${properties.length} saved ${properties.length === 1 ? "property" : "properties"}`
                : "Browse and save your favorites."}
            </p>
          </div>
        </div>

        {/* Loading State with Skeletons + Integrated Spinner */}
        {loading ? (
          <div className="relative min-h-[400px]">
            {/* Kept original spinner completely intact and centered */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <Spinner loading={loading} />
            </div>

            {/* Skeleton Grid Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 opacity-60">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
                >
                  {/* Mock Image Box */}
                  <div className="bg-gray-200 h-48 w-full" />
                  
                  {/* Mock Information Fields */}
                  <div className="p-4 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    
                    {/* Mock Card Action Divider */}
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <p className="text-gray-700 font-medium">No saved properties</p>
            <p className="mt-1 text-sm text-gray-500">
              Save listings to see them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;