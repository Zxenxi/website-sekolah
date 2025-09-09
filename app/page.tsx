// app/page.tsx
import JenjangCard from "@/components/JenjangCard";
import BeritaCard from "@/components/BeritaCard";

// 1. Definisikan fungsi untuk mengambil data DI LUAR komponen
async function getBerita() {
  // Gunakan URL dari environment variable jika ada, jika tidak, pakai localhost
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api/berita?populate=*';
  
  try {
    const res = await fetch(apiUrl, {
      cache: 'no-store' // Untuk development, agar data selalu baru
    });

    if (!res.ok) {
      // Log error yang lebih deskriptif
      console.error('Gagal mengambil data dari Strapi:', res.status, res.statusText);
      throw new Error('Gagal mengambil data berita');
    }

    const data = await res.json();
    return data.data || []; // Kembalikan data.data, atau array kosong jika tidak ada
  } catch (error) {
    console.error('Error saat fetching data berita:', error);
    return []; // Kembalikan array kosong jika terjadi error
  }
}

// 2. Hanya ada SATU deklarasi komponen Home, dan jadikan async
export default async function Home() {
  const berita = await getBerita(); // Panggil fungsi dan tunggu hasilnya

  return (
    <> {/* Gunakan Fragment karena akan ada lebih dari satu elemen utama */}
      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-600 text-white">
        <h1 className="text-5xl font-bold mb-4">Selamat Datang di Sekolah Impian</h1>
        <p className="text-xl mb-8">Membentuk Generasi Cerdas, Kreatif, dan Berakhlak Mulia</p>
        <a href="/pendaftaran" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 text-lg">
          Info PPDB 2026
        </a>
      </section>

      <main className="container mx-auto px-6 py-12">
        {/* Bagian Sambutan Kepala Sekolah */}
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
                "Assalamu'alaikum Wr. Wb. Puji syukur kehadirat Tuhan Yang Maha Esa. Kami sangat bangga mempersembahkan website ini sebagai jembatan informasi antara sekolah dengan orang tua, siswa, dan masyarakat. Di sini, kami berkomitmen untuk memberikan pendidikan terbaik yang berkesinambungan dari jenjang TK, SD, hingga SMP..."
              </p>
            </div>
          </div>
        </section>

        {/* BAGIAN: Jenjang Pendidikan */}
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
        
        {/* BAGIAN BARU: Berita Terbaru */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Berita & Informasi Terbaru</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {berita && berita.length > 0 ? (
              berita.map((item: any) => (
                <BeritaCard
                  key={item.id}
                  judul={item.attributes.judul}
                  // Tambahkan pengecekan untuk gambar agar tidak error jika tidak ada gambar
                  gambarUrl={item.attributes.gambar_unggulan?.data?.attributes?.url || ''}
                  slug={item.id.toString()} // Ubah slug menjadi string
                />
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-500">Belum ada berita yang dipublikasikan.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}