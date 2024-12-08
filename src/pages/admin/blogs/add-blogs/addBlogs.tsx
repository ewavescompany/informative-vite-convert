import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import withAuth from "@/hocs/withAuth";
import { sendBlog } from "@/requests/admin/addBlog";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { pageAdmin } from "@/data/admin/pagesURLs";
import { BlogForm } from "@/components/blog/BlogForm";

function AddBlogPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loadingSubmitting, setLoadingSubmitting] = useState(false);

  const initialValues = {
    name: "",
    content: "",
    blogImg: null,
    tags: [],
    metaDescription: "",
    metaKeywords: "",
    blogLang: "",
  };

  const handleAdd = async (values: any) => {
    setLoadingSubmitting(true);
    const formData = new FormData();
    formData.append("title", values.name);
    formData.append("content", values.content);
    formData.append("description", values.metaDescription);
    formData.append("keywords", values.metaKeywords);
    formData.append("lang", values.blogLang);
    formData.append("tags", values.tags.join(", "));
    if (values.blogImg) formData.append("image", values.blogImg);

    const token = localStorage.getItem("authToken");
    try {
      const response = await sendBlog(formData, token || "");
      if (response.success) {
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
      console.error("Error submitting blog:", error);
      toast({
        variant: "destructive",
        title: t("blogForm.blog_adding_failed"),
        description: "Error happened when adding blog",
      });
    } finally {
      setLoadingSubmitting(false);
    }
  };

  return (
    <BlogForm
      mode="add"
      initialValues={initialValues}
      onSubmit={handleAdd}
      loadingSubmitting={loadingSubmitting}
    />
  );
}

export default withAuth(AddBlogPage);
