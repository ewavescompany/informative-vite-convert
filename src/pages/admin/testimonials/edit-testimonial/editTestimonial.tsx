"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useToast } from "@/hooks/use-toast";
import { updateTestimonial } from "@/requests/admin/updateTestimonial"; // Import the update request function
import { useFetchTestimonial } from "@/hooks/dashboard/fetchTestimonialById"; // Hook to fetch testimonial
import { useNavigate, useParams } from "react-router-dom"; // Assuming you're using next/navigation for getting the ID
import PageLoader from "@/customComponents/pageLoader";
import withAuth from "@/hocs/withAuth";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { pageAdmin } from "@/data/admin/pagesURLs";

function EditTestimonialPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>(); // Get the testimonial ID from the URL params
  const { testimonial, loading } = useFetchTestimonial(params?.id || "");
  const { toast } = useToast();
  const locale = i18n.language;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required(t("testimonials.name_required")),
    message: Yup.string().required(t("testimonials.message_required")),
    company: Yup.string().required(t("testimonials.company_required")),
    lang: Yup.string().required(t("testimonials.language_required")),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: testimonial
      ? {
          name: testimonial?.name || "",
          message:
            locale === "en"
              ? testimonial?.message_en
              : testimonial?.message_ar || "",
          company: testimonial?.company || "",
          lang: "",
          image: null,
        }
      : {
          name: "",
          message: "",
          company: "",
          lang: "en",
          image: null,
        },
    enableReinitialize: true, // Allow form to be reinitialized when the testimonial data is fetched
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true); // Set loading state

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("message", values.message);
      formData.append("company", values.company);
      formData.append("lang", values.lang);
      formData.append("id", params.id || "");
      if (values.image) {
        formData.append("image", values.image); // Append image if available
      }

      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
      try {
        const response = await updateTestimonial(formData, token || "");
        if (response.data) {
          toast({
            title: t("testimonials.testimonial_added_successfully"),
            description: t("testimonials.testimonial_added_check"),
          });

          //navigate to show all testimonial page when request done will
          navigate(pageAdmin.testimonials.manage);
        } else {
          toast({
            variant: "destructive",
            title: t("testimonials.testimonial_add_failed"),
            description: response?.error,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("testimonials.testimonial_update_failed"),
        });
        console.error("Failed to update testimonial:", error);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    },
  });

  // Handle image change and preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setPreviewImage(file);
      formik.setFieldValue("image", file); // Update formik state with the image
    }
  };

  if (loading) return <PageLoader />; // Display loader while fetching the data

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("testimonials.edit_testimonial")}</CardTitle>
          <CardDescription>
            {t("testimonials.fill_form_to_edit_testimonial")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col w-full gap-4">
              {/* Name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{t("testimonials.name")}</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder={t("testimonials.name_placeholder")}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              {/* Company */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="company">{t("testimonials.company")}</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.company}
                  placeholder={t("testimonials.company_placeholder")}
                />
                {formik.errors.company && formik.touched.company && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.company}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">{t("testimonials.message")}</Label>
                <Input
                  id="message"
                  name="message"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  placeholder={t("testimonials.message_placeholder")}
                />
                {formik.errors.message && formik.touched.message && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.message}
                  </div>
                )}
              </div>

              {/* Image Upload */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">{t("testimonials.upload_image")}</Label>
                <Input
                  className="pt-[6px]"
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewImage && (
                  <div className="mt-2 relative w-48 h-48">
                    <img
                      src={URL.createObjectURL(previewImage)}
                      alt="Image preview"
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

              {/* Language */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lang">
                  {t("testimonials.language_select")}
                </Label>
                <Select
                  name="lang"
                  value={formik.values.lang}
                  onValueChange={(value) => formik.setFieldValue("lang", value)} // Handling Formik state
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={t("testimonials.language_select")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {t("testimonials.language_select")}
                      </SelectLabel>
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
            <Button
              variant="outline"
              type="button"
              onClick={() => formik.resetForm()}
            >
              {t("testimonials.cancel")}
            </Button>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "loading..." : t("testimonials.submit")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(EditTestimonialPage);
