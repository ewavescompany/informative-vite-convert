import OpenAI from "openai";
import { FormikErrors } from "formik";
import { BlogFormValues } from "@/schema/blogTypes";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Enables the browser environment
});

export default async function openAIIntegration(
  prompt: string,
  content: string,
  // setResponseValue: React.Dispatch<React.SetStateAction<string>>,
  setWavelyAIRequestStatus: React.Dispatch<
    React.SetStateAction<"not-active" | "loading" | "done" | "error">
  >,
  formikSetValue: (
    content: string
  ) => Promise<void> | Promise<FormikErrors<BlogFormValues>>
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use a valid model name
      messages: [
        // { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `${prompt} ${content}`,
        },
      ],
    });

    console.log(completion.choices[0].message.content);
    const res = completion.choices[0].message.content || "";
    // setResponseValue(res);
    formikSetValue(res);
  } catch (error) {
    console.error("Error fetching completion:", error);
    // setResponseValue("");
    formikSetValue("");
  } finally {
    setWavelyAIRequestStatus("done");
  }
}
