
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import NotificationCard from "@/components/NotificationCard";
import NotificationDetail from "@/components/NotificationDetail";
import NotificationCreate from "@/components/NotificationCreate";
import NotificationHeader from "@/components/NotificationHeader";
import EmptyNotifications from "@/components/EmptyNotifications";
import NotificationSkeleton from "@/components/NotificationSkeleton";
import UserProfile from "@/components/UserProfile";
import { Notification } from "@/types/notification";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getUserNotifications, 
  markAllAsRead
} from "@/services/notificationApi";
import { toast } from "sonner";

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Fetch notifications
  const { 
    data, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => getUserNotifications(user?.id || ''),
    enabled: !!user?.id
  });

  const notifications = data?.data || [];
  
  // Filter notifications based on active tab
  const filteredNotifications = activeTab === "unread" 
    ? notifications.filter(notif => !notif.read)
    : notifications;
    
  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDetailOpen(true);
  };

  // Handle mark all as read
  const handleMarkAllAsRead = async () => {
    if (user?.id) {
      await markAllAsRead(user.id);
      refetch();
    }
  };

  // Handle create notification success
  const handleCreateSuccess = () => {
    refetch();
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Show error toast if fetch fails
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch notifications");
    }
  }, [error]);

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notification App</h1>
        <UserProfile />
      </div>
      
      <NotificationHeader 
        unreadCount={unreadCount}
        onCreateClick={() => setIsCreateOpen(true)}
        onMarkAllAsRead={handleMarkAllAsRead}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <NotificationSkeleton key={index} />
            ))}
          </div>
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onClick={() => handleNotificationClick(notification)}
              className={!notification.read ? "animate-slide-in" : ""}
            />
          ))
        ) : (
          <EmptyNotifications 
            message={activeTab === "unread" ? "No unread notifications" : "No notifications found"} 
          />
        )}
      </div>
      
      <NotificationDetail
        notification={selectedNotification}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onMarkAsRead={refetch}
      />
      
      <NotificationCreate
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleCreateSuccess}
      />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Chirp Notification Service • {new Date().getFullYear()}
        </p>
        <p className="mt-1 text-xs">
          A notification delivery system with multiple notification types
        </p>
      </div>
    </div>
  );
};

export default NotificationsPage;
