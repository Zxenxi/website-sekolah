// lib/api.ts (Versi Final yang Benar)
import { Berita } from "@/types";

export async function getBerita(): Promise<Berita[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api/beritas?populate=*';
  
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Gagal mengambil data berita: ${res.statusText}`);
    }
    
    const body = await res.json();

    // Pastikan body.data adalah sebuah array
    if (!Array.isArray(body.data)) {
      console.error("Respons dari Strapi tidak berisi array 'data'.");
      return [];
    }

    // LANGSUNG KEMBALIKAN body.data KARENA STRUKTURNYA SUDAH SESUAI
    return body.data; 

  } catch (error) {
    console.error("Error di getBerita:", error);
    return [];
  }
}