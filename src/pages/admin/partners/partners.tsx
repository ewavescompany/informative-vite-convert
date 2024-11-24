import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { pageAdmin } from "@/data/admin/pagesURLs";
import Loading from "@/pages/client/loading";
import i18n from "@/i18n";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";

interface Partner {
  id: number;
  image: string;
  title_en: string;
  title_ar: string;
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(clientBaseServerUrl + serverUrls.partner);
        if (!response.ok) {
          throw new Error(t("partner.error_fetch_partner"));
        }
        const data = await response.json();
        setPartners(data);
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError(t("partner.error_fetch_partner"));
        toast({
          variant: "destructive",
          title: t("partner.error_fetch_partner"),
          description: t("partner.error.general"),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, [t]);

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("partner.partner_title")}</h1>
        <Link to={pageAdmin.partners.add}>
          <Button>{t("partner.add_partner")}</Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-6">
        {partners?.map((partner) => (
          <Card key={partner.id} className="w-96">
            <CardHeader>
              <CardTitle>
                {currentLang === "en" ? partner.title_en : partner.title_ar}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-32 overflow-hidden rounded-md border">
                <img
                  className="object-cover w-full h-full"
                  src={partner.image}
                  alt={
                    currentLang === "en" ? partner.title_en : partner.title_ar
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`${pageAdmin.partners.edit}/${partner.id}`}>
                <Button variant="outline">{t("partner.edit_partner")}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
