import axios, { AxiosRequestHeaders } from "axios";
import { API } from "@lib/constants/index";
import useAuth from "@lib/hook/useAuth";
// interface CustomAxiosRequestHeaders extends AxiosRequestHeaders {
//   authorization: string;
// }

const instance = axios.create({
  baseURL: API,
  timeout: 5000,
});

export default instance;

instance.interceptors.request.use(
  function (config: any) {
    const token = window.localStorage.getItem("token");
    config.headers = {
      token: `Bearer ${token}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
