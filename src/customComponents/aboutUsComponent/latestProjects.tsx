import SlideComponent from "../reavelAnimation/slideComponent";
import { ArrowUpRight } from "lucide-react";
import { Portfolio } from "@/interfaces/dashboardInterface";
import { imagesPath } from "@/constants/urls";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { pageClient } from "@/data/client/pagesURLs";

function LatestProjects({ projectsData }: { projectsData: Portfolio[] }) {
  const locale = i18n.language;
  const { t } = useTranslation();

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 w-full h-full">
      <div className="lg:col-span-3 md:col-span-2 col-span-1 w-full flex flex-row items-center justify-between ">
        <SlideComponent dir="down">
          <h4 className="lg:text-6xl text-3xl font-medium capitalize text-center text-grayblack">
            {t("latestProjects.our_latest_projects")}
          </h4>
        </SlideComponent>
        <Link
          to={pageClient.portfolio}
          className="hover:scale-150 duration-500"
        >
          <ArrowUpRight size={30} />
        </Link>
      </div>
      {projectsData.map((project: Portfolio, index: number) => (
        <div key={index} className="w-full h-full overflow-hidden">
          <SlideComponent triggerOnce dir={index % 2 === 0 ? "up" : "down"}>
            <ProjectCard
              projectImgUrl={`${imagesPath}portfolios/${project.image}`}
              name={locale === "en" ? project.title_en : project.title_ar}
              projectUrl={`${pageClient.portfolio}/${project.id}`}
            />
          </SlideComponent>
        </div>
      ))}
    </div>
  );
}

export default LatestProjects;

function ProjectCard({
  projectImgUrl,
  name,
  projectUrl,
}: {
  projectUrl: string;
  name: string;
  projectImgUrl: string;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 group transition-all lg:text-transparent text-graywhite hover:text-graywhite relative aspect-square overflow-hidden lg:bg-transparent bg-grayblack/80 hover:bg-grayblack/80 duration-500 rounded-2xl">
      <img
        className="absolute w-full object-fill h-full top-0 bottom-0 right-0 left-0 z-[-1]"
        alt="project name"
        src={projectImgUrl}
      />
      <Link
        to={projectUrl}
        className="uppercase lg:text-3xl flex flex-col gap-3 items-center justify-center"
      >
        <SlideComponent className="mx-auto w-fit" triggerOnce dir="down">
          <ArrowUpRight size={50} />
        </SlideComponent>
        <SlideComponent dir="up">{name}</SlideComponent>
      </Link>
    </div>
  );
}
