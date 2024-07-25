// src/utils/request.ts

import { message as AntdMessage } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Router from "next/router";
import { getToken } from "@/utils/token";

interface AxiosInstanceType extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

export const CreateAxiosInstance = (
  config?: AxiosRequestConfig
): AxiosInstanceType => {
  const instance = axios.create({
    baseURL: "http://localhost:9090/",
    timeout: 30000,
    ...config,
  }) as AxiosInstanceType;

  instance.interceptors.request.use(
    function (config: any) {
      config.headers["Content-Type"] = "application/json;charset=utf-8";
      const token = getToken();
      if (token) {
        config.headers["token"] = token;
      }
      return config;
    },
    function (error) {
      // handle error request
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      const { status, data, message } = response as any;
      if (status === 200) {
        return data; // if success return data
      } else if (status === 401) {
        // No permission or not logged in
        return Router.push("/login");
      } else {
        // other error
        AntdMessage.error(message || "Server exception");
      }
    },
    function (error) {
      if (error.response && error.response.status === 401) {
        return Router.push("/login");
      }
      AntdMessage.error(error?.response?.data?.message || "Server exception");
      return Promise.reject(error);
    }
  );

  return instance;
};

const request = CreateAxiosInstance({});
export default request;
