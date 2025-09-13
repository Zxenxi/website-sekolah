"use client";
// components/Header.tsx

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center relative">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo Sekolah Impian"
            width={50}
            height={50}
            className="h-12 w-auto"
            priority
          />
          <span className="ml-3 text-xl font-bold font-poppins text-sekolah-primary">
            Sekolah Impian
          </span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-sekolah-secondary font-semibold">Beranda</Link>
          {/* <Link href="/profil" className="text-gray-700 hover:text-sekolah-secondary font-semibold">Profil</Link> */}
          <Link href="/profil/guru" className="text-gray-700 hover:text-sekolah-secondary font-semibold">Profil Guru</Link>
          <Link href="/kontak" className="text-gray-700 hover:text-sekolah-secondary font-semibold">Kontak</Link>
          <Link href="/pendaftaran" className="bg-sekolah-accent text-sekolah-primary font-bold py-2 px-5 rounded-full hover:bg-yellow-400 transition-colors duration-300">
            Pendaftaran
          </Link>
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-sekolah-primary border-sekolah-primary focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        {/* Mobile Nav */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-lg flex flex-col items-center py-4 space-y-4 md:hidden animate-fade-in z-40">
            <Link href="/" className="text-gray-700 hover:text-sekolah-secondary font-semibold" onClick={() => setMenuOpen(false)}>Beranda</Link>
            {/* <Link href="/profil" className="text-gray-700 hover:text-sekolah-secondary font-semibold" onClick={() => setMenuOpen(false)}>Profil</Link> */}
            <Link href="/profil/guru" className="text-gray-700 hover:text-sekolah-secondary font-semibold" onClick={() => setMenuOpen(false)}>Profil Guru</Link>
            <Link href="/kontak" className="text-gray-700 hover:text-sekolah-secondary font-semibold" onClick={() => setMenuOpen(false)}>Kontak</Link>
            <Link href="/pendaftaran" className="bg-sekolah-accent text-sekolah-primary font-bold py-2 px-5 rounded-full hover:bg-yellow-400 transition-colors duration-300" onClick={() => setMenuOpen(false)}>
              Pendaftaran
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;