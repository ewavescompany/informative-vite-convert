import { BotMessageSquare } from "lucide-react";
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

export default function WavelyAIMetaKeywords({
  wavelyAIRequestStatus,
  setWavelyAIRequestStatus,
  callbackFunction,
}: {
  wavelyAIRequestStatus: "not-active" | "loading" | "done" | "error";
  setWavelyAIRequestStatus: React.Dispatch<
    React.SetStateAction<"not-active" | "loading" | "done" | "error">
  >;
  callbackFunction: () => void;
}) {
  const [openWavelyAIDialog, setOpenWavelyAIDialog] = useState(false);

  function handleWavely() {
    setOpenWavelyAIDialog(false);
    setWavelyAIRequestStatus("loading");
    callbackFunction();
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              disabled={wavelyAIRequestStatus === "not-active" ? false : true}
              size="sm"
              onClick={() => setOpenWavelyAIDialog(true)}
              className={`p-1 rounded-md focus:animate-none hover:animate-none inline-flex text-md font-semibold tracking-wide cursor-pointer ${
                wavelyAIRequestStatus === "not-active"
                  ? "animate-bounce bg-green-700 hover:bg-green-700/90 focus:bg-green-700/90"
                  : "animate-none"
              }`}
            >
              <BotMessageSquare className="text-graywhite" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-green-700">
            <p>Generate it using Wavely AI</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openWavelyAIDialog} onOpenChange={setOpenWavelyAIDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Wavely AI</DialogTitle>
            <DialogDescription>
              This will take the content you put and generate best meta keywords
              for best result in SEO results, make sure you add valid content to
              get best result
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
    </>
  );
}
