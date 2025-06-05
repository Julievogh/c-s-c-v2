"use client";
import Link from "next/link";

export default function MobileMenu({ isOpen, onClose, scrolled }) {
  return (
    <div
      className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden`}
    >
      {/* COPY HEADER STYLING BELOW */}
      <div
        className={`
    font-karla backdrop-blur-sm
    bg-[var(--color-warm-white)]/70
    border-t border-[var(--color-deep-wine)]
    ${scrolled ? "shadow-md py-2" : "shadow-lg py-4"}
    transition-all duration-300
  `}
      >
        <div className="px-6 pt-4 pb-6 space-y-4 text-sm">
          {[
            { href: "/calendar", label: "Pop-up Experience" },
            { href: "/fine-dining", label: "Fine-Dining" },
            { href: "/blog", label: "Blog" },
            { href: "/fine-dining", label: "Your Event" },
            { href: "/#story", label: "The Story" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="block uppercase tracking-wide text-base text-gray-900 border-b border-gray-300 pb-1 hover:text-[var(--color-deep-wine)] transition-colors"
            >
              {label}
            </Link>
          ))}

          <Link href="/webshop" onClick={onClose}>
            <span className="btn btn-primary uppercase w-full text-center py-2 text-sm block mt-4 tracking-wider">
              Shop
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
