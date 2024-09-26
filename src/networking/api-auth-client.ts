import axios from "axios";
import store, { RootState } from "../store";

const { REACT_APP_AUTH_URL } = process.env;

const apiAuthClient = axios.create({
  baseURL: REACT_APP_AUTH_URL,
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
