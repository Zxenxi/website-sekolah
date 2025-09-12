// components/Footer.tsx
import Link from "next/link";

const Footer = () => {
  // PASTIKAN ANDA MENGGUNAKAN 'bg-sekolah-primary' DI SINI
  return (
    <footer className="bg-sekolah-primary text-white mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kolom 1: Tentang Sekolah */}
          <div>
            <h3 className="font-bold text-xl font-poppins mb-4">Sekolah Impian</h3>
            <p className="text-gray-300">
              Mendidik generasi masa depan dengan landasan ilmu pengetahuan, karakter, dan iman.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="font-bold text-xl font-poppins mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link href="/profil" className="text-gray-300 hover:text-white">Profil Sekolah</Link></li>
              <li><Link href="/jenjang/tk" className="text-gray-300 hover:text-white">Jenjang TK</Link></li>
              <li><Link href="/jenjang/sd" className="text-gray-300 hover:text-white">Jenjang SD</Link></li>
              <li><Link href="/jenjang/smp" className="text-gray-300 hover:text-white">Jenjang SMP</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h3 className="font-bold text-xl font-poppins mb-4">Hubungi Kami</h3>
            <p className="text-gray-300">Jl. Pendidikan No. 1, Purworejo, Jawa Tengah</p>
            <p className="text-gray-300">info@sekolahimpian.sch.id</p>
            <p className="text-gray-300">(0275) 123-456</p>
          </div>
        </div>
      </div>
      {/* Ganti juga warna di bagian bawah footer jika ada */}
      <div className="bg-blue-900 py-4"> 
        <p className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Sekolah Impian. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;