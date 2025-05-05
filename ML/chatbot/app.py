import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_restx import Api, Resource, fields
from dotenv import load_dotenv
import vertexai
from vertexai.generative_models import GenerativeModel, SafetySetting

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Initialize Vertex AI
vertexai.init(
    project=os.getenv("VERTEX_PROJECT_ID"),
    location="us-central1"
)

model = GenerativeModel(
    os.getenv("VERTEX_ENDPOINT_ID")
)

# Configure safety settings
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

# Route for index page (flask)
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle chat message generation (this is the original endpoint)
@app.route('/generate', methods=['POST'])
def generate_message():
    try:
        user_input = request.form['user_input']
        
        # Start a new chat session
        chat_session = model.start_chat()

        # Send user input to the model with generation settings
        response = chat_session.send_message(
            user_input,
            safety_settings=safety_settings
        )

        return jsonify({'response': response.text})

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# Swagger Setup (Flask-RESTX)
api = Api(
    app,
    version='1.0',
    title='Chatbot API',
    description='Dokumentasi API chatbot berbasis Vertex AI',
    doc='/api/docs'  # Swagger UI path
)

# Swagger input model
chat_input_model = api.model('ChatInput', {
    'user_input': fields.String(
        required=True,
        description='Pesan dari pengguna',
        example='Bagaimana cara menghemat listrik di rumah?'
    )
})

# Swagger endpoint directly using /api/generate
@api.route('/api/generate')  # Changed path to /api/generate for Swagger
class ChatEndpoint(Resource):
    @api.expect(chat_input_model)
    @api.response(200, 'Berhasil mendapatkan respon.')
    @api.response(500, 'Terjadi kesalahan pada server.')
    def post(self):
        """Mengirim pertanyaan ke chatbot dan menerima respon dari Vertex AI."""
        try:
            data = request.get_json()
            user_input = data.get('user_input')

            chat_session = model.start_chat()
            response = chat_session.send_message(
                user_input,
                safety_settings=safety_settings
            )

            return {'response': response.text}, 200

        except Exception as e:
            print(f"Error occurred: {e}")
            return {'error': 'Internal server error'}, 500

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
