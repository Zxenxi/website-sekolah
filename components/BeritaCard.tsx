// components/BeritaCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Berita } from '@/types';

// Ubah props untuk menerima seluruh objek 'item'
interface BeritaCardProps {
  item: Berita;
}

const BeritaCard = ({ item }: BeritaCardProps) => {
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const imageUrl = item.gambar_unggulan?.url;

  return (
    <Link href={item.slug ? `/berita/${item.slug}` : '#'} className="block group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <Image
          src={imageUrl ? `${strapiBaseUrl}${imageUrl}` : 'https://via.placeholder.com/400x250'}
          alt={item.judul}
          width={400}
          height={250}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-2">
          {new Date(item.publishedAt).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>
        <h3 className="font-bold font-poppins text-lg text-sekolah-primary group-hover:text-sekolah-secondary transition-colors duration-300 line-clamp-2">
          {item.judul}
        </h3>
      </div>
    </Link>
  );
}

export default BeritaCard;