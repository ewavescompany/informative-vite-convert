import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls";
import { BlogInterface } from "@/interfaces/dashboardInterface";
import { apiRequest, ApiResponse } from "@/requests/api";

export const editBlog = async (formData: FormData, token: string) => {
  try {
    const url = `${dashboardBaseServerUrl}${adminServerUrls.editBlog}`; // Your blog creation API endpoint
    const method = "POST";
    const response: ApiResponse<{ blog: BlogInterface }> = await apiRequest(
      url,
      method,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Since we're sending a file
        },
      }
    );

    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to edit blog");
  }
};
