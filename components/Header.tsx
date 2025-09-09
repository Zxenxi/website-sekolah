// components/Header.tsx
import Link from 'next/link';
import Image from 'next/image'; // 1. Impor komponen Image

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* 2. Ganti teks dengan komponen Image */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png" // Path relatif dari folder public
            alt="Logo Sekolah Impian"
            width={50}     // Tentukan lebar gambar (dalam piksel)
            height={50}    // Tentukan tinggi gambar
            priority       // Prioritaskan loading logo
          />
          <span className="ml-3 text-xl font-bold text-gray-800">Sekolah Impian</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-500">Beranda</Link>
          <Link href="/profil" className="text-gray-600 hover:text-blue-500">Profil</Link>
          <Link href="/kontak" className="text-gray-600 hover:text-blue-500">Kontak</Link>
        </div>
        {/* ... sisa kode menu mobile ... */}
      </nav>
    </header>
  );
};

export default Header;