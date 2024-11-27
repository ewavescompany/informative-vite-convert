import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import ServicesSection from "@/customComponents/servicesComponents/servicesSection";
import { pageClient } from "@/data/client/pagesURLs";
import withMetaTags from "@/hocs/withMetaTags";
import { Service } from "@/interfaces/dashboardInterface";
import { getServices } from "@/requests/generic/getServices";
import { useEffect, useState } from "react";

function ServicesClientPage() {
  const [servicesData, setServicesData] = useState<Service[] | undefined>();

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
        title1="services"
        title2=""
        descriptionEn="At eWaves, we specialize in AI, web, and mobile development, delivering innovative software solutions that drive business growth. Our focus is on leveraging cutting-edge technology to enhance digital presence and streamline marketing strategies. We’re committed to helping businesses transform through smart, data-driven solutions tailored to their needs."
        descriptionAr="At eWaves, نحن نتخصص في تطوير الذكاء الاصطناعي والويب والموبايل، ونقدم حلول برمجية تقدم حلولًا مبتكرة يمكنها أن تؤدي إلى نمو الأعمال. نحن نهتم باستخدام التكنولوجيا المتقدمة لتحسين الوجود الرقمي وتسهيل استراتيجيات التسويق. نحن ملتزمون بمساعدة الشركات على التحول عبر حلول منطقية، مخصصة لاحتياجاتها."
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
