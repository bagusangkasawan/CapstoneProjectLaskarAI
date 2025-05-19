import type { PredictRequestPayload, PredictResponseData } from "@/model/prediction-models";
import API_ENDPOINT from "./api-endpoint";

export async function predictEnergyUsage(payload: PredictRequestPayload): Promise<PredictResponseData> {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
    };
    
    const response = await fetch(API_ENDPOINT.PREDICT, options);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJson = await response.json();
    return responseJson;
}