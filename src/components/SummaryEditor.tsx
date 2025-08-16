import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Save, X, Eye, FileText } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SummaryEditorProps {
  summary: string;
  onSummaryChange: (summary: string) => void;
  isLoading?: boolean;
}

export function SummaryEditor({ summary, onSummaryChange, isLoading }: SummaryEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);
  const [isMarkdownView, setIsMarkdownView] = useState(true); // false = raw markdown, true = rendered view

  const handleSave = () => {
    onSummaryChange(editedSummary);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSummary(summary);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditedSummary(summary);
    setIsEditing(true);
  };

  const toggleView = () => {
    setIsMarkdownView(!isMarkdownView);
  };
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Generated Summary</h3>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!summary) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Upload a transcript and generate a summary to see it here
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Generated Summary</h3>
          <div className="flex space-x-2">
            {!isEditing && (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleView}
                  title={isMarkdownView ? "Show raw markdown" : "Show rendered view"}
                >
                  {isMarkdownView ? (
                    <>
                      <FileText className="h-4 w-4 mr-1" />
                      Raw
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-1" />
                      Rendered
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              className="min-h-[300px] resize-vertical font-mono"
              placeholder="Enter your markdown content here..."
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            {isMarkdownView ? (
              // Rendered markdown view using ReactMarkdown
              <div className="p-4 rounded-md border min-h-[200px]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-md"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code 
                          className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" 
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mt-6 mb-4 text-gray-900">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-3 text-gray-700 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 mb-4 space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 mb-4 space-y-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-700">
                        {children}
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-400 pl-4 py-2 mb-4 bg-blue-50 italic text-gray-700">
                        {children}
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a 
                        href={href} 
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border-collapse border border-gray-300">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-300 px-4 py-2">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {summary}
                </ReactMarkdown>
              </div>
            ) : (
              // Raw markdown view
              <div className="whitespace-pre-wrap bg-muted p-4 rounded-md border font-mono text-sm">
                {summary}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}