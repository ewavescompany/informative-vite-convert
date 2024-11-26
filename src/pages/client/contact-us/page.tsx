import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import Contactus from "@/customComponents/homeComponents/contactus";
import { pageClient } from "@/data/client/pagesURLs";
import withMetaTags from "@/hocs/withMetaTags";

function ContactUsClientPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <AboutusVideoSection
        title1="Contact us"
        title2="تواصل معنا"
        descriptionEn="Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends."
        descriptionAr="اكتشف كنز من المواد المهنية المصممة بعناية لتقديم لك معرفة كاملة عن أحدث الاتجاهات."
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
