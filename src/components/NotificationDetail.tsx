
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Notification } from "@/types/notification";
import NotificationIcon from "./NotificationIcon";
import { formatDistanceToNow, format } from "date-fns";
import { markAsRead } from "@/services/notificationApi";

interface NotificationDetailProps {
  notification: Notification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkAsRead?: () => void;
}

const NotificationDetail: React.FC<NotificationDetailProps> = ({
  notification,
  open,
  onOpenChange,
  onMarkAsRead,
}) => {
  const handleMarkAsRead = async () => {
    if (notification && !notification.read) {
      await markAsRead(notification.id);
      if (onMarkAsRead) {
        onMarkAsRead();
      }
    }
    onOpenChange(false);
  };

  if (!notification) return null;

  const { type, title, content, timestamp, metadata } = notification;
  const formattedTime = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  const exactTime = format(new Date(timestamp), "PPpp");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <NotificationIcon type={type} size={20} />
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-gray-500">
            {formattedTime} ({exactTime})
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm mb-4">{content}</p>

          {metadata && Object.keys(metadata).length > 0 && (
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mt-4">
              <h4 className="text-sm font-medium mb-2">Additional Information</h4>
              <dl className="space-y-1">
                {Object.entries(metadata).map(([key, value]) => (
                  <div key={key} className="flex text-xs">
                    <dt className="font-medium w-24 capitalize">{key}:</dt>
                    <dd className="text-gray-600 dark:text-gray-300">
                      {typeof value === "string" ? value : JSON.stringify(value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleMarkAsRead}>
            Mark as read
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDetail;
