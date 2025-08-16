import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function PromptInput({ value, onChange, disabled }: PromptInputProps) {
  const presetPrompts = [
    "Summarize in bullet points for executives",
    "Highlight only action items and next steps",
    "Create a detailed meeting summary with key decisions",
    "Extract key takeaways and follow-up items",
    "Summarize for team members who missed the meeting"
  ];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="custom-prompt" className="text-lg font-medium">
            Custom Instructions
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Tell the AI how you want your meeting summary formatted
          </p>
        </div>

        <Textarea
          id="custom-prompt"
          placeholder="e.g., Summarize in bullet points with action items at the end"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="min-h-[100px] resize-vertical"
        />

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Quick presets:
          </Label>
          <div className="flex flex-wrap gap-2">
            {presetPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => !disabled && onChange(prompt)}
                disabled={disabled}
                className="text-xs px-3 py-1 border rounded-full hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}