import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Shadcn select components
import { useToast } from "@/hooks/use-toast"; // Toast for success or failure
import { useFetchSettings } from "@/hooks/dashboard/useFetchSettings";
import PageLoader from "@/customComponents/pageLoader";
// import { updateSettings } from "@/requests/admin/updateSettings";
import withAuth from "@//hocs/withAuth";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
// Yup validation schema

function SettingsPage() {
  const { setting, loading, error } = useFetchSettings();
  const { t } = useTranslation();
  const { toast } = useToast();
  const locale = i18n.language;

  const validationSchema = Yup.object({
    domain: Yup.string().required(t("settings.domain_required")),
    title: Yup.string().required(t("settings.title_required")),
    description: Yup.string().required(t("settings.description_required")),
    keywords: Yup.string().required(t("settings.keywords_required")),
    maint_mode: Yup.string().required(t("settings.maint_mode_required")),
    lang: Yup.string().required(t("settings.lang_required")),
    fav_logo: Yup.mixed()
      .nullable()
      .test("fileType", t("settings.fav_logo_file_type"), (value) =>
        value instanceof File
          ? ["image/png", "image/x-icon", "image/svg+xml"].includes(value.type)
          : true
      )
      .test("fileSize", t("settings.fav_logo_file_size"), (value) =>
        value instanceof File ? value.size <= 5 * 1024 * 1024 : true
      ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: setting
      ? {
          domain: setting.domain,
          title: locale === "en" ? setting.title_en : setting.title_ar || "",
          description:
            locale === "en"
              ? setting.description_en
              : setting.description_ar || "",
          keywords:
            locale === "en" ? setting.keywords_en : setting.keywords_ar || "",
          maint_mode: setting.maint_mode === "1" ? "on" : "off",
          facebook: setting.social_facebook,
          twitter: setting.social_x,
          insta: setting.social_insta,
          linkedin: setting.social_linkedin,
          snap: setting.social_snap,
          tiktok: setting.social_tiktok,
          lang: "en",
          fav_logo: null as File | null, // Explicitly set type
        }
      : {
          domain: "",
          title: "",
          description: "",
          keywords: "",
          maint_mode: "off",
          facebook: "",
          twitter: "",
          insta: "",
          linkedin: "",
          snap: "",
          tiktok: "",
          lang: "en",
          fav_logo: null as File | null, // Explicitly set type
        },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("domain", values.domain);
        formData.append("title", values.title || "");
        formData.append("description", values.description || "");
        formData.append("keywords", values.keywords || "");
        formData.append(
          "maint_mode",
          values.maint_mode === "on" ? "on" : "off"
        );
        formData.append("facebook", values.facebook || "");
        formData.append("twitter", values.twitter || "");
        formData.append("insta", values.insta || "");
        formData.append("linkedin", values.linkedin || "");
        formData.append("snap", values.snap || "");
        formData.append("tiktok", values.tiktok || "");
        formData.append("lang", values.lang);
        formData.append("default_lang", "en");

        // Safely append fav_logo
        if (values.fav_logo instanceof File) {
          formData.append("fav_logo", values.fav_logo);
        }

        // const token = localStorage.getItem("authToken");
        // const res = await updateSettings(formData, token || "");
        toast({
          title: t("settings.form_success"),
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: t("settings.form_failure"),
        });
      }
    },
  });

  if (loading) return <PageLoader />;
  if (error)
    return (
      <div>
        {t("settings.error")}: {error}
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <h1 className="text-2xl font-bold">{t("settings.update_settings")}</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {/* Domain */}
        <div>
          <Label htmlFor="domain">{t("settings.domain")}</Label>
          <Input
            id="domain"
            name="domain"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.domain}
            placeholder={t("settings.domain")}
          />
          {formik.errors.domain && formik.touched.domain && (
            <div className="text-red-500">{formik.errors.domain}</div>
          )}
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="title">{t("settings.title")}</Label>
          <Input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title ? formik.values.title : ""}
            placeholder={t("settings.title")}
          />
          {formik.errors.title && formik.touched.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">{t("settings.description")}</Label>
          <Input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description ? formik.values.description : ""}
            placeholder={t("settings.description")}
          />
          {formik.errors.description && formik.touched.description && (
            <div className="text-red-500">{formik.errors.description}</div>
          )}
        </div>

        {/* Keywords */}
        <div>
          <Label htmlFor="keywords">{t("settings.keywords")}</Label>
          <Input
            id="keywords"
            name="keywords"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.keywords ? formik.values.keywords : ""}
            placeholder={t("settings.keywords")}
          />
          {formik.errors.keywords && formik.touched.keywords && (
            <div className="text-red-500">{formik.errors.keywords}</div>
          )}
        </div>

        {/* fav_logo Field */}
        <div>
          <Label htmlFor="fav_logo">{t("settings.fav_logo")}</Label>
          <Input
            id="fav_logo"
            name="fav_logo"
            type="file"
            accept=".png,.ico,.svg"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              formik.setFieldValue("fav_logo", file);
            }}
          />
          {formik.errors.fav_logo && formik.touched.fav_logo && (
            <div className="text-red-500">{formik.errors.fav_logo}</div>
          )}
          {setting?.fav_logo && (
            <div className="mt-2">
              <Label>{t("settings.current_fav_logo")}</Label>
              <img
                src={setting.fav_logo}
                alt={t("settings.fav_logo_preview")}
                className="w-10 h-10 rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Maintenance Mode (Select Box) */}
        <div>
          <Label htmlFor="maint_mode">{t("settings.maint_mode")}</Label>
          <Select
            name="maint_mode"
            value={formik.values.maint_mode}
            onValueChange={(value) => formik.setFieldValue("maint_mode", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("settings.maint_mode")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on">{t("settings.on")}</SelectItem>
              <SelectItem value="off">{t("settings.off")}</SelectItem>
            </SelectContent>
          </Select>
          {formik.errors.maint_mode && formik.touched.maint_mode && (
            <div className="text-red-500">{formik.errors.maint_mode}</div>
          )}
        </div>

        <hr />
        {/* Social Links */}
        <h3>{t("settings.social_links")}</h3>
        <div>
          <Label htmlFor="facebook">{t("settings.facebook")}</Label>
          <Input
            id="facebook"
            name="facebook"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.facebook}
            placeholder={t("settings.facebook")}
          />
        </div>

        <div>
          <Label htmlFor="twitter">{t("settings.twitter")}</Label>
          <Input
            id="twitter"
            name="twitter"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.twitter}
            placeholder={t("settings.twitter")}
          />
        </div>

        <div>
          <Label htmlFor="insta">{t("settings.insta")}</Label>
          <Input
            id="insta"
            name="insta"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.insta}
            placeholder={t("settings.insta")}
          />
        </div>

        <div>
          <Label htmlFor="linkedin">{t("settings.linkedin")}</Label>
          <Input
            id="linkedin"
            name="linkedin"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.linkedin}
            placeholder={t("settings.linkedin")}
          />
        </div>

        <div>
          <Label htmlFor="snap">{t("settings.snap")}</Label>
          <Input
            id="snap"
            name="snap"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.snap}
            placeholder={t("settings.snap")}
          />
        </div>

        <div>
          <Label htmlFor="tiktok">{t("settings.tiktok")}</Label>
          <Input
            id="tiktok"
            name="tiktok"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.tiktok}
            placeholder={t("settings.tiktok")}
          />
        </div>

        {/* Language (Select Box) */}
        <div>
          <Label htmlFor="lang">{t("settings.language")}</Label>
          <Select
            name="lang"
            value={formik.values.lang}
            onValueChange={(value) => formik.setFieldValue("lang", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("settings.language")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
            </SelectContent>
          </Select>
          {formik.errors.lang && formik.touched.lang && (
            <div className="text-red-500">{formik.errors.lang}</div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => formik.resetForm()}
          >
            {t("settings.cancel")}
          </Button>
          <Button type="submit">{t("settings.update")}</Button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(SettingsPage);
