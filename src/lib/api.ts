import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export interface PredictionResponse {
  prediction: "Real" | "Fake";
  confidence: number;
}

export const predictAudio = async (file: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<PredictionResponse>(
    `${API_BASE_URL}/predict`,
    formData
  );

  return response.data;
};