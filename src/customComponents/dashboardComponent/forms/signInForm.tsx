import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Loader from "@/customComponents/loader";
import { useToast } from "@/hooks/use-toast";
import { loginAdmin } from "@/requests/admin/login";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { pageAdmin } from "@/data/admin/pagesURLs";

// Yup schema for form validation using translations
export default function SignInForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Yup schema for validation with translated messages
  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("login.email_invalid"))
      .required(t("email_required")),
    password: Yup.string()
      .min(6, t("login.password_min_length"))
      .required(t("login.password_required")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema, // Use Yup schema for validation
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const result = await loginAdmin(values.email, values.password);
        setLoading(false);
        if (result.success) {
          toast({
            title: t("login.login_complete"),
            description: t("login.login_complete_description"),
          });
          localStorage.setItem(
            "authToken",
            result?.data?.token ? result?.data?.token : ""
          );
          // setTimeout(() => {
          navigate(pageAdmin.about_us.main);
          // }, 3000);
        }
        if (!result.success) {
          toast({
            variant: "destructive",
            title: t("login.login_failed"),
            description: result?.error,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("login.login_failed"),
          // description: result?.error,
        });
        console.error(error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="h-full flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">{t("login.sign_in")}</h1>
          <p className="text-balance text-sm text-muted-foreground">
            {t("login.description")}
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t("login.email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("login.placeholder_email")}
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">{t("login.password")}</Label>
            <Input
              placeholder={t("login.placeholder_password")}
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <Button disabled={loading} type="submit" className="w-full">
            {loading ? <Loader size={16} /> : t("login.sign_in")}
          </Button>
        </form>
      </div>
    </div>
  );
}
