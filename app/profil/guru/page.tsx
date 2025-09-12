// app/profil/guru/page.tsx (Versi Final yang Benar)
import { Guru } from "@/types";
import GuruCard from "@/components/GuruCard";

// Fungsi untuk mengambil data guru dari Strapi
async function getGuru(): Promise<Guru[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api/gurus?populate=*';
  
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Gagal mengambil data guru: ${res.statusText}`);
    }
    
    const body = await res.json();
    
    // Langsung kembalikan body.data karena strukturnya sudah sederhana dan cocok
    return body.data || [];

  } catch (error) {
    console.error("Error di getGuru:", error);
    return [];
  }
}

// Komponen Halaman Profil Guru
export default async function ProfilGuruPage() {
  const daftarGuru = await getGuru();

  return (
    <main className="bg-sekolah-light py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold font-poppins text-sekolah-primary">Tenaga Pendidik Kami</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Berdedikasi, profesional, dan siap membimbing putra-putri Anda menuju masa depan yang cerah.</p>
        </div>

        {daftarGuru && daftarGuru.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Kita akan memetakan data yang strukturnya sudah benar */}
            {daftarGuru.map((guru) => (
              <GuruCard key={guru.id} guru={guru} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Data guru belum tersedia atau gagal dimuat.</p>
        )}
      </div>
    </main>
  );
}