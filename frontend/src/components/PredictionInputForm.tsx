import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const dummyDevices = [
  { name: "Microwave", watt: 100 },
  { name: "Rice Cooker", watt: 100 },
  { name: "Blender", watt: 800 },
  { name: "Washing Machine", watt: 150 },
  { name: "Dryer", watt: 15 },
  { name: "Iron", watt: 150 },
  { name: "Water Heater", watt: 15 },
  { name: "AC", watt: 150 },
  { name: "Vacuum Cleaner", watt: 15 },
];

export default function PredictionInputForm() {
  const [rows, setRows] = useState([
    { device: "", duration: 1, power: 1 },
    { device: "", duration: 1, power: 1 },
  ]);
  const [currentHour, setCurrentHour] = useState("");

  const handleAddRow = () => {
    setRows([...rows, { device: "", duration: 1, power: 1 }]);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length <= 1) return;
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  const handleRowChange = (index: number, field: string, value: string) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: value };
    setRows(updated);
  };

  const handlePredict = () => {
    console.log("Predicting with:", { rows, currentHour });
    alert("Prediction is sent successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-blue-400 flex items-center justify-center px-4">
      <Card className="w-full max-w-xl p-6 rounded-lg shadow-xl bg-white">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-700">
            <span role="img" aria-label="battery">🔋</span> EnergyMate Prediction
          </div>
        </div>
        <CardContent className="space-y-4">
          {rows.map((row, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Select
                onValueChange={(value) => handleRowChange(index, "device", value)}
                value={row.device}
              >
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Pilih Alat" />
                </SelectTrigger>
                <SelectContent>
                  {dummyDevices.map((device) => (
                    <SelectItem key={device.name} value={device.name}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                className="w-1/4"
                value={row.duration}
                onChange={(e) => handleRowChange(index, "duration", e.target.value)}
              />
              <Input
                type="number"
                className="w-1/4"
                value={row.power}
                onChange={(e) => handleRowChange(index, "power", e.target.value)}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveRow(index)}
                className="px-2 cursor-pointer hover:bg-red-100 text-red-500"
                disabled={rows.length === 1}
              >
                X
              </Button>
            </div>
          ))}
          <Button
            className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
            onClick={handleAddRow}
          >
            Tambah Alat
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
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold cursor-pointer"
            onClick={handlePredict}
          >
            Prediksi dan Rekomendasi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}