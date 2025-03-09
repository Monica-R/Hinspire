import { api } from "./config";

export const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const userRes = await api.get(`user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return userRes.data;
  }
  catch (error) {
    console.error('error', error);
  }
}