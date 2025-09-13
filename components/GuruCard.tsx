// components/GuruCard.tsx
import Image from 'next/image';
import { Guru } from '@/types';

interface GuruCardProps {
  guru: Guru;
}

const GuruCard = ({ guru }: GuruCardProps) => {
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const imageUrl = guru.foto?.url;

  return (
    <div className="bg-white rounded-lg shadow-md text-center p-6 flex flex-col items-center transition-transform transform hover:-translate-y-2 duration-300">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src={imageUrl ? `${strapiBaseUrl}${imageUrl}` : 'https://via.placeholder.com/150'}
          alt={`Foto ${guru.nama_lengkap}`}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-full shadow-lg"
        />
      </div>
      <h3 className="font-bold text-xl font-poppins text-sekolah-primary">{guru.nama_lengkap}</h3>
      <p className="text-sekolah-secondary font-semibold mb-3">{guru.jabatan}</p>
      {/* ✅ Fix ESLint no-unescaped-entities */}
      <p className="text-gray-600 text-sm italic"> &quot;{guru.kutipan}&quot;</p>
    </div>
  );
}

export default GuruCard;
