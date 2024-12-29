import axios from "axios";
import { TFunction } from "i18next";
import { toast } from "@/hooks/use-toast";

const token = localStorage.getItem("authToken");

export default async function postSEOData({
  body,
  t,
}: {
  body: {
    pages: {
      [x: string]: string;
      slug: string;
    }[];
  };
  t: TFunction<"translation", undefined>;
}) {
  try {
    const response = await axios.post(
      "https://v4.ewavespro.com/api/admin/seo/store",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response) {
      toast({
        title: t("seo_manage.messages.success_title"),
        description: t("seo_manage.messages.success_description"),
      });
    } else {
      toast({
        variant: "destructive",
        title: t("seo_manage.messages.failed_title"),
        description: t("seo_manage.messages.failed_description"),
      });
    }
    console.log("Response:", response.data);
  } catch (error) {
    toast({
      variant: "destructive",
      title: t("seo_manage.messages.failed_title"),
      description: t("seo_manage.messages.failed_description"),
    });
    console.error("Error:", error);
  }
}
