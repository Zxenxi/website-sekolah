// app/page.tsx (Versi Final Diperbaiki untuk Vercel Build)
import JenjangCard from "@/components/JenjangCard";
import BeritaCard from "@/components/BeritaCard";
import { Berita } from "@/types";
import AnimatedSection from "@/components/AnimatedSection";
import Link from 'next/link';
import Image from 'next/image'; // <-- 1. IMPOR KOMPONEN IMAGE

// Fungsi getBerita (Struktur data datar yang sudah benar)
async function getBerita(): Promise<Berita[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api/beritas?populate=*';
  
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal fetch data');
    
    const body = await res.json();
    return body.data || []; 

  } catch (error) {
    console.error("Error di getBerita:", error);
    return [];
  }
}

export default async function Home() {
  const berita = await getBerita();

  return (
    <>
      <section 
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center" 
        style={{ backgroundImage: "url('/hero-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4 drop-shadow-lg">
            Selamat Datang di Sekolah Impian
          </h1>
          <p className="text-lg md:text-2xl mb-8 drop-shadow-md max-w-3xl mx-auto">
            Membentuk Generasi Cerdas, Kreatif, dan Berakhlak Mulia.
          </p>
          <a 
            href="/pendaftaran" 
            className="bg-sekolah-accent text-sekolah-primary font-bold py-3 px-8 rounded-full hover:bg-yellow-400 text-lg transition-transform duration-300 transform hover:scale-105"
          >
            Info PPDB 2026
          </a>
        </div>
      </section>

      <main>
        <AnimatedSection className="container mx-auto px-6 py-16">
           <h2 className="text-3xl font-bold font-poppins text-center mb-10 text-sekolah-primary">Sambutan Kepala Sekolah</h2>
           <div className="flex flex-col md:flex-row items-center gap-10 bg-white p-8 rounded-lg shadow-md">
            <div className="md:w-1/4 text-center">
              {/* 2. GANTI <img> DENGAN <Image> */}
              <Image 
                src="logo.svg" 
                alt="Kepala Sekolah"
                width={160} // Lebar asli (w-40)
                height={160} // Tinggi asli (h-40)
                className="rounded-full mx-auto shadow-md object-cover" 
              />
              <h3 className="font-bold font-poppins mt-4 text-xl text-sekolah-primary">Bpk. Budi Santoso, M.Pd.</h3>
              <p className="text-gray-500">Kepala Sekolah</p>
            </div>
            <div className="md:w-3/4 text-gray-700 leading-relaxed text-left border-l-4 border-sekolah-accent pl-8">
              <p className="italic">
                {/* 3. PERBAIKI TANDA KUTIP DAN APOSTROF */}
                &ldquo;Assalamu&apos;alaikum Wr. Wb. Puji syukur kehadirat Tuhan Yang Maha Esa. Kami sangat bangga mempersembahkan website ini sebagai jembatan informasi...&rdquo;
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="bg-sekolah-light py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold font-poppins text-center mb-10 text-sekolah-primary">Pendidikan Berjenjang & Berkelanjutan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <JenjangCard 
                title="Taman Kanak-Kanak (TK)"
                description="Masa bermain sambil belajar yang menyenangkan untuk fondasi masa depan."
                link="/jenjang/tk"
                bgColor="bg-gradient-to-br from-green-500 to-green-600"
              />
              <JenjangCard 
                title="Sekolah Dasar (SD)"
                description="Menumbuhkan potensi, kreativitas, dan karakter positif siswa."
                link="/jenjang/sd"
                bgColor="bg-gradient-to-br from-yellow-500 to-yellow-600"
              />
              <JenjangCard 
                title="Sekolah Menengah (SMP)"
                description="Mempersiapkan siswa untuk jenjang pendidikan lebih tinggi dan tantangan global."
                link="/jenjang/smp"
                bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
              />
            </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold font-poppins text-center mb-10 text-sekolah-primary">Berita & Informasi Terbaru</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {berita && berita.length > 0 ? (
              berita.map((item: Berita) => (
                <BeritaCard
                  key={item.id}
                  item={item} 
                />
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-500">Belum ada berita yang dipublikasikan.</p>
            )}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/berita" 
              className="bg-sekolah-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-sekolah-primary transition-colors duration-300"
            >
              Lihat Semua Berita
            </Link>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}