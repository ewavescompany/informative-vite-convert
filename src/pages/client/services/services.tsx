import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import ServicesSection from "@/customComponents/servicesComponents/servicesSection";
import { pageClient } from "@/data/client/pagesURLs";
import withMetaTags from "@/hocs/withMetaTags";
import { Service } from "@/interfaces/dashboardInterface";
import { getServices } from "@/requests/generic/getServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function ServicesClientPage() {
  const [servicesData, setServicesData] = useState<Service[] | undefined>();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getServices();
        setServicesData(res?.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen w-full h-full flex flex-col gap-10">
      <AboutusVideoSection
        header={t("videoSection.services.header")}
        sub_header={t("videoSection.services.sub_header")}
        description={t("videoSection.services.description")}
      />
      <div className="flex flex-col gap-10 px-8 pb-20 sm:px-20 py-4 sm:py-10">
        <ServicesSection services={servicesData} />
      </div>
    </div>
  );
}

export default withMetaTags(
  ServicesClientPage,
  `${clientBaseServerUrl}${serverUrls.seo}/services-page`,
  pageClient.services
);
