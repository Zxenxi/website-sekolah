// components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo Sekolah Impian"
            width={50}
            height={50}
            className="h-12 w-auto" // Ukuran dinamis
            priority
          />
          <span className="ml-3 text-xl font-bold font-poppins text-sekolah-primary">
            Sekolah Impian
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-sekolah-secondary font-semibold">Beranda</Link>
          <Link href="/profil" className="text-gray-700 hover:text-sekolah-secondary font-semibold">Profil</Link>
          <Link href="/kontak" className="text-gray-700 hover:text-sekolah-secondary font-semibold">Kontak</Link>
          <Link href="/pendaftaran" className="bg-sekolah-accent text-sekolah-primary font-bold py-2 px-5 rounded-full hover:bg-yellow-400 transition-colors duration-300">
            Pendaftaran
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;