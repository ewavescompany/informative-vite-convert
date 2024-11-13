import { apiRequest, ApiResponse } from "@/requests/api";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { Portfolio } from "@/interfaces/dashboardInterface";

export const fetchRelatedPortfolios = async (id: string) => {
  const url = `${clientBaseServerUrl}${serverUrls.relatedPortfolios}/${id}`;

  try {
    const response: ApiResponse<Portfolio[]> = await apiRequest(url, "GET");

    return response?.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
