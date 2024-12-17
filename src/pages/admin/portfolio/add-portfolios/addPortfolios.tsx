import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState } from "react";
import withAuth from "@/hocs/withAuth";
import { useTranslation } from "react-i18next";
import { handleAddSubmit } from "../handlers/handleAddSubmit";
import { PortfolioFormValues } from "../types/portfolio";
import { FormikHelpers } from "formik";
import PortfolioForm from "../components/portfolioForm";

const AddPortfoliosPage: React.FC = () => {
  const { t } = useTranslation();
  // const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (
    values: PortfolioFormValues,
    formikHelpers: FormikHelpers<PortfolioFormValues>
  ) => {
    setIsSubmitting(true);
    await handleAddSubmit(values, formikHelpers, t);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full flex flex-col gap-5 capitalize ">
      <DashboardTitle title={t("portfolio.form.add.title")} />
      <PortfolioForm
        onSubmit={onSubmit}
        formType="add"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default withAuth(AddPortfoliosPage);
