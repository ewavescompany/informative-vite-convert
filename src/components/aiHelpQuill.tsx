import GenerateWithAIDialog from "@/pages/admin/blogs/components/generateWithAIDialog";
import openAIIntegration from "@/requests/admin/open-ai-integration/openAIIntegration";
import { Skeleton } from "./ui/skeleton";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { ReactNode, useState } from "react";
import { FormikErrors } from "formik";
import { BlogFormValues } from "@/schema/blogTypes";
import { X } from "lucide-react";

type AiHelpType = {
  children: ReactNode;
  prompt: string;
  content: string;
  formikValue: string;
  formikSetValue: (
    content: string
  ) => Promise<void> | Promise<FormikErrors<BlogFormValues>>;
  type: string;
};

export default function AiHelp({
  children,
  prompt,
  content,
  formikValue,
  formikSetValue,
  type,
}: AiHelpType) {
  const [aiRequestStatus, setAiRequestStatus] = useState<
    "not-active" | "loading" | "done" | "error"
  >("not-active");

  console.log("content: ", content);
  if (aiRequestStatus === "not-active")
    return (
      <div className="space-y-3">
        <div className="relative">
          {children}

          <div className="absolute bottom-2 right-2">
            <GenerateWithAIDialog
              aiRequestStatus={aiRequestStatus}
              setAiRequestStatus={setAiRequestStatus}
              content={content}
              callbackFunction={() =>
                openAIIntegration(
                  prompt,
                  content,
                  setAiRequestStatus,
                  formikSetValue
                )
              }
            />
          </div>
        </div>
        {type === "keywords" ? (
          <div className="flex gap-1 flex-wrap">
            {formikValue
              .split(",")
              .filter((key) => key.trim() !== "")
              .map((key, index) => (
                <div
                  className="bg-green-800 text-secondary py-1 px-1 rounded-md flex justify-between items-center"
                  key={`${key}${index}`}
                >
                  <span className="px-1 text-sm">{key}</span>
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() =>
                      formikSetValue(formikValue.split(`${key},`).join(""))
                    }
                  />
                </div>
              ))}
          </div>
        ) : null}
      </div>
    );

  if (aiRequestStatus === "loading")
    return (
      <div className="w-full border p-2 rounded-md flex flex-col gap-[4px]">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/4" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );

  if (aiRequestStatus === "done")
    return (
      <>
        <TextGenerateEffect
          duration={0.2}
          className="text-muted-foreground md:text-sm"
          words={formikValue}
          setWords={formikSetValue}
          type={type}
        />
      </>
    );

  return (
    <div className="w-full border p-2 rounded-md flex flex-col gap-[4px]">
      <p>some thing wrong</p>
    </div>
  );
}
