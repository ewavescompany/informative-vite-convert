import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import getSEOData from "./requests/getSEOData";
import { InitialValues, Page } from "./types/form";
import { FormikProps, useFormik } from "formik";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import postSEOData from "./requests/postSEOData";
import AiHelp from "@/components/aiHelp";
import { prompt } from "@/data/admin/prompt";
import aiContent from "./utils/aiContent";

const validationSchema = Yup.object().shape({
  blogLang: Yup.string().required("Language is required"),
  pages: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      meta_title_en: Yup.string(),
      meta_title_ar: Yup.string(),
      meta_description_en: Yup.string(),
      meta_description_ar: Yup.string(),
      meta_keywords_en: Yup.string(),
      meta_keywords_ar: Yup.string(),
    })
  ),
});

export default function SeoInputsForm() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const [initialValues, setInitialValues] = useState<InitialValues | null>(
    null
  );

  useEffect(() => {
    getSEOData({ setInitialValues });
  }, []);

  const formik = useFormik({
    initialValues: {
      blogLang: (locale as "en" | "ar") || "en",
      pages: initialValues?.pages || [],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const body = {
        pages: values.pages.map((page) => {
          return {
            slug: `${page.slug}-page`,
            page_name_en: page.name,
            page_name_ar: page.name,
            meta_title_en: page.meta_title_en,
            meta_title_ar: page.meta_title_ar,
            meta_description_en: page.meta_description_en,
            meta_description_ar: page.meta_description_ar,
            meta_keywords_en: page.meta_keywords_en,
            meta_keywords_ar: page.meta_keywords_ar,
          };
        }),
      };

      postSEOData({ body, t });
    },
  });

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid xl:grid-cols-2 gap-4">
        {formik.values.pages.map((page, index) => (
          <CardForm
            key={page.slug}
            formik={formik}
            index={index}
            page={page}
            blogLang={formik.values.blogLang as "en" | "ar"}
          />
        ))}
      </div>

      <div className="flex justify-between items-end gap-4">
        {/* Language Selector */}
        <div className="flex flex-col space-y-1.5 mt-4">
          <Label htmlFor="blogLang">{t("blogForm.language_select")}</Label>
          <Select
            name="blogLang"
            value={formik.values.blogLang}
            onValueChange={(value) => formik.setFieldValue("blogLang", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("blogForm.language_select")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("blogForm.language_select")}</SelectLabel>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {formik.errors.blogLang && formik.touched.blogLang && (
            <div className="text-red-500 text-sm">{formik.errors.blogLang}</div>
          )}
        </div>

        <Button type="submit" className="mt-4">
          {t("seo_manage.form.buttons.submit")}
        </Button>
      </div>
    </form>
  );
}

function CardForm({
  formik,
  index,
  page,
  blogLang,
}: {
  formik: FormikProps<{ blogLang: "en" | "ar"; pages: Page[] }>;
  index: number;
  page: Page;
  blogLang: "en" | "ar";
}) {
  const { t } = useTranslation();
  const fieldName = (field: string) => `pages[${index}].${field}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t(`seo_manage.pages.${page.name}`, { defaultValue: page.name })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <Label>{t("seo_manage.form.label.title")}</Label>
            <Input
              id={fieldName(`meta_title_${blogLang}`)}
              name={fieldName(`meta_title_${blogLang}`)}
              type="text"
              placeholder={t("seo_manage.form.placeholder.title")}
              onChange={formik.handleChange}
              value={formik.values.pages[index][`meta_title_${blogLang}`]}
            />
          </div>

          <div>
            <Label>{t("seo_manage.form.label.description")}</Label>
            <AiHelp
              prompt={prompt.generate_meta_description}
              content={aiContent(page.name)}
              formikValue={
                formik.values.pages[index][`meta_description_${blogLang}`]
              }
              formikSetValue={(content: string) =>
                formik.setFieldValue(
                  fieldName(`meta_description_${blogLang}`),
                  content
                )
              }
              type="description"
            >
              <Textarea
                id={fieldName(`meta_description_${blogLang}`)}
                name={fieldName(`meta_description_${blogLang}`)}
                placeholder={t("seo_manage.form.placeholder.description")}
                onChange={formik.handleChange}
                value={
                  formik.values.pages[index][`meta_description_${blogLang}`]
                }
              />
            </AiHelp>
          </div>

          <div>
            <Label>{t("seo_manage.form.label.keywords")}</Label>
            <AiHelp
              prompt={prompt.generate_meta_keywords_seo}
              content={aiContent(page.name)}
              formikValue={
                formik.values.pages[index][`meta_keywords_${blogLang}`]
              }
              formikSetValue={(content: string) =>
                formik.setFieldValue(
                  fieldName(`meta_keywords_${blogLang}`),
                  content
                )
              }
              type="keywords"
            >
              <Textarea
                id={fieldName(`meta_keywords_${blogLang}`)}
                name={fieldName(`meta_keywords_${blogLang}`)}
                placeholder={t("seo_manage.form.placeholder.keywords")}
                onChange={formik.handleChange}
                value={formik.values.pages[index][`meta_keywords_${blogLang}`]}
              />
            </AiHelp>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
