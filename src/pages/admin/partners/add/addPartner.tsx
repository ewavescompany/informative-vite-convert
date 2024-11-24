import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sendPartners } from "@/requests/admin/addPartners";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  title: Yup.string().required((t) => t("partner.validation.title_required")),
  image: Yup.mixed().required((t) => t("partner.validation.image_required")),
});

export default function AddPartnerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("title", values.title);
    formData.append("lang", "en");

    try {
      const response = await sendPartners(formData);

      if (response.success) {
        toast({
          title: t("partner.success.added"),
          description: t("partner.success.added_description"),
        });
        resetForm();
      } else {
        toast({
          variant: "destructive",
          title: t("partner.error.adding"),
          description: response?.error || t("partner.error.general"),
        });
      }
    } catch (error) {
      console.error("Error submitting partner:", error);
      toast({
        variant: "destructive",
        title: t("partner.error.adding"),
        description: t("partner.error.general"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>{t("partner.create")}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {t("partner.form_description_create")}
        </p>
        <Formik
          initialValues={{ title: "", image: null }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <Label htmlFor="title">{t("partner.title_label")}</Label>
                <Field
                  as={Input}
                  id="title"
                  name="title"
                  placeholder={t("partner.title_label")}
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <Label htmlFor="image">{t("partner.image_label")}</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files?.[0]);
                  }}
                />
                {errors.image && touched.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {t("partner.image_hint")}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  {t("partner.cancel_button")}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? t("partner.submit_button_adding_loading")
                    : t("partner.submit_button_add")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
