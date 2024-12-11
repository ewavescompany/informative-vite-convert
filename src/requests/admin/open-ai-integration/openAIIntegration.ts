import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Enables the browser environment
});

export default async function openAIIntegration(
  prompt: string,
  data: string,
  setResponseValue: React.Dispatch<React.SetStateAction<string>>,
  setWavelyAIRequestStatus: React.Dispatch<
    React.SetStateAction<"not-active" | "loading" | "done" | "error">
  >
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use a valid model name
      messages: [
        // { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `${prompt} ${data}`,
        },
      ],
    });

    console.log(completion.choices[0].message.content);
    const res = completion.choices[0].message.content || "";
    setResponseValue(res);
  } catch (error) {
    console.error("Error fetching completion:", error);
    setResponseValue("");
  } finally {
    setWavelyAIRequestStatus("done");
  }
}
