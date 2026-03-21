import axios, { type InternalAxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";
import { getCookieServer } from "./cookieServer";
import { useRouter } from "@/i18n/navigation";

const baseAPI = process.env.NEXT_PUBLIC_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: baseAPI,
});

// ─── Helpers ────────────────────────────────────────────────────────────────

async function resolveToken(): Promise<string> {
  if (typeof window === "undefined") {
    return (await getCookieServer("token_dashboard")) as string;
  }
  return getCookie("token_dashboard") as string;
}

function extractTableFilters(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const filters: Record<string, string> = {};
  const searchParams = new URLSearchParams(window.location.search);

  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("table_filter_")) {
      filters[key.replace("table_filter_", "")] = value;
    }
  }

  return filters;
}
function extractTablePagination(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const pagination: Record<string, string> = {};
  const searchParams = new URLSearchParams(window.location.search);

  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("table_pagination_")) {
      pagination[key.replace("table_pagination_", "")] = value;
    }
  }

  return pagination;
}

function applyIsActiveFilter(
  config: InternalAxiosRequestConfig,
  filters: Record<string, string>,
): void {
  if (config.url?.includes("isActive") && "isActive" in filters) {
    config.url = config.url.replace("isActive=all", "");
  }
}

// ─── Request Interceptor ─────────────────────────────────────────────────────

axiosInstance.interceptors.request.use(async (config) => {
  const [token, tableFilters, tablePagination] = await Promise.all([
    resolveToken(),
    Promise.resolve(extractTableFilters()),
    Promise.resolve(extractTablePagination()),
  ]);

  config.headers.Authorization = `Bearer ${token}`;

  applyIsActiveFilter(config, tableFilters);

  config.params = {
    ...config.params,
    ...tableFilters,
    ...tablePagination,
  };

  return config;
});

// ─── Response Interceptor ────────────────────────────────────────────────────

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiry — redirect to login
      const router = useRouter();
      router.push("/login");
      console.warn("[axiosInstance] Unauthorized. Redirecting to login...");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
