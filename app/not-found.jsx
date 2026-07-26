import Link from 'next/link';
import { TriangleAlert, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <section className="min-h-[80vh] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md text-center">

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24  mb-3npm run dev
         mx-auto">
          <TriangleAlert size={44} className="text-yellow-500" strokeWidth={1.5} />
        </div>

        {/* Status */}
        <div className="inline-flex items-center px-3 py-1  bg-red-50  text-red-500 text-xs font-semibold mb-4">
          404 — Page Not Found
        </div>

        {/* Heading */}
        <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-3">
          Oops! Lost your way?
        </h1>
        <p className="text-slate-500 text-base mb-8 leading-relaxed max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-xl text-sm w-full sm:w-auto justify-center"
          >
            <Home size={16} strokeWidth={2.5} />
            Go Home
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 w-full sm:w-auto justify-center shadow-card"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            Browse Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
