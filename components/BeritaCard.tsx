// components/BeritaCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface BeritaCardProps {
  judul: string;
  gambarUrl: string;
  slug: string; // Slug sekarang adalah string dari Strapi
}

const BeritaCard = ({ judul, gambarUrl, slug }: BeritaCardProps) => {
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return (
    <Link href={`/berita/${slug}`} className="block group"> {/* Link sudah benar */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <Image
          src={gambarUrl ? `${strapiBaseUrl}${gambarUrl}` : '/placeholder-image.jpg'} // Fallback jika tidak ada gambar
          alt={judul}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h3 className="font-bold mt-4 text-lg group-hover:text-blue-600">{judul}</h3>
    </Link>
  );
}

export default BeritaCard;