import { FormikProps } from "formik";
import { useState } from "react";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface BlogFormValues {
  blogLang: string;
  name: string;
  content: string;
  blogImg: File | null;
  tags: string[];
  metaDescription: string;
  metaKeywords: string;
}

export default function InputTag({
  tags,
  setTags,
  formik,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  formik: FormikProps<BlogFormValues>;
}) {
  const [tagInput, setTagInput] = useState("");
  const { t } = useTranslation();

  function isValidTag() {
    return tagInput && !tags.includes(tagInput);
  }

  function handleAddTag() {
    if (isValidTag()) {
      const newTags = [...tags, tagInput];
      setTags(newTags);
      setTagInput("");
      formik.setFieldValue("tags", newTags);
    }
  }

  function handleRemoveTag(tag: string) {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    formik.setFieldValue("tags", newTags);
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="tags">{t("blogForm.tags")}</Label>
      <div className="flex flex-row gap-x-1.5 items-center">
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          placeholder={t("blogForm.tag_placeholder")}
          className="max-w-[500px] w-full"
        />
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={handleAddTag}
        >
          {t("blogForm.tag_add")}
        </Button>
      </div>

      <div className="flex flex-row flex-wrap space-x-1.5">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="default"
            className="flex flex-row space-x-1.5 h-8"
          >
            <span>{tag}</span>
            <X
              size={18}
              onClick={() => handleRemoveTag(tag)}
              className="cursor-pointer"
            />
          </Badge>
        ))}
      </div>
      {formik.errors.tags && formik.touched.tags && (
        <div className="text-red-500 text-sm">{formik.errors.tags}</div>
      )}
    </div>
  );
}
