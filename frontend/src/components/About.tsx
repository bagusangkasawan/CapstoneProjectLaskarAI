import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { BotMessageSquare, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <img
          src="/indoor.jpg"
          alt="Smart Home Energy"
          className="w-full h-64 object-cover"
        />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-green-700">
            Apa Itu EnergyMate?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            EnergyMate adalah aplikasi web inovatif yang memanfaatkan <strong>machine learning</strong> dan <strong>chatbot cerdas</strong> untuk membantu rumah tangga mengoptimalkan penggunaan energi. Dengan analisis data konsumsi energi, EnergyMate memberikan rekomendasi personalisasi untuk mengurangi pemborosan.
          </p>
        </CardContent>
      </Card>

      {/* Fitur Unggulan */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="text-amber-400"/>
              Prediksi Konsumsi Energi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Model ML kami menganalisis pola penggunaan energi dan memprediksi kebutuhan masa depan dengan akurasi tinggi.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BotMessageSquare className="text-green-500"/>
              Chatbot Hemat Energi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Chatbot berbasis AI siap menjawab pertanyaan dan memberikan tips penghematan energi secara real-time.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* <div className="bg-green-50 p-6 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-3 text-green-800">Mulai Hemat Energi Hari Ini!</h3>
        <p className="mb-4 text-green-700">
          Daftar untuk mendapatkan notifikasi saat EnergyMate diluncurkan.
        </p>
        <div className="flex gap-2 justify-center">
          <input
            type="email"
            placeholder="Email Anda"
            className="px-4 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button className="bg-green-600 hover:bg-green-700 cursor-pointer">
            Daftar
          </Button>
        </div>
      </div> */}
    </div>
  );
};