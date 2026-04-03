import React, { useState, useEffect } from "react";

// ==========================================
// 1. REUSABLE COMPONENTS
// ==========================================

// Reusable Component untuk Input Text/Number
const FormInput = ({ label, name, type, value, onChange, error, placeholder }) => (
  <div style={{ marginBottom: "16px" }}>
    <label style={{ display: "block", fontWeight: "600", marginBottom: "6px" }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%", 
        padding: "10px", 
        borderRadius: "6px",
        border: error ? "2px solid #ef4444" : "1px solid #d1d5db",
        outline: "none"
      }}
    />
    {/* Alert Error (Conditional Rendering) */}
    {error && (
      <div style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px", fontWeight: "500" }}>
        ⚠️ {error}
      </div>
    )}
  </div>
);

// Reusable Component untuk Select Dropdown
const FormSelect = ({ label, name, value, onChange, options }) => (
  <div style={{ marginBottom: "16px" }}>
    <label style={{ display: "block", fontWeight: "600", marginBottom: "6px" }}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={{ 
        width: "100%", 
        padding: "10px", 
        borderRadius: "6px", 
        border: "1px solid #d1d5db",
        backgroundColor: "white"
      }}
    >
      <option value="">-- Silakan Pilih --</option>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

export default function TicketBookingForm() {
  // State untuk menyimpan nilai input
  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    jumlahTiket: "",
    kategoriTiket: "",
    metodePembayaran: ""
  });

  // State untuk menyimpan pesan error
  const [errors, setErrors] = useState({
    namaLengkap: "",
    email: "",
    jumlahTiket: ""
  });

  // State untuk validasi tombol submit & status hasil
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fungsi Validasi (3 aturan per input)
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "namaLengkap":
        if (!value) errorMsg = "Nama lengkap wajib diisi."; // Aturan 1
        else if (/\d/.test(value)) errorMsg = "Nama tidak boleh mengandung angka."; // Aturan 2
        else if (value.length < 3) errorMsg = "Nama minimal harus 3 karakter."; // Aturan 3
        break;

      case "email":
        if (!value) errorMsg = "Email wajib diisi."; // Aturan 1
        else if (!value.includes("@")) errorMsg = "Email harus mengandung karakter '@'."; // Aturan 2
        else if (!value.endsWith(".com") && !value.endsWith(".id")) errorMsg = "Email harus berakhiran .com atau .id."; // Aturan 3
        break;

      case "jumlahTiket":
        if (!value) errorMsg = "Jumlah tiket wajib diisi."; // Aturan 1
        else if (isNaN(value)) errorMsg = "Format harus berupa angka."; // Aturan 2
        else if (parseInt(value) > 5 || parseInt(value) < 1) errorMsg = "Pembelian dibatasi 1 - 5 tiket per orang."; // Aturan 3
        break;
        
      default:
        break;
    }

    return errorMsg;
  };

  // Handler saat ada perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update data form
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update error jika field termasuk dalam daftar yang divalidasi
    if (Object.keys(errors).includes(name)) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }

    // Sembunyikan hasil submit jika user mengubah data
    setIsSubmitted(false);
  };

  // Mengecek validitas form secara keseluruhan
  useEffect(() => {
    const noErrors = !errors.namaLengkap && !errors.email && !errors.jumlahTiket;
    const allFilled = 
      formData.namaLengkap && formData.email && formData.jumlahTiket && 
      formData.kategoriTiket && formData.metodePembayaran;

    setIsFormValid(noErrors && allFilled);
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Data opsi Dropdown (Harga Kategori Tiket)
  const kategoriOptions = [
    { label: "VIP (Rp 2.000.000)", value: "2000000" },
    { label: "Festival (Rp 1.000.000)", value: "1000000" },
    { label: "Tribune (Rp 500.000)", value: "500000" }
  ];

  const pembayaranOptions = [
    { label: "Transfer Bank (BCA/Mandiri)", value: "Transfer Bank" },
    { label: "E-Wallet (GoPay/OVO)", value: "E-Wallet" }
  ];

  // Hitung total harga
  const totalHarga = parseInt(formData.jumlahTiket || 0) * parseInt(formData.kategoriTiket || 0);

  return (
    <div style={{ maxWidth: "550px", margin: "40px auto", padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      
      {/* Header Form */}
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <h2 style={{ margin: "0 0 8px 0" }}>🎫 Form Pemesanan Tiket Konser</h2>
        <p style={{ color: "#6b7280", margin: 0 }}>Lengkapi data di bawah ini untuk mengamankan tiket Anda.</p>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: "#f3f4f6", padding: "24px", borderRadius: "12px" }}>
        
        {/* 3 Input Fields */}
        <FormInput label="Nama Lengkap" name="namaLengkap" type="text" placeholder="Sesuai KTP" value={formData.namaLengkap} onChange={handleInputChange} error={errors.namaLengkap} />
        <FormInput label="Alamat Email" name="email" type="text" placeholder="contoh@email.com" value={formData.email} onChange={handleInputChange} error={errors.email} />
        <FormInput label="Jumlah Tiket" name="jumlahTiket" type="number" placeholder="Maks. 5 tiket" value={formData.jumlahTiket} onChange={handleInputChange} error={errors.jumlahTiket} />

        {/* 2 Select Dropdowns */}
        <FormSelect label="Kategori Tiket" name="kategoriTiket" options={kategoriOptions} value={formData.kategoriTiket} onChange={handleInputChange} />
        <FormSelect label="Metode Pembayaran" name="metodePembayaran" options={pembayaranOptions} value={formData.metodePembayaran} onChange={handleInputChange} />

        {/* Conditional Rendering: Tombol Submit */}
        {isFormValid && (
          <button 
            type="submit" 
            style={{ 
              width: "100%", padding: "12px", marginTop: "16px",
              backgroundColor: "#2563eb", color: "white", 
              border: "none", borderRadius: "6px", 
              fontWeight: "bold", fontSize: "16px", cursor: "pointer" 
            }}
          >
            Konfirmasi Pesanan
          </button>
        )}
      </form>

      {/* Area Hasil (Conditional Rendering) */}
      {isSubmitted && (
        <div style={{ marginTop: "24px", padding: "20px", backgroundColor: "#eff6ff", border: "1px solid #93c5fd", borderRadius: "12px" }}>
          <h3 style={{ margin: "0 0 16px 0", color: "#1e3a8a" }}>✅ Rincian Pesanan Berhasil Dibuat</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "8px", fontSize: "15px" }}>
            <span style={{ color: "#4b5563" }}>Nama</span> <strong>: {formData.namaLengkap}</strong>
            <span style={{ color: "#4b5563" }}>Email</span> <strong>: {formData.email}</strong>
            <span style={{ color: "#4b5563" }}>Jml Tiket</span> <strong>: {formData.jumlahTiket} Lembar</strong>
            <span style={{ color: "#4b5563" }}>Pembayaran</span> <strong>: {formData.metodePembayaran}</strong>
          </div>

          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "2px dashed #bfdbfe" }}>
            <span style={{ fontSize: "14px", color: "#4b5563" }}>Total yang harus dibayar:</span>
            <h2 style={{ margin: "4px 0 0 0", color: "#1d4ed8" }}>
              Rp {totalHarga.toLocaleString('id-ID')}
            </h2>
          </div>
        </div>
      )}

    </div>
  );
}