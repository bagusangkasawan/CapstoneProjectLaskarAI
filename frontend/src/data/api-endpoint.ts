const API_ENDPOINT = {
    GENERATE: `${import.meta.env.VITE_CHATBOT_URL}/generate`,
    PREDICT: `${import.meta.env.VITE_MODEL_URL}/predict`
};

export default API_ENDPOINT;