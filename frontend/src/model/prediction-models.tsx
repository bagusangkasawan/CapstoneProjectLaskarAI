export interface PredictRequestPayload {
    Sub_metering_1: number;
    Sub_metering_2: number;
    Sub_metering_3: number;
    hour: number;
}

export interface PredictResponseData {
  total_usage_kw: number;
  prediction_kw: number;
  category: string;
  breakdown: {
    [key: string]: number;
  };
  general_recommendation: string;
  focus_area: string;
  specific_recommendation: string;
  error?: string;
}
