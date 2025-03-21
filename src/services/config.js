import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "https://hinspire-back.onrender.com",
  headers: {
    "Content-Type" : 'application/json',
  }
});