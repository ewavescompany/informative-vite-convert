import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls";
import { apiRequest } from "../api"; // Assuming your apiRequest is here

const token = localStorage.getItem("authToken");

export const sendPartners = async (data: any) => {
  try {
    const url = `${dashboardBaseServerUrl}${adminServerUrls.addPartner}`; // Your blog creation API endpoint
    const method = "POST";

    // Make the API request using the apiRequest component
    const response = await apiRequest(url, method, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Since we're sending a file
      },
    });
    console.log(response);
    return response; // Return the response from the API
  } catch (error) {
    console.error("Error sending blog:", error);
    throw error; // Re-throw the error to handle it elsewhere
  }
};
