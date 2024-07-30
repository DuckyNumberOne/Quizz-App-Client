import axios, { AxiosRequestHeaders } from "axios";
import { API_ClIENT } from "@lib/constants/index";
import Cookies from "js-cookie";

//----Client API----
export const clientInstance = axios.create({
  baseURL: API_ClIENT,
  timeout: 5000,
});

clientInstance.interceptors.request.use(
  function (config: any) {
    const token = Cookies.get("token");
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
