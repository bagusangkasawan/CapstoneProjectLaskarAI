import { BarChart3, Lightbulb, Timer } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const featureItem = {
  hidden: { scale: 0.9, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

const imageAnim = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const textAnim = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

export default function HomePage() {
    return (
        <>
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-stretch justify-between bg-gradient-to-r from-green-100 to-blue-100 overflow-hidden">
            <motion.div 
                className="md:w-1/2 h-64 md:h-auto"
                initial="hidden"
                animate="show"
                variants={imageAnim}
            >
                <img
                src="/hero.jpg"
                alt="Ilustrasi Pemantauan listrik"
                className="w-full h-full object-cover"
                />
            </motion.div>
            
            <motion.div 
                className="md:w-1/2 text-center md:text-left px-6 md:px-12 py-8 flex flex-col justify-center space-y-6"
                initial="hidden"
                animate="show"
                variants={textAnim}
            >
                <motion.h1 
                    className="text-4xl md:text-5xl font-bold text-gray-800"
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
                    Pantau dan optimalkan konsumsi listrik Anda dengan solusi cerdas dari EnergyMate.
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link to="/feature">
                        <button className="self-center md:self-start mt-4 px-6 py-3 w-75 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all cursor-pointer">
                            Mulai Sekarang
                        </button>
                    </Link>
                </motion.div>
            </motion.div>
        </section>


        {/* Features Section */}
        <section id="fitur" className="px-8 py-20 bg-white">
            <motion.h2 
                className="text-3xl font-bold text-center text-gray-800 mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                Fitur Unggulan
            </motion.h2>
            
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
            </motion.div>
        </section>

        {/* About Section */}
        <section id="tentang" className="px-8 py-20 bg-gray-100 overflow-hidden">
            <motion.div 
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Tentang EnergyMate</h2>
                <motion.p 
                    className="text-gray-600 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    EnergyMate adalah platform pemantauan listrik pintar yang dirancang untuk rumah tangga dan bisnis yang ingin mengelola konsumsi listrik secara efisien dan bertanggung jawab.
                </motion.p>
            </motion.div>
        </section>
        </>
    )
}