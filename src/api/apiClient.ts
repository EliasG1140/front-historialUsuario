import { useLoadingStore, useUserStore } from "@stores";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

export interface AxiosRequestConfigExtended extends AxiosRequestConfig {
  needAuth?: boolean;
}

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:5062/api",
      // baseURL: "http://{IP:PORT}/api",
      timeout: 10000,
    });

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        const extendedConfig = config as AxiosRequestConfigExtended;
        const { setIsLoading } = useLoadingStore.getState();
        setIsLoading(true);

        if (extendedConfig.needAuth !== false) {
          const token = useUserStore.getState().user?.token || "";

          if (token) {
            if (!config.headers) {
              config.headers = {} as AxiosRequestHeaders;
            }

            config.headers.Authorization = `Bearer ${token}`;
          } else {
            useLoadingStore.getState().setIsLoading(false);
            return Promise.reject(new axios.Cancel("No token disponible"));
          }
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => {
        useLoadingStore.getState().setIsLoading(false);
        return response;
      },
      (error) => {
        useLoadingStore.getState().setIsLoading(false);
        return Promise.reject(error);
      }
    );
  }

  public get<T>(
    url: string,
    config?: AxiosRequestConfigExtended
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfigExtended
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfigExtended
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfigExtended
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }

  public download(
    url: string,
    config?: AxiosRequestConfigExtended
  ): Promise<AxiosResponse<Blob>> {
    return this.instance.get<Blob>(url, { ...config, responseType: "blob" });
  }
}

export default new ApiClient();
