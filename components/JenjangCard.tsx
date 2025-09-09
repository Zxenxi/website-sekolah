// components/JenjangCard.tsx
import Link from 'next/link';

// Definisikan tipe data untuk props
interface JenjangCardProps {
  title: string;
  description: string;
  link: string;
  bgColor: string;
}

const JenjangCard = ({ title, description, link, bgColor }: JenjangCardProps) => {
  return (
    <div className={`rounded-lg shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-300 ${bgColor}`}>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <Link href={link} className="font-bold inline-block bg-white text-gray-800 py-2 px-4 rounded-full hover:bg-gray-200">
        Selengkapnya
      </Link>
    </div>
  );
};

export default JenjangCard;