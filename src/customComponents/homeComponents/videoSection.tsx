import { videosPath } from "@/constants/urls";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { settings } from "@/interfaces/dashboardInterface";
import SlideComponent from "../reavelAnimation/slideComponent";

interface videoSectionInterface {
  settings: settings;
}

function VideoSection({ settings }: videoSectionInterface) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  return (
    <div>
      <div className="w-full md:h-screen md:relative z-30 grid lg:grid-cols-2 grid-cols-1 relative">
        <video
          className="md:object-cover w-full md:h-full md:absolute top bottom-0 left-0 right-0"
          loop
          muted
          autoPlay
          playsInline
          src={`${videosPath}${settings.hero_video}`}
        />
        <div className="w-full h-full hidden md:flex flex-col z-10 lg:text-left text-center overflow-hidden">
          <div className="w-full h-full flex flex-col gap-4 justify-end py-16 px-4 absolute top-0 bottom-0 right-0 left-0">
            <div className="flex flex-col gap-4 overflow-hidden">
              <SlideComponent dir="down">
                <h1
                  className={`capitalize md:text-4xl lg:text-6xl text-2xl font-semibold text-graywhite ${
                    locale === "en" ? "text-left" : "text-right"
                  }`}
                >
                  {locale === "en"
                    ? settings.hero_title_en
                    : settings.hero_title_ar}
                </h1>
              </SlideComponent>
              <SlideComponent dir="up">
                <h1
                  className={`lg:text-xl md:text-lg text-base font-semibold text-graywhite ${
                    locale === "en" ? "text-left" : "text-right"
                  }`}
                >
                  {locale === "en"
                    ? settings.hero_description_en
                    : settings.hero_description_ar}
                </h1>
              </SlideComponent>
            </div>

            <div className="flex flex-row gap-3 overflow-hidden mx-0">
              <SlideComponent dir="up">
                <Button
                  className="w-fit border-graywhite border-2 text-graywhite hover:text-grayblack"
                  size={"default"}
                  variant={"ghost"}
                >
                  {t("HomePage.more_about_us")}
                </Button>
              </SlideComponent>
              <SlideComponent dir="down">
                <Button
                  className="w-fit border-graywhite border-2 text-grayblack hover:text-graywhite hover:bg-transparent animate-slideInDown"
                  size={"default"}
                  variant={"secondary"}
                >
                  {t("HomePage.contact_us")}
                </Button>
              </SlideComponent>
            </div>
          </div>
        </div>
      </div>
      <div>
        <PhoneHeader settings={settings} />
      </div>
    </div>
  );
}

function PhoneHeader({ settings }: videoSectionInterface) {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  return (
    <div className="md:hidden w-full h-full flex flex-col gap-4 justify-end py-8 px-4 bg-grayblack">
      <div className="flex flex-col overflow-hidden">
        <SlideComponent dir="down">
          <h1
            className={`capitalize text-xl font-semibold text-graywhite ${
              locale === "en" ? "text-left" : "text-right"
            }`}
          >
            {locale === "en" ? settings.hero_title_en : settings.hero_title_ar}
          </h1>
        </SlideComponent>
        <SlideComponent dir="up">
          <h2
            className={`text-xs font-thin text-graywhite ${
              locale === "en" ? "text-left" : "text-right"
            }`}
          >
            {locale === "en"
              ? settings.hero_description_en
              : settings.hero_description_ar}
          </h2>
        </SlideComponent>
      </div>
    </div>
  );
}

export default VideoSection;
