import ServiceCard from "../servicesComponents/serviceCard";
import SlideComponent from "../reavelAnimation/slideComponent";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col lg:gap-10 gap-5 items-center justify-center">
      <h3 className="lg:text-6xl flex flex-col gap-3 text-3xl font-medium capitalize text-center text-grayblack overflow-hidden">
        <SlideComponent dir="down">
          {t("services.What services")}
        </SlideComponent>
        <SlideComponent dir="up">{t("services.we give")}</SlideComponent>
      </h3>
      <div className="grid xl:grid-cols-2 lg:grid-cols-2  grid-cols-1 gap-5 min-h-[80vh] w-full overflow-hidden">
        <SlideComponent dir="left">
          <ServiceCard />
        </SlideComponent>
        <SlideComponent dir="right">
          <ServiceCard />
        </SlideComponent>
        <SlideComponent dir="left">
          <ServiceCard />
        </SlideComponent>
        <SlideComponent dir="right">
          <ServiceCard />
        </SlideComponent>
        <SlideComponent dir="left">
          <ServiceCard />
        </SlideComponent>
        <SlideComponent dir="right">
          <ServiceCard />
        </SlideComponent>
      </div>
    </div>
  );
}
