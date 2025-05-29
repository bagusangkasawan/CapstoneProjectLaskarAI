# ⚡ EnergyMate

**EnergyMate** adalah platform berbasis web untuk membantu pengguna rumah tangga mengelola konsumsi energi secara cerdas dan efisien.

🌐 Akses aplikasi: [https://energymate.netlify.app/](https://energymate.netlify.app/)

---

## 🎯 Fitur Utama

- 🔮 **Prediksi Konsumsi Energi**  
  Perkiraan penggunaan energi berdasarkan pola penggunaan historis sub-meter.

- 💡 **Rekomendasi Efisiensi Energi**  
  Saran otomatis untuk mengurangi konsumsi listrik berlebih di berbagai area rumah tangga.

- 🤖 **Chatbot FAQ Efisiensi Energi**  
  Asisten pintar yang menjawab pertanyaan umum seputar penghematan energi dalam bahasa Indonesia dan Inggris.

---

## 📁 Struktur Proyek

```

energymate/
│
├── frontend/                   # Frontend React (Vite)
│
├── ML/
│   ├── prediksi-rekomendasi/  # Model untuk prediksi & rekomendasi
│   └── chatbot/               # Chatbot FAQ berbasis Vertex AI

```

---

## 🧠 Teknologi Inti

### 🌐 Frontend

- **React + Vite**
- **ShadCN UI** untuk komponen antarmuka modern dan responsif

### 🔮 Backend Prediksi & Rekomendasi

- **Flask-RESTX** sebagai REST API framework & Swagger UI
- **TensorFlow Keras (LSTM)** untuk prediksi konsumsi energi
- **StandardScaler** untuk normalisasi input

### 🤖 Backend Chatbot FAQ

- **Flask-RESTX** untuk penyediaan API dan dokumentasi Swagger
- **Google Cloud Vertex AI** (model multilingual fine-tuned FAQ)
- **Bahasa:** Indonesia & Inggris

### ☁️ Deployment

- **Frontend:** Netlify  
- **Backend API:** Google Cloud Run

---

## 📌 Tentang Proyek

Proyek ini merupakan bagian dari **Capstone Project Laskar AI 2025** dengan ID Tim: **LAI25-SM004**.  
Tim ini terdiri dari 4 anggota yang bekerja kolaboratif untuk membangun solusi berbasis AI dalam meningkatkan kesadaran dan penghematan energi rumah tangga.

---

## 📬 Kontak

Tim **LAI25-SM004 – EnergyMate**:

- 👨‍💻 [Bagus Angkasawan Sumantri Putra (A640YBM091)](https://www.linkedin.com/in/bagus-angkasawan-sumantri-putra/) - Universitas Pramita Indonesia

- 👨‍💻 [Muhammad Gilang Ramadhan (A640YBM323)](https://www.linkedin.com/in/muhammad-gilang-ramadhan-0754a4266/) - Universitas Pramita Indonesia

- 👨‍💻 [Bima Adityo Kurniawan (A229YBF097)](https://www.linkedin.com/in/bimaadityokurniawan/) - Universitas Jenderal Soedirman (Fresh Graduate)

- 👩‍💻 [Auliyya Aini (A229XBF084)](https://www.linkedin.com/in/auliyyaaini/) - Universitas Jenderal Soedirman (Fresh Graduate)
