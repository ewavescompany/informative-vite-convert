import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Yup from "yup";
import InputTag from "@/pages/admin/blogs/inputTag";
import { useTranslation } from "react-i18next";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import { prompt } from "@/data/admin/prompt";
import AiHelp from "@/components/aiHelp";
import openAIIntegration from "@/requests/admin/open-ai-integration/openAIIntegration";
import Loading from "@/pages/client/loading";
import BlogContentAIDialog from "./BlogContnetAIDialog";
import { BotMessageSquare } from "lucide-react";

interface BlogFormValues {
  name: string;
  content: string;
  blogImg: File | null;
  tags: string[];
  metaDescription: string;
  metaKeywords: string;
  blogLang: string;
}

interface BlogFormProps {
  mode: "add" | "edit";
  initialValues: BlogFormValues;
  onSubmit: (values: BlogFormValues) => Promise<void>;
  loadingSubmitting: boolean;
}

const getValidationSchema = (
  t: (key: string) => string,
  mode: "add" | "edit"
) =>
  Yup.object({
    name: Yup.string().required(t("blogForm.name_required")),
    content: Yup.string().required(t("blogForm.content_required")),
    tags: Yup.array().min(1, t("blogForm.tag_required")),
    blogImg:
      mode === "add"
        ? Yup.mixed().required(t("blogForm.blog_image_required"))
        : Yup.mixed().nullable(),
    metaDescription: Yup.string().required(
      t("blogForm.meta_description_required")
    ),
    metaKeywords: Yup.string().required(t("blogForm.meta_keywords_required")),
    blogLang: Yup.string().required(t("blogForm.lang_required")),
  });

