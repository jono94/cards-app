import axios, { type AxiosInstance } from "axios";
import { settings } from "@/src/lib/settings";
import { getIdToken } from "@/src/lib/authentication/AuthenticationProvider";

let _axios_instance: AxiosInstance | null = null;

export const createApiClient = (): AxiosInstance => {
  if (_axios_instance) return _axios_instance;

  const api = axios.create({
    baseURL: settings.apiUrl,
  });

  api.interceptors.request.use(async (config) => {
    const token = await getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  });

  _axios_instance = api;
  return api;
};

export const api = createApiClient();
