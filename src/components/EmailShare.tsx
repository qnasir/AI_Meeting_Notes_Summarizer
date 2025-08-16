import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailShareProps {
  summaryId: string;
  summary: string;
  disabled?: boolean;
}

export function EmailShare({ summaryId, summary, disabled }: EmailShareProps) {
  const [recipients, setRecipients] = useState<string[]>([""]);
  const [subject, setSubject] = useState("Meeting Summary");
  const [message, setMessage] = useState("Please find the meeting summary below:");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addRecipient = () => {
    setRecipients([...recipients, ""]);
  };

  const removeRecipient = (index: number) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((_, i) => i !== index));
    }
  };

  const updateRecipient = (index: number, email: string) => {
    const updated = [...recipients];
    updated[index] = email;
    setRecipients(updated);
  };

  const handleSend = async () => {
    const validEmails = recipients.filter(email => 
      email.trim() && email.includes("@")
    );

    if (validEmails.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one valid email address",
        variant: "destructive"
      });
      return;
    }

    if (!summary.trim()) {
      toast({
        title: "Error", 
        description: "No summary to send",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // This would be your API call to send emails
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/shares`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summaryId,
          recipients: validEmails,
          subject,
          message,
          editedSummary: summary
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Summary sent to ${validEmails.length} recipient(s)`,
        });
        // Reset form
        setRecipients([""]);
        setMessage("Please find the meeting summary below:");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center">
          <Mail className="h-5 w-5 mr-2" />
          Share Summary via Email
        </h3>

        <div className="space-y-3">
          <Label>Recipients</Label>
          {recipients.map((email, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => updateRecipient(index, e.target.value)}
                disabled={disabled || isLoading}
                className="flex-1"
              />
              {recipients.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeRecipient(index)}
                  disabled={disabled || isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addRecipient}
            disabled={disabled || isLoading}
            className="w-fit"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Recipient
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email-subject">Subject</Label>
          <Input
            id="email-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={disabled || isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email-message">Message</Label>
          <Textarea
            id="email-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled || isLoading}
            className="resize-vertical"
            rows={3}
          />
        </div>

        <Button
          onClick={handleSend}
          disabled={disabled || isLoading || !summary.trim()}
          className="w-full"
        >
          {isLoading ? "Sending..." : "Send Summary"}
        </Button>
      </div>
    </Card>
  );
}
