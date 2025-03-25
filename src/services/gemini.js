import { api } from './config.js';

export const fetchAnalyzeEmotion = async (text, token) => {
  try {
    const response = await api.post("/gemini/analyze-emotion", { text }, {
      headers: {
          Authorization: `Bearer ${token}`,
      }});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}