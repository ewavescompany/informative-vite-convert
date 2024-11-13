import { useState, useEffect } from "react";
import { fetchVisionData } from "@/requests/generic/fetchVisionData"; // Import the API request function
import { vision } from "@/interfaces/dashboardInterface";

// Custom hook to fetch and manage vision data
export const useFetchVision = () => {
  const [visionData, setVisionData] = useState<vision | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const data: vision[] | undefined = await fetchVisionData(); // Call the request function

        setVisionData(data ? data[0] : undefined); // Set the fetched data in state
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        ); // Set the error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };

    fetchData(); // Call the fetch function when the component using this hook mounts
  }, []); // Empty dependency array to only call this once on mount

  return { visionData, loading, error }; // Return the data, loading, and error states
};
