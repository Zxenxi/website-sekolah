// app/jenjang/sd/page.tsx (Versi Final yang Benar)
import Image from 'next/image';
import { notFound } from 'next/navigation';
import MarkdownIt from 'markdown-it';
import { HalamanJenjang } from '@/types';

// Fungsi untuk mengambil data halaman SD dari Strapi
async function getHalamanSD(): Promise<HalamanJenjang | null> {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api/halaman-sd?populate=*`;
  
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Gagal mengambil data Halaman SD: ${res.statusText}`);
    }
    
    const body = await res.json();
    
    if (!body.data) {
        console.error("Data Halaman SD tidak ditemukan. Pastikan sudah di-publish.");
        return null;
    }

    const data = body.data;

    // Transformasi data agar sesuai dengan interface kita (tanpa .attributes)
    return {
      id: data.id,
      judul_utama: data.judul_utama,
      deskripsi: data.deskripsi,
      publishedAt: data.publishedAt,
      gambar_header: {
        url: data.gambar_header?.url || ''
      }
    };

  } catch (error) {
    console.error("Terjadi error di fungsi getHalamanSD:", error);
    return null;
  }
}

// Komponen Halaman Jenjang SD
export default async function HalamanSDPage() {
  const dataHalaman = await getHalamanSD();

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