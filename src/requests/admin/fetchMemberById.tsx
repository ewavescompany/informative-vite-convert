import { apiRequest, ApiResponse } from "@/requests/api"; // Import the apiRequest function
import { clientBaseServerUrl, serverUrls } from "@/constants/urls"; // Import necessary constants for the base server URL and endpoints

// Define the function to fetch member by ID
async function fetchMemberById(id: string | number) {
  const url = `${clientBaseServerUrl}${serverUrls.getTeamById}/${id}`; // Construct the URL for fetching the member
  const method = "GET";
  try {
    const response: ApiResponse = await apiRequest(url, method);
    return response?.data?.data;
  } catch (error) {
    // Handle errors if the request fails
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch team member");
  }
}

export default fetchMemberById;
