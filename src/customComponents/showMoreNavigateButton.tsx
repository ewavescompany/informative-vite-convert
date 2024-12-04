import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function ShowMoreNavigateButton({
  navigateTo,
}: {
  navigateTo: string;
}) {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  return (
    <Link to={navigateTo}>
      <Button className="flex items-center gap-2 bg-slate-800">
        <span className="text-base">
          {locale === "en" ? "Show more" : "معرفة المزيد"}{" "}
        </span>
        <SquareArrowOutUpRight size={16} />
      </Button>
    </Link>
  );
}
