import { useState, useEffect } from "react";
import { getPortfolios } from "@/requests/generic/getPortfolio"; // Import the API request function // Assuming ApiResponse is your standard response type
import { Portfolio } from "@/interfaces/dashboardInterface";

const useFetchPortfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await getPortfolios();

        console.log("====================== response: ", response);

        if (Array.isArray(response)) {
          setPortfolios(response);
        } else {
          setError("Invalid response format");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  return { portfolios, loading, error, setPortfolios };
};

export default useFetchPortfolios;
