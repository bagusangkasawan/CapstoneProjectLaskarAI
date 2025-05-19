import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_restx import Api, Resource, fields, Namespace
from dotenv import load_dotenv
import vertexai
from vertexai.generative_models import GenerativeModel, SafetySetting

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Initialize Vertex AI
vertexai.init(
    project=os.getenv("VERTEX_PROJECT_ID"),
    location="us-central1"
)

model = GenerativeModel(os.getenv("VERTEX_ENDPOINT_ID"))

# Safety settings
safety_settings = [
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
]

# Root route
@app.route('/')
def index():
    return render_template('index.html')

# Flask-only endpoint
@app.route('/generate', methods=['POST'])
def generate_message():
    try:
        user_input = request.form['user_input']
        chat_session = model.start_chat()
        response = chat_session.send_message(user_input, safety_settings=safety_settings)
        return jsonify({'response': response.text})
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# Swagger UI config
app.config['SWAGGER_UI_DOC_EXPANSION'] = 'full'

# Create main API object
api = Api(
    app,
    version='1.0',
    title='⚡ EnergyMate Chatbot API',
    description = (
    "Selamat datang di dokumentasi EnergyMate Chatbot API.\n"
    "API ini memungkinkan pengguna untuk berinteraksi dengan asisten energi berbasis AI.\n\n"
    "Fitur utama:\n"
    "- Konsultasi seputar penggunaan energi\n"
    "- Rekomendasi penghematan listrik\n\n"
    "Gunakan endpoint /api/generate untuk memulai percakapan."
    ),
    doc='/api/docs'
)

# Create custom namespace
chat_ns = Namespace(
    'Chatbot',
    description='Interaksi dengan chatbot EnergyMate berbasis Vertex AI'
)

# Define input model
chat_input_model = chat_ns.model('ChatInput', {
    'user_input': fields.String(
        required=True,
        description='Pesan dari pengguna',
        example='Bagaimana cara menghemat listrik di rumah?'
    )
})

# Define route within namespace
@chat_ns.route('/generate')
class ChatEndpoint(Resource):
    @chat_ns.expect(chat_input_model)
    @chat_ns.response(200, 'Berhasil mendapatkan respon.')
    @chat_ns.response(500, 'Terjadi kesalahan pada server.')
    def post(self):
        """Mengirim pertanyaan ke chatbot dan menerima respon dari Vertex AI."""
        try:
            data = request.get_json()
            user_input = data.get('user_input')

            chat_session = model.start_chat()
            response = chat_session.send_message(user_input, safety_settings=safety_settings)

            return {'response': response.text}, 200
        except Exception as e:
            print(f"Error occurred: {e}")
            return {'error': 'Internal server error'}, 500

# Register namespace with base path /api
api.add_namespace(chat_ns, path='/api')

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
