import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://devconnect-56tm.onrender.com/api";  // /api add kar

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});