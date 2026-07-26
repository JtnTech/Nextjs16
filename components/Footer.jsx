import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

const Footer = () => {
  const CurrentYear = new Date().getFullYear();

  return (
    // Further reduced top margin from mt-12 to mt-8
    <footer className="bg-slate-900 border-t border-slate-800 mt-8">
      {/* Main footer content - Reduced padding from py-6 to py-4 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Reduced grid gap from gap-6 to gap-4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Brand - Reduced gap from gap-2.5 to gap-2 */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <Image
                src={logo}
                alt="EstateKart Logo"
                className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              />
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[260px]">
              Find your perfect rental property. Browse apartments, houses, condos and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            {/* Reduced bottom margin from mb-2.5 to mb-2 */}
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-2 font-heading">
              Quick Links
            </h3>
            {/* Tightened link spacing from space-y-1.5 to space-y-1 */}
            <ul className="space-y-1">
              {[
                { label: "Browse Properties", href: "/properties" },
                { label: "Add a Property", href: "/properties/add" },
                { label: "Your Profile", href: "/profile" },
                { label: "Saved Properties", href: "/properties/saved" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-white text-xs transition-colors duration-200 hover:translate-x-0.5 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types - Now in 2-column grid to save space */}
          <div>
            {/* Reduced bottom margin from mb-2.5 to mb-2 */}
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-2 font-heading">
              Property Types
            </h3>
            {/* Changed to 2-column grid with tight spacing */}
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
              {["Apartment", "House", "Condo", "Studio", "Room", "Loft"].map((type) => (
                <li key={type}>
                  <Link
                    href={`/properties/search-results?location=&propertyType=${type}`}
                    className="text-slate-400 hover:text-white text-xs transition-colors duration-200 hover:translate-x-0.5 inline-block"
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar - Reduced padding from py-3 to py-2 */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-500 text-xs">
            &copy; {CurrentYear}{" "}
            <span className="text-yellow-400 font-semibold">EstateKart</span>. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Built with ❤️ for property seekers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;