import React from 'react';
import fotoProfil from './profile.png'; // Import fotonya di sini

const Header = () => {
  return (
    <header className="header-container">
      {/* Ubah div menjadi tag img dan masukkan fotoProfil ke src */}
      <img src={fotoProfil} alt="Foto Profil" className="profile-img" />
      
      <h1>Ihsan Yazid</h1>
      <h2>Frontend Web Developer</h2>
    </header>
  );
};

export default Header;