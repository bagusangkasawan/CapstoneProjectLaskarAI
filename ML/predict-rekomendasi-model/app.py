from flask import Blueprint, Flask, render_template, request
from flask_cors import CORS
from flask_restx import Api, Resource, fields

import recommendation

app = Flask(__name__, template_folder='templates')
CORS(app)

api = Api(
    version='1.0',
    title='EnergyMate API',
    description='API untuk rekomendasi konsumsi energi',
    doc='/api/docs'
)

api_bp = Blueprint('api', __name__, url_prefix='/api')
api.init_app(api_bp)
app.register_blueprint(api_bp)

ns = api.namespace('predict', description='Prediksi konsumsi dan rekomendasi')

input_model = api.model('UserInput', {
    # 'Global_intensity': fields.Float(required=True, description='Intensitas arus global dalam Ampere'),
    'Sub_metering_1': fields.Float(required=True, description='Penggunaan dapur (kWh)'),
    'Sub_metering_2': fields.Float(required=True, description='Penggunaan laundry (kWh)'),
    'Sub_metering_3': fields.Float(required=True, description='Penggunaan water heater & AC (kWh)'),
    'hour': fields.Integer(required=True, description='Jam saat penggunaan (0-23)')
})

@app.route('/')
def index():
    return render_template('index.html')


@ns.route('/')
class Predict(Resource):
    @ns.expect(input_model)
    def post(self):
        try:
            user_input = request.json
            result = recommendation.predict_and_recommend(user_input)
            return result, 200
        except Exception as e:
            return {f"error": "Maaf API Gagal Terhubung"}, 404
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)