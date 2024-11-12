import i18n from "@/i18n";
import LeftDirectionService from "./leftDirectionService";
import RightDirectionService from "./rightDirectionService";
import { Service } from "@/interfaces/dashboardInterface";

export default function ServicesSection({ services }: { services: Service[] }) {
  const locale = i18n.language;

  return (
    <div className="flex flex-col overflow-hidden w-full h-full px-0 sm:px-5 lg:px-8 lg:pb-14 pb-4 sm:pb-10 lg:gap-16 gap-10">
      {services.map((service: Service, index: number) => {
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
