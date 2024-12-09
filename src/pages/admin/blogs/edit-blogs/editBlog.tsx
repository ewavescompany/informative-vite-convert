import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import withAuth from "@/hocs/withAuth";
import { editBlog } from "@/requests/admin/editBlog";
import useFetchBlogData from "@/hooks/dashboard/useFetchBlogData";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { pageAdmin } from "@/data/admin/pagesURLs";
import { BlogForm } from "@/pages/admin/blogs/components/BlogForm";

function EditBlogPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const locale = "en";
  const params = useParams<{ id: string }>();

  const { blogData, loading, error } = useFetchBlogData(
    Number(params.id),
    locale
  );
  const [loadingSubmitting, setLoadingSubmitting] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error || !blogData) return <div>Error loading blog data</div>;

  const initialValues = {
    name: locale === "en" ? blogData.title_en : blogData.title_ar,
    content: locale === "en" ? blogData.content_en : blogData.content_ar,
    blogImg: null,
    tags:
      (locale === "en" ? blogData.tags_en : blogData.tags_ar)
        ?.split(",")
        .map((tag: string) => tag.trim()) || [],
    metaDescription:
      locale === "en" ? blogData.description_en : blogData.description_ar,
    metaKeywords: locale === "en" ? blogData.keywords_en : blogData.keywords_ar,
    blogLang: locale,
  };

  const handleEdit = async (values: any) => {
    setLoadingSubmitting(true);
    const formData = new FormData();
    formData.append("id", params.id || "");
    formData.append("title", values.name);
    formData.append("content", values.content);
    formData.append("description", values.metaDescription);
    formData.append("keywords", values.metaKeywords);
    formData.append("lang", values.blogLang);
    formData.append("tags", values.tags.join(", "));

    if (values.blogImg) formData.append("image", values.blogImg);

    const token = localStorage.getItem("authToken");
    try {
      const response = await editBlog(formData, token || "");
      if (response?.data?.blog) {
        toast({
          title: t("blogForm.blog_added_successfully"),
          description: t("blogForm.blog_added_successfully_you_can_check_it"),
        });
        navigate(pageAdmin.blogs.manage);
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
      setLoadingSubmitting(false);
    }
  };

  return (
    <BlogForm
      mode="edit"
      initialValues={initialValues}
      onSubmit={handleEdit}
      loadingSubmitting={loadingSubmitting}
    />
  );
}

export default withAuth(EditBlogPage);
