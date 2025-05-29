import joblib
import numpy as np
from tensorflow.keras.models import load_model

# Load model dan scaler
model = load_model('./models/best_model.keras')
X_scaler = joblib.load("./models/X_scaler.save")
if hasattr(X_scaler, 'feature_names_in_'):
    del X_scaler.feature_names_in_
y_scaler = joblib.load("./models/y_scaler.save")

Q1 = 2.50
Q3 = 5.00

SUB_LABELS = {
    "Sub_metering_1": "Peralatan Dapur & Elektronik Kecil",
    "Sub_metering_2": "Peralatan Laundry & Pemanas",
    "Sub_metering_3": "Pendingin, Penerangan & Pembersih"
}

def get_user_consumption():
    appliance_power_watt = {
        "microwave": 1000,
        "penanak nasi": 300,
        "blender": 250,
        "dispenser air": 200,
        "pemanggang roti": 850,

        "mesin cuci": 500,
        "mesin pengering": 3000,
        "setrika": 1000,
        "pompa air": 750,
        "pengering rambut": 600,

        "pemanas air": 1500,
        "AC": 800,
        "penyedot debu": 1200,
        "kipas angin": 100,
        "lampu LED": 20
    }

    appliance_to_sub = {
        "microwave": "Sub_metering_1",
        "penanak nasi": "Sub_metering_1",
        "blender": "Sub_metering_1",
        "dispenser air": "Sub_metering_1",
        "pemanggang roti": "Sub_metering_1",

        "mesin cuci": "Sub_metering_2",
        "mesin pengering": "Sub_metering_2",
        "setrika": "Sub_metering_2",
        "pompa air": "Sub_metering_2",
        "pengering rambut": "Sub_metering_2",

        "pemanas air": "Sub_metering_3",
        "AC": "Sub_metering_3",
        "penyedot debu": "Sub_metering_3",
        "kipas angin": "Sub_metering_3",
        "lampu LED": "Sub_metering_3"
    }

    submeter_usage = {"Sub_metering_1": 0.0, "Sub_metering_2": 0.0, "Sub_metering_3": 0.0}

    while True:
        item = input("Nama alat (atau ketik 'selesai'): ").strip().lower()
        if item == "selesai":
            break

        try:
            watt = float(input(f"Masukkan daya '{item}' dalam watt (atau tekan Enter untuk default): ") or -1)
        except ValueError:
            watt = -1

        if watt <= 0:
            watt = appliance_power_watt.get(item, 20)
            if item not in appliance_power_watt:
                print(f"Alat '{item}' tidak dikenali, gunakan daya default 20 watt.")
            else:
                print(f"Gunakan daya default {watt} watt untuk '{item}'.")

        try:
            count = int(input(f"Jumlah unit '{item}': "))
            if count < 1:
                raise ValueError
        except ValueError:
            print("Jumlah tidak valid, gunakan default 1 unit.")
            count = 1

        energy_kwh = (watt * count) / 1000
        sub_key = appliance_to_sub.get(item, "Sub_metering_1")
        submeter_usage[sub_key] += energy_kwh

        print(f"► {item}: {count} × {watt} watt = {energy_kwh:.2f} kWh pada {sub_key}\n")

    try:
        hour = int(input("Jam sekarang (0-23): "))
        if hour < 0 or hour > 23:
            raise ValueError
    except ValueError:
        print("Input jam tidak valid. Gunakan default jam 12.")
        hour = 12

    total_kw = sum(submeter_usage.values())
    voltage = 230
    global_intensity = round((total_kw * 1000) / voltage, 2)

    return {
        "Global_intensity": global_intensity,
        "Sub_metering_1": round(submeter_usage["Sub_metering_1"], 2),
        "Sub_metering_2": round(submeter_usage["Sub_metering_2"], 2),
        "Sub_metering_3": round(submeter_usage["Sub_metering_3"], 2),
        "hour": hour
    }


def rule_based_recommendation(pred_kw, usage_kws):
    total_usage = sum(usage_kws.values())
    max_sub = max(usage_kws, key=usage_kws.get)
    max_label = SUB_LABELS.get(max_sub, max_sub)

    if pred_kw < Q1:
        category = "Rendah"
        base_rec = "Konsumsi umum rendah—bagus, pertahankan pola ini."
    elif pred_kw <= Q3:
        category = "Sedang"
        base_rec = "Konsumsi sedang—perhatikan peralatan yang tidak dipakai."
    else:
        category = "Tinggi"
        base_rec = "Konsumsi tinggi—kurangi beban puncak."

    specific_rec = (
        f"Bagian terberat berasal dari {max_label} "
        f"(±{usage_kws[max_sub]:.2f} kWh). "
        f"Pertimbangkan mematikan atau mengurangi penggunaan peralatan di {max_label}."
    )

    return {
        "total_usage_kw": round(total_usage, 2),
        "prediction_kw": round(pred_kw, 2),
        "category": category,
        "breakdown": {SUB_LABELS[k]: round(v, 2) for k, v in usage_kws.items()},
        "general_recommendation": base_rec,
        "focus_area": max_label,
        "specific_recommendation": specific_rec
    }

def predict_and_recommend(user_input):
    # hitung global_intensity jika belum ada
    if user_input.get("Global_intensity") is None:
        total_kw = (user_input["Sub_metering_1"] +
                    user_input["Sub_metering_2"] +
                    user_input["Sub_metering_3"])
        user_input["Global_intensity"] = (total_kw * 1000) / 230

    X_input = np.array([
        user_input["Global_intensity"],
        user_input["Sub_metering_1"],
        user_input["Sub_metering_2"],
        user_input["Sub_metering_3"],
        user_input["hour"]
    ])

    past_60_input = np.tile(X_input, (60, 1))

    X_scaled_sequence = X_scaler.transform(past_60_input)


    X_seq = X_scaled_sequence.reshape(1, 60, -1)

    pred_scaled = model.predict(X_seq, verbose=0)[0][0]
    pred_kw = y_scaler.inverse_transform([[pred_scaled]])[0][0]

    usage_kws = {
        "Sub_metering_1": user_input["Sub_metering_1"],
        "Sub_metering_2": user_input["Sub_metering_2"],
        "Sub_metering_3": user_input["Sub_metering_3"]
    }
    return rule_based_recommendation(pred_kw, usage_kws)


if __name__ == "__main__":
    user_input = get_user_consumption()
    recommendation = predict_and_recommend(user_input)

    print("\n=== Rekomendasi Energi ===")
    print(f"Total Penggunaan Input: {recommendation['total_usage_kw']} kWh")
    print(f"Prediksi Konsumsi (Model): {recommendation['prediction_kw']} kWh")
    print(f"Kategori Konsumsi: {recommendation['category']}")
    print(f"Detail Penggunaan per Area: {recommendation['breakdown']}")
    print(f"Rekomendasi Umum: {recommendation['general_recommendation']}")
    print(f"Saran Spesifik: {recommendation['specific_recommendation']}")
