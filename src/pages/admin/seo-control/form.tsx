import { Formik, Form, Field, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
const token = localStorage.getItem("authToken");

const pages = ["home", "about_us", "contact", "portfolio", "services", "blog"];

const validationSchema = Yup.object().shape({
  pages: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      meta_title_en: Yup.string().required("Meta title is required"),
      meta_title_ar: Yup.string().required("Meta title is required"),
      description_en: Yup.string(),
      description_ar: Yup.string(),
      keywords_en: Yup.array().of(Yup.string()),
      keywords_ar: Yup.array().of(Yup.string()),
    })
  ),
});

type Page = {
  slug: string;
  name: string;
  meta_title_en: string;
  meta_title_ar: string;
  description_en: string;
  description_ar: string;
  keywords_en: string[];
  keywords_ar: string[];
};

type InitialValues = {
  pages: Page[];
};

const convertInputData = (inputArray: Page[], locale: "ar" | "en") => {
  return inputArray.map((item) => {
    return {
      slug: `${item.slug.replace(/_/g, "-")}-page`,
      [`page_name_${locale}`]: item.slug
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      [`meta_description_${locale}`]: item[`description_${locale}`],
      [`meta_keywords_${locale}`]: item[`keywords_${locale}`].join(", "),
      [`meta_title_${locale}`]: item[`meta_title_${locale}`],
    };
  });
};

