"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Wine Catalog" },
  { href: "/bundles", label: "Bundles" },
  { href: "/wineries", label: "Our Wineries" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 glass-nav border-b border-outline/5"
      >
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto px-6 md:px-8 h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="font-headline text-xl font-black tracking-tighter text-primary select-none">
              Drink Now
            </span>
          </Link>

          {/* Desktop nav links */}
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-primary origin-center transition-all"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-primary"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-primary origin-center transition-all"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 glass-nav border-b border-outline/10 md:hidden"
          >
            <nav className="flex flex-col px-6 py-4">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`font-headline text-lg font-semibold py-4 border-b border-outline/10 last:border-0 transition-colors ${
                      active ? "text-primary-container" : "text-tertiary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
