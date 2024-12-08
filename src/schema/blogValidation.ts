import * as Yup from "yup";

export const getBlogValidationSchema = (t: any) =>
  Yup.object({
    blogLang: Yup.string().required(t("blogForm.lang_required")),
    name: Yup.string().required(t("blogForm.name_required")),
    content: Yup.string().required(t("blogForm.content_required")),
    tags: Yup.array().min(1, t("blogForm.tag_required")),
    metaDescription: Yup.string().required(
      t("blogForm.blogForm.meta_description_required")
    ),
    metaKeywords: Yup.string().required(
      t("blogForm.blogForm.meta_keywords_required")
    ),
  });
