"use client";
import { IUser } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthProvider {
  user: IUser | null;
  status: "loading" | "authenticated" | "unauthenticated";
  loginFn: (credential: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<void>;
  logoutFn: () => void;
}

const AuthContext = createContext<IAuthProvider>({
  user: null,
  status: "unauthenticated",
  async loginFn() {},
  logoutFn() {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] =
    useState<IAuthProvider["status"]>("unauthenticated");
  const [user, setUser] = useState<IUser | null>(null);

  const loginFn = async (credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    try {
      setStatus("loading");
      const {
        data: { data: userData, token },
      } = await axiosInstance.post<{ data: IUser; token: string }>(
        "/auth/login",
        credentials,
      );
      if (userData.role !== "admin") {
        throw new Error("You don't have permission");
      }
      saveUser({
        userInfo: userData,
        token,
        rememberMe: credentials.rememberMe,
      });
    } catch (err) {
      const error = err as AxiosError;
      throw error?.response?.data || err;
    }
  };

  const saveUser = ({
    userInfo,
    token,
    rememberMe,
  }: {
    userInfo: IUser;
    token: string;
    rememberMe: boolean;
  }) => {
    setUser(userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setCookie("token", token, {
      maxAge: rememberMe ? 7 * 24 * 60 * 60 : undefined,
    });
    setStatus("authenticated");
  };

  const logoutFn = () => {
    localStorage.removeItem("userInfo");
    deleteCookie("token");
    setUser(null);
    setStatus("unauthenticated");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    const token = getCookie("token");
    if (!!storedUser && !!token) {
      setUser(JSON.parse(storedUser));
      setStatus("authenticated");
    } else {
      localStorage.removeItem("userInfo");
      deleteCookie("token");
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginFn, status, logoutFn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
