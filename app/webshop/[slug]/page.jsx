import ProductDetail from "@/components/ProductDetail";
import { notFound } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;
if (!API) throw new Error("NEXT_PUBLIC_API_URL is not defined");

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API}/api/products`);
    const data = await res.json();

    return data.data.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Failed to fetch slugs:", error);
    return [];
  }
}

export default async function ProductPage({ params }) {
  const { slug } = params;

  const res = await fetch(
    `${API}/api/products?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );
  if (!res.ok) return notFound();

  const { data } = await res.json();
  if (!data.length) return notFound();

  const prod = data[0];
  const {
    Title,
    Description,
    Price,
    Image: imgObj,
    ColorChoose = [], // 👈 fallback til tomt array
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

  // Fetch other products
  const allRes = await fetch(`${API}/api/products?populate=*`, {
    cache: "no-store",
  });
  const { data: allData } = await allRes.json();

  const others = allData
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

  return (
    <ProductDetail
      title={Title}
      price={Price}
      description={description}
      imageUrl={mainImage}
      slug={slug}
      colors={ColorChoose}
      others={others}
      note="Made to order. Limited edition drop—once it’s gone, it’s gone. Your order reserves your spot."
    />
  );
}
