import LeftDirectionService from "./leftDirectionService";
import RightDirectionService from "./rightDirectionService";
import { Service } from "@/interfaces/dashboardInterface";
import { useTranslation } from "react-i18next";

export default function ServicesSection({
  services,
}: {
  services: Service[] | undefined;
}) {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  return (
    <div className="flex flex-col overflow-hidden w-full h-full px-0 sm:px-5 lg:px-8 lg:pb-14 pb-4 sm:pb-10 lg:gap-16 gap-10">
      {services?.map((service: Service, index: number) => {
        if (index % 2 === 0) {
          return (
            <div className="w-full h-full overflow-hidden">
              <LeftDirectionService
                imgUrl={service.image}
                title={locale === "en" ? service.title_en : service.title_ar}
                describition={
                  locale === "en"
                    ? service.long_description_en
                    : service.long_description_ar
                }
              />
            </div>
          );
        } else {
          return (
            <div className="w-full h-full overflow-hidden">
              <RightDirectionService
                imgUrl={service.image}
                title={locale === "en" ? service.title_en : service.title_ar}
                describition={
                  locale === "en"
                    ? service.long_description_en
                    : service.long_description_ar
                }
              />
            </div>
          );
        }
      })}
    </div>
  );
}
