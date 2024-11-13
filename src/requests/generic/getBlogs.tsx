import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { apiRequest } from "../api"; // Import your standardized request interface
import { blogsInterface } from "@/interfaces/clientInterface";

// Function to get blogs from the API
export const getBlogs = async (): Promise<any> => {
  const url = `${clientBaseServerUrl}${serverUrls.blogs}`;
  const method = "GET";
  try {
    const response = await apiRequest<{ data: blogsInterface[] }>(
      url, // The API endpoint to get blogs
      method // HTTP method
    );

    return response.data; // Return just the data from the API response
  } catch (error) {
    throw new Error("Failed to fetch blogs");
  }
};
