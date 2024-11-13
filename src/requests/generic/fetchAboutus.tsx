import { apiRequest, ApiResponse } from "@/requests/api"; // Import the apiRequest function
import { clientBaseServerUrl, serverUrls } from "@/constants/urls"; // Adjust URLs
import { ContentObject } from "@/interfaces/dashboardInterface";

// Function to fetch the vision data
export const fetchAboutData = async () => {
  const url = `${clientBaseServerUrl}${serverUrls.aboutUs}`; // URL to fetch vision data (adjust `serverUrls.vision` as necessary)
  const method = "GET"; // Assuming it’s a GET request

  try {
    // Use apiRequest to make the API call
    const response: ApiResponse<{ data: ContentObject[] }> = await apiRequest(
      url,
      method
    );
    return response?.data?.data[0]; // Return the vision data
  } catch (error) {
    // Handle any errors
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch vision data");
  }
};
