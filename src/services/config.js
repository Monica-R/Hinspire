import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:4013",
  headers: {
    "Content-Type" : 'application/json',
  }
});