export function BlogForm({
  mode,
  initialValues,
  onSubmit,
  loadingSubmitting,
}: BlogFormProps) {
  const { t } = useTranslation();
  const [content, setContent] = useState(initialValues.content);
  const [tags, setTags] = useState<string[]>(initialValues.tags);
  // const [contentUsingAI, setContentUsingAI] = useState("");
  const [isContentAIDialogOpen, setIsContentAIDialogOpen] = useState(false);
  const [contentUsingAIStatus, setContentUsingAIStatus] = useState<
    "not-active" | "loading" | "done" | "error"
  >("not-active");

  const validationSchema = getValidationSchema(t, mode);

  const formik = useFormik<BlogFormValues>({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      tags: initialValues.tags || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  useEffect(() => {
    formik.setFieldValue("tags", tags);
  }, [tags]);

  useEffect(() => {
    setContent(formik.values.content);
  }, [formik.values.content]);

  function blogContentAIGeneration(content: string) {
    openAIIntegration(
      prompt.generate_blog_content,
      content,
      setContentUsingAIStatus,
      (content: string) => formik.setFieldValue("content", content)
    );
  }

  // useEffect(() => {
  //   formik.setFieldValue("metaKeywords", responseValue);
  // }, [responseValue]);

  return (
    <div className="max-w-[1200px] flex flex-col gap-5 capitalize">
      <DashboardTitle
        title={
          mode === "add" ? t("blogForm.add_blog") : t("blogForm.edit_blog")
        }
      />
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>
            {mode === "add"
              ? t("blogForm.create_blog")
              : t("blogForm.edit_blog")}
          </CardTitle>
          <CardDescription>{t("blogForm.fill_form")}</CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Tabs defaultValue="main_content" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-200 mb-4 rounded-lg p-1">
                <TabsTrigger value="main_content">
                  {t("blogForm.tabs.main_content")}
                </TabsTrigger>
                <TabsTrigger value="seo_content">
                  {t("blogForm.tabs.seo_content")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="main_content">
                <div className="flex flex-col w-full gap-4">
                  {/* Blog Name */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">{t("blogForm.name")}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      placeholder={t("blogForm.name_placeholder")}
                    />
                    {formik.errors.name && formik.touched.name && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <InputTag formik={formik} tags={tags} setTags={setTags} />

                  {/* Blog Image */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="blogImg">{t("blogForm.blog_image")}</Label>
                    <Input
                      type="file"
                      id="blogImg"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "blogImg",
                          event.currentTarget.files?.[0] || null
                        )
                      }
                    />
                    {formik.errors.blogImg && formik.touched.blogImg && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.blogImg as string}
                      </div>
                    )}
                  </div>

                  {/* Blog Content */}
                  <div className="flex flex-col space-y-1.5 w-full">
                    <BlogContentAIDialog
                      isOpen={isContentAIDialogOpen}
                      setIsOpen={setIsContentAIDialogOpen}
                      aiRequest={(content) => blogContentAIGeneration(content)}
                    />

                    <Label htmlFor="content">{t("blogForm.content")}</Label>
                    <div className="relative">
                      <ReactQuill
                        style={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                        }}
                        value={content}
                        onChange={(value) => {
                          setContent(value);
                          formik.setFieldValue("content", value);
                        }}
                        modules={{
                          toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["bold", "italic", "underline"],
                            ["link", "image"],
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
                          "image",
                        ]}
                      />
                      {formik.errors.content && formik.touched.content && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.content}
                        </div>
                      )}
                      {contentUsingAIStatus === "loading" && (
                        <div className="absolute top-0 bottom-0 right-0 left-0 backdrop-blur-sm bg-black/10 flex justify-center items-center z-10">
                          <Loading />
                        </div>
                      )}
                    </div>

                    <Button
                      size="sm"
                      className="w-fit px-3 bg-green-900 hover:bg-green-900/90 flex items-center gap-2"
                      type="button"
                      onClick={() => {
                        // blogContentAIGeneration();
                        setIsContentAIDialogOpen(true);
                      }}
                    >
                      <BotMessageSquare />
                      <span className="text-sm">
                        Generate blog content using AI
                      </span>
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo_content">
                <div className="flex flex-col w-full gap-4">
                  {/* Meta Description */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="metaDescription">
                      {t("blogForm.meta_description")}
                    </Label>
                    {
                      <AiHelp
                        prompt={prompt.generate_meta_description}
                        formikValue={formik.values.metaDescription}
                        formikSetValue={(content: string) =>
                          formik.setFieldValue("metaDescription", content)
                        }
                        type="description"
                        content={formik.values.content}
                      >
                        <Textarea
                          id="metaDescription"
                          name="metaDescription"
                          rows={5}
                          onChange={formik.handleChange}
                          value={formik.values.metaDescription}
                          placeholder={t(
                            "blogForm.meta_description_placeholder"
                          )}
                        />
                      </AiHelp>
                    }
                    {formik.errors.metaDescription &&
                      formik.touched.metaDescription && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.metaDescription}
                        </div>
                      )}
                  </div>
                  {/* Meta Keywords */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="metaKeywords">
                      {t("blogForm.meta_keywords")}
                    </Label>
                    <AiHelp
                      prompt={prompt.generate_meta_keywords_seo}
                      formikValue={formik.values.metaKeywords}
                      formikSetValue={(content: string) =>
                        formik.setFieldValue("metaKeywords", content)
                      }
                      type="keywords"
                      content={formik.values.content}
                    >
                      <Textarea
                        id="metaKeywords"
                        name="metaKeywords"
                        rows={4}
                        onChange={formik.handleChange}
                        value={formik.values.metaKeywords}
                        placeholder={t("blogForm.meta_keywords_placeholder")}
                      />
                    </AiHelp>
                    {formik.errors.metaKeywords &&
                      formik.touched.metaKeywords && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.metaKeywords}
                        </div>
                      )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-between items-end gap-4">
            {/* Language Select */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="blogLang">{t("blogForm.language_select")}</Label>
              <Select
                name="blogLang"
                value={formik.values.blogLang}
                onValueChange={(value) =>
                  formik.setFieldValue("blogLang", value)
                }
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
                <div className="text-red-500 text-sm">
                  {formik.errors.blogLang}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" type="button">
                {t("blogForm.cancel")}
              </Button>
              <Button type="submit" disabled={loadingSubmitting}>
                {loadingSubmitting ? "loading...." : t("blogForm.publish")}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
