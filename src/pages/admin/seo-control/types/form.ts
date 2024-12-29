export type Page = {
  slug: string;
  name: string;
  meta_title_en: string;
  meta_title_ar: string;
  meta_description_en: string;
  meta_description_ar: string;
  meta_keywords_en: string;
  meta_keywords_ar: string;
};

export type InitialValues = {
  pages: Page[];
};
