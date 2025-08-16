import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, File, X } from "lucide-react";

interface FileUploadProps {
  onFileContent: (content: string) => void;
  disabled?: boolean;
}

export function FileUpload({ onFileContent, disabled }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type === "text/plain") {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileContent(content);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a text file (.txt)");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileContent("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Upload Meeting Transcript</h3>
        
        {!selectedFile ? (
          <div
            className={`border-2 border-dashed rounded-md p-8 text-center transition-colors ${
              dragActive 
                ? "border-primary bg-accent" 
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !disabled && fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop your transcript file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports .txt files only
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".txt"
              onChange={handleFileSelect}
              disabled={disabled}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 border rounded-md bg-muted">
            <div className="flex items-center space-x-2">
              <File className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{selectedFile.name}</span>
              <span className="text-xs text-muted-foreground">
                ({Math.round(selectedFile.size / 1024)} KB)
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={removeFile}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}