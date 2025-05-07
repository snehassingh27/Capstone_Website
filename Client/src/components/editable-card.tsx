import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Save, X } from "lucide-react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAdminMode } from "@/hooks/use-admin-mode";

interface EditableCardProps {
  title: string;
  content: string;
  onSave: (title: string, content: string) => Promise<void>;
  className?: string;
  allowTitleEdit?: boolean;
  contentComponent?: React.ReactNode;
}

export function EditableCard({
  title,
  content,
  onSave,
  className,
  allowTitleEdit = false,
  contentComponent,
}: EditableCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { adminMode } = useAdminMode();

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(editedTitle, editedContent);
      setIsEditing(false);
      toast({
        title: "Content saved",
        description: "Your changes have been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error saving content",
        description: "There was a problem saving your changes. Please try again.",
        variant: "destructive",
      });
      console.error("Error saving card content:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <Card className={className}>
      <CardHeader className="flex-row justify-between items-center">
        {isEditing && allowTitleEdit ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="font-semibold text-xl"
          />
        ) : (
          <CardTitle>{title}</CardTitle>
        )}
        {adminMode && !isEditing && (
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <RichTextEditor
            value={editedContent}
            onChange={setEditedContent}
            minHeight={150}
          />
        ) : contentComponent ? (
          contentComponent
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </CardContent>
      {isEditing && (
        <CardFooter className="justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
