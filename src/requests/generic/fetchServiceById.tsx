// requests/services.ts
import { apiRequest, ApiResponse } from "@/requests/api";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { Service } from "@/interfaces/dashboardInterface";

// Function to fetch service by ID
export const fetchServiceById = async (id: string) => {
  const url = `${clientBaseServerUrl}${serverUrls.serviceById}/${id}`;

  try {
    const response: ApiResponse<{ data: Service | undefined }> =
      await apiRequest(url, "GET");

    return response?.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch service");
  }
};
