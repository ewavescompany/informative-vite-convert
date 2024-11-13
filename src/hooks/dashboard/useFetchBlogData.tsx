import { useEffect, useState } from "react";
import { apiRequest, ApiResponse } from "@/requests/api"; // Assuming you have an apiRequest component
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { BlogInterface } from "@/interfaces/dashboardInterface";

const useFetchBlogData = (blogId: number, language: string) => {
  const [blogData, setBlogData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response: ApiResponse<{ data: BlogInterface }> = await apiRequest(
          `${clientBaseServerUrl}${serverUrls.blog}/${blogId}`,
          "GET"
        );

        setBlogData(response?.data?.data);
      } catch (err) {
        setError("Error fetching blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, language]);

  return { blogData, loading, error };
};

export default useFetchBlogData;
