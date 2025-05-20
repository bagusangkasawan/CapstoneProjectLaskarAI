# 🤖 Machine Learning Backend — EnergyMate

Folder ini berisi dua backend utama untuk aplikasi **EnergyMate**, yang menjalankan fungsi **prediksi konsumsi energi** dan **chatbot FAQ efisiensi energi** secara terpisah.

> ⚠️ **Catatan penting:**
> Kedua backend menggunakan **base URL berbeda** dan berjalan di server terpisah. Endpoint yang dicontohkan hanya ilustrasi, URL lengkap tidak dipublikasikan demi keamanan.

---

## 📂 Struktur Folder

```
ML/
├── prediksi-rekomendasi/    # Backend Flask-RESTX + TensorFlow untuk prediksi & rekomendasi energi
└── chatbot/                 # Backend Flask-RESTX + Vertex AI untuk chatbot FAQ multilingual
```

---

## 🛠️ Teknologi dan Arsitektur

### 1. 🔮 Prediksi & Rekomendasi Konsumsi Energi

* **Framework:** Flask-RESTX (REST API + dokumentasi Swagger)
* **Machine Learning:** TensorFlow Keras LSTM untuk prediksi pola konsumsi
* **Preprocessing:** StandardScaler untuk normalisasi data
* **Input:** Data submetering energi & waktu penggunaan
* **Output:** Prediksi konsumsi energi, kategori, dan rekomendasi efisiensi
* **Endpoint utama:** `/api/predict`
* **Dokumentasi API:** tersedia di `/api/docs`

### 2. 🤖 Chatbot FAQ Efisiensi Energi

* **Framework:** Flask-RESTX (REST API + dokumentasi Swagger)
* **Layanan:** Google Cloud Vertex AI (model multilingual fine-tuned FAQ)
* **Fungsi:** Menjawab pertanyaan pengguna tentang penghematan energi rumah tangga (ID & EN)
* **Endpoint utama:** `/api/generate`
* **Dokumentasi API:** tersedia di `/api/docs`

---

## ⚙️ Cara Kerja Singkat

1. **Prediksi & Rekomendasi:**
   Frontend mengirim data konsumsi energi ke backend prediksi, mendapatkan hasil prediksi dan rekomendasi efisiensi.

2. **Chatbot FAQ:**
   Frontend mengirim pertanyaan pengguna ke backend chatbot, menerima jawaban dari model AI multilingual.

---

## 📌 Informasi Tambahan

* Dataset sumber untuk prediksi diambil dari: [UCI Machine Learning Repository – Individual Household Electric Power Consumption](https://archive.ics.uci.edu/dataset/235/individual+household+electric+power+consumption)
* Backend berjalan independen dengan base URL yang berbeda
* Deployment masing-masing backend dilakukan secara terpisah sesuai kebutuhan

---

🔙 Kembali ke [README Root EnergyMate](../README.md) untuk informasi lengkap proyek dan akses aplikasi web.
