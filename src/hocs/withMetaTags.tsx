import React, { useEffect, useState, ComponentType } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Loading from "@/pages/client/loading";

// Define the shape of the metadata response from the API
interface MetaData {
  id: number;
  meta_title_en: string;
  meta_title_ar: string;
  meta_description_en: string;
  meta_description_ar: string;
  meta_keywords_ar: string;
  meta_keywords_en: string;
  page_name_ar: string;
  page_name_en: string;
  slug: string;
}

// Define the props that the wrapped component will receive
interface WithMetaTagsProps {
  metaData?: MetaData;
}

const withMetaTags = <P extends object>(
  WrappedComponent: ComponentType<P & WithMetaTagsProps>,
  apiEndpoint: string,
  canonical: string
) => {
  const WithMetaTags: React.FC<P> = (props) => {
    const [metaData, setMetaData] = useState<MetaData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { i18n } = useTranslation();
    const locale = i18n.language;

    useEffect(() => {
      const fetchMetaData = async () => {
        try {
          const response = await axios.get<MetaData>(apiEndpoint);
          console.log(response.data);
          setMetaData(response.data);
        } catch (err) {
          console.error("Failed to fetch meta tags:", err);
          setMetaData(null); // Reset to null in case of error
        } finally {
          setLoading(false);
        }
      };

      fetchMetaData();
    }, [apiEndpoint]);

    if (loading)
      return (
        <div>
          <Loading />
        </div>
      );

    return (
      <>
        {metaData && (
          <Helmet>
            <title>
              {locale === "en"
                ? metaData.meta_title_en
                : metaData.meta_title_ar}
            </title>
            <meta
              name="description"
              content={
                locale === "en"
                  ? metaData.meta_description_en
                  : metaData.meta_description_ar
              }
            />
            <meta
              name="keywords"
              content={
                locale === "en"
                  ? metaData.meta_keywords_en
                  : metaData.meta_keywords_ar
              }
            />
            <link rel="canonical" href={canonical} />
          </Helmet>
        )}
        <WrappedComponent {...props} metaData={metaData || undefined} />
      </>
    );
  };

  return WithMetaTags;
};

export default withMetaTags;
