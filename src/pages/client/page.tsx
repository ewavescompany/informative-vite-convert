import Vission from "@/customComponents/homeComponents/vission";
import Stats from "@/customComponents/homeComponents/stats";
import TeamSection from "@/customComponents/homeComponents/teamSection";
import Testomonials from "@/customComponents/homeComponents/testomonials";
import Mission from "@/customComponents/homeComponents/mission";
import VideoSection from "@/customComponents/homeComponents/videoSection";
import BentoGrids from "@/customComponents/homeComponents/bentoGrids";
import { homeInterface } from "@/interfaces/clientInterface";
import BlogSection from "@/customComponents/homeComponents/blogSection";
import Contactus from "@/customComponents/homeComponents/contactus";
import { useOutletContext } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import icon from "../../../public/test.svg";

export default function ClientPage() {
  const data: homeInterface = useOutletContext();

  return (
    <>
      {/* <Helmet>
        <title>{data.setting.title_en}</title>
        <meta name="description" content="ewavespro website" />
        <link rel="icon" href={icon} type="image/x-icon" />
      </Helmet> */}

      <div className="min-h-screen flex flex-col gap-10">
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
      </div>
    </>
  );
}
