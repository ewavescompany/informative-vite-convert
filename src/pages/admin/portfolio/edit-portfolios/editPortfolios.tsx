// pages/EditPortfolioPage.tsx
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState, useEffect } from "react";
import PortfolioForm from "../components/portfolioForm";
import { useParams } from "react-router-dom";
import { useFetchPortfolio } from "@/hooks/dashboard/useFetchPortfolio";
import PageLoader from "@/customComponents/pageLoader";
import withAuth from "@/hocs/withAuth";
import { useTranslation } from "react-i18next";
import { handleEditSubmit } from "../handlers/handleEditSubmit";
import { PortfolioFormValues } from "../types/portfolio";
import { FormikHelpers } from "formik";

const EditPortfolioPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const locale = "en";
  const { t } = useTranslation();
  const { loading, portfolioData, error } = useFetchPortfolio(params?.id || "");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [initialFormValues, setInitialFormValues] =
    useState<PortfolioFormValues | null>(null);

  useEffect(() => {
    if (portfolioData) {
      setInitialFormValues({
        title:
          locale === "en"
            ? portfolioData.title_en
            : portfolioData.title_ar || "",
        content:
          locale === "en"
            ? portfolioData.content_en
            : portfolioData.content_ar || "",
        keywords:
          locale === "en"
            ? portfolioData.keywords_en
            : portfolioData.keywords_ar || "",
        description:
          locale === "en"
            ? portfolioData.description_en
            : portfolioData.description_ar || "",
        status: portfolioData.status || "",
        client: portfolioData.client || "",
        startDate: portfolioData.start_date || "",
        endDate: portfolioData.end_date || "",
        websiteLink: portfolioData.website_link || "",
        mainImage: null,
        images: [],
        lang: locale,
      });
    }
  }, [portfolioData, locale]);

  const onSubmit = async (
    values: PortfolioFormValues,
    formikHelpers: FormikHelpers<PortfolioFormValues>
  ) => {
    if (params.id) {
      setIsSubmitting(true);
      await handleEditSubmit(params.id, values, formikHelpers, t);
      setIsSubmitting(false);
    }
  };

  if (loading || !initialFormValues) return <PageLoader />;
  if (error) return <div>{t("portfolio.form.edit.title")}</div>;

  return (
    <div className="w-full flex flex-col gap-5 capitalize ">
      <DashboardTitle title={t("portfolio.form.edit.title")} />
      <PortfolioForm
        initialValues={initialFormValues}
        onSubmit={onSubmit}
        formType="edit"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default withAuth(EditPortfolioPage);
