'use client';
import { ClipLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
      {/* Brand badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-2">
      EstateKart...
      </div>

      <ClipLoader
        color="#2563eb"
        loading={true}
        size={52}
        aria-label="Loading page"
        data-testid="loader"
        speedMultiplier={0.85}
      />

      <div className="text-center">
        <p className="text-slate-700 font-semibold text-base font-heading">
          Loading…
        </p>
        <p className="text-slate-400 text-sm mt-1">
          Fetching the latest properties for you
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
