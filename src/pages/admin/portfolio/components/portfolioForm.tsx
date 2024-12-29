import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { X } from "lucide-react";
import { useFormik, FormikHelpers } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getValidationSchema } from "../validation/portfolioSchema";
import { useTranslation } from "react-i18next";
import { PortfolioFormValues } from "../types/portfolio";
import AiHelp from "@/components/aiHelp";
import { prompt } from "@/data/admin/prompt";

interface PortfolioFormProps {
  initialValues?: PortfolioFormValues;
  onSubmit: (
    values: PortfolioFormValues,
    formikHelpers: FormikHelpers<PortfolioFormValues>
  ) => Promise<void>;
  formType: string;
  isSubmitting?: boolean;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({
  initialValues,
  onSubmit,
  formType = "add",
  isSubmitting = false,
}) => {
  const { t } = useTranslation();

  const formik = useFormik<PortfolioFormValues>({
    initialValues: initialValues || {
      title: "",
      content: "",
      keywords: "",
      description: "",
      status: "",
      client: "",
      startDate: "",
      endDate: "",
      websiteLink: "",
      mainImage: null,
      images: [],
      lang: "",
    },
    validationSchema: getValidationSchema(t),
    onSubmit,
  });

  const [content, setContent] = useState<string>(formik.values.content);
  const [previewImages, setPreviewImages] = useState<File[]>(
    formik.values.images || []
  );
  const [mainImagePreview, setMainImagePreview] = useState<File | null>(
    formik.values.mainImage
  );

  // Handle additional images upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      const fileArray = Array.from(files);
      setPreviewImages((prev) => [...prev, ...fileArray]);
      formik.setFieldValue("images", [...formik.values.images, ...fileArray]);
    }
  };

  // Handle main image upload
  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0] || null;
    setMainImagePreview(file);
    formik.setFieldValue("mainImage", file);
  };

  // Remove an additional image
  const removeImage = (index: number) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
    formik.setFieldValue("images", updatedImages);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    formik.setFieldValue("content", value);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{t(`portfolio.form.${formType}.title`)}</CardTitle>
        <CardDescription>
          {t(`portfolio.form.${formType}.description`)}
        </CardDescription>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <div className="flex flex-col w-full gap-4">
            {/* Title */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">{t("portfolio.form.label.title")}</Label>
              <Input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder={t("portfolio.form.placeholder.title")}
              />
              {formik.errors.title && formik.touched.title && (
                <div className="text-red-500 text-sm">
                  {formik.errors.title}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">
                {t("portfolio.form.label.description")}
              </Label>
              <AiHelp
                prompt={prompt.generate_meta_description}
                content={formik.values.content}
                formikValue={formik.values.description}
                formikSetValue={(content: string) =>
                  formik.setFieldValue("description", content)
                }
                type="description"
              >
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  placeholder={t("portfolio.form.placeholder.description")}
                />
              </AiHelp>
              {formik.errors.description && formik.touched.description && (
                <div className="text-red-500 text-sm">
                  {formik.errors.description}
                </div>
              )}
            </div>

            {/* ReactQuill for Content */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">
                {t("portfolio.form.label.content")}
              </Label>
              <ReactQuill
                value={content}
                onChange={handleContentChange}
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline"],
                    ["link"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "list",
                  "bold",
                  "italic",
                  "underline",
                  "link",
                ]}
                placeholder={t("portfolio.form.placeholder.content")}
              />
              {formik.errors.content && formik.touched.content && (
                <div className="text-red-500 text-sm">
                  {formik.errors.content}
                </div>
              )}
            </div>

            {/* Keywords */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="keywords">
                {t("portfolio.form.label.keywords")}
              </Label>
              <AiHelp
                prompt={prompt.generate_meta_keywords_seo}
                content={formik.values.content}
                formikValue={formik.values.keywords}
                formikSetValue={(content: string) =>
                  formik.setFieldValue("keywords", content)
                }
                type="keywords"
              >
                <Textarea
                  id="keywords"
                  name="keywords"
                  rows={3}
                  onChange={formik.handleChange}
                  value={formik.values.keywords}
                  placeholder={t("portfolio.form.placeholder.keywords")}
                />
              </AiHelp>
              {formik.errors.keywords && formik.touched.keywords && (
                <div className="text-red-500 text-sm">
                  {formik.errors.keywords}
                </div>
              )}
            </div>

            {/* Client */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="client">{t("portfolio.form.label.client")}</Label>
              <Input
                id="client"
                name="client"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.client}
                placeholder={t("portfolio.form.placeholder.client")}
              />
              {formik.errors.client && formik.touched.client && (
                <div className="text-red-500 text-sm">
                  {formik.errors.client}
                </div>
              )}
            </div>

            {/* Status */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">{t("portfolio.form.label.status")}</Label>
              <Select
                onValueChange={(value) => formik.setFieldValue("status", value)}
                value={formik.values.status}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t("portfolio.form.placeholder.select")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">
                    {t("portfolio.form.select_val.completed")}
                  </SelectItem>
                  <SelectItem value="ongoing">
                    {t("portfolio.form.select_val.ongoing")}
                  </SelectItem>
                </SelectContent>
              </Select>
              {formik.errors.status && formik.touched.status && (
                <div className="text-red-500 text-sm">
                  {formik.errors.status}
                </div>
              )}
            </div>

            {/* Start Date */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="startDate">
                {t("portfolio.form.label.start_date")}
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.startDate}
              />
              {formik.errors.startDate && formik.touched.startDate && (
                <div className="text-red-500 text-sm">
                  {formik.errors.startDate}
                </div>
              )}
            </div>

            {/* End Date */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endDate">
                {t("portfolio.form.label.end_date")}
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.endDate}
              />
              {formik.errors.endDate && formik.touched.endDate && (
                <div className="text-red-500 text-sm">
                  {formik.errors.endDate}
                </div>
              )}
            </div>

            {/* Website Link */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="websiteLink">
                {t("portfolio.form.label.website_link")}
              </Label>
              <Input
                id="websiteLink"
                name="websiteLink"
                type="url"
                onChange={formik.handleChange}
                value={formik.values.websiteLink}
                placeholder="https://"
              />
              {formik.errors.websiteLink && formik.touched.websiteLink && (
                <div className="text-red-500 text-sm">
                  {formik.errors.websiteLink}
                </div>
              )}
            </div>

            {/* Main Image Upload */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mainImage">
                {t("portfolio.form.label.main_image")}
              </Label>
              <Input
                type="file"
                id="mainImage"
                accept="image/*"
                onChange={handleMainImageChange}
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
              {formik.errors.mainImage && formik.touched.mainImage && (
                <div className="text-red-500 text-sm">
                  {formik.errors.mainImage}
                </div>
              )}
            </div>

            {/* Additional Images Upload */}
            <div className="flex flex-col space-y-1.5 ">
              <Button
                type="button"
                className="w-fit"
                size={"default"}
                variant="outline"
                onClick={() =>
                  document.getElementById("additionalImages")?.click()
                }
              >
                {t("portfolio.form.label.additional_images")}
              </Button>
              <Input
                type="file"
                id="additionalImages"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <X
                      size={20}
                      className="absolute top-0 right-0 text-red-500 cursor-pointer"
                      onClick={() => removeImage(index)}
                    />
                  </div>
                ))}
              </div>
              {formik.errors.images &&
                formik.touched.images &&
                typeof formik.errors.images === "string" && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.images}
                  </div>
                )}
            </div>

            {/* Language Selection */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lang">{t("portfolio.form.label.language")}</Label>
              <Select
                name="lang"
                value={formik.values.lang}
                onValueChange={(value) => formik.setFieldValue("lang", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t(
                      "portfolio.form.placeholder.language_select"
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {t("portfolio.form.placeholder.language_select")}
                    </SelectLabel>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formik.errors.lang && formik.touched.lang && (
                <div className="text-red-500 text-sm">{formik.errors.lang}</div>
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
            {t("portfolio.form.buttons.cancel")}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t("portfolio.form.buttons.Submitting_loading")
              : t("portfolio.form.buttons.submit")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PortfolioForm;
