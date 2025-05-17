
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

interface NotificationHeaderProps {
  unreadCount: number;
  onCreateClick: () => void;
  onMarkAllAsRead: () => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  onCreateClick,
  onMarkAllAsRead,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {unreadCount > 0
            ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
            : "No unread notifications"}
        </p>
      </div>
      
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Tabs 
          value={activeTab} 
          onValueChange={onTabChange}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={onMarkAllAsRead}
              className="w-full sm:w-auto"
            >
              Mark all read
            </Button>
          )}
          <Button 
            onClick={onCreateClick}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-1" size={16} />
            New
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationHeader;
