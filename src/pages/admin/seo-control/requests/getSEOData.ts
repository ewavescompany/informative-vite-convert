import axios from "axios";
import { InitialValues, Page } from "../types/form";
import { ResponseType } from "../types/request";

const pages = ["home", "about_us", "contact", "portfolio", "services", "blog"];

export default async function getSEOData({
  setInitialValues,
}: // setInputValues,
{
  setInitialValues: React.Dispatch<React.SetStateAction<InitialValues | null>>;
  // setInputValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
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
        // keywords_en:
        //   item && item.meta_keywords_en
        //     ? item.meta_keywords_en.split(",").map((s: string) => s.trim())
        //     : [],
        // keywords_ar:
        //   item && item.meta_keywords_ar
        //     ? item.meta_keywords_ar.split(",").map((s: string) => s.trim())
        //     : [],
        meta_keywords_en: item ? item.meta_keywords_en || "" : "",
        meta_keywords_ar: item ? item.meta_keywords_ar || "" : "",
      };
    });

    setInitialValues({ pages: pagesData });

    // // Initialize inputValues for the keywords input
    // const inputValuesInit = pagesData.reduce((acc, page) => {
    //   acc[page.name] = "";
    //   return acc;
    // }, {} as Record<string, string>);

    // setInputValues(inputValuesInit);
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }
}
