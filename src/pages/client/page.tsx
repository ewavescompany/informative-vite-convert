import { useEffect, useState } from "react";
import Vission from "@/customComponents/homeComponents/vission";
import Stats from "@/customComponents/homeComponents/stats";
import TeamSection from "@/customComponents/homeComponents/teamSection";
import Testomonials from "@/customComponents/homeComponents/testomonials";
import Mission from "@/customComponents/homeComponents/mission";
import VideoSection from "@/customComponents/homeComponents/videoSection";
import BentoGrids from "@/customComponents/homeComponents/bentoGrids";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import axios from "axios";
import { homeInterface } from "@/interfaces/clientInterface";
import BlogSection from "@/customComponents/homeComponents/blogSection";
import Contactus from "@/customComponents/homeComponents/contactus";

export default function ClientPage() {
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
  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col gap-10">
      {/* <Navbar logo={data.logo} /> */}
      <div className="min-h-screen flex flex-col gap-10">
        <VideoSection settings={data.setting} />
        <div className="flex flex-col gap-10 px-8 pb-20 sm:px-20 py-4 sm:py-10">
          <BentoGrids />
          <Mission mission={data.mission?.[0]} />
          <Vission vission={data.vission?.[0]} />
          <Stats stats={data.stats?.[0]} />
          <TeamSection team={data.team} />
          <Testomonials testimonials={data.testimonials} />
          <BlogSection blogs={data.blogs} />
          <Contactus />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
