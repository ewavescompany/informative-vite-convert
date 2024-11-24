import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { getPartner } from "@/requests/admin/getPartner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updatePartner } from "@/requests/admin/updatePartner";

interface Partner {
  id: number;
  image: string;
  title_en: string;
  title_ar: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Partner title is required."),
});

export default function EditPartnerPage() {
  const [partnerData, setPartnerData] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPartnerData = async () => {
      if (!id) return;

      try {
        const response = await getPartner(id);
        if (response.success) {
          setPartnerData(response.data);
        } else {
          toast({
            variant: "destructive",
            title: t("partner.error.fetching"),
            description: t("partner.error.general"),
          });
        }
      } catch (error) {
        console.error("Error fetching partner data:", error);
        toast({
          variant: "destructive",
          title: t("partner.error.fetching"),
          description: t("partner.error.general"),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartnerData();
  }, [id, t]);

  const handleSubmit = async (values: any) => {
    if (!id) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", values.title);
    formData.append("lang", "en");
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await updatePartner(formData);

      if (response.success) {
        toast({
          title: t("partner.success.updated"),
          description: t("partner.success.updated"),
        });
      } else {
        toast({
          variant: "destructive",
          title: t("partner.error.updating"),
          description: response?.error || t("partner.error.general"),
        });
      }
    } catch (error) {
      console.error("Error updating partner:", error);
      toast({
        variant: "destructive",
        title: t("partner.error.updating"),
        description: t("partner.error.general"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  if (!partnerData || !id) {
    return <p className="text-red-500">{t("partner.error.fetching")}</p>;
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>{t("partner.edit")}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {t("partner.form_description_edit")}
        </p>
        <Formik
          initialValues={{
            title: partnerData.title_en || "",
            image: null,
          }}
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
                <p className="text-sm text-muted-foreground mt-1">
                  {t("partner.image_hint")}
                </p>
                {partnerData.image && (
                  <div className="mt-2 w-full h-40">
                    <img
                      src={partnerData.image}
                      alt={partnerData.title_en}
                      className="w-full h-full object-cover border rounded-md"
                    />
                  </div>
                )}
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
                    ? t("loading")
                    : t("partner.submit_button_edit")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
