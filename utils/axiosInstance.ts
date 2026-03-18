import axios from "axios";
import { getCookie } from "cookies-next";
import { getCookieServer } from "./cookieServer";

const baseAPI = process.env.NEXT_PUBLIC_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: baseAPI,
});

axiosInstance.interceptors.request.use(async (config) => {
  let token: string;
  if (typeof window === "undefined") {
    token = (await getCookieServer("token_dashboard")) as string;
  } else {
    token = getCookie("token_dashboard") as string;
  }
  if (!!config && !!config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
