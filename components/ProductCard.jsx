import Link from "next/link";

export default function ProductCard({ product }) {
  if (!product) return null;

  const { title, description, price, image, slug } = product;

  // Make sure the image URL is correctly formatted if there is an image
  const imageUrl = image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${image.data.attributes.url}`
    : "";

  return (
    <div className="border rounded-lg p-4 shadow">
      {imageUrl && <img src={imageUrl} alt={title} className="mb-4" />}
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm mb-2">
        {Array.isArray(description) ? description.join(" ") : description}
      </p>
      <p className="font-semibold">{price} DKK</p>
      <Link href={`/webshop/${slug}`} className="text-blue-500 hover:underline">
        View Product
      </Link>
    </div>
  );
}
