import { apiRequest, ApiResponse } from "@/requests/api"; // Ensure correct path to apiRequest
import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls"; // Ensure correct URLs

type Response = {
  message: string;
  errors?: {
    id?: string[];
    image?: string[];
    title?: string[];
  };
  partner?: {
    id: number;
    title_en: string;
    title_ar: string;
    image: string;
  };
};

const token = localStorage.getItem("authToken");

export async function updatePartner(data: FormData) {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.editPartner}`;
  const method = "POST";

  try {
    const response: ApiResponse<Response> = await apiRequest(
      url,
      method,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update stats");
  }
}