export default function SeoInputsForm() {
  const { t, i18n } = useTranslation();
  const defaultLocale = i18n.language as "ar" | "en";
  const [locale, setLocale] = useState<"ar" | "en">(defaultLocale);
  const [initialValues, setInitialValues] = useState<InitialValues | null>(
    null
  );
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://v4.ewavespro.com/api/global/seo"
        );
        const data = response.data;

        // Transform the data to fit the initialValues structure
        const pagesData: Page[] = pages.map((pageName) => {
          const slug = `${pageName.replace(/_/g, "-")}-page`;
          const item = data.find((d: any) => d.slug === slug);

          return {
            slug: pageName,
            name: pageName,
            meta_title_en: item ? item.meta_title_en || "" : "",
            meta_title_ar: item ? item.meta_title_ar || "" : "",
            description_en: item ? item.meta_description_en || "" : "",
            description_ar: item ? item.meta_description_ar || "" : "",
            keywords_en:
              item && item.meta_keywords_en
                ? item.meta_keywords_en.split(",").map((s: string) => s.trim())
                : [],
            keywords_ar:
              item && item.meta_keywords_ar
                ? item.meta_keywords_ar.split(",").map((s: string) => s.trim())
                : [],
          };
        });

        setInitialValues({ pages: pagesData });

        // Initialize inputValues for the keywords input
        const inputValuesInit = pagesData.reduce((acc, page) => {
          acc[page.name] = "";
          return acc;
        }, {} as Record<string, string>);

        setInputValues(inputValuesInit);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    }

    fetchData();
  }, []);

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <Formik<InitialValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values) => {
        const body = { pages: convertInputData(values.pages, locale) };

        async function request() {
          try {
            const response = await axios.post(
              "https://v4.ewavespro.com/api/admin/seo/store",
              body,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response) {
              toast({
                title: t("seo_manage.messages.success_title"),
                description: t("seo_manage.messages.success_description"),
              });
            } else {
              toast({
                variant: "destructive",
                title: t("seo_manage.messages.failed_title"),
                description: t("seo_manage.messages.failed_description"),
              });
            }
            console.log("Response:", response.data);
          } catch (error) {
            toast({
              variant: "destructive",
              title: t("seo_manage.messages.failed_title"),
              description: t("seo_manage.messages.failed_description"),
            });
            console.error("Error:", error);
          }
        }
        request();
        console.log("Submitting values:", values);
      }}
    >
      {/* {({ values, errors, touched, setFieldValue, isSubmitting, dirty }) => ( */}
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lang">{t("services.language_select")}</Label>
              <Select
                name="lang"
                value={locale}
                onValueChange={(value) => setLocale(value as "ar" | "en")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("services.language_select")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("services.language_select")}</SelectLabel>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">{t("seo_manage.form.buttons.submit")}</Button>
          </div>
          <FieldArray name="pages">
            {() => (
              <div className="grid grid-cols-2 gap-4">
                {values.pages.map((page, index) => {
                  // Dynamic field names based on locale
                  const metaTitleField = `pages.${index}.meta_title_${locale}`;
                  const descriptionField = `pages.${index}.description_${locale}`;
                  const keywordsField = `pages.${index}.keywords_${locale}`;

                  // Access errors and touched properties
                  const metaTitleError = getIn(errors, metaTitleField);
                  const metaTitleTouched = getIn(touched, metaTitleField);

                  const descriptionError = getIn(errors, descriptionField);
                  const descriptionTouched = getIn(touched, descriptionField);

                  const keywordsError = getIn(errors, keywordsField);
                  const keywordsTouched = getIn(touched, keywordsField);

                  const keywords = page[`keywords_${locale}`];

                  return (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle>
                          {t(`seo_manage.pages.${page.slug}`)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor={metaTitleField}>
                            {t("seo_manage.form.label.title")}
                          </Label>
                          <Field
                            as={Input}
                            id={metaTitleField}
                            name={metaTitleField}
                            className="w-full"
                            placeholder={t("seo_manage.form.placeholder.title")}
                          />
                          {metaTitleTouched && metaTitleError && (
                            <p className="text-red-500 text-sm">
                              {metaTitleError}
                            </p>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={descriptionField}>
                              {t("seo_manage.form.label.description")}
                            </Label>
                            <Field
                              as={Textarea}
                              id={descriptionField}
                              name={descriptionField}
                              className="w-full"
                              placeholder={t(
                                "seo_manage.form.placeholder.description"
                              )}
                            />
                            {descriptionTouched && descriptionError && (
                              <p className="text-red-500 text-sm">
                                {descriptionError}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor={keywordsField}>
                              {t("seo_manage.form.label.keywords")}
                            </Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {keywords.map((tag, tagIndex) => (
                                <div
                                  key={tagIndex}
                                  className="bg-primary text-primary-foreground px-2 py-1 rounded-md flex items-center"
                                >
                                  <span>{tag}</span>
                                  <Button
                                    size="sm"
                                    type="button"
                                    onClick={() => {
                                      const newKeywords = [...keywords];
                                      newKeywords.splice(tagIndex, 1);
                                      setFieldValue(keywordsField, newKeywords);
                                    }}
                                    className="m-0 p-0 mx-2 text-primary-foreground hover:text-red-500"
                                  >
                                    <X size={14} />
                                  </Button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                value={inputValues[page.name]}
                                onChange={(e) =>
                                  setInputValues({
                                    ...inputValues,
                                    [page.name]: e.target.value,
                                  })
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const tag = inputValues[page.name].trim();
                                    if (tag && !keywords.includes(tag)) {
                                      setFieldValue(keywordsField, [
                                        ...keywords,
                                        tag,
                                      ]);
                                      setInputValues({
                                        ...inputValues,
                                        [page.name]: "",
                                      });
                                    }
                                  }
                                }}
                                className="flex-grow"
                                placeholder={t(
                                  "seo_manage.form.placeholder.keywords"
                                )}
                              />
                              <Button
                                type="button"
                                onClick={() => {
                                  const tag = inputValues[page.name].trim();
                                  if (tag && !keywords.includes(tag)) {
                                    setFieldValue(keywordsField, [
                                      ...keywords,
                                      tag,
                                    ]);
                                    setInputValues({
                                      ...inputValues,
                                      [page.name]: "",
                                    });
                                  }
                                }}
                              >
                                {t("seo_manage.form.buttons.add_tag")}
                              </Button>
                            </div>
                            {keywordsTouched && keywordsError && (
                              <p className="text-red-500 text-sm">
                                {keywordsError}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
}
