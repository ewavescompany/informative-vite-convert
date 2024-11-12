import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { submitService } from "@/requests/admin/addService";
import Loader from "@/customComponents/loader";
import { useToast } from "@/hooks/use-toast";
import withAuth from "@/hocs/withAuth";
import { useTranslation } from "react-i18next";

function Page() {
  const [mainImagePreview, setMainImagePreview] = useState<File | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation(); // Load translations from services.json
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const validationSchema = Yup.object({
    title: Yup.string().required(t("services.title_required")),
    shortDescription: Yup.string().required(
      t("services.short_description_required")
    ),
    longDescription: Yup.string().required(
      t("services.long_description_required")
    ),
    lang: Yup.string().required(t("services.language_required")),
    image: Yup.mixed().required(t("services.image_required")),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      shortDescription: "",
      longDescription: "",
      lang: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("short_description", values.shortDescription);
      formData.append("long_description", values.longDescription);
      formData.append("lang", values.lang);
      if (values.image) formData.append("image", values.image);

      const token = localStorage.getItem("authToken"); // Assuming you store the token in localStorage

      try {
        setIsPosting(true);
        const response = await submitService(formData, token || "");
        console.log("Service submitted successfully:", response);

        toast({
          title: t("services.service_added_successfully"),
          description: t(
            "services.service_added_successfully_you_can_check_it"
          ),
        });
        setIsPosting(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("services.service_adding_failed"),
          description: t("services.please_try_again"),
        });
        console.error("Error submitting service:", error);
        setIsPosting(false);
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setMainImagePreview(file);
      formik.setFieldValue("image", file);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <DashboardTitle title={t("services.add_service")} />
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("services.create_service")}</CardTitle>
          <CardDescription>{t("services.fill_form")}</CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col w-full gap-4">
              {/* Title */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">{t("services.title")}</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder={t("services.title")}
                />
                {formik.errors.title && formik.touched.title && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.title}
                  </div>
                )}
              </div>

              {/* Short Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="shortDescription">
                  {t("services.short_description")}
                </Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  rows={3}
                  onChange={formik.handleChange}
                  value={formik.values.shortDescription}
                  placeholder={t("services.short_description")}
                />
                {formik.errors.shortDescription &&
                  formik.touched.shortDescription && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.shortDescription}
                    </div>
                  )}
              </div>

              {/* Long Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="longDescription">
                  {t("services.long_description")}
                </Label>
                <Textarea
                  id="longDescription"
                  name="longDescription"
                  rows={5}
                  onChange={formik.handleChange}
                  value={formik.values.longDescription}
                  placeholder={t("services.long_description")}
                />
                {formik.errors.longDescription &&
                  formik.touched.longDescription && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.longDescription}
                    </div>
                  )}
              </div>

              {/* Image Upload */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">{t("services.image")}</Label>
                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {mainImagePreview && (
                  <div className="mt-2 relative w-48 h-48">
                    <img
                      src={URL.createObjectURL(mainImagePreview)}
                      alt="Main preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
                {formik.errors.image && formik.touched.image && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.image}
                  </div>
                )}
              </div>

              {/* Language Selection */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lang">{t("services.language_select")}</Label>
                <Select
                  name="lang"
                  value={formik.values.lang}
                  onValueChange={(value) => formik.setFieldValue("lang", value)} // Handling Formik state
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
                {formik.errors.lang && formik.touched.lang && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lang}
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              {t("services.cancel")}
            </Button>
            <Button disabled={isPosting} type="submit">
              {isPosting ? (
                <Loader size={14} />
              ) : (
                t("services.add_service_button")
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(Page);
