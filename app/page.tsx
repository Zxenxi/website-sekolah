// app/page.tsx (Versi Final yang Benar)
import JenjangCard from "@/components/JenjangCard";
import BeritaCard from "@/components/BeritaCard";
import { Berita } from "@/types"; // Pastikan impor ini ada

async function getBerita(): Promise<Berita[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api/beritas?populate=*';
  
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Gagal fetch data: ${res.statusText}`);
    }
    
    const body = await res.json();

    // Langsung kembalikan body.data karena strukturnya sudah sederhana
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
{/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/hero-background.jpg')" }}>
        <div className="absolute inset-0 bg-black/50"></div> {/* Overlay gelap */}
        <div className="relative z-10 text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-4 drop-shadow-lg">
            Selamat Datang di Sekolah Impian
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Membentuk Generasi Cerdas, Kreatif, dan Berakhlak Mulia
          </p>
          <a href="/pendaftaran" className="bg-sekolah-accent text-sekolah-primary font-bold py-3 px-8 rounded-full hover:bg-yellow-400 text-lg transition-colors duration-300 transform hover:scale-105">
            Info PPDB 2026
          </a>
        </div>
      </section>

{/* Sisa halaman ... */}
      <main className="container mx-auto px-6 py-12">
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Sambutan Kepala Sekolah</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-8 rounded-lg">
            <div className="md:w-1/4 text-center">
              <img src="https://via.placeholder.com/150" alt="Kepala Sekolah" className="rounded-full mx-auto shadow-md" />
              <h3 className="font-bold mt-4 text-xl">Bpk. Budi Santoso, M.Pd.</h3>
              <p className="text-gray-500">Kepala Sekolah</p>
            </div>
            <div className="md:w-3/4">
              <p className="text-gray-700 leading-relaxed text-lg">
                "Assalamu'alaikum Wr. Wb. Puji syukur kehadirat Tuhan Yang Maha Esa..."
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Pendidikan Berjenjang & Berkelanjutan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <JenjangCard 
              title="Taman Kanak-Kanak (TK)"
              description="Masa bermain sambil belajar yang menyenangkan untuk fondasi masa depan."
              link="/jenjang/tk"
              bgColor="bg-green-500"
            />
            <JenjangCard 
              title="Sekolah Dasar (SD)"
              description="Menumbuhkan potensi, kreativitas, dan karakter positif siswa."
              link="/jenjang/sd"
              bgColor="bg-yellow-500"
            />
            <JenjangCard 
              title="Sekolah Menengah (SMP)"
              description="Mempersiapkan siswa untuk jenjang pendidikan lebih tinggi dan tantangan global."
              link="/jenjang/smp"
              bgColor="bg-purple-500"
            />
          </div>
        </section>
        
        {/* BAGIAN BERITA TERBARU */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Berita & Informasi Terbaru</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {berita && berita.length > 0 ? (
              // PERUBAHAN UTAMA DI SINI
              // app/page.tsx -> di dalam bagian .map()
              berita.map((item: Berita) => (
                <BeritaCard key={item.id} item={item} />
              ))
              // berita.map((item: Berita) => (
              //   <BeritaCard
              //     key={item.id}
              //     judul={item.judul} // Akses langsung
              //     gambarUrl={item.gambar_unggulan?.url || ''} // Akses langsung
              //     slug={item.slug} // Akses langsung
              //   />
              // ))
            ) : (
              <p className="text-center col-span-3 text-gray-500">Belum ada berita yang dipublikasikan.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}