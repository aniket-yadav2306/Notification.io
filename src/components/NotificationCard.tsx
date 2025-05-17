
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Notification } from "@/types/notification";
import NotificationIcon from "./NotificationIcon";
import { formatDistanceToNow } from "date-fns";

interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
  className?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ 
  notification, 
  onClick,
  className
}) => {
  const { type, title, content, timestamp, read } = notification;
  
  const formattedTime = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  
  return (
    <Card 
      className={cn(
        "p-4 mb-3 cursor-pointer transition-all hover:shadow-md",
        !read && "border-l-4 bg-gray-50 dark:bg-gray-800",
        !read && type === "email" && "border-l-notification-email",
        !read && type === "sms" && "border-l-notification-sms",
        !read && type === "in-app" && "border-l-notification-in-app",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <NotificationIcon 
          type={type} 
          animate={!read}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={cn(
              "text-sm font-medium",
              !read && "font-semibold"
            )}>
              {title}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">{formattedTime}</span>
          </div>
          
          <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 line-clamp-2">
            {content}
          </p>
          
          <div className="flex items-center mt-2">
            <span className={cn(
              "inline-block text-xs px-2 py-1 rounded-full",
              type === "email" && "bg-blue-100 text-blue-800",
              type === "sms" && "bg-purple-100 text-purple-800",
              type === "in-app" && "bg-green-100 text-green-800",
            )}>
              {type === "email" ? "Email" : type === "sms" ? "SMS" : "In-app"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NotificationCard;
