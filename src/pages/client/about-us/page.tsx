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
import {
  ContentObject,
  Portfolio,
  statsData,
  TeamMember,
  Testimonial,
  vision,
} from "@/interfaces/dashboardInterface";
import { useTranslation } from "react-i18next";

export default function AboutUsClientPage() {
  const [vissionData, setVissionData] = useState<vision[] | undefined>([]);
  const [missionData, setMissionData] = useState<vision[] | undefined>([]);
  const [statsData, setStatsData] = useState<statsData | undefined>();
  const [teamData, setTeamData] = useState<TeamMember[] | undefined>([]);
  const [testimonialsData, setTestimonialsData] = useState<
    Testimonial[] | undefined
  >([]);
  const [aboutus, setAboutus] = useState<ContentObject | undefined>();
  const [projectsData, setProjectsData] = useState<Portfolio[] | undefined>();
  const [loading, setLoading] = useState(true);
  const { i18n, t } = useTranslation();
  const locale = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          fetchedVissionData,
          fetchedMissionData,
          fetchedStatsData,
          fetchedTeamData,
          fetchedTestimonialsData,
          fetchedAboutus,
          fetchedProjectsData,
        ] = await Promise.all([
          fetchVisionData(),
          fetchMissionData(),
          fetchStats(),
          getAllTeamMembers(),
          fetchTestimonials(),
          fetchAboutData(),
          getPortfolios(),
        ]);

        setVissionData(fetchedVissionData);
        setMissionData(fetchedMissionData);
        setStatsData(fetchedStatsData);
        setTeamData(fetchedTeamData);
        setTestimonialsData(fetchedTestimonialsData);
        setAboutus(fetchedAboutus);
        setProjectsData(fetchedProjectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col gap-10">
      <AboutusVideoSection
        header={t("videoSection.about_us.header")}
        sub_header={t("videoSection.about_us.sub_header")}
        description={
          locale === "en" ? aboutus?.content_en : aboutus?.content_ar
        }
      />
      <div className="flex flex-col gap-10 px-8 pb-20 sm:px-20 py-4 sm:py-10">
        {missionData && <Mission mission={missionData[0]} />}
        {vissionData && <Vission vission={vissionData[0]} />}
        {statsData && <Stats stats={statsData} />}
        {projectsData && <LatestProjects projectsData={projectsData} />}
        {teamData && <TeamSection team={teamData} />}
        {testimonialsData && <Testomonials testimonials={testimonialsData} />}
      </div>
    </div>
  );
}
