export default function LatihanTailwind() {
    return (
        <div>
            <FlexboxGrid/>
            <h1 class="border m-8">Belajar Tailwind CSS 4</h1>
            <button className="bg-blue-500 text-white px-4 py-2 mx-8 rounded shadow-lg">Click Me</button>
            <Spacing/>
            <Typography/>
            <BorderRadius/>
            <BackgroundColors/>
            <ShadowEffects/>
            <TailwindExploration/>
        </div>
    )
}

function Spacing(){
    return (
        <div className="bg-white shadow-lg p-6 m-8 rounded-lg">
            <h2 className="text-lg font-semibold">Card Title</h2>
            <p className="mt-2 text-gray-600">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
        </div>
    )
}
function Typography(){
    return (
        <div>
            <h1 className="m-8 text-3xl font-bold text-blue-600">Tailwind Typography</h1>
            <p className="m-8 text-gray-600 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}
function BorderRadius(){
    return (
        <button className="m-8 border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg"> Klik Saya </button>
    )
}
function BackgroundColors(){
    return(
        <div className="m-8 bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}
function FlexboxGrid(){
    return (
        <nav className=" flex justify-between bg-gray-800 p-4 text-white">
            <h1 className="text-lg font-bold">MyWebsite</h1>
            <ul className="flex space-x-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    )
}
function ShadowEffects(){
    return (
        <div className="m-8 bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}
function TailwindExploration() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      {/* 1. FLEXBOX (Navbar Style) */}
      <nav className="flex justify-between items-center bg-gray-800 p-4 text-white rounded-t-xl shadow-md">
        <h1 className="text-lg font-bold tracking-tight">TailwindDev</h1>
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-blue-400 cursor-pointer transition">Home</li>
          <li className="hover:text-blue-400 cursor-pointer transition">Projects</li>
          <li className="hover:text-blue-400 cursor-pointer transition">Contact</li>
        </ul>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-full text-sm font-medium transition">
          Login
        </button>
      </nav>

      {/* 2. BACKGROUND & SPACING (Main Card) */}
      <div className="bg-white p-8 border-x border-b border-gray-200 rounded-b-xl shadow-lg">
        
        {/* 3. TYPOGRAPHY & COLORS */}
        <header className="mb-6">
          <h2 className="text-3xl font-extrabold text-blue-600 underline decoration-blue-200 underline-offset-8">
            Belajar Tailwind CSS 4
          </h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Eksplorasi utilitas untuk mempercepat workflow desain UI. 
            Semua elemen di bawah ini menggunakan class gabungan dari kode awalmu.
          </p>
        </header>

        {/* 4. GRID & HOVER EFFECTS (Feature Section) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          {/* Card Contoh Shadow & Border Radius */}
          <div className="p-6 border-2 border-blue-500 rounded-2xl bg-blue-50 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
            <h3 className="text-xl font-bold text-blue-800 group-hover:text-blue-600">Interaktivitas</h3>
            <p className="text-blue-700 mt-2">
              Hover card ini untuk melihat efek Shadow dan transisi warna.
            </p>
          </div>

          {/* Card Contoh Spacing & Background */}
          <div className="p-6 bg-gray-800 text-white rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-yellow-400">Dark Mode Manual</h3>
            <p className="text-gray-300 mt-2">
              Menggunakan background gelap dengan teks kontras tinggi.
            </p>
            <button className="mt-4 w-full bg-white text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200">
              Action Button
            </button>
          </div>
          
        </div>

        {/* 5. BUTTONS & STATES */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded shadow-lg active:scale-95 transition">
            Primary Button
          </button>
          <button className="border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
            Outline Style
          </button>
        </div>

      </div>
    </div>
  );
}