import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import Footer from "@/customComponents/layoutComponents/footer";
import Navbar from "@/customComponents/layoutComponents/navbar";
import i18n from "@/i18n";
import { homeInterface } from "@/interfaces/clientInterface";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "./loading";

export default function ClientLayout() {
  const locale = i18n.language;
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
    <html lang="en">
      <body
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="antialiased font-[family-name:var(--font-geist-sans)] flex flex-col bg-graywhite bg"
        // className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)] flex flex-col bg-graywhite bg`}
      >
        <Navbar logo={data.logo} />
        <Outlet context={data} />
        <Footer />
      </body>
    </html>
  );
}
