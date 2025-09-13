// app/berita/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import MarkdownIt from "markdown-it";
import { Berita } from "@/types"; // pastikan types Berita sudah sesuai struktur Strapi

// Fungsi ambil data 1 berita
async function getSingleBerita(slug: string): Promise<Berita | null> {
  const apiUrl = `${
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
  }/api/beritas?filters[slug][$eq]=${slug}&populate=*`;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Gagal mengambil data dari Strapi");
    }

    const body = await res.json();

    if (!body.data || body.data.length === 0) {
      return null;
    }

    const item = body.data[0];

    // ⚠️ kalau Strapi kamu masih pakai "attributes", ganti ini sesuai struktur data
    return {
      id: item.id,
      judul: item.judul, // atau item.attributes.judul
      isi_konten: item.isi_konten, // atau item.attributes.isi_konten
      slug: item.slug,
      publishedAt: item.publishedAt,
      gambar_unggulan: {
        url: item.gambar_unggulan?.url || "",
      },
    };
  } catch (error) {
    console.error("Error di getSingleBerita:", error);
    return null;
  }
}

// ✅ Definisikan tipe props halaman
type BeritaDetailPageProps = {
  params: {
    slug: string;
  };
};

// Komponen halaman
export default async function BeritaDetailPage({
  params,
}: BeritaDetailPageProps) {
  const berita = await getSingleBerita(params.slug);

  if (!berita) {
    notFound();
  }

  const md = new MarkdownIt({ html: true });
  const htmlContent = md.render(berita.isi_konten);

  const strapiBaseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const imageUrl = berita.gambar_unggulan.url;

  return (
    <main className="container mx-auto px-6 py-12">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{berita.judul}</h1>

        <p className="text-gray-500 mb-6">
          Dipublikasikan pada:{" "}
          {new Date(berita.publishedAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {imageUrl && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={`${strapiBaseUrl}${imageUrl}`}
              alt={berita.judul}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

        <div
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </main>
  );
}
