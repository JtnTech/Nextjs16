"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { User, Mail, Home, Pencil, Trash2, MapPin, LogIn } from "lucide-react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const profileImage = session?.user?.image;
  const profileName  = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?.id) {
      fetchUserProperties(session.user.id);
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );
        setProperties(updatedProperties);
        toast.success("Property Deleted");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete property");
    }
  };

  /* ── Loading Spinner State ── */
  if (status === "loading" || (status === "authenticated" && loading)) {
    return <Spinner loading={true} />;
  }

  /* ── Unauthenticated State ── */
  if (status === "unauthenticated") {
    return (
      <section className="min-h-[70vh] bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md text-center bg-white border border-slate-200 rounded-2xl shadow-card p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 mb-5">
            <LogIn size={26} strokeWidth={2} />
          </div>
          <h2 className="font-heading font-bold text-slate-800 text-xl mb-1">
            Authentication Required
          </h2>
          <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
            You must be logged in to access and manage your profile or listings.
          </p>
          <button
            onClick={() => signIn("google")}
            className="btn-primary text-sm px-6 py-3 rounded-xl w-full flex items-center justify-center gap-2"
          >
            Sign In with Google
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page header ── */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-slate-900 text-2xl sm:text-3xl">
            My Account
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your profile and property listings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

          {/* ── Left: Profile Card ── */}
          <aside className="space-y-5">

            {/* Avatar card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
              {/* Gradient header */}
              <div className="h-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

              <div className="px-5 pb-5 -mt-10">
                {/* Avatar */}
                <div className="relative inline-block mb-4">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 blur-sm opacity-60" />
                  <Image
                    className="relative w-20 h-20 rounded-full border-4 border-white object-cover shadow-card-md"
                    src={profileImage || profileDefault}
                    width={80}
                    height={80}
                    alt="User avatar"
                    priority
                  />
                  <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full" title="Online" />
                </div>

                {/* Name */}
                <h2 className="font-heading font-bold text-slate-900 text-lg leading-tight mb-0.5">
                  {profileName || "User"}
                </h2>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-4">
                  Property Owner
                </p>

                {/* Info rows */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-sm text-slate-600">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-500">
                      <User size={13} />
                    </span>
                    <span className="font-medium truncate">{profileName || "—"}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-600">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-violet-50 text-violet-500">
                      <Mail size={13} />
                    </span>
                    <span className="truncate break-all">{profileEmail || "—"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
              <h3 className="font-heading font-semibold text-slate-700 text-sm uppercase tracking-wide mb-4">
                Overview
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 text-center">
                  <p className="font-heading font-bold text-2xl text-blue-700">{properties.length}</p>
                  <p className="text-xs text-blue-500 mt-0.5">Listings</p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-center">
                  <p className="font-heading font-bold text-2xl text-emerald-700">0</p>
                  <p className="text-xs text-emerald-500 mt-0.5">Messages</p>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Right: Listings ── */}
          <div>
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="font-heading font-bold text-slate-900 text-xl sm:text-2xl">
                  Your Listings
                </h2>
                <span className="badge badge-primary px-3 py-1 text-xs font-bold rounded-full">
                  {properties.length}
                </span>
              </div>
              <Link
                href="/properties/add"
                className="btn-primary text-xs px-4 py-2 rounded-xl hidden sm:inline-flex"
              >
                + Add New
              </Link>
            </div>

            {/* Listings Grid */}
            {properties.length === 0 ? (
              /* ── Empty State ── */
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-slate-200 border-dashed shadow-card">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
                  <Home size={28} className="text-slate-400" />
                </div>
                <h3 className="font-heading font-semibold text-slate-700 text-lg mb-1">
                  No Listings Yet
                </h3>
                <p className="text-slate-400 text-sm mb-5 max-w-xs">
                  You haven&apos;t added any properties. Get started and list your first one!
                </p>
                <Link href="/properties/add" className="btn-primary text-sm px-5 py-2.5 rounded-xl">
                  + Add Your First Property
                </Link>
              </div>
            ) : (
              /* ── Properties Grid ── */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                  <div
                    key={property._id}
                    className="group bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-lg transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden aspect-[16/10] bg-slate-100 flex-shrink-0">
                      <Link
                        href={`/properties/${property._id}`}
                        aria-label={`View ${property.name}`}
                      >
                        <Image
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          src={property.images?.[0]}
                          alt={property.name || "Property"}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </Link>
                      {/* Type badge */}
                      <div className="absolute top-3 left-3">
                        <span className="badge bg-black/70 backdrop-blur-sm text-white text-[10px] border border-white/10">
                          {property.type}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-heading font-bold text-slate-800 text-base leading-snug mb-2 line-clamp-2 hover:text-blue-700 transition-colors duration-200">
                        <Link href={`/properties/${property._id}`}>
                          {property.name}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-4 min-w-0">
                        <MapPin size={12} className="text-orange-400 flex-shrink-0" />
                        <span className="truncate">
                          {property.location?.street} {property.location?.city}, {property.location?.state}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-slate-100 mb-4" />

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 mt-auto">
                        <Link
                          href={`/properties/${property._id}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all duration-200 hover:shadow-md"
                        >
                          <Pencil size={11} />
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDeleteProperty(property._id)}
                          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-white bg-slate-700 hover:bg-red-600 rounded-xl transition-all duration-200 hover:shadow-md"
                          type="button"
                        >
                          <Trash2 size={11} />
                          Delete
                        </button>

                        <Link
                          href={`/properties/${property._id}`}
                          className="ml-auto inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-xl transition-all duration-200"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
