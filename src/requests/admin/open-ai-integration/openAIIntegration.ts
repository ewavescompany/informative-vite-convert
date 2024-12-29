import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls";
import { apiRequest, ApiResponse } from "@/requests/api";

const token = localStorage.getItem("authToken");
export default async function openAIIntegration(
  prompt: string,
  content: string,
  setWavelyAIRequestStatus: React.Dispatch<
    React.SetStateAction<"not-active" | "loading" | "done" | "error">
  >,
  formikSetValue: (content: string) => void
) {
  setWavelyAIRequestStatus("loading");
  const url = `${dashboardBaseServerUrl}${adminServerUrls.openAIIntegration.generale}`;
  const method = "POST";

  try {
    const response: ApiResponse = await apiRequest(
      url,
      method,
      {Content:`${prompt} ${content}`},
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    formikSetValue(response?.data.content || "");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update stats");
  } finally {
    setWavelyAIRequestStatus("done");
  }

}
