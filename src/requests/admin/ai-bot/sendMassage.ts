import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const baseServerUrl =
  "https://chatbot.ewavespro.com/server/public/api/backend/v1/send-message";

const useSendMessage = (
  chatId: string | null,
  token: string | null,
  isToken: boolean,
  setResponseValue: React.Dispatch<React.SetStateAction<string>>
) => {
  const navigate = useNavigate();

  return useCallback(
    async (message: string, botId: string) => {
      try {
        const response = await fetch(`${baseServerUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(isToken && token && { Authorization: `Bearer ${token}` }), // Add token to headers if available
          },
          body: JSON.stringify({
            ...(chatId && { uuid: chatId }), // Include chatId only if it is not null
            message,
            bot_id: botId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        const result = await response.json();
        console.log(result);
        // setIsLoading(false);
        if (result.result.bot.response) {
          setResponseValue(result.result.bot.response);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
      }
    },

    [chatId, token, isToken, navigate]
  );
};

export default useSendMessage;
