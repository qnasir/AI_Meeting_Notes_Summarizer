import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { PromptInput } from "@/components/PromptInput";
import { SummaryEditor } from "@/components/SummaryEditor";
import { EmailShare } from "@/components/EmailShare";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("Summarize the key points and action items from this meeting");
  const [summary, setSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    if (!transcript.trim()) {
      toast({
        title: "Error",
        description: "Please upload a transcript first",
        variant: "destructive"
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "Error", 
        description: "Please enter custom instructions",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      // This would be your API call to generate summary
      const response = await fetch("/api/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript,
          prompt
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
        toast({
          title: "Success",
          description: "Summary generated successfully",
        });
      } else {
        throw new Error("Failed to generate summary");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive"
      });
      console.error("Error generating summary:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
            <Sparkles className="h-8 w-8 mr-2 text-primary" />
            AI Meeting Notes Summarizer
          </h1>
          <p className="text-muted-foreground">
            Upload your meeting transcript and get AI-powered summaries
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Step 1: File Upload */}
          <FileUpload
            onFileContent={setTranscript}
            disabled={isGenerating}
          />

          {/* Step 2: Custom Instructions */}
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            disabled={isGenerating}
          />

          {/* Generate Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleGenerateSummary}
              disabled={!transcript || !prompt || isGenerating}
              size="lg"
              className="px-8"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating Summary..." : "Generate Summary"}
            </Button>
          </div>

          {/* Step 3: Summary Display & Edit */}
          <SummaryEditor
            summary={summary}
            onSummaryChange={setSummary}
            isLoading={isGenerating}
          />

          {/* Step 4: Email Sharing */}
          {summary && (
            <EmailShare
              summary={summary}
              disabled={isGenerating}
            />
          )}
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Backend API endpoints needed: /api/generate-summary and /api/send-email
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Index;
