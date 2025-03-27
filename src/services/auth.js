import { api } from "./config";

export const signup = async (user) => {
  try {
    const response = await api.post("/auth/signup", user);
    return response.data;
  } catch (error) {
    console.error("Houston, we have a problem.", error);
    throw error.response ? error.response : new Error ("server error");
  }
}

export const login = async (user) => {
  try {
    const response = await api.post("/auth/login", user);
    return response.data;
  } catch (error) {
    console.error("Houston, we have a problem.", error);
    throw error.response ? error.response : new Error ("server error");
  }
}

export const verify = async (token) => {
  try {
    const response = await api.get("/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data;
  } catch (error) {
    console.error("Houston, we have a problem.", error);
    throw error.response ? error.response : new Error ("server error");
  }
}