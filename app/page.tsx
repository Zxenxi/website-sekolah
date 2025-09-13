// app/page.tsx (Versi Final Diperbaiki)
import JenjangCard from "@/components/JenjangCard";
import BeritaCard from "@/components/BeritaCard";
import { Berita } from "@/types";
import AnimatedSection from "@/components/AnimatedSection"; // Menggunakan animasi

// Fungsi getBerita (diperbaiki agar tidak menggunakan .attributes)
async function getBerita(): Promise<Berita[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api/beritas?populate=*';
  
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal fetch data');
    
    const body = await res.json();
    return body.data || []; // Langsung kembalikan data flat

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
           {/* ... Konten Sambutan ... */}
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
              // PERBAIKAN DI SINI: Mengirim 'item' langsung ke BeritaCard
              berita.map((item: Berita) => (
                <BeritaCard
                  key={item.id}
                  item={item} // Menggunakan struktur data flat yang sudah benar
                />
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-500">Belum ada berita yang dipublikasikan.</p>
            )}
          </div>
          <div className="text-center mt-12">
            <a href="/berita" className="bg-sekolah-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-sekolah-primary transition-colors duration-300">
              Lihat Semua Berita
            </a>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}