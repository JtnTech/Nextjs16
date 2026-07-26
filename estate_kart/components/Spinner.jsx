'use client';
import { ClipLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <ClipLoader
        color="#2563eb"
        loading={loading}
        size={48}
        aria-label="Loading"
        data-testid="loader"
        speedMultiplier={0.9}
      />
      <p className="text-slate-400 text-sm font-medium animate-pulse">
        Loading properties…
      </p>
    </div>
  );
};

export default Spinner;
