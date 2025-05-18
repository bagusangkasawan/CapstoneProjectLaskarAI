import { BarChart3, Lightbulb, Timer } from "lucide-react";
import { Link } from "react-router";


export default function HomePage() {
    return (
        <>
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-stretch justify-between bg-gradient-to-r from-green-100 to-blue-100">
            <div className="md:w-1/2 h-64 md:h-auto">
                <img
                src="/hero.jpg"
                alt="Ilustrasi Pemantauan listrik"
                className="w-full h-full object-cover"
                />
            </div>
            <div className="md:w-1/2 text-center md:text-left px-6 md:px-12 py-8 flex flex-col justify-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Selamat Datang di EnergyMate
                </h1>
                <p className="text-lg text-gray-600">
                Pantau dan optimalkan konsumsi listrik Anda dengan solusi cerdas dari EnergyMate.
                </p>
                <Link to="/feature">
                    <button className="self-center md:self-start mt-4 px-6 py-3 w-75 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all cursor-pointer">
                        Mulai Sekarang
                    </button>
                </Link>
            </div>
        </section>


        {/* Features Section */}
        <section id="fitur" className="px-8 py-20 bg-white">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Fitur Unggulan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg shadow bg-gray-50">
                <h3 className="text-xl font-semibold mb-2 flex flex-row gap-2 items-center">
                    Pemantauan Real-Time <Timer className="w-5 h-5 text-green-600" />
                </h3>
                <p className="text-gray-600">Lihat konsumsi listrik secara langsung dan identifikasi pemborosan.</p>
                </div>

                <div className="p-6 rounded-lg shadow bg-gray-50">
                <h3 className="text-xl font-semibold mb-2 flex flex-row gap-2 items-center">
                    Analitik Pintar <BarChart3 className="w-5 h-5 text-green-600" />
                </h3>
                <p className="text-gray-600">Gunakan data historis untuk memahami pola penggunaan listrik Anda.</p>
                </div>

                <div className="p-6 rounded-lg shadow bg-gray-50">
                <h3 className="text-xl font-semibold mb-2 flex flex-row gap-2 items-center">
                    Rekomendasi Hemat <Lightbulb className="w-5 h-5 text-green-600" />
                </h3>
                <p className="text-gray-600">Dapatkan saran otomatis untuk menghemat biaya listrik setiap bulan.</p>
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="tentang" className="px-8 py-20 bg-gray-100">
            <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tentang EnergyMate</h2>
            <p className="text-gray-600 text-lg">
                EnergyMate adalah platform pemantauan listrik pintar yang dirancang untuk rumah tangga dan bisnis yang ingin mengelola konsumsi listrik secara efisien dan bertanggung jawab.
            </p>
            </div>
        </section>
        </>
    )
}