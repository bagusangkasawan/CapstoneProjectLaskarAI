import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { predictEnergyUsage } from "@/data/prediction-api-source";
import type { PredictResponseData } from "@/model/prediction-models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Calculator, ChartNetwork, Clock, Info, Lightbulb, Timer, TrendingUp, TriangleAlert, Zap } from "lucide-react";
import { Separator } from "./ui/separator";

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
  const [rows, setRows] = useState([{ device: "Microwave", quantity: 1 }]);
  const [currentHour, setCurrentHour] = useState(() => new Date().getHours().toString());
  const [result, setResult] = useState<PredictResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [totalUsage, setTotalUsage] = useState(0);
  const [showLoadingNotice, setShowLoadingNotice] = useState(false);

  const handleAddRow = () => {
    setRows([...rows, { device: "", quantity: 1 }]);
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

  const calculateTotalUsage = () => {
    let sm1 = 0, sm2 = 0, sm3 = 0;

    rows.forEach(row => {
      const powerPerHour = appliancePower[row.device as keyof typeof appliancePower] || 0;
      const sub = applianceToSub[row.device as keyof typeof applianceToSub];
      const usage = powerPerHour * row.quantity;
      
      if (sub === "Sub_metering_1") sm1 += usage;
      else if (sub === "Sub_metering_2") sm2 += usage;
      else if (sub === "Sub_metering_3") sm3 += usage;
    });

    return sm1 + sm2 + sm3;
  };

  const handlePredict = async () => {
    const calculatedUsage = calculateTotalUsage();
    setTotalUsage(calculatedUsage);

    if (calculatedUsage > 5) {
      setShowWarningDialog(true);
      return;
    }

    proceedWithPrediction();
  };

  const proceedWithPrediction = async () => {
    setShowWarningDialog(false);
    let sm1 = 0, sm2 = 0, sm3 = 0;
    const hour = parseInt(currentHour);

    // Show loading notice after 3 seconds
    const loadingTimer = setTimeout(() => {
      setShowLoadingNotice(true);
    }, 3000);

    rows.forEach(row => {
      const powerPerHour = appliancePower[row.device as keyof typeof appliancePower] || 0;
      const sub = applianceToSub[row.device as keyof typeof applianceToSub];
      const usage = powerPerHour * row.quantity;
      
      if (sub === "Sub_metering_1") sm1 += usage;
      else if (sub === "Sub_metering_2") sm2 += usage;
      else if (sub === "Sub_metering_3") sm3 += usage;
    });

    const intensity = Number((((sm1 + sm2 + sm3) * 1000) / 220).toFixed(2));

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
      clearTimeout(loadingTimer);
      setShowLoadingNotice(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Input Form Card */}
        <Card className="flex-1 p-6 rounded-xl bg-white shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-700">EnergyMate Prediction</h1>
          </div>
          <Separator/>
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
{/* 
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Durasi (jam)</label>
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      value={row.duration}
                      onChange={(e) => handleRowChange(index, "duration", e.target.value)}
                    />
                  </div> */}

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
                Jam Prediksi (0 - 23)
              </label>
              <Select
                value={currentHour}
                onValueChange={(value) => setCurrentHour(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Jam" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
              onClick={handlePredict}
              disabled={loading}
            >
              <Calculator/>{loading ? "Memproses..." : "Prediksi & Rekomendasi"}
            </Button>
          </CardContent>
        </Card>

        <Card className="flex-1 p-6 rounded-xl bg-white shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-700 flex items-center justify-center gap-2">
              <ChartNetwork className="w-5 h-5" /> Hasil Prediksi
            </h1>
          </div>
          <Separator/>
          <CardContent>
            {result ? (
              !result.error ? (
                <div className="space-y-6">
                  {totalUsage > 5 && (
                    <Alert variant="destructive" className="bg-amber-50 border-amber-200">
                      <TriangleAlert className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-700">
                        Input melebihi range pelatihan. Hasil mungkin tidak akurat.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Summary Section */}
                  <div className="bg-gradient-to-r from-green-50 to-green-50 p-5 rounded-xl border border-green-200 shadow-sm">
                    <h3 className="font-bold text-green-700 flex items-center gap-2 text-lg">
                      <Zap className="w-5 h-5 text-green-600" /> Ringkasan Konsumsi Energi
                    </h3>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {/* Current Usage Card */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pemakaian</p>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                              <Timer className="w-4 h-4 text-gray-400" />
                              <span>Saat Ini</span>
                            </p>
                          </div>
                          <div className="bg-green-100 p-1 rounded-full">
                            <Zap className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-green-700 mt-2">
                          {result.total_usage_kw} <span className="text-sm font-normal text-gray-500">kWh</span>
                        </p>
                      </div>

                      {/* Predicted Usage Card */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Prediksi Konsumsi</p>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>1 Jam ke Depan</span>
                            </p>
                          </div>
                          <div className="bg-blue-100 p-1 rounded-full">
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-blue-700 mt-2">
                          {result.prediction_kw} <span className="text-sm font-normal text-gray-500">kWh</span>
                        </p>
                      </div>

                      {/* Efficiency Category Card */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow col-span-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori Efisiensi</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Status penggunaan energi Anda
                            </p>
                          </div>
                          <div className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                            result.category === "Rendah" 
                              ? "bg-green-100 text-green-800" 
                              : result.category === "Sedang" 
                                ? "bg-amber-100 text-amber-800" 
                                : "bg-red-100 text-red-800"
                          }`}>
                            {result.category}
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                          <Info className="w-4 h-4 text-gray-400" />
                          <span>
                            {result.category === "Rendah" 
                              ? "Penggunaan energi efisien" 
                              : result.category === "Sedang" 
                                ? "Penggunaan energi cukup efisien" 
                                : "Penggunaan energi perlu diperbaiki"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown Section */}
                  <div>
                    <h3 className="font-bold text-green-700 mb-3">Rincian Konsumsi</h3>
                    <div className="space-y-2">
                      {Object.entries(result.breakdown || {}).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                          <span>{key}</span>
                          <span className="font-medium">{val.toFixed(2)} kWh</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Focus Area Highlight */}
                  {result.focus_area && (
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <h3 className="font-bold text-amber-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Area Fokus Penghematan
                      </h3>
                      <p className="mt-2 font-medium text-amber-800">
                        Fokuskan pengurangan pada: <span className="underline">{result.focus_area}</span>
                      </p>
                      <p className="mt-1 text-sm text-amber-700">
                        {result.focus_area.includes("Sub_metering_1") && "Termasuk peralatan dapur seperti microwave, rice cooker, dan blender"}
                        {result.focus_area.includes("Sub_metering_2") && "Termasuk peralatan laundry seperti mesin cuci, pengering, dan setrika"}
                        {result.focus_area.includes("Sub_metering_3") && "Termasuk peralatan besar seperti AC, water heater, dan vacuum cleaner"}
                      </p>
                    </div>
                  )}

                  {/* Recommendations Section */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-bold text-blue-700 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" /> Rekomendasi Penghematan
                    </h3>
                    <div className="mt-3 space-y-3">
                      <div>
                        <h4 className="font-medium text-blue-800">Rekomendasi Umum:</h4>
                        <p className="text-sm text-blue-700">{result.general_recommendation}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800">Saran Spesifik:</h4>
                        <p className="text-sm text-blue-700">{result.specific_recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
                  <TriangleAlert className="w-4 h-4" />
                  {result.error}
                </div>
              )
            ) : (
              <div className="text-center py-8 text-gray-500 flex flex-col items-center">
                <Lightbulb className="w-8 h-8 mb-2 text-gray-400" />
                <p>Hasil prediksi akan muncul di sini setelah Anda mengklik "Predict & Recommend"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Warning Dialog */}
      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600"><TriangleAlert/>Peringatan</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-black text-md">
            Input melebihi range pelatihan (&gt; 5kWh). Hasil mungkin tidak akurat. Lanjutkan prediksi?
          </DialogDescription>
          <DialogFooter>
            <Button size="lg" onClick={() => setShowWarningDialog(false)} className="cursor-pointer bg-green-600 hover:bg-green-700 mr-2">
              Tidak, kembali
            </Button>
            <Button size="lg" onClick={proceedWithPrediction} className="cursor-pointer bg-amber-600 hover:bg-amber-700">
              Ya, saya mengerti
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showLoadingNotice && (
        <div className="fixed top-25 left-1/2 transform -translate-x-1/2">
          <Alert className="bg-green-50 border-green-200 text-amber-600 flex items-center gap-2 shadow-lg">
            <TriangleAlert className="w-4 h-4" />
            <AlertDescription className="font-bold">
              Permintaan pertama mungkin membutuhkan waktu lebih lama, harap tunggu...(estimasi ~1 menit)
            </AlertDescription>
            <TriangleAlert className="w-4 h-4" />
          </Alert>
        </div>
      )}
    </div>
  );
}