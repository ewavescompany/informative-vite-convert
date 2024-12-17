import { PortfolioFormValues, PortfolioResponse } from "../types/portfolio";
import { FormikHelpers } from "formik";
import { submitPortfolio } from "@/requests/admin/addPortfolio";
import { toast } from "@/hooks/use-toast";
import { TFunction } from "i18next";

const token = localStorage.getItem("authToken") || "";

export async function handleAddSubmit(
  values: PortfolioFormValues,
  formikHelpers: FormikHelpers<PortfolioFormValues>,
  t: TFunction
): Promise<void> {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("content", values.content);
  formData.append("keywords", values.keywords);
  formData.append("description", values.description);
  formData.append("status", values.status);
  formData.append("client", values.client);
  formData.append("start_date", values.startDate);
  formData.append("end_date", values.endDate);
  formData.append("website_link", values.websiteLink);
  formData.append("lang", values.lang);
  if (values.mainImage) {
    formData.append("image", values.mainImage);
  }
  values.images.forEach((image: File, index: number) => {
    formData.append(`images_slider[${index}]`, image);
  });

  try {
    const response: PortfolioResponse = await submitPortfolio(formData, token);

    if (response.data && response.success) {
      toast({
        title: t("portfolio.portfolio_added_successfully"),
        description: t(
          "portfolio.portfolio_added_successfully_you_can_check_it"
        ),
      });
      formikHelpers.resetForm();
    } else {
      toast({
        variant: "destructive",
        title: t("portfolio.portfolio_adding_failed"),
        description:
          response?.error || t("portfolio.An unexpected error occurred."),
      });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : t("portfolio.An unexpected error occurred.");

    toast({
      variant: "destructive",
      title: t("portfolio.portfolio_adding_failed"),
      description: errorMessage,
    });
  }
}
