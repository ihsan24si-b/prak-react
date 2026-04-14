import React, { useState } from "react";
import cinemaData from "./cinema_data.json";

export default function CinemaApp() {
  // 1. State Mode Tampilan (Guest / Admin)
  const [viewMode, setViewMode] = useState("guest");

  // 2. State Form Pencarian & 2 Filter (Genre, Batas Usia)
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    genreFilter: "",
    ageRatingFilter: "",
  });

  // Fungsi Event Handler Form
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // 3. Ekstrak Opsi Unik dari Data JSON
  const allGenres = [...new Set(cinemaData.map((item) => item.genre))].sort();
  const allAgeRatings = [...new Set(cinemaData.map((item) => item.ageRating))].sort();

  // 4. Logika Filter Berlapis
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  
  const filteredData = cinemaData.filter((item) => {
    
    const matchesSearch =
      item.title.toLowerCase().includes(_searchTerm) ||
      item.description.toLowerCase().includes(_searchTerm);

    // Filter Kategori (Genre)
    const matchesGenre = dataForm.genreFilter
      ? item.genre === dataForm.genreFilter
      : true;

    // Filter Batas Usia (Age Rating)
    const matchesAge = dataForm.ageRatingFilter
      ? item.ageRating === dataForm.ageRatingFilter
      : true;

    return matchesSearch && matchesGenre && matchesAge;
  });

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tight mb-3">
            CineNusantara 🎬
          </h1>
          <p className="text-slate-400 text-lg mb-8">Katalog Sinema & Film Terbaik Indonesia</p>
          
          <div className="inline-flex bg-slate-900 p-1.5 rounded-xl shadow-inner border border-slate-800">
            <button
              onClick={() => setViewMode("guest")}
              className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                viewMode === "guest"
                  ? "bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Mode Pengunjung
            </button>
            <button
              onClick={() => setViewMode("admin")}
              className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                viewMode === "admin"
                  ? "bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Mode Admin
            </button>
          </div>
        </div>

        {/* --- AREA SEARCH & FILTER (Grid Responsive) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <input
            type="text"
            name="searchTerm"
            placeholder="Cari judul atau sinopsis..."
            value={dataForm.searchTerm}
            onChange={handleChange}
            className="w-full p-3.5 bg-slate-950 border border-slate-800 text-white rounded-xl outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
          />

          <select
            name="genreFilter"
            value={dataForm.genreFilter}
            onChange={handleChange}
            className="w-full p-3.5 bg-slate-950 border border-slate-800 text-white rounded-xl outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 cursor-pointer appearance-none"
          >
            <option value="">🎞️ Semua Genre</option>
            {allGenres.map((genre, idx) => (
              <option key={idx} value={genre}>{genre}</option>
            ))}
          </select>

          <select
            name="ageRatingFilter"
            value={dataForm.ageRatingFilter}
            onChange={handleChange}
            className="w-full p-3.5 bg-slate-950 border border-slate-800 text-white rounded-xl outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 cursor-pointer appearance-none"
          >
            <option value="">🔞 Semua Rating Usia</option>
            {allAgeRatings.map((rating, idx) => (
              <option key={idx} value={rating}>Rating: {rating}</option>
            ))}
          </select>
        </div>

        {/* --- GUEST VIEW (Card Layout) --- */}
        {viewMode === "guest" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  {/* Badge Umur di Kiri Atas */}
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-md border border-slate-700">
                    {item.ageRating}
                  </div>
                  {/* Badge Genre di Kanan Atas */}
                  <div className="absolute top-2 right-2 bg-cyan-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md">
                    {item.genre}
                  </div>
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight mb-1 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mb-3 font-medium">
                      {item.release.year} • {item.production.director}
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
            
            {filteredData.length === 0 && (
              <div className="col-span-full text-center py-20 text-slate-500">
                <span className="text-4xl block mb-3">🪹</span>
                Film yang kamu cari tidak ditemukan.
              </div>
            )}
          </div>
        )}

        {/* --- ADMIN VIEW (Table Layout) --- */}
        {viewMode === "admin" && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 text-xs uppercase tracking-widest border-b border-slate-800">
                    <th className="p-5 font-semibold">ID</th>
                    <th className="p-5 font-semibold">Judul Film</th>
                    <th className="p-5 font-semibold">Klasifikasi</th>
                    <th className="p-5 font-semibold">Rilis (Nested)</th>
                    <th className="p-5 font-semibold">Produksi (Nested)</th>
                    <th className="p-5 font-semibold">Pemeran Utama (Nested)</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-800">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-5 font-mono text-slate-500">#{item.id}</td>
                      <td className="p-5">
                        <div className="font-bold text-white">{item.title}</div>
                        <div className="text-xs text-slate-500 w-48 truncate">{item.description}</div>
                      </td>
                      <td className="p-5">
                        <span className="inline-block bg-cyan-900/40 text-cyan-400 px-2.5 py-1 rounded-md text-[11px] font-bold mr-2">
                          {item.genre}
                        </span>
                        <span className="text-xs font-bold text-slate-400 border border-slate-700 px-2 py-0.5 rounded">
                          {item.ageRating}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="text-slate-300 font-medium">{item.release.month}</div>
                        <div className="text-xs text-slate-500">{item.release.year}</div>
                      </td>
                      <td className="p-5">
                        <div className="text-slate-300 font-medium">{item.production.director}</div>
                        <div className="text-xs text-slate-500">{item.production.studio}</div>
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col gap-1">
                          {item.cast.map((actor, i) => (
                            <span key={i} className="text-xs text-slate-400">
                              • {actor}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-10 text-center text-slate-500">
                        Tidak ada data film untuk tabel ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}