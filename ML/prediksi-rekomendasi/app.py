from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_restx import Api, Resource, fields, Namespace
import recommendation

# Inisialisasi Flask
app = Flask(__name__)

# Aktifkan CORS
CORS(app)

# Routing halaman utama
@app.route('/')
def index():
    return render_template('index.html')

# Swagger & REST API Setup
app.config['SWAGGER_UI_DOC_EXPANSION'] = 'full'

api = Api(
    app,
    version='1.0',
    title='⚡ EnergyMate Prediction API',
    description='API untuk prediksi dan rekomendasi konsumsi energi rumah tangga',
    doc='/api/docs'
)

# Namespace untuk prediksi energi
predict_ns = Namespace(
    'Prediction',
    description='Endpoint untuk prediksi dan rekomendasi konsumsi energi'
)

# Input schema
input_model = predict_ns.model('PredictInput', {
    'Sub_metering_1': fields.Float(required=True, description='Penggunaan dapur (kWh)'),
    'Sub_metering_2': fields.Float(required=True, description='Penggunaan laundry (kWh)'),
    'Sub_metering_3': fields.Float(required=True, description='Penggunaan water heater & AC (kWh)'),
    'hour': fields.Integer(required=True, description='Jam saat penggunaan (0-23)')
})

# Endpoint prediksi
@predict_ns.route('/predict')
class PredictEndpoint(Resource):
    @predict_ns.expect(input_model)
    @predict_ns.response(200, 'Berhasil mendapatkan respon.')
    @predict_ns.response(500, 'Terjadi kesalahan pada server.')
    def post(self):
        """Prediksi konsumsi energi berdasarkan input pengguna"""
        try:
            data = request.get_json()
            result = recommendation.predict_and_recommend(data)
            return result, 200
        except Exception as e:
            print(f"Prediction Error: {e}")
            return {"error": "Terjadi kesalahan pada server."}, 500

# Register namespace
api.add_namespace(predict_ns, path='/api')

# Jalankan aplikasi
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
