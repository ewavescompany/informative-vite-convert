import { apiRequest } from "@/requests/api";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { Testimonial } from "@/interfaces/dashboardInterface";

// Function to fetch a testimonial by ID
export const fetchTestimonialById = async (id: string | number) => {
  // Specify that the return type is ApiResponse<Testimonial>
  const url = `${clientBaseServerUrl}${serverUrls.getTestimonialById}/${id}`;
  const method = "GET";
  try {
    const response = await apiRequest<{ data: Testimonial }>(url, method);
    console.log(response);
    return response.data; // Return the full ApiResponse<Testimonial> object
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch the testimonial");
  }
};
