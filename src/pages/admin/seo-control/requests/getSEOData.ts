import axios from "axios";
import { InitialValues, Page } from "../types/form";
import { ResponseType } from "../types/request";

const pages = ["home", "about_us", "contact", "portfolio", "services", "blog"];

export default async function getSEOData({
  setInitialValues,
}: {
  setInitialValues: React.Dispatch<React.SetStateAction<InitialValues | null>>;
}) {
  try {
    const response = await axios.get("https://v4.ewavespro.com/api/global/seo");
    const data: ResponseType[] = response.data;
    // const data = response.data;

    // Transform the data to fit the initialValues structure
    const pagesData: Page[] = pages.map((pageName) => {
      const slug = `${pageName.replace(/_/g, "-")}-page`;
      const item = data.find((d) => d.slug === slug);

      return {
        slug: pageName,
        name: pageName,
        meta_title_en: item ? item.meta_title_en || "" : "",
        meta_title_ar: item ? item.meta_title_ar || "" : "",
        meta_description_en: item ? item.meta_description_en || "" : "",
        meta_description_ar: item ? item.meta_description_ar || "" : "",
        meta_keywords_en: item ? item.meta_keywords_en || "" : "",
        meta_keywords_ar: item ? item.meta_keywords_ar || "" : "",
      };
    });

    setInitialValues({ pages: pagesData });
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }
}
