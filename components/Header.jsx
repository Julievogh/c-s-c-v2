"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const thresholdEnter = 55;
    const thresholdLeave = 45;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (!scrolled && y > thresholdEnter) {
          setScrolled(true);
        } else if (scrolled && y < thresholdLeave) {
          setScrolled(false);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () =>
      window.removeEventListener("scroll", onScroll, { passive: true });
  }, [scrolled]);

  const headerClasses = [
    "sticky top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm",
    "bg-[var(--color-warm-white)]/70 font-karla",
    scrolled ? "py-0 shadow-md" : "py-4 shadow-lg",
  ].join(" ");

  const isActive = (href) => pathname === href;

  return (
    <header className={headerClasses}>
      <nav
        className={
          scrolled
            ? "max-w-7xl mx-auto px-4 flex items-center justify-between"
            : "max-w-7xl mx-auto px-6 flex items-center justify-between"
        }
      >
        {/* Desktop left links */}
        <div className="hidden md:flex space-x-8">
          {[
            { href: "/calendar", label: "Pop-up Experience" },
            { href: "/fine-dining", label: "Fine-Dining" },
            { href: "/blog", label: "Blog" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`uppercase relative group ${isActive(href) ? "font-bold" : ""}`}
            >
              {label}
              <span className="block absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-deep-wine)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/imgs/logo.svg"
            alt="Cozy Social Club"
            width={160}
            height={160}
            className={`transition-transform transition-opacity duration-300 ${
              scrolled ? "scale-75 opacity-80" : "scale-100 opacity-100"
            }`}
          />
        </Link>

        {/* Desktop right links */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { href: "/fine-dining", label: "Your Event" },
            { href: "/#story", label: "The Story" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="uppercase relative group">
              {label}
              <span className="block absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-deep-wine)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
          <Link
            href="/webshop"
            className="btn btn-primary uppercase transition-transform hover:scale-105"
          >
            Webshop
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-1" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 my-1 transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          />
        </button>
      </nav>

      {/* Slide-down mobile menu (below header) */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        scrolled={scrolled}
      />
    </header>
  );
}
