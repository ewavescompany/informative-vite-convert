import { PortfolioFormValues, PortfolioResponse } from "../types/portfolio";
import { FormikHelpers } from "formik";
import { editPortfolio } from "@/requests/admin/editPortfolio";
import { TFunction } from "i18next";
import { toast } from "@/hooks/use-toast";

const token = localStorage.getItem("authToken") || "";

export async function handleEditSubmit(
  id: string,
  values: PortfolioFormValues,
  formikHelpers: FormikHelpers<PortfolioFormValues>,
  t: TFunction
): Promise<void> {
  const formData = new FormData();
  formData.append("id", id);
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
    const response: PortfolioResponse = await editPortfolio(formData, token);

    if (response.data && response.success) {
      toast({
        title: t("portfolio.portfolio_updated_successfully"),
        description: t(
          "portfolio.portfolio_updated_successfully_you_can_check_it"
        ),
      });
      formikHelpers.resetForm();
    } else {
      toast({
        variant: "destructive",
        title: t("portfolio.portfolio_update_failed"),
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
      title: t("portfolio.portfolio_update_failed"),
      description: errorMessage,
    });
  }
}
