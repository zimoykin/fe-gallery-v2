import axios, { AxiosError, AxiosResponse } from "axios";
import store, { RootState } from "../store";
import { login, logout } from "../features/auth/auth-slice";
import apiAuthClient from "./api-auth-client";

const { REACT_APP_API_URL } = process.env;

const networkClient = axios.create({
  baseURL: REACT_APP_API_URL,
});
axios.defaults.withCredentials = true;
// Add a request interceptor to include the token in headers
networkClient.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error),
);

networkClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  // eslint-disable-next-line
  async (error: AxiosError<any, Response>) => {
    // eslint-disable-next-line
    const { config, response } = error as any; //TODO: fix type
    if (
      (response?.status === 401 || response?.status === 403) &&
      !config._retry
    ) {
      config._retry = true;
      const state: RootState = store.getState();
      const refreshToken = state.auth.refreshToken;
      if (!refreshToken) {
        store.dispatch(logout());
        return Promise.reject(error);
      }
      try {
        const refreshResponse = await apiAuthClient.post("auth/refresh", {
          refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;
        store.dispatch(login([accessToken, newRefreshToken]));
        config.headers.Authorization = `Bearer ${accessToken}`;
        return networkClient(config);
      } catch (error) {
        console.error("Failed to refresh token", error);
        store.dispatch(logout());
      }
    } else {
      throw error;
    }
  },
);

export default networkClient;
