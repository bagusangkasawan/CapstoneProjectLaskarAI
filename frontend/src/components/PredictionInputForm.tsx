import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { predictEnergyUsage } from "@/data/prediction-api-source"
import type { PredictResponseData } from "@/model/prediction-models"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertCircle,
  Calculator,
  BarChartIcon as ChartNetwork,
  Clock,
  Info,
  Lightbulb,
  Timer,
  TrendingUp,
  TriangleAlert,
  Zap,
  Check,
  ChevronsUpDown,
  Plus,
  Home,
  Coffee,
  Utensils,
  Droplets,
  Sandwich,
  Shirt,
  Wind,
  Flame,
  Waves,
  Fan,
  Thermometer,
  Snowflake,
  Trash,
  CircleDot,
} from "lucide-react"
import { Separator } from "./ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface Device {
  name: string
  wattage: number
  subMeter: string
  icon: string
}

const defaultDevices: Device[] = [
  { name: "Microwave (Microwave)", wattage: 1000, subMeter: "Sub_metering_1", icon: "Microwave" },
  { name: "Penanak Nasi (Rice Cooker)", wattage: 300, subMeter: "Sub_metering_1", icon: "Coffee" },
  { name: "Blender (Blender)", wattage: 250, subMeter: "Sub_metering_1", icon: "Utensils" },
  { name: "Dispenser Air (Water Dispenser)", wattage: 200, subMeter: "Sub_metering_1", icon: "Droplets" },
  { name: "Pemanggang Roti (Toaster)", wattage: 850, subMeter: "Sub_metering_1", icon: "Sandwich" },

  { name: "Mesin Cuci (Washing Machine)", wattage: 500, subMeter: "Sub_metering_2", icon: "Shirt" },
  { name: "Mesin Pengering (Dryer)", wattage: 3000, subMeter: "Sub_metering_2", icon: "Wind" },
  { name: "Setrika (Iron)", wattage: 1000, subMeter: "Sub_metering_2", icon: "Flame" },
  { name: "Pompa Air (Water Pump)", wattage: 750, subMeter: "Sub_metering_2", icon: "Waves" },
  { name: "Pengering Rambut (Hair Dryer)", wattage: 600, subMeter: "Sub_metering_2", icon: "Fan" },

  { name: "Pemanas Air (Water Heater)", wattage: 1500, subMeter: "Sub_metering_3", icon: "Thermometer" },
  { name: "AC (Air Conditioner)", wattage: 800, subMeter: "Sub_metering_3", icon: "Snowflake" },
  { name: "Penyedot Debu (Vacuum Cleaner)", wattage: 1200, subMeter: "Sub_metering_3", icon: "Trash" },
  { name: "Kipas Angin (Fan)", wattage: 100, subMeter: "Sub_metering_3", icon: "Fan" },
  { name: "Lampu Bohlam (Incandescent light)", wattage: 35, subMeter: "Sub_metering_3", icon: "Lightbulb" },
  { name: "Lampu LED (LED Light)", wattage: 20, subMeter: "Sub_metering_3", icon: "Lightbulb" },
]

const subMeterOptions = [
  { value: "Sub_metering_1", label: "Sub Meter 1 (Dapur)" },
  { value: "Sub_metering_2", label: "Sub Meter 2 (Laundry)" },
  { value: "Sub_metering_3", label: "Sub Meter 3 (AC & Lainnya)" },
]

