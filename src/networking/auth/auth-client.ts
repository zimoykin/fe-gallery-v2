import { Axios, AxiosError, AxiosRequestConfig } from "axios";
import authClient from "./settings";

export class AuthClient {
  static #instance: AuthClient;
  #axiosinstance: Axios;

  constructor() {
    this.#axiosinstance = authClient;
  }

  static init = () => {
    if (!AuthClient.#instance) {
      this.#instance = new AuthClient();
    }
    return AuthClient.#instance;
  };

  static async get<T>(path: string, config?: AxiosRequestConfig) {
    const response = await AuthClient.init()
      .#axiosinstance.get<T>(path, config)
      .catch((error) => {
        console.error(error);
        throw error.message ?? "an error";
      });
    if (response?.status !== 200) {
      console.error(response?.statusText);
      throw new Error(response?.statusText);
    } else if (response.data) {
      return response.data;
    } else {
      throw new Error("No data returned");
    }
  }

  static async post<T, K = unknown>(
    path: string,
    data?: K,
    config?: AxiosRequestConfig,
  ) {
    return AuthClient.init()
      .#axiosinstance.post<T>(path, data, config)
      .then((response) => {
        if (response?.status !== 200) {
          console.error(response?.statusText ?? "post error");
          throw new Error(response.statusText ?? "post error");
        } else {
          return response.data;
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message ?? "network error");
        } else {
          console.error(error);
          throw error ?? new Error("an error");
        }
      });
  }

  static async put<T, K = unknown>(
    path: string,
    data: K,
    config?: AxiosRequestConfig,
  ) {
    return AuthClient.init()
      .#axiosinstance.put<T>(path, data, config)
      .catch((error) => {
        console.error(error);
        throw error.message ?? "an error";
      })
      .then((response) => {
        if (response?.status !== 200) {
          console.error(response?.statusText ?? "put error");
          throw new Error(response?.statusText ?? "put error");
        } else {
          return response.data;
        }
      });
  }
  static async patch<T>(
    path: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ) {
    const response = await AuthClient.init()
      .#axiosinstance.patch<T>(path, data, config)
      .catch((error) => {
        console.error(error);
        throw error.message ?? "an error";
      });
    if (response?.status !== 200) {
      console.error(response?.statusText ?? "patch error");
      throw new Error(response.statusText ?? "patch error");
    } else {
      return response.data;
    }
  }
  static async delete<T>(patch: string, config?: AxiosRequestConfig) {
    const response = await AuthClient.init()
      .#axiosinstance.delete<T>(patch, config)
      .catch((error) => {
        console.error(error);
        throw error.message ?? "an error";
      });
    if (response?.status !== 200) {
      console.error(response?.statusText ?? "delete error");
      throw new Error(response.statusText ?? "delete error");
    } else {
      return response.data;
    }
  }

  static async postUpload<T>(
    path: string,
    data: FormData,
    config?: AxiosRequestConfig,
  ) {
    const response = await AuthClient.init()
      .#axiosinstance.post<T>(path, data, {
        ...config,
        headers: {
          ...config?.headers,
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => {
        console.error(error);
        throw error.message ?? "an error";
      });
    if (response?.status !== 200) {
      console.error(response?.statusText ?? "post upload error");
      throw new Error();
    } else {
      return response?.data;
    }
  }
}
