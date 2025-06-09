"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;
if (!API) throw new Error("NEXT_PUBLIC_API_URL is not defined");

export const dynamic = "force-dynamic";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `${API}/api/products?filters[slug][$eq]=${slug}&populate=*`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("404");

        const { data } = await res.json();
        if (!data.length) throw new Error("404");

        const prod = data[0];
        const {
          Title,
          Description,
          Price,
          Image: imgObj,
          ColorChoose = [],
        } = prod;

        const description = Array.isArray(Description)
          ? Description.map((blk) =>
              blk.children.map((ch) => ch.text).join(" ")
            ).join("\n\n")
          : Description || "";

        const mainPath = imgObj?.formats?.small?.url ?? imgObj?.url ?? null;
        const mainImage = mainPath?.startsWith("http")
          ? mainPath
          : mainPath
            ? `${API}${mainPath}`
            : "/imgs/placeholder.png";

        setProduct({
          title: Title,
          price: Price,
          description,
          imageUrl: mainImage,
          slug,
          colors: ColorChoose,
        });

        // Fetch other products
        const allRes = await fetch(`${API}/api/products?populate=*`, {
          cache: "no-store",
        });
        const { data: allData } = await allRes.json();

        const otherProducts = allData
          .filter((o) => o.slug !== slug)
          .slice(0, 3)
          .map((o) => {
            const img = o.Image;
            const path = img?.formats?.small?.url ?? img?.url ?? null;
            const imageUrl = path?.startsWith("http")
              ? path
              : path
                ? `${API}${path}`
                : "/imgs/placeholder.png";

            return {
              title: o.Title,
              slug: o.slug,
              imageUrl,
            };
          });

        setOthers(otherProducts);
      } catch (err) {
        console.error("Fejl i produktvisning:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) return <Loader />;
  if (!product) return notFound();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-[color:var(--color-warm-white)] px-4 py-12"
    >
      <div className="max-w-7xl mx-auto">
        <Link href="/webshop" className="inline-block mb-8">
          <span className="btn-outline btn px-4 py-2">← Back to Shop</span>
        </Link>

        <ProductDetail
          {...product}
          others={others}
          note="Made to order. Limited edition drop—once it’s gone, it’s gone. Your order reserves your spot."
        />
      </div>
    </motion.main>
  );
}