interface DeviceRow {
  device: Device | null
  quantity: number
  isCustom: boolean
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const resultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export default function PredictionInputForm() {
  const [devices, setDevices] = useState<Device[]>(defaultDevices)
  const [rows, setRows] = useState<DeviceRow[]>([
    {
      device: defaultDevices[0],
      quantity: 1,
      isCustom: false,
    },
  ])
  const [currentHour, setCurrentHour] = useState(() => new Date().getHours().toString())
  const [result, setResult] = useState<PredictResponseData | null>(null)
  const [loading, setLoading] = useState(false)
  const [showWarningDialog, setShowWarningDialog] = useState(false)
  const [totalUsage, setTotalUsage] = useState(0)
  const [showLoadingNotice, setShowLoadingNotice] = useState(false)
  const [openCombobox, setOpenCombobox] = useState<number | null>(null)
  const [newDeviceName, setNewDeviceName] = useState("")
  const [newDeviceWattage, setNewDeviceWattage] = useState("")
  const [newDeviceSubMeter, setNewDeviceSubMeter] = useState("Sub_metering_1")

  const handleAddRow = () => {
    setRows([...rows, { device: null, quantity: 1, isCustom: false }])
  }

  const handleRemoveRow = (index: number) => {
    if (rows.length <= 1) return
    setRows(rows.filter((_, i) => i !== index))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRowChange = (index: number, field: string, value: any) => {
    const updated = [...rows]
    if (field === "device") {
      updated[index] = { ...updated[index], device: value, isCustom: false }
    } else if (field === "quantity") {
      updated[index] = { ...updated[index], quantity: Number(value) }
    } else if (field === "wattage") {
      const device = updated[index].device ? { ...updated[index].device! } : null
      if (device) {
        device.wattage = Number(value)
        updated[index] = { ...updated[index], device }
      }
    } else if (field === "subMeter") {
      const device = updated[index].device ? { ...updated[index].device! } : null
      if (device) {
        device.subMeter = value
        updated[index] = { ...updated[index], device }
      }
    }
    setRows(updated)
  }

  const addCustomDevice = (index: number) => {
    if (!newDeviceName || !newDeviceWattage) return

    const newDevice: Device = {
      name: newDeviceName,
      wattage: Number(newDeviceWattage),
      subMeter: newDeviceSubMeter,
      icon: "CircleDot", // Default icon for custom devices
    }

    // Add to global devices list if not already exists
    if (!devices.some((d) => d.name === newDeviceName)) {
      setDevices([...devices, newDevice])
    }

    // Update the current row
    const updated = [...rows]
    updated[index] = {
      ...updated[index],
      device: newDevice,
      isCustom: true,
    }
    setRows(updated)

    // Reset form
    setNewDeviceName("")
    setNewDeviceWattage("")
    setOpenCombobox(null)
  }

  const calculateTotalUsage = () => {
    let sm1 = 0,
      sm2 = 0,
      sm3 = 0

    rows.forEach((row) => {
      if (!row.device) return

      const powerPerHour = row.device.wattage / 1000 // Convert W to kW
      const usage = powerPerHour * row.quantity

      if (row.device.subMeter === "Sub_metering_1") sm1 += usage
      else if (row.device.subMeter === "Sub_metering_2") sm2 += usage
      else if (row.device.subMeter === "Sub_metering_3") sm3 += usage
    })

    return sm1 + sm2 + sm3
  }

  const handlePredict = async () => {
    const calculatedUsage = calculateTotalUsage()
    setTotalUsage(calculatedUsage)

    if (calculatedUsage > 5) {
      setShowWarningDialog(true)
      return
    }

    proceedWithPrediction()
  }

  const proceedWithPrediction = async () => {
    setShowWarningDialog(false)
    let sm1 = 0,
      sm2 = 0,
      sm3 = 0
    const hour = Number.parseInt(currentHour)

    const loadingTimer = setTimeout(() => {
      setShowLoadingNotice(true)
    }, 3000)

    rows.forEach((row) => {
      if (!row.device) return

      const powerPerHour = row.device.wattage / 1000 // Convert W to kW
      const usage = powerPerHour * row.quantity

      if (row.device.subMeter === "Sub_metering_1") sm1 += usage
      else if (row.device.subMeter === "Sub_metering_2") sm2 += usage
      else if (row.device.subMeter === "Sub_metering_3") sm3 += usage
    })

    // Calculate intensity (A) from power (kW)
    // Assuming voltage is 230V and power factor is 1 for simplicity
    // Formula: I = P / V
    const intensity = Number(((sm1 + sm2 + sm3) / 0.23).toFixed(2))

    const payload = {
      Global_intensity: intensity,
      Sub_metering_1: sm1,
      Sub_metering_2: sm2,
      Sub_metering_3: sm3,
      hour: hour,
    }

    setLoading(true)
    try {
      const response = await predictEnergyUsage(payload)
      setResult(response)
    } catch (err) {
      console.error("Prediction failed:", err)
      setResult({
        error: "Terjadi kesalahan saat memprediksi",
        total_usage_kw: 0,
        prediction_kw: 0,
        category: "",
        general_recommendation: "",
        focus_area: "",
        specific_recommendation: "",
        breakdown: {},
      })
    } finally {
      clearTimeout(loadingTimer)
      setShowLoadingNotice(false)
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center px-2 sm:px-4 py-4 sm:py-8"
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Input Form Card */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" className="flex-1">
          <Card className="p-6 rounded-xl bg-white shadow-lg h-full">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-700">EnergyMate Prediction</h1>
            </div>
            <Separator />
            <CardContent className="space-y-4">
              {/* Household Power Notice */}
              <Alert className="bg-blue-50 border-blue-200">
                <Home className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700 font-medium">
                  <strong>Penting:</strong> Prediksi ini dilatih khusus untuk konsumsi listrik rumah tangga, bukan untuk
                  penggunaan komersial atau industri.
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <AnimatePresence>
                  {rows.map((row, index) => (
                    <motion.div
                      key={index}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <div className="space-y-3 border-2 p-2 rounded-lg">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Alat</label>
                            <Popover
                              open={openCombobox === index}
                              onOpenChange={(open) => setOpenCombobox(open ? index : null)}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openCombobox === index}
                                  className="w-full justify-between"
                                >
                                  {row.device ? (
                                    <span className="flex items-center truncate">
                                      {row.device.icon === "Microwave" && (
                                        <Zap className="h-4 w-4 mr-1 flex-shrink-0" />
                                      )}
                                      {row.device.icon === "Coffee" && (
                                        <Coffee className="h-4 w-4 mr-1 flex-shrink-0" />
                                      )}
                                      {row.device.icon === "Utensils" && (
                                        <Utensils className="h-4 w-4 mr-1 flex-shrink-0" />
                                      )}
                                      {row.device.icon === "Droplets" && (
                                        <Droplets className="h-4 w-4 mr-1 flex-shrink-0" />
                                      )}
                                      {row.device.icon === "Sandwich" && (
                                        <Sandwich className="h-4 w-4 mr-1 flex-shrink-0" />
                                      )}
                                      {row.device.icon === "Shirt" && <Shirt className="h-4 w-4 mr-1 flex-shrink-0" />}
                                      {row.device.icon === "Wind" && <Wind className="h-4 w-4 mr-1 flex-shrink-0" />}
                                      {row.device.icon === "Flame" && <Flame className="h-4 w-4 mr-1 flex-shrink-0" />}
                                      {row.device.icon === "Waves" && <Waves className="h-4 w-4 mr-1 flex-shrink-0" />}
                                      {row.device.icon === "Fan" && <Fan className="h-4 w-4 mr-1 flex-shrink-0" />}
                                      {row.device.icon === "Thermometer" && (
                                        <Thermometer className="h-4 w-4 mr-1 flex-shrink-0" />
                                      )}
                                      {row.device.icon === "Snowflake" && (
                                        <Snowflake className="h-4 w-4 mr-1 flex-shrink-0" />
                                      )}
                                      {row.device.icon === "Trash" && <Trash className="h-4 w-4 mr-1 flex-shrink-0" />}
                                      {row.device.icon === "Lightbulb" && (
                                        <Lightbulb className="h-4 w-4 mr-1 flex-shrink-0" />
                                      )}
                                      {row.device.icon === "CircleDot" && (
                                        <CircleDot className="h-4 w-4 mr-1 flex-shrink-0" />
                                      )}
                                      <span className="truncate">{row.device.name}</span>
                                    </span>
                                  ) : (
                                    "Pilih atau tambah alat..."
                                  )}
                                  <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-full p-0  h-[250px]"
                                side="bottom"
                                align="start"
                                collisionPadding={10}
                                avoidCollisions={false}
                              >
                                <Command>
                                  <CommandInput
                                    placeholder="Cari alat..."
                                    onValueChange={(value) => {
                                      if (value === "+add") {
                                        setNewDeviceName("")
                                        setNewDeviceWattage("")
                                      }
                                    }}
                                  />
                                  <CommandList>
                                    <CommandEmpty className="p-2">
                                      <div className="space-y-2">
                                        <p>Tidak ditemukan. Tambahkan alat baru:</p>
                                        <Input
                                          placeholder="Nama alat"
                                          value={newDeviceName}
                                          onChange={(e) => setNewDeviceName(e.target.value)}
                                        />
                                        <div className="flex flex-col sm:flex-row gap-2">
                                          <Input
                                            type="number"
                                            placeholder="Wattage"
                                            value={newDeviceWattage}
                                            onChange={(e) => setNewDeviceWattage(e.target.value)}
                                          />
                                          <Select value={newDeviceSubMeter} onValueChange={setNewDeviceSubMeter}>
                                            <SelectTrigger className="w-full sm:w-[180px]">
                                              <SelectValue placeholder="Sub Meter" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {subMeterOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                  {option.label}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <Button 
                                          size="sm"
                                          className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                                          onClick={() => addCustomDevice(index)}
                                        >
                                          <Plus className="mr-2 h-4 w-4" /> Tambah Alat
                                        </Button>
                                      </div>
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {devices.map((device) => (
                                        <CommandItem
                                          key={device.name}
                                          value={device.name}
                                          onSelect={() => {
                                            handleRowChange(index, "device", device)
                                            setOpenCombobox(null)
                                          }}
                                        >
                                          <Check
                                            className={
                                              row.device?.name === device.name ? "opacity-100 mr-1" : "opacity-0 mr-1"
                                            }
                                          />
                                          {/* Add dynamic icon based on device.icon property */}
                                          {device.icon && (
                                            <span className="mr-1 inline-flex items-center">
                                              {device.icon === "Microwave" && <Zap className="h-4 w-4" />}
                                              {device.icon === "Coffee" && <Coffee className="h-4 w-4" />}
                                              {device.icon === "Utensils" && <Utensils className="h-4 w-4" />}
                                              {device.icon === "Droplets" && <Droplets className="h-4 w-4" />}
                                              {device.icon === "Sandwich" && <Sandwich className="h-4 w-4" />}
                                              {device.icon === "Shirt" && <Shirt className="h-4 w-4" />}
                                              {device.icon === "Wind" && <Wind className="h-4 w-4" />}
                                              {device.icon === "Flame" && <Flame className="h-4 w-4" />}
                                              {device.icon === "Waves" && <Waves className="h-4 w-4" />}
                                              {device.icon === "Fan" && <Fan className="h-4 w-4" />}
                                              {device.icon === "Thermometer" && <Thermometer className="h-4 w-4" />}
                                              {device.icon === "Snowflake" && <Snowflake className="h-4 w-4" />}
                                              {device.icon === "Trash" && <Trash className="h-4 w-4" />}
                                              {device.icon === "Lightbulb" && <Lightbulb className="h-4 w-4" />}
                                              {device.icon === "CircleDot" && <CircleDot className="h-4 w-4" />}
                                            </span>
                                          )}
                                          <span className="truncate">{device.name}</span>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            <div className="flex-1 sm:w-24">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
                              <Input
                                type="number"
                                min="1"
                                value={row.quantity}
                                onChange={(e) => handleRowChange(index, "quantity", e.target.value)}
                                className="w-full"
                              />
                            </div>

                            <div className="flex items-end h-10 mt-auto">
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
                        </div>

                        {row.device && (
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Wattage (W)</label>
                              <Input
                                type="number"
                                min="1"
                                value={row.device.wattage}
                                onChange={(e) => handleRowChange(index, "wattage", e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  onClick={handleAddRow}
                  disabled={rows.length === 9}
                >
                  + Tambah Alat
                </Button>
              </motion.div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Prediksi (0 - 23)</label>
                <Select value={currentHour} onValueChange={(value) => setCurrentHour(value)}>
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

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
                  onClick={handlePredict}
                  disabled={loading || rows.some((row) => !row.device)}
                >
                  <Calculator />
                  {loading ? "Memproses..." : "Prediksi & Rekomendasi"}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="flex-1"
        >
          <Card className="p-6 rounded-xl bg-white shadow-lg h-full">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-700 flex items-center justify-center gap-2">
                <ChartNetwork className="w-5 h-5" /> Hasil Prediksi
              </h1>
            </div>
            <Separator />
            <CardContent>
              {result ? (
                !result.error ? (
                  <motion.div variants={resultVariants} initial="hidden" animate="visible" className="space-y-6">
                    {totalUsage > 5 && (
                      <motion.div variants={itemVariants}>
                        <Alert variant="destructive" className="bg-amber-50 border-amber-200">
                          <TriangleAlert className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-amber-700">
                            Input melebihi range pelatihan. Hasil mungkin tidak akurat.
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}

                    {/* Summary Section */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-gradient-to-r from-green-50 to-green-50 p-5 rounded-xl border border-green-200 shadow-sm hover:shadow-sm transition-shadow"
                    >
                      <h3 className="font-bold text-green-700 flex items-center gap-2 text-lg">
                        <Zap className="w-5 h-5 text-green-600" /> Ringkasan Konsumsi Energi
                      </h3>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Current Usage Card */}
                        <motion.div
                          variants={itemVariants}
                          whileHover={{ y: -2 }}
                          className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Pemakaian
                              </p>
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
                        </motion.div>

                        {/* Predicted Usage Card */}
                        <motion.div
                          variants={itemVariants}
                          whileHover={{ y: -2 }}
                          className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Prediksi Konsumsi
                              </p>
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
                        </motion.div>

                        {/* Efficiency Category Card */}
                        <motion.div
                          variants={itemVariants}
                          whileHover={{ y: -2 }}
                          className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow col-span-1 sm:col-span-2"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kategori Efisiensi
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Status penggunaan energi Anda</p>
                            </div>
                            <div
                              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold ${
                                result.category === "Rendah"
                                  ? "bg-green-100 text-green-800"
                                  : result.category === "Sedang"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {result.category}
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-3 flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <Info className="w-4 h-4 text-gray-400" />
                            <span>
                              {result.category === "Rendah"
                                ? "Penggunaan energi efisien"
                                : result.category === "Sedang"
                                  ? "Penggunaan energi cukup efisien"
                                  : "Penggunaan energi perlu diperbaiki"}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Breakdown Section */}
                    <motion.div variants={itemVariants}>
                      <h3 className="font-bold text-green-700 mb-3">Rincian Konsumsi</h3>
                      <div className="space-y-2">
                        {Object.entries(result.breakdown || {}).map(([key, val]) => (
                          <motion.div
                            key={key}
                            whileHover={{ scale: 1.01 }}
                            className="flex justify-between items-center bg-gray-50 p-3 rounded"
                          >
                            <span>{key}</span>
                            <span className="font-medium">{val.toFixed(2)} kWh</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Focus Area Highlight */}
                    {result.focus_area && (
                      <motion.div
                        variants={itemVariants}
                        className="bg-amber-50 p-4 rounded-lg border border-amber-200"
                      >
                        <h3 className="font-bold text-amber-700 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" /> Area Fokus Penghematan
                        </h3>
                        <p className="mt-2 font-medium text-amber-800">
                          Fokuskan pengurangan pada: <span className="underline">{result.focus_area}</span>
                        </p>
                        <p className="mt-1 text-sm text-amber-700">
                          {result.focus_area.includes("Sub_metering_1") &&
                            "Termasuk peralatan dapur seperti microwave, rice cooker, dan blender"}
                          {result.focus_area.includes("Sub_metering_2") &&
                            "Termasuk peralatan laundry seperti mesin cuci, pengering, dan setrika"}
                          {result.focus_area.includes("Sub_metering_3") &&
                            "Termasuk peralatan besar seperti AC, water heater, dan vacuum cleaner"}
                        </p>
                      </motion.div>
                    )}

                    {/* Recommendations Section */}
                    <motion.div variants={itemVariants} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
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
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2"
                  >
                    <TriangleAlert className="w-4 h-4" />
                    {result.error}
                  </motion.div>
                )
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-gray-500 flex flex-col items-center"
                >
                  <Lightbulb className="w-8 h-8 mb-2 text-gray-400" />
                  <p>Hasil prediksi akan muncul di sini setelah Anda mengklik "Prediksi & Rekomendasi"</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Warning Dialog */}
      <AnimatePresence>
        {showWarningDialog && (
          <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-amber-600">
                    <TriangleAlert />
                    Peringatan
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-black text-md">
                  Input melebihi range pelatihan (&gt; 5kWh). Hasil mungkin tidak akurat. Lanjutkan prediksi?
                </DialogDescription>
                <DialogFooter>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      onClick={() => setShowWarningDialog(false)}
                      className="cursor-pointer bg-green-600 hover:bg-green-700 mr-2"
                    >
                      Tidak, kembali
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      onClick={proceedWithPrediction}
                      className="cursor-pointer bg-amber-600 hover:bg-amber-700"
                    >
                      Ya, saya mengerti
                    </Button>
                  </motion.div>
                </DialogFooter>
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLoadingNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-25 left-1/2 transform -translate-x-1/2"
          >
            <Alert className="bg-green-50 border-green-200 text-amber-600 flex items-center gap-2 shadow-lg">
              <TriangleAlert className="w-4 h-4" />
              <AlertDescription className="font-bold">
                Permintaan pertama mungkin membutuhkan waktu lebih lama, harap tunggu...(estimasi ~1 menit)
              </AlertDescription>
              <TriangleAlert className="w-4 h-4" />
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
