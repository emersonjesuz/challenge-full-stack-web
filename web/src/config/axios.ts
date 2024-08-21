import axios from "axios";

export const apiBack = axios.create({
  baseURL: "http://localhost:3333",
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});
apiBack.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
