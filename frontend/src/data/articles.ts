import type { ArticleData, ArticleKey } from "@/model/article-models";

export const articles: Record<ArticleKey, ArticleData> = {
    post1: {
        title: "Cara Mudah Menghemat Listrik di Rumah",
        category: "Tips",
        author: "EnergyMate Team",
        date: "28 April, 2025",
        readTime: "5 min read",
        imgSrc: "/save-bulb.jpg",
        imgAlt: "lampu",
        content: [
            {
                type: "paragraph",
                text: "Menghemat listrik di rumah bisa dimulai dengan langkah-langkah sederhana seperti mematikan lampu ketika tidak digunakan dan memilih peralatan elektronik dengan label hemat energi."
            },
            {
                type: "paragraph",
                text: "Menurut penelitian, mengganti lampu utama di rumah dengan LED bisa menghemat hingga 75% biaya listrik untuk penerangan.",
                source: {
                    url: "https://www.energy.gov/energysaver/led-lighting",
                    text: "Departemen Energi AS"
                }
            },
            {
                type: "paragraph",
                text: "Selain mengganti lampu, penggunaan peralatan rumah tangga seperti kulkas, mesin cuci, dan AC yang memiliki sertifikasi efisiensi energi (contohnya Energy Star) dapat mengurangi konsumsi listrik secara signifikan. Energy Star sendiri merupakan program pemerintah AS yang membantu konsumen mengenali produk hemat energi yang memenuhi kriteria efisiensi ketat tanpa mengorbankan kinerja.",
                source: {
                    url: "https://www.energystar.gov/products",
                    text: "ENERGY STAR"
                }
            },
            {
                type: "paragraph",
                text: "Penggunaan energi juga dapat diminimalkan dengan cara mengatur waktu penggunaan alat elektronik berdaya tinggi, seperti menyetrika atau menggunakan oven, agar dilakukan di luar jam beban puncak. Beberapa negara dan wilayah bahkan menawarkan insentif tarif listrik lebih rendah saat penggunaan dilakukan di luar jam sibuk. Ini bukan hanya membantu penghematan individu, tapi juga mendukung kestabilan beban jaringan listrik nasional."
            },
            {
                type: "paragraph",
                text: "Menurut laporan dari International Energy Agency (IEA), efisiensi energi merupakan strategi utama yang tidak hanya mengurangi tagihan listrik tetapi juga berdampak langsung dalam menurunkan emisi karbon secara global. Dengan peningkatan efisiensi di sektor rumah tangga, diperkirakan konsumsi energi bisa ditekan hingga 25% tanpa mengurangi kualitas hidup.",
                source: {
                    url: "https://www.iea.org/reports/energy-efficiency-2022",
                    text: "IEA: Energy Efficiency 2022"
                }
            },
            {
                type: "quote",
                text: "Penghematan kecil yang dilakukan banyak orang akan membuat perbedaan besar.",
                author: "Jane Goodall"
            }
        ]
    },
    post2: {
        title: "Memahami Tagihan Listrik Anda",
        category: "Guide",
        author: "EnergyMate Team",
        date: "15 April, 2025",
        readTime: "7 min read",
        imgSrc: "/tagihan.jpg",
        imgAlt: "tagihan listrik",
        content: [
            {
                type: "paragraph",
                text: "Tagihan listrik terdiri dari beberapa komponen utama: biaya pemakaian energi berdasarkan kWh (kilowatt-jam), abodemen atau biaya tetap, pajak pertambahan nilai (PPN), serta biaya tambahan lain seperti biaya materai jika tagihan melebihi ambang tertentu. Pemahaman terhadap struktur ini sangat penting agar pengguna dapat menilai konsumsi listrik mereka secara rasional."
            },
            {
                type: "paragraph",
                text: "Salah satu elemen paling signifikan dalam tagihan listrik adalah tarif per kWh yang ditetapkan berdasarkan golongan pelanggan. Misalnya, rumah tangga dengan daya 900 VA bersubsidi akan memiliki tarif berbeda dari rumah tangga dengan daya 2200 VA ke atas. Pemilihan golongan listrik yang sesuai dengan kebutuhan nyata rumah tangga dapat berdampak besar pada efisiensi biaya."
            },
            {
                type: "paragraph",
                text: "Memahami pola konsumsi harian juga penting. Sebagian besar rumah tangga mengalami lonjakan penggunaan listrik pada malam hari, terutama karena penggunaan alat-alat elektronik seperti AC, televisi, dan peralatan dapur. Dengan memanfaatkan alat pencatat atau aplikasi pemantauan energi, pengguna dapat mengidentifikasi titik-titik penggunaan tertinggi dan menyesuaikan kebiasaan untuk mengurangi beban puncak."
            },
            {
                type: "paragraph",
                text: "Selain itu, penting untuk mengetahui perbedaan antara sistem pascabayar dan prabayar. Dalam sistem prabayar (token listrik), pengguna membeli listrik di muka dan mengontrol konsumsi mereka berdasarkan jumlah token yang dimiliki. Sementara itu, dalam sistem pascabayar, penggunaan listrik dihitung setelah periode tertentu dan dibayar di akhir. Masing-masing sistem memiliki kelebihan dan kelemahan tergantung pada gaya hidup dan kemampuan pengguna dalam mengelola pengeluaran."
            },
            {
                type: "paragraph",
                text: "Menurut survei yang dilakukan oleh Lembaga Energi Nasional tahun 2023, sebanyak 40% responden mengaku tidak memahami rincian tagihan listrik mereka secara menyeluruh. Hal ini menyoroti perlunya edukasi berkelanjutan dan transparansi dari penyedia layanan listrik agar konsumen lebih sadar energi dan mampu mengontrol penggunaan secara proaktif.",
                source: {
                    url: "https://www.esdm.go.id/assets/media/content/content-laporan-kinerja-kementerian-esdm-tahun-2023.pdf",
                    text: "Lembaga Energi Nasional"
                }
            },
            {
                type: "paragraph",
                text: "Untuk menghemat biaya, beberapa strategi yang direkomendasikan antara lain adalah mengganti peralatan listrik dengan yang lebih efisien (berlabel Energy Star atau hemat energi), mematikan perangkat elektronik saat tidak digunakan, dan mengatur suhu AC pada kisaran yang optimal. Hal-hal kecil seperti mencabut charger ketika tidak dipakai pun dapat mengurangi konsumsi listrik secara kumulatif."
            },
            {
                type: "quote",
                text: "Pengetahuan tentang konsumsi energi adalah langkah pertama menuju efisiensi.",
                author: "Steven Chu"
            }
        ]
    },
    post3: {
        title: "Energi Terbarukan di Indonesia: Potensi dan Tantangan",
        category: "Sustainability",
        author: "EnergyMate Team",
        date: "30 April, 2025",
        readTime: "6 min read",
        imgSrc: "/energi-terbarukan.jpg",
        imgAlt: "Pembangkit listrik tenaga surya di Indonesia",
        content: [
            {
                type: "paragraph",
                text: "Indonesia memiliki potensi energi terbarukan yang sangat besar namun belum dimanfaatkan secara optimal. Sebagai negara kepulauan dengan garis pantai terpanjang kedua di dunia dan intensitas matahari yang tinggi sepanjang tahun, Indonesia sebenarnya bisa menjadi pemain utama dalam transisi energi bersih di Asia Tenggara."
            },
            {
                type: "paragraph",
                text: "Berdasarkan data Kementerian ESDM, potensi energi terbarukan di Indonesia mencapai lebih dari 400 GW. Ini termasuk 207 GW energi surya, 60 GW energi hidro, 29 GW energi angin, 28 GW energi panas bumi, dan 33 GW bioenergi. Namun hingga 2024, baru sekitar 2% dari total potensi ini yang telah dimanfaatkan.",
                source: {
                    url: "https://www.esdm.go.id/id/potensi-ebt",
                    text: "Kementerian ESDM 2024"
                }
            },
            {
                type: "paragraph",
                text: "Energi panas bumi merupakan salah satu keunggulan Indonesia. Negara kita menempati peringkat kedua dunia setelah Amerika Serikat dalam potensi panas bumi, dengan cadangan mencapai 40% dari total cadangan dunia. PLTP Kamojang di Jawa Barat merupakan pembangkit panas bumi pertama di Indonesia yang beroperasi sejak 1982."
            },
            {
                type: "paragraph",
                text: "Target pemerintah adalah mencapai 23% bauran energi terbarukan pada tahun 2025 dan 31% pada 2050. Untuk mencapainya, berbagai kebijakan telah diterapkan seperti feed-in tariff untuk PLTS atap, percepatan pembangunan PLTA, dan insentif fiskal untuk investasi energi bersih.",
                source: {
                    url: "https://www.esdm.go.id/id/berita-unit/direktorat-jenderal-ketenagalistrikan/pemerintah-optimistis-ebt-23-tahun-2025-tercapai",
                    text: "Kementerian ESDM"
                }
            },
            {
                type: "paragraph",
                text: "Namun tantangan utama masih menghadang, antara lain:"
            },
            {
                type: "paragraph",
                text: "1. Infrastruktur transmisi yang belum merata di seluruh Indonesia"
            },
            {
                type: "paragraph",
                text: "2. Harga teknologi energi terbarukan yang masih relatif tinggi"
            },
            {
                type: "paragraph",
                text: "3. Regulasi yang belum sepenuhnya mendukung"
            },
            {
                type: "paragraph",
                text: "4. Keterbatasan pendanaan untuk proyek skala besar"
            },
            {
                type: "paragraph",
                text: "5. Resistensi dari industri energi konvensional"
            },
            {
                type: "paragraph",
                text: "Proyek PLTS terapung di Cirata dengan kapasitas 145 MW menjadi terbesar di Asia Tenggara dan menunjukkan komitmen Indonesia dalam pengembangan energi terbarukan. Proyek ini mampu memasok listrik untuk 50.000 rumah dan mengurangi emisi karbon hingga 214.000 ton per tahun."
            },
            {
                type: "quote",
                text: "Transisi energi bukan hanya tentang teknologi, tapi juga tentang menciptakan ekosistem yang mendukung dari hulu ke hilir",
                author: "Arifin Tasrif, Menteri ESDM"
            },
            {
                type: "paragraph",
                text: "Di sektor transportasi, penggunaan biodiesel B30 telah mengurangi impor solar dan emisi gas rumah kaca. Langkah berikutnya adalah pengembangan kendaraan listrik dan infrastruktur pendukungnya seperti stasiun pengisian daya."
            },
            {
                type: "paragraph",
                text: "Untuk masyarakat yang ingin berkontribusi, beberapa langkah sederhana bisa dilakukan:\n- Memasang PLTS atap di rumah\n- Menggunakan peralatan hemat energi\n- Mendukung produk-produk ramah lingkungan\n- Edukasi tentang pentingnya transisi energi"
            }
        ]
  }
};