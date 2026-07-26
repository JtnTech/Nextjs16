"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from "@/assets/images/logo-white.png";
import profileDefault from "@/assets/images/profile.png";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { User, Bell, X, Menu, Heart, LogOut } from "lucide-react";
import UnreadMessageCount from "./UnreadMessageCount";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"; // 1. CRITICAL IMPORT HERE

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setisProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef(null);
  const pathname = usePathname();

  /* Fetch auth providers */
  useEffect(() => {
    const setAuthProviders = async () => {
      try {
        const res = await getProviders();
        setProviders(res);
      } catch (error) {
        console.error("Failed to fetch providers:", error);
      }
    };
    setAuthProviders();
  }, []);

  /* Scroll listener for glassmorphism effect */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close profile menu on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setisProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setisMobileMenuOpen(false);
    setisProfileMenuOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    pathname === href ? "active-link" : "";

  return (
    <nav
      className={`sticky top-0 z-[9999] transition-all duration-300 ${
        scrolled
          ? "bg-blue-950/95 backdrop-blur-md shadow-lg border-b border-white/10"
          : "bg-blue-950 border-b border-blue-800/60"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-[68px] items-center justify-between">

          {/* ── Mobile hamburger ── */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Open main menu"
              onClick={() => setisMobileMenuOpen((prev) => !prev)}
              className="relative inline-flex items-center justify-center rounded-xl p-2 text-blue-200 hover:bg-white/10 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {isMobileMenuOpen ? (
                <X size={22} strokeWidth={2} />
              ) : (
                <Menu size={22} strokeWidth={2} />
              )}
            </button>
          </div>

          {/* ── Logo + Desktop Nav ── */}
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* Logo */}
            <Link className="flex flex-shrink-0 items-center gap-2 group" href="/">
              <Image
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
                src={logo}
                alt="EstateKart"
                priority
              />
              <span className="logo hidden md:block text-[1.35rem] font-black ml-0.5 tracking-tight">
                <span className="estate">Estate</span>
                <span className="kart">Kart</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex md:ml-8 items-center gap-3">
  <Link 
    id="swap-link" 
    className={`${isActive("/")} group relative overflow-hidden px-3 py-1.5 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 transition-all duration-200`} 
    href="/"
  >
    <span className="text top">Home</span>
    <span className="text bottom">Home</span>
  </Link>

  <Link 
    id="swap-link" 
    className={`${isActive("/properties")} group relative overflow-hidden px-3 py-1.5 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 transition-all duration-200`} 
    href="/properties"
  >
    <span className="text top">Properties</span>
    <span className="text bottom">Properties</span>
  </Link>

  {session && (
    <Link
      id="swap-link"
      className={`${isActive("/properties/add")} group relative overflow-hidden flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 active:scale-[0.97] rounded-xl px-4 h-9 shadow-md hover:shadow-lg hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-200 !min-w-[125px] whitespace-nowrap`}
      href="/properties/add"
    >
      <span className="top text-xs font-bold w-full text-center">
        + Add Property
      </span>
      <span className="text bottom text-xs font-bold w-full text-center">
        + Add Property
      </span>
    </Link>
  )}
</div>
          </div>

          {/* ── Right Side (Logged Out) ── */}
          {!session && (
            <div className="hidden md:flex items-center">
              {providers &&
                Object.values(providers).map((provider, index) => (
                  <button
                    key={index}
                    onClick={() => signIn(provider.id)}
                    id="swap-link"
                    className="relative overflow-hidden flex items-center justify-center text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-4 py-2.5 transition-all duration-200 hover:shadow-glow-sm !min-w-0 whitespace-nowrap"
                    aria-label="Sign in with Google"
                  >
                    <span className="top text-sm font-semibold flex items-center gap-2">
                      <FaGoogle className="text-white/80" size={14} />
                      Login / Register
                    </span>
                    <span className="text bottom text-sm font-semibold flex items-center gap-2">
                      <FaGoogle className="text-white/80" size={14} />
                      Login / Register
                    </span>
                  </button>
                ))}
            </div>
          )}

          {/* ── Right Side (Logged In) ── */}
          {session && (
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <Link
                href="/messages"
                className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 text-blue-200 hover:text-white transition-all duration-200 border border-white/10"
                aria-label="View messages"
              >
                <Bell size={18} strokeWidth={2} />
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full ring-2 ring-blue-950">
                    <UnreadMessageCount session={session} />
                </span>
              </Link>

              {/* Profile Avatar + Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  className="relative flex items-center justify-center p-[2.5px] rounded-full bg-gradient-to-r from-blue-400 via-violet-500 to-cyan-400 hover:shadow-glow-blue transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
                  id="user-menu-button"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                  onClick={() => setisProfileMenuOpen((prev) => !prev)}
                  aria-label="Open user menu"
                >
                  <Image
                    className="h-9 w-9 rounded-full border-2 border-blue-950 object-cover transition-transform duration-300 hover:scale-105"
                    src={profileImage || profileDefault}
                    width={36}
                    height={36}
                    alt="Profile"
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div
                    id="user-menu"
                    className="profile-dropdown absolute right-0 z-50 mt-3 w-60 rounded-2xl bg-white shadow-card-xl ring-1 ring-black/5 overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    {/* User info header */}
                    <div className="px-4 py-3.5 bg-gradient-to-br from-blue-50 to-violet-50 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <Image
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                          src={profileImage || profileDefault}
                          width={40}
                          height={40}
                          alt="Profile"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate font-heading">
                            {profileName || "User"}
                          </p>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {profileEmail}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1.5">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 group"
                        role="menuitem"
                        onClick={() => setisProfileMenuOpen(false)}
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-blue-100 text-slate-500 group-hover:text-blue-600 transition-colors duration-150">
                          <User size={14} />
                        </span>
                        <span className="font-medium">Your Profile</span>
                      </Link>

                      <Link
                        href="/properties/saved"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors duration-150 group"
                        role="menuitem"
                        onClick={() => setisProfileMenuOpen(false)}
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-rose-100 text-slate-500 group-hover:text-rose-600 transition-colors duration-150">
                          <Heart size={14} />
                        </span>
                        <span className="font-medium">Saved Properties</span>
                      </Link>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-100 my-0.5" />

                    {/* Sign Out */}
                    <div className="py-1.5">
                      <button
                        onClick={() => {
                          setisProfileMenuOpen(false);
                          signOut();
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 group"
                        role="menuitem"
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-red-100 text-slate-500 group-hover:text-red-500 transition-colors duration-150">
                          <LogOut size={14} />
                        </span>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden mobile-menu-enter">
          <div className="border-t border-white/10 px-3 pb-4 pt-3 space-y-1 bg-blue-950/98">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === "/"
                  ? "bg-white/15 text-white"
                  : "text-blue-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              href="/properties"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === "/properties"
                  ? "bg-white/15 text-white"
                  : "text-blue-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              Properties
            </Link>

            {session && (
              <Link
                href="/properties/add"
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === "/properties/add"
                    ? "bg-violet-600/80 text-white"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                + Add Property
              </Link>
            )}

            {!session &&
              providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="flex w-full items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all duration-200"
                >
                  <FaGoogle size={14} className="text-white/80" />
                  Login / Register
                </button>
              ))}

            {/* Mobile Profile Actions */}
            {session && (
              <div className="pt-2 border-t border-white/10 mt-2 space-y-1">
                <div className="flex items-center gap-3 px-3 py-2">
                  <Image
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-white/20"
                    src={profileImage || profileDefault}
                    width={32}
                    height={32}
                    alt="Profile"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{profileName || "User"}</p>
                    <p className="text-xs text-blue-300 truncate max-w-[180px]">{profileEmail}</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-200 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <User size={14} /> Your Profile
                </Link>
                <Link
                  href="/properties/saved"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-200 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <Heart size={14} /> Saved Properties
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
