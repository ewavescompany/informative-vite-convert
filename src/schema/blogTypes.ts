export interface BlogFormValues {
  blogLang: string;
  name: string;
  content: string;
  blogImg: File | null;
  tags: string[];
  metaDescription: string;
  metaKeywords: string;
}
