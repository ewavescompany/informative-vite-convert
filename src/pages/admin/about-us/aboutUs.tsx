"use client";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import withAuth from "@/hocs/withAuth";
import { useFetchAboutus } from "@/hooks/dashboard/useFetchAboutus";
import { updateAbout } from "@/requests/admin/updateAbout";
import { useToast } from "@/hooks/use-toast";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

function AboutUsPage() {
  const locale = i18n.language; // Get locale
  const { toast } = useToast();
  const { t } = useTranslation();
  const aboutUsData = useFetchAboutus();

  const validationSchema = Yup.object({
    about: Yup.string().required(t("aboutus.about_required")),
    lang: Yup.string().required(t("aboutus.lang_required")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: aboutUsData?.aboutData
      ? {
          about:
            locale === "en"
              ? aboutUsData.aboutData?.content_en
              : aboutUsData.aboutData?.content_ar,
          lang: "",
        }
      : {
          about: "",
          lang: "",
        },
    validationSchema,
    onSubmit: async (values) => {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("content", values.about);
      formData.append("lang", values.lang);

      try {
        const response = await updateAbout(formData, token ?? "");
        console.log("Update successful:", response);
        toast({
          title: t("aboutus.aboutus_updated_successfully"),
          description: t("aboutus.about_us_updated"),
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("aboutus.aboutus_updated_failed"),
          description: t("aboutus.please_try_again"),
        });
        console.error("Error updating about us:", error);
      }
    },
  });

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <DashboardTitle title={t("aboutus.update_about_us")} />
      <form onSubmit={formik.handleSubmit}>
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>{t("aboutus.update_company_about")}</CardTitle>
            <CardDescription>{t("aboutus.fill_about_form")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-1.5">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="about">{t("aboutus.about_us_description")}</Label>
              <Textarea
                id="about"
                name="about"
                rows={5}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about}
                placeholder={t("aboutus.about_placeholder")}
              />
              {formik.errors.about && formik.touched.about && (
                <div className="text-red-500 text-sm">
                  {formik.errors.about}
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lang">{t("aboutus.language_select")}</Label>
              <Select
                name="lang"
                value={formik.values.lang}
                onValueChange={(value) => formik.setFieldValue("lang", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("aboutus.language_select")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("aboutus.language_select")}</SelectLabel>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formik.touched.lang &&
                typeof formik.errors.lang === "string" && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lang}
                  </div>
                )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              {t("aboutus.cancel")}
            </Button>
            <Button type="submit">{t("aboutus.update")}</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default withAuth(AboutUsPage);
