import { useState } from "react"; // Jangan lupa import useState jika nanti butuh state
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {

  // const [searchTerm, setSearchTerm] = useState("");
	// const [selectedTag, setSelectedTag] = useState("");
  /*Inisialisasi DataForm*/
		const [dataForm, setDataForm] = useState({
			searchTerm: "",
			selectedTag: "",
			/*Tambah state lain beserta default value*/
			});
		
		/*Inisialisasi Handle perubahan nilai input form*/
		const handleChange = (evt) => {
			const { name, value } = evt.target;
			setDataForm({
				...dataForm,
				[name]: value,
			});
		};

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name
				.toLowerCase()
				.includes(_searchTerm) ||
      framework.description
				.toLowerCase()
				.includes(_searchTerm);

    const matchesTag = dataForm.selectedTag ? framework.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-3xl font-extrabold text-slate-900 text-center mb-10 tracking-tight">
          Daftar Framework
        </h1>

        {/* 👇👇👇 AREA SEARCH & FILTER DITARUH DI SINI 👇👇👇 */}
        {/* Saya menggunakan flexbox agar di PC posisinya menyamping, di HP menurun */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="searchTerm"
            placeholder="Search framework..."
            // Class ini saya sesuaikan sedikit agar lebih cocok dengan tema desain kita
            className="w-full md:w-2/3 p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            onChange={handleChange}
          />

          <select
            name="selectedTag"
            className="w-full md:w-1/3 p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
            onChange={handleChange}
          >
            <option value="">All Tags</option>
              {allTags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
          </select>
        </div>
        {/* 👆👆👆 AREA SEARCH & FILTER SELESAI 👆👆👆 */}

        {/* Perhatikan: bagian ini sekarang me-looping 'filteredFrameworks', bukan 'frameworkData' lagi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFrameworks.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200">
                  {item.name}
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

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

