export interface BlogsResponseHttpData {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  title_ar: string;
  content_ar: string;
  keywords_ar: string;
  description_ar: string;
  title_en: string;
  content_en: string;
  keywords_en: string;
  description_en: string;
  tags_ar: string | null;
  tags_en: string;
}
