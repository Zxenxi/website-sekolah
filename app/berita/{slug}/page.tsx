// app/berita/[slug]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import MarkdownIt from 'markdown-it';

// Fungsi untuk mengambil satu berita berdasarkan slug
async function getSingleBerita(slug: string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api/berita?filters[slug][$eq]=${slug}&populate=*`;

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal mengambil data');

    const data = await res.json();
    if (data.data.length === 0) return null; // Berita tidak ditemukan

    return data.data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Komponen Halaman Detail Berita
export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const berita = await getSingleBerita(params.slug);

  // Jika berita tidak ditemukan, tampilkan halaman 404
  if (!berita) {
    notFound();
  }

  const md = new MarkdownIt();
  const htmlContent = md.render(berita.attributes.isi_konten);
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const imageUrl = berita.attributes.gambar_unggulan.data.attributes.url;

  return (
    <main className="container mx-auto px-6 py-12">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{berita.attributes.judul}</h1>
        <p className="text-gray-500 mb-6">
          Dipublikasikan pada: {new Date(berita.attributes.publishedAt).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={`${strapiBaseUrl}${imageUrl}`}
            alt={berita.attributes.judul}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        {/* Render konten HTML dari Markdown */}
        <div
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </main>
  );
}