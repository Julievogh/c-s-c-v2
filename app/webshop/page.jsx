"use client";
import Image from "next/image";
import Link from "next/link";
import Socials from "@/components/Socials";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
export const dynamic = "force-dynamic";

function getImageUrl(url) {
  if (!url) return "/imgs/placeholder.png";
  return url.startsWith("http") ? url : `${API}${url}`;
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/products?populate=*`)
      .then((res) => {
        if (!res.ok) throw new Error("API-fejl: " + res.status);
        return res.json();
      })
      .then((data) => {
        const formatted = data.data.map((item) => {
          const description = Array.isArray(item.Description)
            ? item.Description.map((block) =>
                block.children.map((ch) => ch.text).join(" ")
              ).join("\n\n")
            : "No description";

          const img = item.Image;
          const imageUrl = getImageUrl(img?.formats?.small?.url || img?.url);

          return {
            id: item.id,
            title: item.Title,
            description,
            price: item.Price,
            image: imageUrl,
            slug: item.slug,
            colors: item.ColorChoose ?? [],
          };
        });

        setProducts(formatted);
      })
      .catch((err) => {
        console.error("Fejl i fetch:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Loading…</p>;
  if (!products.length) return <p className="p-8">No products available</p>;

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-16">
      <div className="text-center max-w-2xl mx-auto">
        <p className="uppercase text-sm tracking-wide text-[var(--color-deep-wine)] font-semibold mb-2">
          Limited Edition · Made to Order
        </p>
        <h1 className="text-3xl font-bold mb-4">Cozy Social Club Webshop</h1>
        <p className="text-gray-700 leading-relaxed">
          Every item in our shop is a handcrafted experience. Designed for the
          inner circle, each drop is <strong>limited</strong>,{" "}
          <strong>made to order</strong>, and only available for a short time.
        </p>
      </div>

      <div className="h-0.5 bg-[var(--color-dark-green)]"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/webshop/${p.slug}`}
            className="group block overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-200"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col p-4 h-64">
              <h2 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-deep-wine)]">
                {p.title}
              </h2>
              <p className="text-sm text-gray-600 whitespace-pre-line flex-grow">
                {p.description}
              </p>

              {/* Farver som cirkler */}
              <div className="flex gap-2 mt-2">
                {p.colors.map((c) => (
                  <span
                    key={c.id}
                    className="w-5 h-5 rounded-full border"
                    title={c.name}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>

              <p className="text-xl font-bold mt-auto">{p.price} DKK</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="h-0.5 bg-[var(--color-dark-green)]"></div>

      <div className="mt-12">
        <Image
          src="/imgs/placeholder.png"
          alt="Merch promo"
          width={1200}
          height={400}
          className="rounded shadow mx-auto"
        />
      </div>

      <div className="h-0.5 bg-[var(--color-dark-green)]"></div>

      <div className="mt-12">
        <Image
          src="/imgs/logo-green.svg"
          alt="Cozy Social Club Logo"
          width={400}
          height={400}
          className="mx-auto"
        />
      </div>
      <Socials />
      <Footer className="mt-12" />
    </div>
  );
}
