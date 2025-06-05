import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
export const dynamic = "force-dynamic"; // Vigtigt for Vercel

// ✅ Helper som tjekker om billedets URL allerede er absolut
function getImageUrl(path) {
  if (!path) return "/imgs/placeholder.png";
  return path.startsWith("http") ? path : `${API_URL}${path}`;
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/api/articles`);
    if (!res.ok) {
      console.error("Fejl ved hentning af artikler:", res.statusText);
      return [];
    }
    const { data } = await res.json();
    return data.map((item) => ({
      slug: item.attributes.slug,
    }));
  } catch (error) {
    console.error("Fejl i generateStaticParams:", error);
    return [];
  }
}

export default async function ArticlePage({ params }) {
  try {
    const res = await fetch(
      `${API_URL}/api/articles?filters[slug][$eq]=${params.slug}&populate=cover`,
      { cache: "no-store" }
    );
    if (!res.ok) return notFound();

    const { data } = await res.json();
    if (!data.length) return notFound();

    const { title, description, publishedAt, cover, longtext } = data[0];
    const src = cover?.formats?.large?.url || cover?.url;

    return (
      <main className="bg-[color:var(--color-warm-white)]">
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
                    return (
                      <h2 key={index}>{item.children?.[0]?.text || ""}</h2>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    );
  } catch (err) {
    console.error("Fejl i ArticlePage:", err);
    return notFound();
  }
}
