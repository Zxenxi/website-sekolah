// import type { Core } from '@strapi/strapi';

export interface Berita {
  id: number;
  judul: string;
  isi_konten: string;
  slug: string;
  publishedAt: string;
  gambar_unggulan: {
    url: string;
  };
}

export interface Guru {
  id: number;
  nama_lengkap: string;
  jabatan: string;
  kutipan: string;
  foto: {
    url: string;
  };
}

export interface HalamanJenjang {
  id: number;
  judul_utama: string;
  deskripsi: string;
  gambar_header: {
    url: string;
  };
  publishedAt: string; // Strapi menambahkannya secara otomatis
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
// types/index.ts
// types/index.ts