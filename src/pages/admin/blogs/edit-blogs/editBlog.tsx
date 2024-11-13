"use client";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import { useState, useEffect } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Textarea } from "@/components/ui/textarea";
// import Cookies from "js-cookie";
import useFetchBlogData from "@/hooks/dashboard/useFetchBlogData"; // Custom hook
import { editBlog } from "@/requests/admin/editBlog"; // Import the editBlog function
import { useNavigate, useParams } from "react-router-dom"; // Import correct hook for client component
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import withAuth from "@/hocs/withAuth";
import { toast } from "@/hooks/use-toast";
import InputTag from "../inputTag";
import { useTranslation } from "react-i18next";
// Validation Schema

interface BlogFormValues {
  blogLang: string;
  name: string;
  content: string;
  blogImg: File | null;
  tags: string[];
  metaDescription: string;
  metaKeywords: string;
}

function EditBlogPage() {
  const navigate = useNavigate(); // Replace `useRouter` with `useNavigate`
  const { t } = useTranslation(); // Access translations for the blog form
  const locale = "en"; // Get language from cookies
  const params = useParams<{ id: string }>();

  const { blogData, loading, error } = useFetchBlogData(
    Number(params.id),
    locale
  );

  const [content, setContent] = useState(""); // Quill content state
  const [tags, setTags] = useState<string[]>([]); // State for tags management
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (blogData) {
      setContent(locale === "en" ? blogData.content_en : blogData.content_ar);
      setTags(
        blogData
          ? locale === "en"
            ? blogData.tags_en?.split(",").map((tag: string) => tag.trim()) // Convert string to array and trim spaces
            : blogData.tags_ar?.split(",").map((tag: string) => tag.trim()) // Convert string to array and trim spaces
          : []
      );
    }
  }, [blogData, locale]);

  const validationSchema = Yup.object({
    name: Yup.string().required(t("blogForm.name_required")),
    content: Yup.string().required(t("blogForm.content_required")),
    tags: Yup.array().min(1, t("blogForm.tag_required")),
    metaDescription: Yup.string().required(
      t("blogForm.blogForm.meta_description_required")
    ),
    metaKeywords: Yup.string().required(
      t("blogForm.blogForm.meta_keywords_required")
    ),
    blogLang: Yup.string().required(t("blogForm.lang_required")),
  });

  const formik = useFormik<BlogFormValues>({
    enableReinitialize: true,
    initialValues: {
      blogLang: "",
      name: blogData
        ? locale === "en"
          ? blogData.title_en
          : blogData.title_ar
        : "",
      content: blogData
        ? locale === "en"
          ? blogData.content_en
          : blogData.content_ar
        : "",
      blogImg: null,
      tags: blogData
        ? locale === "en"
          ? blogData.tags_en?.split(",").map((tag: string) => tag.trim())
          : blogData.tags_ar?.split(",").map((tag: string) => tag.trim())
        : [],
      metaDescription: blogData
        ? locale === "en"
          ? blogData.description_en
          : blogData.description_ar
        : "",
      metaKeywords: blogData
        ? locale === "en"
          ? blogData.keywords_en
          : blogData.keywords_ar
        : "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setPosting(true);
      const formData = new FormData();
      formData.append("id", params.id || "");
      formData.append("title", values.name);
      formData.append("content", values.content);
      formData.append("description", values.metaDescription);
      formData.append("keywords", values.metaKeywords);
      formData.append("lang", values.blogLang);
      formData.append("tags", values.tags.join(", "));
      if (values.blogImg) {
        formData.append("image", values.blogImg);
      }
      const token = localStorage.getItem("authToken");
      try {
        const response = await editBlog(formData, token || "");
        if (response?.data?.blog) {
          toast({
            title: t("blogForm.blog_added_successfully"),
            description: t("blogForm.blog_added_successfully_you_can_check_it"),
          });
          navigate("/admin/dashboard/blogs");
          setTags([]);
        } else {
          toast({
            variant: "destructive",
            title: t("blogForm.blog_adding_failed"),
            description: response?.error,
          });
        }
      } catch (error) {
        console.error("Error updating blog:", error);
        toast({
          variant: "destructive",
          title: t("blogForm.blog_adding_failed"),
          description: "Error happened when editing blog",
        });
      } finally {
        setPosting(false);
      }
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog data</div>;

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <DashboardTitle title={t("blogForm.edit_blog")} />

      {/* Language Selection */}

      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("blogForm.edit_blog")}</CardTitle>
          <CardDescription>{t("blogForm.fill_form")}</CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
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
                    {typeof formik.errors.name === "string"
                      ? formik.errors.name
                      : JSON.stringify(formik.errors.name)}
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
                    {typeof formik.errors.blogImg === "string"
                      ? formik.errors.blogImg
                      : JSON.stringify(formik.errors.blogImg)}
                  </div>
                )}
              </div>

              {/* Blog Meta Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="metaDescription">
                  {t("blogForm.meta_description")}
                </Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows={5}
                  onChange={formik.handleChange}
                  value={formik.values.metaDescription}
                  placeholder={t("blogForm.meta_description_placeholder")}
                />
                {formik.errors.metaDescription &&
                  formik.touched.metaDescription && (
                    <div className="text-red-500 text-sm">
                      {typeof formik.errors.metaDescription === "string"
                        ? formik.errors.metaDescription
                        : JSON.stringify(formik.errors.metaDescription)}
                    </div>
                  )}
              </div>

              {/* Blog Meta Keywords */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="metaKeywords">
                  {t("blogForm.meta_keywords")}
                </Label>
                <Textarea
                  id="metaKeywords"
                  name="metaKeywords"
                  rows={5}
                  onChange={formik.handleChange}
                  value={formik.values.metaKeywords}
                  placeholder={t("blogForm.meta_keywords_placeholder")}
                />
                {formik.errors.metaKeywords && formik.touched.metaKeywords && (
                  <div className="text-red-500 text-sm">
                    {typeof formik.errors.metaKeywords === "string"
                      ? formik.errors.metaKeywords
                      : JSON.stringify(formik.errors.metaKeywords)}
                  </div>
                )}
              </div>

              {/* Blog Content with React Quill */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">{t("blogForm.content")}</Label>
                <ReactQuill
                  value={content}
                  onChange={(value) => {
                    setContent(value);
                    formik.setFieldValue("content", value); // Update Formik state with Quill content
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
                    {typeof formik.errors.content === "string"
                      ? formik.errors.content
                      : JSON.stringify(formik.errors.content)}
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="blogLang">
                  {t("blogForm.language_select")}
                </Label>
                <Select
                  name="blogLang"
                  value={formik.values.blogLang}
                  onValueChange={(value) =>
                    formik.setFieldValue("blogLang", value)
                  } // Handling Formik state
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
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              {t("blogForm.cancel")}
            </Button>
            <Button type="submit" disabled={posting}>
              {posting ? "loading..." : t("blogForm.publish")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(EditBlogPage);
