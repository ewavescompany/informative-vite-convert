import { useTranslation } from "react-i18next";
import SlideComponent from "@/customComponents/reavelAnimation/slideComponent";
import i18n from "@/i18n";

type Partners = {
  id: number;
  title_en: string;
  title_ar: string;
  image: string;
};

export default function PartnersSection({
  partners,
}: {
  partners: Partners[];
}) {
  const { t } = useTranslation();
  const locale = i18n.language;

  return (
    <section>
      <div className="space-y-4 my-2">
        <SlideComponent dir="left">
          <div>
            <h2 className="lg:text-4xl md:text-2xl text-xl font-medium capitalize text-center text-gray-500">
              {t("partner.partner_title")}
            </h2>
          </div>
        </SlideComponent>
        <SlideComponent dir="up">
          <div className="flex gap-4 flex-wrap justify-center items-center relative">
            {partners?.map((partner) => (
              <SlideComponent dir="left" key={partner.id}>
                <div className="w-80 h-32 overflow-hidden border-2 rounded-lg">
                  <img
                    src={partner.image}
                    alt={locale === "en" ? partner.title_en : partner.title_ar}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              </SlideComponent>
            ))}
          </div>
        </SlideComponent>
      </div>
    </section>
  );
}
