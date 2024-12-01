import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import Footer from "@/customComponents/layoutComponents/footer";
import Navbar from "@/customComponents/layoutComponents/navbar";
import { homeInterface } from "@/interfaces/clientInterface";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "./loading";
import { Helmet } from "react-helmet-async";
// import icon from "../../../public/test.svg";
import i18n from "@/i18n";
import { useQuery } from "@tanstack/react-query";

export default function ClientLayout() {
  // const [data, setData] = useState<homeInterface | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const lang = i18n.language;
  const { isError, isLoading, data } = useQuery({
    queryKey: ["getHome"],
    queryFn: async () => {
      const response = await axios.get(
        `${clientBaseServerUrl}${serverUrls.home}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  // useEffect(() => {
  //   async function fetchHomeData() {
  //     try {
  //       const response = await axios.get(
  //         `${clientBaseServerUrl}${serverUrls.home}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch:", error);
  //       setError("Failed to load data. Please try again later.");
  //     }
  //   }
  //   fetchHomeData();
  // }, []);

  if (isError) return <div>Error</div>;

  if (isLoading) return <Loading />;

  return (
    <div className="font-almarai min-h-full">
      <Helmet>
        <title>
          {lang === "en" ? data.setting.title_en : data.setting.title_ar}
        </title>
        <meta name="description" content="ewavespro website" />
        <meta
          name="keywords"
          content={
            lang === "en" ? data.setting.keywords_en : data.setting.keywords_ar
          }
        />
        <link rel="icon" href={data.setting.fav_logo} type="image/x-icon" />
      </Helmet>

      <Navbar logo={data.logo} dataSetting={data.setting} />
      <div className="min-h-[101vh]">
        <Outlet context={data} />
      </div>
      <Footer dataSetting={data.setting} />
    </div>
  );
}
