import { Button } from "@/components/ui/button";
import { imagesPath } from "@/constants/urls";
import { pageClient } from "@/data/client/pagesURLs";
import { Service } from "@/interfaces/dashboardInterface";
import { fetchServiceById } from "@/requests/generic/fetchServiceById";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import Loading from "../../loading";

export default function ServiceDetailsClientPage() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [serviceData, setServiceData] = useState<Service | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getServiceData() {
      if (id) {
        try {
          const res = await fetchServiceById(id);
          setServiceData(res?.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    getServiceData();
  }, []);

  if (!id) {
    return (
      <div>
        <h1>There is no blog in that id</h1>
      </div>
    );
  }

  if (isLoading) {
    <div>
      <Loading />
    </div>;
  }

  if (!serviceData) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col gap-4">
        <p className="text-3xl md:text-5xl font-bold text-muted-foreground">
          404
        </p>
        <h1 className="text-xl md:text-2xl font-semibold">
          {lang === "en"
            ? "There is no service with this title"
            : "لا يوجد خدمة بهذا العنوان"}
        </h1>
        <Link to={pageClient.services}>
          <Button className="bg-stone-500 text-lg">
            {lang === "en" ? "Go to service page" : "اذهب الي صفحة خدماتنا"}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {lang === "en" ? serviceData.title_en : serviceData.title_ar}
        </title>
        <meta
          name="description"
          content={
            lang === "en"
              ? serviceData.long_description_en
              : serviceData.long_description_ar
          }
        />
        <meta
          name="keywords"
          content={
            lang === "en"
              ? serviceData.short_description_en
              : serviceData.short_description_ar
          }
        />
        <link rel="canonical" href={pageClient.service_details} />
      </Helmet>

      <div className="min-h-screen w-full h-full flex flex-col gap-10 pt-20 bg">
        <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 flex flex-col gap-10 items-center justify-center ">
          <div className="w-full h-full flex flex-col gap-10 xl:max-w-5xl lg:max-w-3xl max-w-full">
            <div className="w-full h-full flex flex-col gap-1">
              <h1 className="text-grayblack xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">
                {lang === "en" ? serviceData.title_en : serviceData.title_ar}
              </h1>
              <div className="w-full h-full overflow-hidden rounded-2xl max-h-[60vh]">
                <img
                  src={`${imagesPath}services/${serviceData.image}`}
                  alt={
                    lang === "en" ? serviceData.title_en : serviceData.title_ar
                  }
                  width="auto"
                  height="auto"
                  className="hover:scale-125 duration-500 object-cover w-full h-full"
                />
              </div>
              <p className=" font-semibold text-xl md:text-2xl text-muted-foreground">
                {lang === "en"
                  ? serviceData.short_description_en
                  : serviceData.short_description_ar}
              </p>
              <div
                className="w-full h-full ql-editor quill-content"
                dangerouslySetInnerHTML={{
                  __html:
                    lang === "en"
                      ? serviceData.long_description_en
                      : serviceData.long_description_ar,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
