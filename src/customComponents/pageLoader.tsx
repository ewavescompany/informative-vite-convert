import { LoaderCircle } from "lucide-react";

function PageLoader() {
  const t = (str: string) => str;
  return (
    <div className="w-full h-full flex flex-row gap-2 items-center justify-center">
      {t("Loading")} <LoaderCircle className="animate-spin" />
    </div>
  );
}

export default PageLoader;
