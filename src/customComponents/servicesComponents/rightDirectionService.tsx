import { useTranslation } from "react-i18next";
import SlideComponent from "../reavelAnimation/slideComponent";
import { imagesPath } from "@/constants/urls";
import { Service } from "@/interfaces/dashboardInterface";
import ShowMoreNavigateButton from "../showMoreNavigateButton";
import { pageClient } from "@/data/client/pagesURLs";

function RightDirectionService({ service }: { service: Service }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-10 overflow-hidden">
      <div className="w-full h-full lg:flex hidden flex-col justify-center items-center dotbg minibg overflow-hidden">
        <SlideComponent dir="up">
          <img
            className=" max-w-[300px] max-h-[300px] rounded-3xl"
            alt="service"
            src={`${imagesPath}services/${service.image}`}
          />
        </SlideComponent>
      </div>
      <div className="w-full h-full flex flex-col gap-3 justify-center overflow-hidden">
        <SlideComponent dir="down">
          <h5 className="text-base font-medium text-gray-500">
            {t("services.service")}
          </h5>
        </SlideComponent>
        <SlideComponent dir="left">
          <h4 className="text-grayblack xl:text-6xl lg:text-5xl text-3xl font-medium">
            {locale === "en" ? service.title_en : service.title_ar}
          </h4>
        </SlideComponent>
        <SlideComponent dir="up">
          <p className="text-gray-500 xl:text-lg text-base font-medium ">
            {locale === "en"
              ? service.short_description_en
              : service.short_description_ar}
          </p>
        </SlideComponent>
        <SlideComponent dir="up">
          <ShowMoreNavigateButton
            navigateTo={`${pageClient.service_details}/${service.id}`}
          />
        </SlideComponent>
      </div>
      <div className="w-full h-full lg:hidden flex flex-col justify-center items-center dotbg minibg overflow-hidden">
        <SlideComponent dir="up">
          <img
            className=" max-w-[300px] max-h-[300px] rounded-3xl"
            alt="service"
            src={`${imagesPath}services/${service.image}`}
          />
        </SlideComponent>
      </div>
    </div>
  );
}

export default RightDirectionService;
