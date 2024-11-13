import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { apiRequest, ApiResponse } from "../api";
import { serviceState } from "@/interfaces/dashboardInterface";

export const getServices = async () => {
  const url = `${clientBaseServerUrl}${serverUrls.services}`;
  console.log(url); // Your blog creation API endpoint
  const method = "GET";
  try {
    const response: ApiResponse<serviceState> = await apiRequest(
      url, // The API endpoint to get blogs
      method // HTTP method
    );

    return response.data; // Return the API response
  } catch (error) {
    throw new Error("Failed to fetch blogs");
  }
};
