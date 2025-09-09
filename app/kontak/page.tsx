// app/kontak/page.tsx
import { Mail, Phone, MapPin } from 'lucide-react'; // Ikon untuk mempercantik

export default function KontakPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Hubungi Kami</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Bagian Informasi Kontak */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 mr-4 mt-1 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Alamat</h3>
                <p className="text-gray-700">Jl. Pendidikan No. 1, Kledungkradenan, Kec. Banyuasin, Kabupaten Purworejo, Jawa Tengah 54111</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-4 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Telepon</h3>
                <p className="text-gray-700">(0275) 123-456</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-4 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-700">info@sekolahimpian.sch.id</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Peta */}
        <div className="rounded-lg shadow-md overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.201776993466!2d109.98801267590863!3d-7.768603276949033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7ae293b514c6e7%3A0xb712bfb65b1b1319!2sAlun-Alun%20Purworejo!5e0!3m2!1sid!2sid!4v1725884961529!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </main>
  );
}