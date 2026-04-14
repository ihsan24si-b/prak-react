import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
    // Background utama yang lembut dan padding yang lega
    <div className="min-h-screen bg-slate-50 py-12 px-6 lg:px-8">
      
      {/* Container untuk membatasi lebar konten di layar besar */}
      <div className="max-w-7xl mx-auto">
        
        {/* Tambahan Judul Halaman */}
        <h1 className="text-3xl font-extrabold text-slate-900 text-center mb-10 tracking-tight">
          Daftar Framework
        </h1>
        
        {/* Grid System: 1 kolom di HP, 2 di Tablet, 3 di Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frameworkData.map((item) => (
            <div 
              key={item.id} 
              // Desain Card dengan efek hover (naik ke atas sedikit dan bayangan menebal)
              className="flex flex-col bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              
              {/* Bagian Atas: Judul & Deskripsi (flex-grow agar tinggi card rata) */}
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200">
                  {item.name}
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Bagian Tengah: Detail Developer & Website dengan garis pemisah */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500 mb-1">
                  <span className="font-semibold text-slate-700">Developer:</span> {item.details.developer}
                </p>
                <a 
                  href={item.details.officialWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-indigo-500 hover:text-indigo-700 hover:underline transition-colors inline-block"
                >
                  Kunjungi Website &rarr;
                </a>
              </div>

              {/* Bagian Bawah: Tags menggunakan 'gap' agar jaraknya rapi */}
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-semibold rounded-full border border-indigo-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}