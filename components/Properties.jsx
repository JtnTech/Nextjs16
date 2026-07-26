"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";
import { Home } from "lucide-react";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setProperties(data);
        setTotalItems(data.length);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <Spinner loading={loading} />;

  return (
    <section className="px-4 py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Empty state */}
        {properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-100 mb-5">
              <Home size={32} className="text-slate-400" />
            </div>
            <h3 className="font-heading font-bold text-slate-700 text-xl mb-2">
              No Properties Found
            </h3>
            <p className="text-slate-400 text-sm max-w-xs">
              Try adjusting your search filters or check back later for new listings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Properties;
