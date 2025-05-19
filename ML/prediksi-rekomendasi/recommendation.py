import joblib
import numpy as np
from tensorflow.keras.models import load_model

# Load model dan scaler
model = load_model('models/best_model.keras')
X_scaler = joblib.load("models/X_scaler.save")
if hasattr(X_scaler, 'feature_names_in_'):
    del X_scaler.feature_names_in_
y_scaler = joblib.load("models/y_scaler.save")

Q1 = 2.50
Q3 = 5.00

SUB_LABELS = {
    "Sub_metering_1": "Dapur",
    "Sub_metering_2": "Laundry",
    "Sub_metering_3": "Water Heater & AC"
}

def get_user_consumption():
    appliance_power = {
        "microwave": 0.8,
        "rice cooker": 0.6,
        "blender": 0.3,
        "washing machine": 1.0,
        "dryer": 1.2,
        "iron": 1.1,
        "water heater": 1.5,
        "ac": 1.3,
        "vacuum cleaner": 0.9
    }

    appliance_to_sub = {
        "microwave": "Sub_metering_1", "rice cooker": "Sub_metering_1", "blender": "Sub_metering_1",
        "washing machine": "Sub_metering_2", "dryer": "Sub_metering_2", "iron": "Sub_metering_2",
        "water heater": "Sub_metering_3", "ac": "Sub_metering_3", "vacuum cleaner": "Sub_metering_3"
    }

    submeter_usage = {"Sub_metering_1": 0.0, "Sub_metering_2": 0.0, "Sub_metering_3": 0.0}

    while True:
        item = input("Nama alat (atau ketik 'selesai'): ").strip().lower()
        if item == "selesai":
            break

        power = appliance_power.get(item, 0.02)
        if item not in appliance_power:
            print(f"Alat '{item}' tidak dikenali, gunakan daya default 0.02 kW.")

        try:
            count = int(input(f"Jumlah unit '{item}': "))
            if count < 1:
                raise ValueError
        except ValueError:
            print("Jumlah tidak valid, gunakan default 1 unit.")
            count = 1

        try:
            hours = float(input(f"Durasi pemakaian '{item}' per unit (jam): "))
            if hours < 0:
                raise ValueError
        except ValueError:
            print("Durasi tidak valid, gunakan default 1 jam.")
            hours = 1.0

        energy_kwh = power * count * hours
        sub_key = appliance_to_sub.get(item, "Sub_metering_1")
        submeter_usage[sub_key] += energy_kwh
        print(f"► {item}: {count} × {power} kW × {hours} jam = {energy_kwh:.2f} kWh pada {sub_key}\n")

    try:
        hour = int(input("Jam sekarang (0-23): "))
        if hour < 0 or hour > 23:
            raise ValueError
    except ValueError:
        print("Input jam tidak valid. Gunakan default jam 12.")
        hour = 12

    total_kw = submeter_usage["Sub_metering_1"] + submeter_usage["Sub_metering_2"] + submeter_usage["Sub_metering_3"]
    voltage = 220  # Tegangan standar
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
    if "Global_intensity" not in user_input or user_input["Global_intensity"] is None:
        voltage = 230
        total_kw = (
            user_input["Sub_metering_1"]
            + user_input["Sub_metering_2"]
            + user_input["Sub_metering_3"]
        )
        user_input["Global_intensity"] = (total_kw * 1000) / voltage

    X_input = np.array([[
        user_input["Global_intensity"],
        user_input["Sub_metering_1"],
        user_input["Sub_metering_2"],
        user_input["Sub_metering_3"],
        user_input["hour"]
    ]])

    X_scaled_input = X_scaler.transform(X_input)

    seq_length = 60
    X_seq = np.zeros((1, seq_length, X_scaled_input.shape[1]))
    X_seq[0, -1, :] = X_scaled_input[0]

    prediction_scaled = model.predict(X_seq, verbose=0)[0][0]
    prediction_kw = y_scaler.inverse_transform([[prediction_scaled]])[0][0]

    usage_kws = {
        "Sub_metering_1": user_input["Sub_metering_1"],
        "Sub_metering_2": user_input["Sub_metering_2"],
        "Sub_metering_3": user_input["Sub_metering_3"]
    }

    return rule_based_recommendation(prediction_kw, usage_kws)

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
