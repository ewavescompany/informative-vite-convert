import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MetaTagsForm from "./form";
import { useTranslation } from "react-i18next";

export default function MetaTagsPage() {
  const { t } = useTranslation();

  return (
    <Card className="container mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          {t("seo_manage.title")}
        </CardTitle>
        <CardDescription>{t("seo_manage.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <MetaTagsForm />
      </CardContent>
    </Card>
  );
}
