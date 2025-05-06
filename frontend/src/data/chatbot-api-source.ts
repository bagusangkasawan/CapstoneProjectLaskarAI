import API_ENDPOINT from "./api-endpoint";
import type { GenerateRequestPayload, GenerateResponseData } from "./models";

export async function generateResponse(payload: GenerateRequestPayload): Promise<GenerateResponseData> {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
    };
    const response = await fetch(`${API_ENDPOINT.GENERATE}`, options);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJson = await response.json();
    return responseJson;
}