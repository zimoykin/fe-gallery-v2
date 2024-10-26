import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import networkClient from "./settings";

export class ApiClient {
  static #instance: ApiClient;
  #axiosInstance: Axios;

  constructor() {
    this.#axiosInstance = networkClient;
  }

  private static init = () => {
    if (!ApiClient.#instance) {
      this.#instance = new ApiClient();
    }
    return ApiClient.#instance;
  };

  private async handleResponse<T>(response: AxiosResponse<T>): Promise<T> {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error(response.statusText ?? "Request error");
      throw new Error(response.statusText ?? "Request error");
    }
  }

  private async handleRequest<T>(
    method: "get" | "post" | "put" | "patch" | "delete",
    path: string,
    dataOrConfig?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const instance = ApiClient.init().#axiosInstance;
      let response: AxiosResponse<T>;

      if (method === "get" || method === "delete") {
        response = await instance[method]<T>(
          path,
          dataOrConfig as AxiosRequestConfig,
        );
      } else {
        response = await instance[method]<T>(path, dataOrConfig, config);
      }
      return this.handleResponse(response);
    } catch (error) {
      console.error(error);
      throw error instanceof Error ? error : new Error("An error occurred");
    }
  }

  static get<T>(
    path: string,
    query?: Record<string, string>,
    config?: AxiosRequestConfig,
  ) {
    return ApiClient.init().handleRequest<T>("get", path, {
      params: query,
      ...config,
    });
  }

  static post<T>(path: string, data?: unknown, config?: AxiosRequestConfig) {
    return ApiClient.init().handleRequest<T>("post", path, data, config);
  }

  static put<T, K = unknown>(
    path: string,
    data: K,
    config?: AxiosRequestConfig,
  ) {
    return ApiClient.init().handleRequest<T>("put", path, data, config);
  }

  static patch<T>(path: string, data: unknown, config?: AxiosRequestConfig) {
    return ApiClient.init().handleRequest<T>("patch", path, data, config);
  }

  static delete<T>(path: string, config?: AxiosRequestConfig) {
    return ApiClient.init().handleRequest<T>("delete", path, config);
  }

  static async postUpload<T>(
    path: string,
    data: FormData,
    config?: AxiosRequestConfig,
  ) {
    const response = await ApiClient.init()
      .#axiosInstance.post<T>(path, data, {
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
