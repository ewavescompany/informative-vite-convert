// validation/portfolioSchema.ts
import * as Yup from "yup";
import { TFunction } from "i18next";

export const getValidationSchema = (t: TFunction) => {
  return Yup.object({
    title: Yup.string().required(t("portfolio.Title is required")),
    content: Yup.string().required(t("portfolio.Content is required")),
    keywords: Yup.string().required(t("portfolio.Keywords are required")),
    description: Yup.string()
      .required(t("portfolio.Description is required"))
      .min(10, t("portfolio.Description needs to be more than 10 characters"))
      .max(
        100,
        t("portfolio.Description needs to be less than 100 characters")
      ),
    status: Yup.string().required(t("portfolio.Status is required")),
    client: Yup.string().required(t("portfolio.Client name is required")),
    startDate: Yup.string().required(t("portfolio.Start date is required")),
    endDate: Yup.string().required(t("portfolio.End date is required")),
    websiteLink: Yup.string()
      .url(t("portfolio.Must be a valid URL"))
      .required(t("portfolio.Website link is required")),
    mainImage: Yup.mixed<File>().nullable(),
    // images: Yup.array<File>().min(
    //   1,
    //   t("portfolio.At least one image is required")
    // ),
    images: Yup.array<File>(),
    lang: Yup.string().required(t("portfolio.lang_required")),
  });
};
