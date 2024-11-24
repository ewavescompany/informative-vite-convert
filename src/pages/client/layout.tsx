import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import Footer from "@/customComponents/layoutComponents/footer";
import Navbar from "@/customComponents/layoutComponents/navbar";
import { homeInterface } from "@/interfaces/clientInterface";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "./loading";

export default function ClientLayout() {
  const [data, setData] = useState<homeInterface | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const response = await axios.get(
          `${clientBaseServerUrl}${serverUrls.home}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch:", error);
        setError("Failed to load data. Please try again later.");
      }
    }
    fetchHomeData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!data) return <Loading />;

  return (
    <div className="font-almarai">
      <Navbar logo={data.logo} dataSetting={data.setting} />
      <Outlet context={data} />
      <Footer dataSetting={data.setting} />
    </div>
  );
}
