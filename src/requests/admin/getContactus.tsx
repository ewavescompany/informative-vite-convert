import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls";
import { apiRequest } from "../api";
import { ContactInfo } from "@/interfaces/dashboardInterface";

export const getContactus = async (token: string): Promise<any> => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.contactus}`;
  const method = "GET";
  try {
    const response = await apiRequest<{ data: ContactInfo[] }>(
      url,
      method,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Return the API response
  } catch (error) {
    throw new Error("Failed to fetch contact info");
  }
};
