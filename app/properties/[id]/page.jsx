"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContanctForm";
import PropertyHeaderImg from "@/components/PropertyHeaderImg";
import {
  FaCheckCircle,
  FaBed,
  FaBath, 
  FaBookmark,
  FaShareAlt,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaArrowLeft,
  FaTimesCircle,
} from "react-icons/fa";


const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }
  return (
    <>
    {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImg image={property.images[0]} />
          <section>
            <div className="container mx-auto py-6 px-6">
              <Link
                href="/properties"
                className="group inline-flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-xl shadow-md text-gray-700 font-semibold hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <FaArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-2" />

                <span className="tracking-wide">Back to Properties</span>
              </Link>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">

                <PropertyDetails property={ property } />

                {/*  Sidebar  */}
                <aside className="space-y-6">
                  {/* Action Buttons */}
                  <div className="space-y-4">
                     
                     <BookmarkButton property={property} />
                   <ShareButtons property={property} />
                  </div>

                  {/* Contact Form */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
