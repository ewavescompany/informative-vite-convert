// requests/portfolios.ts

import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { apiRequest, ApiResponse } from "../api";
import { Portfolio } from "@/interfaces/dashboardInterface";

export const getPortfolios = async () => {
  const url = `${clientBaseServerUrl}${serverUrls.portfolio}`;

  try {
    const response: ApiResponse<{ data: Portfolio[] }> = await apiRequest(
      url,
      "GET"
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Failed to fetch portfolios:", error);
  }
};
