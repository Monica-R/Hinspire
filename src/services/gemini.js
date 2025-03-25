import { api } from './config.js';

export const fetchAnalyzeEmotion = async (text) => {
  try {
    const response = await api.post("/gemini/analyze-emotion", text);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}