import { api } from "./config";

export const signup = async (user) => {
  try {
    const response = await api.post("/auth/signup", user);
    return response.data;
  } catch (error) {
    console.error("Houston, we have a problem.", error);
    throw new Error(error);
  }
}

export const login = async (user) => {
  try {
    const response = await api.post("/auth/login", user);
    return response.data;
  } catch (error) {
    console.error("Houston, we have a problem.", error);
    throw new Error(error);
  }
}