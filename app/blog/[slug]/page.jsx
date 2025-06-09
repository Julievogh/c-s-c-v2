"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
export const dynamic = "force-dynamic";

// ✅ Helper som tjekker om billedets URL allerede er absolut
function getImageUrl(path) {
  if (!path) return "/imgs/placeholder.png";
  return path.startsWith("http") ? path : `${API_URL}${path}`;
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=cover`, {
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch article");
        return res.json();
      })
      .then(({ data }) => {
        if (!data?.length) throw new Error("No article found");
        setArticle(data[0]);
      })
      .catch((err) => {
        console.error("Fejl i ArticlePage:", err);
        setArticle(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader />;
  if (!article) return notFound();

  const { title, description, publishedAt, cover, longtext } = article;
  const src = cover?.formats?.large?.url || cover?.url;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-[color:var(--color-warm-white)]"
    >
      <div className="grid grid-cols-12 px-4 lg:px-0">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2 py-12">
          <Link href="/blog" className="inline-block mb-8">
            <span className="btn-outline btn px-4 py-2">← Back to Blog</span>
          </Link>

          <h1 className="font-accent text-[var(--font-accent-size)] text-center mb-4">
            {title}
          </h1>

          <p className="text-center text-sm text-gray-500 mb-8">
            Published on {new Date(publishedAt).toLocaleDateString()}
          </p>

          {src && (
            <div className="flex justify-center mb-12">
              <Image
                src={getImageUrl(src)}
                width={1000}
                height={600}
                alt={title}
                className="w-full max-w-[800px] h-auto object-cover rounded-lg"
              />
            </div>
          )}

          {description && (
            <div className="prose max-w-prose mx-auto mb-16">
              <p>{description}</p>
            </div>
          )}

          {Array.isArray(longtext) && longtext.length > 0 && (
            <div className="prose max-w-prose mx-auto mb-16">
              {longtext.map((item, index) => {
                if (item.type === "paragraph") {
                  return <p key={index}>{item.children?.[0]?.text || ""}</p>;
                } else if (item.type === "heading") {
                  return <h2 key={index}>{item.children?.[0]?.text || ""}</h2>;
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </motion.main>
  );
}
