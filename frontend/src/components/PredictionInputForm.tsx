import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { predictEnergyUsage } from "@/data/prediction-api-source";
import type { PredictResponseData } from "@/model/prediction-models";

const appliancePower = {
  "Microwave": 0.8,
  "Rice Cooker": 0.6,
  "Blender": 0.3,
  "Washing Machine": 1.0,
  "Dryer": 1.2,
  "Iron": 1.1,
  "Water Heater": 1.5,
  "AC": 1.3,
  "Vacuum Cleaner": 0.9,
};

const applianceToSub = {
  "Microwave": "Sub_metering_1",
  "Rice Cooker": "Sub_metering_1",
  "Blender": "Sub_metering_1",
  "Washing Machine": "Sub_metering_2",
  "Dryer": "Sub_metering_2",
  "Iron": "Sub_metering_2",
  "Water Heater": "Sub_metering_3",
  "AC": "Sub_metering_3",
  "Vacuum Cleaner": "Sub_metering_3",
};

export default function PredictionInputForm() {
  const [rows, setRows] = useState([{ device: "", quantity: 1, duration: 1 }]);
  const [currentHour, setCurrentHour] = useState("");
  const [result, setResult] = useState<PredictResponseData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddRow = () => {
    setRows([...rows, { device: "", quantity: 1, duration: 1 }]);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length <= 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index: number, field: string, value: string) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: field === "device" ? value : Number(value) };
    setRows(updated);
  };

  const handlePredict = async () => {
    let sm1 = 0, sm2 = 0, sm3 = 0;
    const hour = parseInt(currentHour);

    rows.forEach(row => {
      const powerPerHour = appliancePower[row.device as keyof typeof appliancePower] || 0;
      const sub = applianceToSub[row.device as keyof typeof applianceToSub];
      const usage = powerPerHour * row.quantity * row.duration;
      
      if (sub === "Sub_metering_1") sm1 += usage;
      else if (sub === "Sub_metering_2") sm2 += usage;
      else if (sub === "Sub_metering_3") sm3 += usage;
    });

    const intensity = ((sm1 + sm2 + sm3) * 1000) / 230;

    const payload = {
      Global_intensity: intensity,
      Sub_metering_1: sm1,
      Sub_metering_2: sm2,
      Sub_metering_3: sm3,
      hour: hour,
    };

    setLoading(true);
    try {
      const response = await predictEnergyUsage(payload);
      setResult(response);
    } catch (err) {
      console.error("Prediction failed:", err);
      setResult({ 
        error: "Terjadi kesalahan saat memprediksi",
        total_usage_kw: 0,
        prediction_kw: 0,
        category: "",
        general_recommendation: "",
        focus_area: "",
        specific_recommendation: "",
        breakdown: {}
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Input Form Card */}
        <Card className="flex-1 p-6 rounded-xl bg-white shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-green-700">EnergyMate Prediction</h1>
          </div>
          
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {rows.map((row, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Alat</label>
                    <Select
                      onValueChange={(value) => handleRowChange(index, "device", value)}
                      value={row.device}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Alat" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(appliancePower).map((device) => (
                          <SelectItem key={device} value={device}>
                            {device}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Unit</label>
                    <Input
                      type="number"
                      min="1"
                      value={row.quantity}
                      onChange={(e) => handleRowChange(index, "quantity", e.target.value)}
                    />
                  </div>

                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Durasi (jam)</label>
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      value={row.duration}
                      onChange={(e) => handleRowChange(index, "duration", e.target.value)}
                    />
                  </div>

                  <div className="h-10 flex items-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveRow(index)}
                      className="text-red-500 hover:bg-red-100 cursor-pointer"
                      disabled={rows.length === 1}
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              onClick={handleAddRow}
            >
              + Tambah Alat
            </Button>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jam Sekarang (0 - 23)
              </label>
              <Input
                type="number"
                min="0"
                max="23"
                value={currentHour}
                onChange={(e) => setCurrentHour(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
              onClick={handlePredict}
              disabled={loading}
            >
              {loading ? "Memproses..." : "Predict & Recommend"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className="flex-1 p-6 rounded-xl bg-white shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-green-700">Hasil Prediksi</h1>
          </div>
          
          <CardContent>
            {result ? (
              !result.error ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-green-700">Prediction Result</h3>
                    <div className="mt-2 space-y-1">
                      <p>Total Pemakaian: <span className="font-medium">{result.total_usage_kw} kWh</span></p>
                      <p>Prediksi Konsumsi: <span className="font-medium">{result.prediction_kw} kWh</span></p>
                      <p>Kategori: <span className="font-medium">{result.category}</span></p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-green-700">Rincian</h3>
                    <div className="mt-2 space-y-1">
                      {Object.entries(result.breakdown || {}).map(([key, val]) => (
                        <p key={key}>{key}: <span className="font-medium">{val.toFixed(2)} kWh</span></p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-green-700">Recommendation</h3>
                    <div className="mt-2 space-y-2">
                      <p><span className="font-medium">Rekomendasi Umum:</span> {result.general_recommendation}</p>
                      <p><span className="font-medium">Fokus:</span> {result.focus_area}</p>
                      <p><span className="font-medium">Saran Spesifik:</span> {result.specific_recommendation}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                  {result.error}
                </div>
              )
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Hasil prediksi akan muncul di sini setelah Anda mengklik "Predict & Recommend"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}