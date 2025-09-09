// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto"> {/* mt-auto agar footer menempel ke bawah */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-xl font-bold">Sekolah Impian</h3>
                <p className="text-gray-400">Jl. Pendidikan No. 1, Purworejo, Jawa Tengah</p>
            </div>
            <div className="text-center">
                <p>&copy; {new Date().getFullYear()} Sekolah Impian. All rights reserved.</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;