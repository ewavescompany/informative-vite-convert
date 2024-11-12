import { useEffect, useState } from "react";
import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import LatestProjects from "@/customComponents/aboutUsComponent/latestProjects";
import Vission from "@/customComponents/homeComponents/vission";
import Stats from "@/customComponents/homeComponents/stats";
import TeamSection from "@/customComponents/homeComponents/teamSection";
import Testomonials from "@/customComponents/homeComponents/testomonials";
import Mission from "@/customComponents/homeComponents/mission";

import { fetchVisionData } from "@/requests/generic/fetchVisionData";
import { fetchMissionData } from "@/requests/generic/fetchMissionData";
import fetchStats from "@/requests/generic/fetchStats";
import { fetchTestimonials } from "@/requests/generic/fetchTestimonials";
import { fetchAboutData } from "@/requests/generic/fetchAboutus";
import { getAllTeamMembers } from "@/requests/generic/team";
import { getPortfolios } from "@/requests/generic/getPortfolio";

export default function ClientPage() {
  const [vissionData, setVissionData] = useState(null);
  const [missionData, setMissionData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState(null);
  const [aboutus, setAboutus] = useState(null);
  const [projectsData, setProjectsData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const vision = await fetchVisionData();
      const mission = await fetchMissionData();
      const stats = await fetchStats();
      const team = await getAllTeamMembers();
      const testimonials = await fetchTestimonials();
      const about = await fetchAboutData();
      const projects = await getPortfolios();

      setVissionData(vision);
      setMissionData(mission);
      setStatsData(stats);
      setTeamData(team);
      setTestimonialsData(testimonials);
      setAboutus(about);
      setProjectsData(projects);
    }

    fetchData();
  }, []);

  if (
    !projectsData ||
    !aboutus ||
    !missionData ||
    !vissionData ||
    !statsData ||
    !teamData ||
    !testimonialsData
  ) {
    return <div>Loading...</div>; // Render a loading state while data is being fetched
  }

  return (
    <div className="min-h-screen flex flex-col gap-10">
      <AboutusVideoSection
        title1={"about_us"}
        title2={"get_to_know_us"}
        descriptionEn={aboutus.content_en}
        descriptionAr={aboutus.content_ar}
      />
      <div className="flex flex-col gap-10 px-8 pb-20 sm:px-20 py-4 sm:py-10">
        <Mission mission={missionData[0]} />
        <Vission vission={vissionData[0]} />
        <Stats stats={statsData} />
        <LatestProjects projectsData={projectsData.data} />
        <TeamSection team={teamData} />
        <Testomonials testimonials={testimonialsData} />
      </div>
    </div>
  );
}
