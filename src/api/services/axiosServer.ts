import axios, { AxiosRequestHeaders } from "axios";
import { API_SERVER } from "@lib/constants/index";

//----Sever API----
export const serverInstance = axios.create({
  baseURL: API_SERVER,
  timeout: 5000,
});

serverInstance.interceptors.request.use(
  function (config: any) {
    config.headers = {
      ...config.headers,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


