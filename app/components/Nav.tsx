"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Wine Catalog" },
  { href: "/bundles", label: "Bundles" },
  { href: "/wineries", label: "Our Wineries" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 glass-nav border-b border-outline/5"
    >
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto px-8 h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-headline text-xl font-black tracking-tighter text-primary select-none">
            Drink Now
          </span>
        </Link>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-headline text-sm font-semibold tracking-tight transition-colors duration-300 relative pb-1 ${
                  active
                    ? "text-primary-container"
                    : "text-tertiary opacity-70 hover:text-primary-container hover:opacity-100"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-container"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-6">
          <button className="material-symbols-outlined text-primary scale-95 hover:scale-100 transition-transform duration-200">
            search
          </button>
          <Link
            href="/bundles"
            className="bg-primary-container text-on-primary px-6 py-2.5 rounded text-xs font-label uppercase tracking-widest hover:bg-primary transition-all duration-300 active:scale-95"
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
