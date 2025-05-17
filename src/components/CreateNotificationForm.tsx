
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NotificationType } from "@/types/notification";
import { sendNotification, getCurrentUserId } from "@/services/notificationApi";

interface CreateNotificationFormProps {
  onSuccess?: () => void;
}

const CreateNotificationForm: React.FC<CreateNotificationFormProps> = ({ onSuccess }) => {
  const [type, setType] = useState<NotificationType>("in-app");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<{ key: string; value: string }>({ key: "", value: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const metadataObj = metadata.key && metadata.value 
      ? { [metadata.key]: metadata.value } 
      : undefined;
    
    try {
      // Get the user ID and await the Promise
      const userId = await getCurrentUserId();
      
      await sendNotification(
        userId,
        type,
        title,
        content,
        metadataObj
      );
      
      // Reset form
      setTitle("");
      setContent("");
      setMetadata({ key: "", value: "" });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium">
          Notification Type
        </label>
        <Select
          value={type}
          onValueChange={(value: NotificationType) => setType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select notification type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="in-app">In-app</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter notification title"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter notification content"
          required
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Metadata (Optional)</label>
        <div className="flex gap-2">
          <Input
            value={metadata.key}
            onChange={(e) => setMetadata({ ...metadata, key: e.target.value })}
            placeholder="Key"
            className="w-1/2"
          />
          <Input
            value={metadata.value}
            onChange={(e) => setMetadata({ ...metadata, value: e.target.value })}
            placeholder="Value"
            className="w-1/2"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Notification"}
      </Button>
    </form>
  );
};

export default CreateNotificationForm;
