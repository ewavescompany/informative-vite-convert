import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import Contactus from "@/customComponents/homeComponents/contactus";
import { pageClient } from "@/data/client/pagesURLs";
import withMetaTags from "@/hocs/withMetaTags";
import { useTranslation } from "react-i18next";

function ContactUsClientPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <AboutusVideoSection
        header={t("videoSection.contact_us.header")}
        sub_header={t("videoSection.contact_us.sub_header")}
        description={t("videoSection.contact_us.description")}
      />
      <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 flex flex-col gap-10 items-center justify-center">
        <Contactus />
      </div>
    </div>
  );
}

export default withMetaTags(
  ContactUsClientPage,
  `${clientBaseServerUrl}${serverUrls.seo}/contact-page`,
  pageClient.contact_us
);
