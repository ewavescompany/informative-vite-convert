import { FormikHelpers } from "formik";

export interface PortfolioFormValues {
  title: string;
  content: string;
  keywords: string;
  description: string;
  status: string;
  client: string;
  startDate: string;
  endDate: string;
  websiteLink: string;
  mainImage: File | null;
  images: File[];
  lang: string;
}

export interface PortfolioResponse {
  data?: {
    success: boolean;
  };
  error?: string;
  success?: boolean;
}

export type SubmitHandler = (
  values: PortfolioFormValues,
  formikHelpers: FormikHelpers<PortfolioFormValues>
) => Promise<void>;
