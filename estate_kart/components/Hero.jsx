"use client";

import { useState, useEffect } from "react";
import PropertySearchForm from "./PropertySearchForm";
import { Home, Building2, MapPin } from "lucide-react";

const WORDS = ["nightly", "weekly", "monthly"];
const IMAGES = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
];

const STATS = [
  { icon: Building2, value: "500+", label: "Properties" },
  { icon: MapPin,    value: "50+",  label: "Cities" },
  { icon: Home,      value: "10K+", label: "Happy Renters" },
];

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
  const [showNext, setShowNext] = useState(false);

  /* Disable skeleton loader after component mounting */
  useEffect(() => {
    setIsLoading(false);
  }, []);

  /* Text animation */
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* Background crossfade */
  useEffect(() => {
    const interval = setInterval(() => {
      const upcoming = (currentImage + 1) % IMAGES.length;
      setNextImage(upcoming);
      setShowNext(true);
      setTimeout(() => {
        setCurrentImage(upcoming);
        setShowNext(false);
      }, 1000);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImage]);

  /* ── Skeleton Loading Layout ── */
  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-slate-950" style={{ minHeight: "clamp(520px, 72vh, 780px)" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full py-20 sm:py-24 lg:py-28 animate-pulse">
          
          {/* Badge Skeleton */}
          <div className="h-6 w-64 bg-white/10 border border-white/15 rounded-full mb-6" />

          {/* Headline Skeleton */}
          <div className="flex flex-col items-center gap-2.5 mb-5 w-full">
            <div className="h-10 sm:h-14 bg-white/10 rounded-xl w-3/4 max-w-md" />
            <div className="h-10 sm:h-14 bg-white/10 rounded-xl w-1/2 max-w-xs" />
          </div>

          {/* Subtitle Skeleton */}
          <div className="h-5 bg-white/10 rounded-lg w-5/6 max-w-md mb-8" />

          {/* Search Card Skeleton */}
          <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-5 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="h-10 bg-white/10 rounded-xl w-full" />
              <div className="h-10 bg-white/10 rounded-xl w-full" />
              <div className="h-10 bg-blue-500/20 rounded-xl w-full" />
            </div>
          </div>

          {/* Stats Row Skeleton */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15" />
                <div className="flex flex-col gap-1.5">
                  <div className="h-4 w-10 bg-white/10 rounded" />
                  <div className="h-3 w-16 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>
    );
  }

  /* ── Original Render Output ── */
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "clamp(520px, 72vh, 780px)" }}>

      {/* ── Background images ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES[currentImage]})` }}
      />
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          showNext ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${IMAGES[nextImage]})` }}
      />

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-blue-950/75 to-indigo-950/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full py-20 sm:py-24 lg:py-28">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold tracking-wide mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
          India&apos;s Premium Rental Platform
        </div>

        {/* Headline */}
        <div className="text-center mb-4 animate-slide-up">
          <h1
            className="font-heading font-extrabold text-white leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Find The Perfect
            <br className="hidden sm:block" />{" "}
            Rental Property
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-center text-blue-100/90 mb-8 max-w-xl animate-slide-up"
           style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", animationDelay: "0.1s" }}>
          Discover the perfect{" "}
          <span
            className={`inline-block font-bold text-yellow-300 transition-all duration-300 ${
              fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            {WORDS[wordIndex]}
          </span>{" "}
          property that fits your lifestyle.
        </p>

        {/* ── Glassmorphism Search Card ── */}
        <div
          className="w-full max-w-2xl glass rounded-2xl px-5 py-5 shadow-2xl animate-scale-in"
          style={{ animationDelay: "0.1s" }}
        >
          <PropertySearchForm />
        </div>

        {/* ── Stats Row ── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 border border-white/15">
                <Icon size={16} className="text-blue-300" />
              </div>
              <div>
                <p className="text-white font-bold text-base font-heading leading-none">{value}</p>
                <p className="text-blue-300/80 text-xs leading-none mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;