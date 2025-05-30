import {
  BarChart3,
  Lightbulb,
  Timer,
  Zap,
  TrendingDown,
  Shield,
  Brain,
  Users,
  Award,
  CheckCircle,
  MessageSquare,
} from "lucide-react"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const featureItem = {
  hidden: { scale: 0.9, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
}

const imageAnim = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
}

const textAnim = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
}

const accordionContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const accordionItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const statsItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-stretch justify-between bg-gradient-to-r from-green-100 to-blue-100 overflow-hidden">
        <motion.div className="md:w-1/2 h-64 md:h-auto" initial="hidden" animate="show" variants={imageAnim}>
          <img src="/hero.jpg" alt="Ilustrasi Pemantauan listrik" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          className="md:w-1/2 text-center md:text-left px-6 md:px-12 py-8 flex flex-col justify-center space-y-6"
          initial="hidden"
          animate="show"
          variants={textAnim}
        >
          <motion.h1
            className="text-4xl leading-14 md:text-5xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Selamat Datang di EnergyMate
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Platform prediksi dan rekomendasi konsumsi listrik rumah tangga yang menggunakan teknologi machine learning
            untuk mengoptimalkan efisiensi listrik Anda.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Link to="/feature">
              <button className="self-center md:self-start mt-4 px-6 py-3 w-75 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all cursor-pointer">
                Mulai Sekarang
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" variants={statsItem}>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">&lt;0.01</div>
              <div className="text-gray-600 text-sm md:text-base">MAE & RMSE</div>
            </motion.div>
            <motion.div className="text-center" variants={statsItem}>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">2M+</div>
              <div className="text-gray-600 text-sm md:text-base">Baris Data</div>
            </motion.div>
            <motion.div className="text-center" variants={statsItem}>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">4</div>
              <div className="text-gray-600 text-sm md:text-base">Tahun Data Time-Series</div>
            </motion.div>
            <motion.div className="text-center" variants={statsItem}>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm md:text-base">Prediksi & Rekomendasi</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="px-8 py-20 bg-white">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-800 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Fitur Unggulan
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Teknologi prediksi dan rekomendasi yang dirancang khusus untuk kebutuhan rumah tangga
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:mx-32"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            className="p-6 rounded-lg shadow bg-gray-50 hover:shadow-md transition-shadow"
            variants={featureItem}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-semibold mb-2 flex flex-row gap-2 items-center">
              Pemantauan Real-Time <Timer className="w-5 h-5 text-green-600" />
            </h3>
            <p className="text-gray-600">Lihat konsumsi listrik secara langsung dan identifikasi pemborosan.</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-lg shadow bg-gray-50 hover:shadow-md transition-shadow"
            variants={featureItem}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-semibold mb-2 flex flex-row gap-2 items-center">
              Analitik Pintar <BarChart3 className="w-5 h-5 text-green-600" />
            </h3>
            <p className="text-gray-600">Gunakan data historis untuk memahami pola penggunaan listrik Anda.</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-lg shadow bg-gray-50 hover:shadow-md transition-shadow"
            variants={featureItem}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-semibold mb-2 flex flex-row gap-2 items-center">
              Rekomendasi Hemat <Lightbulb className="w-5 h-5 text-green-600" />
            </h3>
            <p className="text-gray-600">Dapatkan saran otomatis untuk menghemat biaya listrik setiap bulan.</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-lg shadow bg-gray-50 hover:shadow-md transition-shadow"
            variants={featureItem}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-semibold mb-2 flex flex-row gap-2 items-center">
              AI Chatbot Pintar <MessageSquare className="w-5 h-5 text-green-600" />
            </h3>
            <p className="text-gray-600">
              Asisten virtual yang dilatih dengan Vertex AI untuk menjawab pertanyaan listrik rumah tangga Anda kapanpun dan
              dimanapun.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Cara Kerja EnergyMate</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sistem prediksi dan rekomendasi yang menggunakan machine learning untuk menganalisis pola konsumsi listrik
              rumah tangga Anda
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" variants={featureItem}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Analisis Data</h3>
              <p className="text-gray-600">
                Input data peralatan rumah tangga Anda untuk analisis konsumsi listrik rumah tangga yang akurat
              </p>
            </motion.div>

            <motion.div className="text-center" variants={featureItem}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Prediksi Konsumsi</h3>
              <p className="text-gray-600">
                Model machine learning memprediksi pola konsumsi listrik berdasarkan data historis
              </p>
            </motion.div>

            <motion.div className="text-center" variants={featureItem}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Rekomendasi Hemat</h3>
              <p className="text-gray-600">
                Dapatkan rekomendasi personal untuk mengoptimalkan penggunaan listrik rumah tangga
              </p>
            </motion.div>
            <motion.div className="text-center" variants={featureItem}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">4. Konsultasi Chatbot</h3>
              <p className="text-gray-600">
                Tanyakan langsung ke AI chatbot pintar kami untuk saran dan bantuan tambahan
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Mengapa Memilih EnergyMate?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Platform terdepan untuk optimasi listrik rumah tangga dengan teknologi prediksi yang akurat
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={featureItem}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Akurasi Tinggi</h3>
                      <p className="text-gray-600">
                        Model prediksi time-series dengan error yang sangat kecil
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={featureItem}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Mudah Digunakan</h3>
                      <p className="text-gray-600">
                        Interface yang intuitif dan user-friendly untuk semua kalangan pengguna
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={featureItem}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Dataset Komprehensif</h3>
                      <p className="text-gray-600">
                        Dilatih dengan 2 juta baris data time-series selama periode 4 tahun
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={featureItem}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Hasil Terukur</h3>
                      <p className="text-gray-600">Optimasi penggunaan listrik berdasarkan pola konsumsi aktual</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Teknologi Machine Learning</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              EnergyMate menggunakan algoritma machine learning terdepan yang dioptimalkan khusus untuk prediksi
              konsumsi listrik rumah tangga
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Metodologi Prediksi</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Analisis Pola Konsumsi</h4>
                    <p className="text-gray-600 text-sm">
                      Mengidentifikasi pola penggunaan berdasarkan jenis peralatan dan waktu
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Prediksi Beban Puncak</h4>
                    <p className="text-gray-600 text-sm">
                      Memperkirakan waktu dan intensitas penggunaan listrik tertinggi
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Rekomendasi Adaptif</h4>
                    <p className="text-gray-600 text-sm">
                      Saran yang disesuaikan dengan karakteristik rumah tangga spesifik
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Chatbot Vertex AI</h4>
                    <p className="text-gray-600 text-sm">
                      Asisten virtual yang dilatih khusus untuk menjawab pertanyaan seputar listrik rumah tangga
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Model yang Akurat</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Menggunakan TensorFlow Keras (LSTM) untuk akurasi prediksi maksimal
                </p>
                <div className="text-3xl font-bold text-green-600">&lt;0.01</div>
                <div className="text-sm text-gray-500">MAE & RMSE</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="px-8 py-20 bg-white overflow-hidden">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Tentang EnergyMate</h2>
          <motion.p
            className="text-gray-600 text-lg mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            EnergyMate adalah platform prediksi dan rekomendasi konsumsi listrik rumah tangga yang menggunakan teknologi
            machine learning untuk membantu keluarga Indonesia mengoptimalkan penggunaan listrik mereka. Dengan fokus
            khusus pada kebutuhan rumah tangga, kami menyediakan solusi yang akurat, mudah digunakan, dan terjangkau
            untuk semua kalangan.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" variants={featureItem}>
              <div className="text-2xl font-bold text-green-600 mb-2">Household Focus</div>
              <p className="text-gray-600 text-sm">Dirancang khusus untuk kebutuhan rumah tangga</p>
            </motion.div>
            <motion.div className="text-center" variants={featureItem}>
              <div className="text-2xl font-bold text-green-600 mb-2">AI-Powered</div>
              <p className="text-gray-600 text-sm">Menggunakan teknologi AI dan Machine Learning terdepan</p>
            </motion.div>
            <motion.div className="text-center" variants={featureItem}>
              <div className="text-2xl font-bold text-green-600 mb-2">User-Friendly</div>
              <p className="text-gray-600 text-sm">Interface yang mudah digunakan untuk semua</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Mulai Hemat Listrik Hari Ini</h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Bergabunglah dan optimalkan penggunaan listrik rumah tangga Anda dengan prediksi dan rekomendasi dari
              EnergyMate
            </p>
            <Link to="/feature">
              <button className="px-8 py-4 bg-white text-emerald-600 rounded-lg font-bold hover:bg-gray-100 transition-colors cursor-pointer">
                Coba Sekarang - Gratis
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <motion.section
        className="px-8 bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <motion.h2
            className="text-3xl font-bold text-center mb-10 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pertanyaan Umum (FAQ)
          </motion.h2>

          <motion.div variants={accordionContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Accordion type="multiple" className="space-y-4">
              <motion.div variants={accordionItem}>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl font-medium cursor-pointer">
                    Apa itu EnergyMate?
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-gray-600">
                    EnergyMate adalah platform prediksi dan rekomendasi konsumsi listrik rumah tangga yang menggunakan
                    teknologi machine learning untuk membantu keluarga mengoptimalkan penggunaan energi dan menghemat
                    biaya listrik.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div variants={accordionItem}>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xl font-medium cursor-pointer">
                    Bagaimana sistem prediksi dan rekomendasi bekerja?
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-gray-600">
                    Sistem menggunakan model machine learning yang dilatih khusus untuk rumah tangga. Berdasarkan input
                    data peralatan Anda, model memprediksi pola konsumsi energi dan memberikan rekomendasi personal
                    untuk mengoptimalkan penggunaan listrik.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div variants={accordionItem}>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-xl font-medium cursor-pointer">
                    Apakah EnergyMate dapat digunakan secara gratis?
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-gray-600">
                    Ya, EnergyMate dapat digunakan secara gratis untuk kebutuhan rumah tangga dan edukasi. Kami
                    berkomitmen untuk membuat teknologi hemat energi dapat diakses oleh semua keluarga Indonesia.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div variants={accordionItem}>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-xl font-medium cursor-pointer">
                    Apakah data saya disimpan atau digunakan untuk hal lain?
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-gray-600">
                    Tidak. EnergyMate tidak menyimpan data pribadi atau input Anda. Semua data diproses secara anonim
                    untuk prediksi dan rekomendasi, kemudian dihapus. Privasi dan keamanan data Anda adalah prioritas
                    utama kami.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div variants={accordionItem}>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-xl font-medium cursor-pointer">
                    Seberapa akurat prediksi konsumsi listrik EnergyMate?
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-gray-600">
                    Model prediksi EnergyMate memiliki MAE dan RMSE di bawah 0.01 yang telah divalidasi pada 2 juta
                    baris data time-series yang dikumpulkan selama 4 tahun. Akurasi ini terus ditingkatkan melalui
                    pembelajaran berkelanjutan dari pola konsumsi listrik rumah tangga.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
              <motion.div variants={accordionItem}>
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-xl font-medium cursor-pointer">
                    Bagaimana cara menggunakan AI chatbot EnergyMate?
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-gray-600">
                    Silahkan klik tombol ikon chat yang ada di pojok kanan bawah layar Anda. Kemudian Anda bisa langsung
                    menggunakannya seperti aplikasi chat pada umumnya. AI chatbot EnergyMate tersedia 24/7 dan dapat diakses dari mana saja.
                    Chatbot ini dilatih menggunakan Vertex AI dengan pengetahuan mendalam tentang konsumsi listrik rumah tangga. Anda dapat
                    bertanya seputar EnergyMate, tips penghematan, interpretasi data, atau rekomendasi spesifik untuk kebutuhan
                    listrik Anda.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            </Accordion>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}