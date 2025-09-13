// app/jenjang/tk/page.tsx (Versi Final yang Benar)
// import Image from 'next/image';
import { notFound } from 'next/navigation';
import MarkdownIt from 'markdown-it';
import { HalamanJenjang } from '@/types';

// Fungsi untuk mengambil data halaman TK dari Strapi
async function getHalamanTK(): Promise<HalamanJenjang | null> {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api/halaman-tk?populate=*`;
  
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Gagal mengambil data Halaman TK: ${res.statusText}`);
    }
    
    const body = await res.json();
    
    // Jika body.data null, berarti belum di-publish.
    if (!body.data) {
        console.error("Data Halaman TK tidak ditemukan. Pastikan sudah di-publish.");
        return null;
    }

    // AMBIL DATA LANGSUNG DARI body.data TANPA .attributes
    const data = body.data;

    // Transformasi data agar sesuai dengan interface kita
    return {
      id: data.id,
      judul_utama: data.judul_utama,
      deskripsi: data.deskripsi,
      publishedAt: data.publishedAt,
      gambar_header: {
        // Akses URL gambar dengan aman
        url: data.gambar_header?.url || ''
      }
    };

  } catch (error) {
    console.error("Terjadi error di fungsi getHalamanTK:", error);
    return null;
  }
}

// Komponen Halaman Jenjang TK
export default async function HalamanTKPage() {
  const dataHalaman = await getHalamanTK();

  if (!dataHalaman) {
    notFound();
  }
  
  const md = new MarkdownIt({ html: true });
  const htmlContent = md.render(dataHalaman.deskripsi);
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const imageUrl = dataHalaman.gambar_header.url;

  return (
    <main>
      {/* Bagian Header dengan Gambar */}
      {imageUrl ? (
        <section className="relative h-[50vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: `url(${strapiBaseUrl}${imageUrl})` }}>
          <div className="absolute inset-0 bg-black/60"></div> {/* Overlay gelap */}
          <div className="relative z-10 text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins drop-shadow-lg">
              {dataHalaman.judul_utama}
            </h1>
          </div>
        </section>
      ) : (
        <section className="bg-sekolah-primary py-20 text-center">
           <div className="relative z-10 text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold font-poppins">
                {dataHalaman.judul_utama}
              </h1>
            </div>
        </section>
      )}

      {/* Bagian Konten Deskripsi */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <article
            className="prose lg:prose-xl max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </section>
    </main>
  );
}