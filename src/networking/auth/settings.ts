import axios from "axios";
import store, { RootState } from "../../store";

const apiUrl = import.meta.env.VITE_APP_AUTH_URL;

const apiAuthClient = axios.create({
  baseURL: apiUrl,
});

// Add a request interceptor to include the token in headers
apiAuthClient.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default apiAuthClient;
