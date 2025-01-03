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

export default function ClientLayout() {
  const [data, setData] = useState<homeInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const lang = i18n.language;

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
    <div className="font-almarai relative">
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
      <Outlet context={data} />
      <a href="https://wa.me/+966538130050" className="fixed bottom-0 right-0 p-4 duration-300 md:hover:scale-105" style={{ zIndex: 1000 }}>
        <img className="w-10 md:w-16" src="/whatsapp_icon.png" alt="logo" />
      </a>
      <Footer dataSetting={data.setting} />
    </div>
  );
}
