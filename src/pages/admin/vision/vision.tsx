"use client";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFetchVision } from "@/hooks/dashboard/useFetchVision";
import PageLoader from "@/customComponents/pageLoader";
import { useToast } from "@/hooks/use-toast"; // Import toast hook
import { updateVisionData } from "@/requests/admin/updateVisionData";
import Loader from "@/customComponents/loader";
import withAuth from "@/hocs/withAuth";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

// Yup validation schema with translated error messages

function VisionPage() {
  const { visionData, loading, error } = useFetchVision(); // Use the hook
  const [isPosting, setIsPosting] = useState<boolean>(false);
  console.log(visionData);
  const { toast } = useToast(); // Use the toast hook
  const { t } = useTranslation(); // Use translations
  const locale = i18n.language; // Get locale
  const validationSchema = Yup.object({
    title: Yup.string().required((t) => t("vision.title_required")),
    subTitle: Yup.string().required((t) => t("vision.subtitle_required")),
    missionDescription: Yup.string()
      .min(20, t("vision.description_min"))
      .required(t("vision.description_required")),
    lang: Yup.string().required(t("vision.language_required")),
  });
  // Initialize Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: visionData
      ? {
          title:
            locale === "en" ? visionData?.title_en : visionData?.title_ar || "",
          subTitle:
            locale === "en"
              ? visionData?.sub_title_en
              : visionData?.sub_title_ar || "",
          missionImg: null,
          missionDescription:
            locale === "en"
              ? visionData?.description_en
              : visionData?.description_ar || "",
          lang: "",
        }
      : {
          title: "",
          subTitle: "",
          missionImg: null,
          missionDescription: "",
          lang: "",
        },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
      const token = localStorage.getItem("authToken");
      // Display success toast
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("sub_title", values.subTitle);
      formData.append("description", values.missionDescription);
      formData.append("lang", values.lang);
      if (values.missionImg) formData.append("image", values.missionImg);
      try {
        setIsPosting(true);
        const res = await updateVisionData(formData, token ? token : ""); // Call the update request function
        console.log(res);
        // Show success toast
        setIsPosting(false);
        toast({
          title: t("vision.success"),
          description: t("vision.vision_updated_successfully"),
        });
      } catch (error) {
        setIsPosting(false);
        // Show error toast
        toast({
          variant: "destructive",
          title: t("vision.error_message"),
          description: t("vision.vision_update_failed"),
        });
        console.error("Failed to update stats:", error);
      }

      // Handle form submission, e.g., send to API
    },
  });

  if (loading) return <PageLoader />; // Show loader while fetching data
  if (error)
    return (
      <div>
        {t("vision.error")}: {error}
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <DashboardTitle title={t("vision.update_your_vision")} />
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("vision.update_the_vision")}</CardTitle>
          <CardDescription>
            {t("vision.fill_in_the_form_for_your_vision")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col w-full gap-4">
              {/* Title */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">{t("vision.vision_title")}</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder={t("vision.enter_vision_title")}
                />
                {formik.errors.title && formik.touched.title && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.title}
                  </div>
                )}
              </div>

              {/* SubTitle */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subTitle">{t("vision.sub_vision_title")}</Label>
                <Input
                  id="subTitle"
                  name="subTitle"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.subTitle}
                  placeholder={t("vision.enter_sub_vision_title")}
                />
                {formik.errors.subTitle && formik.touched.subTitle && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.subTitle}
                  </div>
                )}
              </div>

              {/* Mission Image */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="missionImg">{t("vision.vision_image")}</Label>
                <Input
                  type="file"
                  id="missionImg"
                  onChange={(event) =>
                    formik.setFieldValue(
                      "missionImg",
                      event.currentTarget.files?.[0]
                    )
                  }
                />
                {formik.errors.missionImg && formik.touched.missionImg && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.missionImg}
                  </div>
                )}
              </div>

              {/* Mission Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="missionDescription">
                  {t("vision.vision_description")}
                </Label>
                <Textarea
                  id="missionDescription"
                  name="missionDescription"
                  rows={5}
                  onChange={formik.handleChange}
                  value={formik.values.missionDescription}
                  placeholder={t("vision.enter_vision_description")}
                />
                {formik.errors.missionDescription &&
                  formik.touched.missionDescription && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.missionDescription}
                    </div>
                  )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lang">{t("vision.language_select")}</Label>
                <Select
                  name="lang"
                  value={formik.values.lang}
                  onValueChange={(value) => formik.setFieldValue("lang", value)} // Handling Formik state
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("vision.language_select")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("vision.language_select")}</SelectLabel>
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
            <Button variant="outline" type="button">
              {t("vision.cancel")}
            </Button>
            <Button disabled={isPosting} type="submit">
              {isPosting ? <Loader size={14} /> : t("vision.update")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(VisionPage);
