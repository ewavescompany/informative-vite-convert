import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import withAuth from "@/hocs/withAuth";
import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls";
import { useTranslation } from "react-i18next";

const urlGet = `${dashboardBaseServerUrl}${adminServerUrls.getLogo}`; // Your portfolio API endpoint
const urlUpdate = `${dashboardBaseServerUrl}${adminServerUrls.uploadLogo}`; // Your portfolio API endpoint

const LogoPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string | null>(null); // For displaying preview

  const validationSchema = Yup.object({
    logo: Yup.mixed()
      .required(t("nav_logo.logo_required"))
      .test("nav_logo.fileType", t("nav_logo.logo_invalid_type"), (value) =>
        value instanceof File
          ? [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/x-icon",
            ].includes(value.type)
          : false
      ),
  });

  // Fetch existing logo if available
  useEffect(() => {
    async function fetchLogo() {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(urlGet, {
          headers: {
            Authorization: `Bearer ${token || ""}`,
          },
        });
        if (response) {
          console.log(response.data);
          setLogoPreview(response.data); // Set preview to existing logo
        }
      } catch (error) {
        console.error("Failed to fetch logo:", error);
      }
    }
    fetchLogo();
  }, []);

  const formik = useFormik({
    initialValues: {
      logo: null as File | null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.logo) {
        formData.append("logo", values.logo);
      }
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.post(urlUpdate, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token || ""}`,
          },
        });

        if (response.status === 200) {
          toast({
            title: t("nav_logo.logo_upload_success"),
            description: t("nav_logo.logo_uploaded_successfully"),
          });

          // Display the new logo as a preview
          if (values.logo) {
            setLogoPreview(URL.createObjectURL(values.logo));
          }
        } else {
          throw new Error(t("nav_logo.logo_upload_failed"));
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : t("nav_logo.unexpected_error");

        toast({
          variant: "destructive",
          title: t("nav_logo.error"),
          description: errorMessage,
        });

        console.error("Failed to upload logo:", error);
      }
    },
  });

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("logo", file);
      setLogoPreview(URL.createObjectURL(file)); // Display preview
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("nav_logo.add_logo")}</CardTitle>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col space-y-4">
              {/* Logo Upload */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="logo">{t("nav_logo.logo")}</Label>
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  accept=".jpg, .jpeg, .png, .svg, .ico"
                  onChange={handleLogoChange}
                />
                {formik.touched.logo && formik.errors.logo && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.logo}
                  </div>
                )}
              </div>

              {/* Logo Preview */}
              {logoPreview && (
                <div className="mt-4">
                  <Label>{t("nav_logo.logo_preview")}</Label>
                  <div className="w-48 h-20 relative mt-2 bg-gray-700 rounded-md overflow-hidden border">
                    <img
                      // width={300}
                      // height={300}
                      className="w-full h-full object-cover"
                      src={logoPreview}
                      alt="Logo preview"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              {t("nav_logo.cancel")}
            </Button>
            <Button type="submit">{t("nav_logo.submit")}</Button>{" "}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default withAuth(LogoPage);
