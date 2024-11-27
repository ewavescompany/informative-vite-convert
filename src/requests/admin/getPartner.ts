import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { apiRequest } from "../api";

interface Partner {
  id: number;
  image: string;
  title_en: string;
  title_ar: string;
}

export const getPartner = async (id: string): Promise<any> => {
  const url = `${clientBaseServerUrl}${serverUrls.single_partner}/${id}`;
  const method = "GET";
  try {
    const response = await apiRequest<{ data: Partner[] }>(url, method, null);

    return response;
  } catch (error) {
    throw new Error("Failed to fetch contact info");
  }
};
