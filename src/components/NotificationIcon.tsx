
import React from "react";
import { Mail, MessageSquare, Bell } from "lucide-react";
import { NotificationType } from "@/types/notification";
import { cn } from "@/lib/utils";

interface NotificationIconProps {
  type: NotificationType;
  className?: string;
  size?: number;
  animate?: boolean;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ 
  type, 
  className, 
  size = 16,
  animate = false 
}) => {
  let Icon;
  let color;

  switch (type) {
    case "email":
      Icon = Mail;
      color = "text-notification-email";
      break;
    case "sms":
      Icon = MessageSquare;
      color = "text-notification-sms";
      break;
    case "in-app":
      Icon = Bell;
      color = "text-notification-in-app";
      break;
    default:
      Icon = Bell;
      color = "text-gray-500";
  }

  return (
    <div className={cn(
      "flex items-center justify-center rounded-full p-2", 
      `bg-${type === "email" ? "blue" : type === "sms" ? "purple" : "green"}-100`,
      animate && "animate-notification-pulse",
      className
    )}>
      <Icon 
        size={size} 
        className={cn(color)} 
      />
    </div>
  );
};

export default NotificationIcon;
