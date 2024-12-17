import { AlertTriangle, BotMessageSquare } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GenerateWithAIDialog({
  aiRequestStatus,
  setAiRequestStatus,
  content,
  callbackFunction,
}: {
  aiRequestStatus: "not-active" | "loading" | "done" | "error";
  setAiRequestStatus: React.Dispatch<
    React.SetStateAction<"not-active" | "loading" | "done" | "error">
  >;
  callbackFunction: () => void;
  content: string;
}) {
  const [openWavelyAIDialog, setOpenWavelyAIDialog] = useState(false);

  function checkIsValidContent() {
    if (!content) return false;
    if (content.length < 100) return false;

    return true;
  }

  const isValidContent = checkIsValidContent();

  function handleWavely() {
    setOpenWavelyAIDialog(false);
    setAiRequestStatus("loading");
    callbackFunction();
  }

  console.log("content2: ", typeof content);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              disabled={aiRequestStatus === "not-active" ? false : true}
              size="sm"
              onClick={() => setOpenWavelyAIDialog(true)}
              className={`p-1 rounded-md focus:animate-none hover:animate-none inline-flex text-md font-semibold tracking-wide cursor-pointer ${
                !isValidContent
                  ? "animate-none bg-muted-foreground hover:bg-muted-foreground/90"
                  : aiRequestStatus === "not-active"
                  ? "animate-bounce bg-green-700 hover:bg-green-700/90 focus:bg-green-700/90"
                  : "animate-none bg-muted-foreground hover:bg-muted-foreground/90"
              }`}
            >
              <BotMessageSquare className="text-graywhite" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className={content ? "bg-green-700" : "bg-muted-foreground"}
          >
            <p>Generate it using Wavely AI</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isValidContent ? (
        <Dialog open={openWavelyAIDialog} onOpenChange={setOpenWavelyAIDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Wavely AI</DialogTitle>
              <DialogDescription>
                This will take the content you put and generate best meta
                keywords for best result in SEO results, make sure you add valid
                content to get best result
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={handleWavely}
                className="bg-green-700 hover:bg-green-600 focus:bg-green-600"
                type="button"
              >
                Start generate using Wavely AI
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={openWavelyAIDialog} onOpenChange={setOpenWavelyAIDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-1">
                <AlertTriangle className="text-yellow-500" />
                <span>Wavely AI</span>
              </DialogTitle>
              <DialogDescription>
                <span>
                  You must add content and it should be greater than 100
                  character in Main content to make this using ai
                </span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => setOpenWavelyAIDialog(false)}
                type="button"
              >
                OK, I'am understand
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
