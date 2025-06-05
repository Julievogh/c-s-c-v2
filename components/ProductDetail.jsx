// components/ProductDetail.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CheckoutModal from "@/components/CheckoutModal";

export default function ProductDetail({
  title,
  price,
  description,
  imageUrl,
  slug,
  others,
  colors,
  note,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <main className="p-6 md:p-12 max-w-6xl mx-auto text-[color:var(--color-dark-espresso)] font-karla">
      <Link
        href="/webshop"
        className="inline-block mb-8 text-sm text-[color:var(--color-dark-green)] hover:underline cursor-pointer"
      >
        ← Back to all products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={600}
              height={600}
              unoptimized
              className="rounded-2xl shadow-lg object-cover w-full h-auto"
            />
          ) : (
            <p className="text-[color:var(--color-dark-green)]">
              No image available
            </p>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-hero-family mb-4">
            {title}
          </h1>
          <p className="text-2xl font-normal text-[color:var(--color-dark-green)] mb-6">
            {price} DKK
          </p>

          <p className="whitespace-pre-line leading-relaxed mb-8">
            {description}
          </p>

          {colors && colors.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-2">Choose color:</p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={`${slug}-${color.name}-${color.hex}`}
                    onClick={() => setSelectedColor(color.hex)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                      selectedColor === color.hex
                        ? "border-[color:var(--color-dark-green)] scale-110"
                        : "border-white"
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary w-fit cursor-pointer"
          >
            Purchase
          </button>

          {showModal && (
            <CheckoutModal
              title={title}
              price={price}
              slug={slug}
              onClose={() => setShowModal(false)}
            />
          )}

          {note && (
            <p className="mt-4 text-sm text-[color:var(--color-dark-green)]">
              {note}
            </p>
          )}
        </div>
      </div>

      {others.length > 0 && (
        <section className="mt-24 bg-[color:var(--color-soft-beige)] p-8 md:p-12 rounded-xl">
          <h2 className="text-2xl font-display-family mb-6">
            More from the S’25 limited edition
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/webshop/${o.slug}`}
                className="block border border-[color:var(--color-dark-espresso)] rounded-lg overflow-hidden hover:shadow-md transition bg-white cursor-pointer"
              >
                {o.imageUrl && (
                  <Image
                    src={o.imageUrl}
                    alt={o.title}
                    width={400}
                    height={400}
                    unoptimized
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-medium font-display-family">
                    {o.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
