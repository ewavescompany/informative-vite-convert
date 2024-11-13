// requests/api.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Define a type for the response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Function to make API requests
export async function apiRequest<T>(
  url: string,
  method: AxiosRequestConfig["method"],
  data?: any,
  config?: AxiosRequestConfig
) {
  // ): Promise<ApiResponse<T>> {
  // Explicitly return ApiResponse<T>
  try {
    const response: AxiosResponse<T> = await axios({
      url,
      method,
      data,
      ...config,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response?.data?.message || error.message,
    };
  }
}
