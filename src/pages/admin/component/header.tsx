import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { changeLanguage } from "i18next";
import i18n from "@/i18n";
import { Link, useNavigate } from "react-router-dom";
import { pageAdmin } from "@/data/admin/pagesURLs";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const savedLanguage =
  localStorage.getItem("i18nextLng") || i18n.language || "en";

function Header() {
  const [currentLang, setCurrentLang] = useState<"en" | "ar">(
    savedLanguage as "ar" | "en"
  );
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleLanguageChange = (lang: "en" | "ar") => {
    setCurrentLang(lang);
    changeLanguage(lang);
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="w-full flex-1">
        {/* Language Select Box */}
        <Select
          value={currentLang}
          onValueChange={(value: "ar" | "en") => handleLanguageChange(value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="w-full" to={pageAdmin.settings.main}>
              Settings
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div
              className="w-full"
              onClick={() => {
                localStorage.removeItem("authToken");
                toast({
                  variant: "default",
                  title: t("logout.success.title"),
                  description: t("logout.success.description"),
                });
                navigate(pageAdmin.login);
              }}
            >
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default Header;
