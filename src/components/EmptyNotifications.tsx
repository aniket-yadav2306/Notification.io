
import React from "react";
import { Bell } from "lucide-react";

interface EmptyNotificationsProps {
  message?: string;
}

const EmptyNotifications: React.FC<EmptyNotificationsProps> = ({ 
  message = "No notifications found" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-gray-100 p-6 mb-4">
        <Bell size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-1">{message}</h3>
      <p className="text-sm text-gray-500 max-w-xs">
        When you receive notifications, they will appear here.
      </p>
    </div>
  );
};

export default EmptyNotifications;
