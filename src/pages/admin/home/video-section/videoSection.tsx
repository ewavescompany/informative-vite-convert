import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
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
import { editVideoSection } from "@/requests/admin/updateVideoSection"; // Function for API request
import { useFetchSettings } from "@/hooks/dashboard/useFetchSettings";
import PageLoader from "@/customComponents/pageLoader";
import Loader from "@/customComponents/loader";
import withAuth from "@/hocs/withAuth";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

function VideoSectionPage() {
  const { t } = useTranslation(); // Translation access for the homePage namespace
  const [previewLogo, setPreviewLogo] = useState<File | null>(null);
  const [previewVideo, setPreviewVideo] = useState<File | null>(null);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const locale = i18n.language;
  const { setting, loading, error } = useFetchSettings();

  // Validation Schema for the form using Yup
  const validationSchema = Yup.object({
    hero_title: Yup.string().required(t("homePage.title_required")),
    hero_description: Yup.string().required(t("homePage.description_required")),
    lang: Yup.string().required(t("homePage.language_required")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: setting
      ? {
          logo: null,
          video: null,
          hero_title:
            locale === "en" ? setting?.hero_title_en : setting?.hero_title_ar,
          hero_description:
            locale === "en"
              ? setting?.hero_description_en
              : setting?.hero_description_ar,
          lang: locale === "en" ? "en" : "ar", // Default language
        }
      : {
          logo: null,
          video: null,
          hero_title: "",
          hero_description: "",
          lang: "", // Default language
        },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      const token = localStorage.getItem("authToken");

      if (values.hero_title) formData.append("hero_title", values.hero_title);
      if (values.hero_description)
        formData.append("hero_description", values.hero_description);
      formData.append("lang", values.lang);

      if (values.logo) formData.append("logo", values.logo);
      if (values.video) formData.append("video", values.video);
      try {
        setIsPosting(true);
        const res = await editVideoSection(formData, token ? token : ""); // API request to manage home page data
        // Add success toast here
        console.log(res);
        setIsPosting(false);
      } catch (error) {
        setIsPosting(false);
        console.error("Failed to manage home page:", error);
        // Add error toast here
      }
    },
  });

  // Handle image (logo) change and preview
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setPreviewLogo(file);
      formik.setFieldValue("logo", file);
    }
  };

  // Handle video change and preview
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setPreviewVideo(file);
      formik.setFieldValue("video", file);
    }
  };

  if (loading) return <PageLoader />;
  if (error)
    return (
      <div>
        {t("homePage.error")}: {error}
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("homePage.manage_home_page")}</CardTitle>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col space-y-4">
              {/* Logo Upload */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="logo">{t("homePage.upload_logo")}</Label>
                <Input
                  className="pt-[6px]"
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
                {previewLogo && (
                  <div className="mt-2 relative w-48 h-48">
                    <img
                      src={URL.createObjectURL(previewLogo)}
                      alt="Logo preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
                {formik.errors.logo && formik.touched.logo && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.logo}
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="video">{t("homePage.upload_video")}</Label>
                <Input
                  className="pt-[6px]"
                  type="file"
                  id="video"
                  accept="video/*"
                  onChange={handleVideoChange}
                />
                {previewVideo && (
                  <video controls className="mt-2 w-48 h-48 rounded-md">
                    <source src={URL.createObjectURL(previewVideo)} />
                    Your browser does not support the video tag.
                  </video>
                )}
                {formik.errors.video && formik.touched.video && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.video}
                  </div>
                )}
              </div>

              {/* Hero Title */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="hero_title">{t("homePage.hero_title")}</Label>
                <Input
                  id="hero_title"
                  name="hero_title"
                  type="text"
                  onChange={formik.handleChange}
                  value={
                    formik?.values?.hero_title ? formik?.values?.hero_title : ""
                  }
                  placeholder={t("homePage.hero_title_placeholder")}
                />
                {formik.errors.hero_title && formik.touched.hero_title && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.hero_title}
                  </div>
                )}
              </div>

              {/* Hero Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="hero_description">
                  {t("homePage.hero_description")}
                </Label>
                <Input
                  id="hero_description"
                  name="hero_description"
                  type="text"
                  onChange={formik.handleChange}
                  value={
                    formik.values.hero_description
                      ? formik.values.hero_description
                      : ""
                  }
                  placeholder={t("homePage.hero_description_placeholder")}
                />
                {formik.errors.hero_description &&
                  formik.touched.hero_description && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.hero_description}
                    </div>
                  )}
              </div>

              {/* Language Selection */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lang">{t("homePage.language_select")}</Label>
                <Select
                  name="lang"
                  value={formik.values.lang}
                  onValueChange={(value) => formik.setFieldValue("lang", value)} // Handling Formik state
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("homePage.language_select")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("homePage.language_select")}</SelectLabel>
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
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => formik.resetForm()}
            >
              {t("homePage.cancel")}
            </Button>
            <Button disabled={isPosting} type="submit">
              {isPosting ? <Loader size={14} /> : t("homePage.submit")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(VideoSectionPage);
