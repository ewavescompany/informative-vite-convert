import SlideComponent from "../reavelAnimation/slideComponent";
import { teamsInterface } from "@/interfaces/clientInterface";
import { TeamMember } from "@/interfaces/dashboardInterface";
import { imagesPath } from "@/constants/urls";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { pageClient } from "@/data/client/pagesURLs";
import { Swiper, SwiperSlide } from "swiper/react";
interface teamSectionInterface {
  team: teamsInterface[];
}

function TeamSection({ team }: teamSectionInterface) {
  const locale = i18n.language;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col overflow-hidden w-full h-full px-0 sm:px-5 lg:px-8 lg:py-14 py-4 sm:py-10 lg:gap-10 gap-5">
      <div className="flex flex-col items-center gap-3 minibg overflow-hidden">
        <SlideComponent dir="down">
          <h4 className="text-grayblack md:text-xl text-lg font-medium">
            {t("team.Team")}
          </h4>
        </SlideComponent>

        <h3 className="lg:text-4xl md:text-2xl text-xl font-medium capitalize text-center text-gray-500">
          <SlideComponent dir="right">
            {t("team.Driven by expertise")}
          </SlideComponent>
          <SlideComponent dir="left">
            {t("team.united by vision")}
          </SlideComponent>
        </h3>
        <SlideComponent dir="down">
          <p className="text-grayblack/90 text-sm font-medium max-w-[400px] text-center">
            {t("team.team_description")}
          </p>
        </SlideComponent>
        <SlideComponent dir="up">
          <Link
            to={pageClient.about_us}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            {t("team.Learn more")}
          </Link>
        </SlideComponent>
      </div>
      <div className="">
        <div className="w-full h-full overflow-hidden">
          <Swiper
            className="mySwiper"
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1.25 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
              1440: { slidesPerView: 4.5 },
            }}
          >
            {team.map((member: TeamMember, index: number) => (
              <SwiperSlide
                key={index}
                className="w-full h-full overflow-hidden"
              >
                {/* <div className="w-full h-full overflow-hidden" key={index}> */}
                <SlideComponent dir="up" triggerOnce>
                  <TeamCard
                    imgUrl={`${imagesPath}team/${member.image}`}
                    name={locale === "en" ? member?.name_en : member?.name_ar}
                    title={
                      locale === "en"
                        ? member?.position_en
                        : member?.position_ar
                    }
                  />
                </SlideComponent>
                {/* </div> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default TeamSection;

function TeamCard({
  imgUrl,
  name,
  title,
}: {
  imgUrl: string; // Change from string to StaticImageData
  name: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={imgUrl}
        width={100}
        height={100}
        className="aspect-square w-full border-2 border-zinc-300 rounded-3xl mb-3 shadow-lg hover:shadow-xl duration-1000"
        alt="team member"
      />
      <span className="text-lg md:text-xl text-grayblack capitalize font-medium">
        {name}
      </span>
      <span className="text-lg md:text-xl text-gray-500 capitalize font-medium">
        {title}
      </span>
    </div>
  );
}
