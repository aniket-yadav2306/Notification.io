
import { Notification, NotificationType, NotificationResponse, NotificationsResponse } from "../types/notification";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Get user notifications
export async function getUserNotifications(userId: string): Promise<NotificationsResponse> {
  try {
    const { data: notificationsData, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    
    return {
      success: true,
      message: "Notifications retrieved successfully",
      data: notificationsData as Notification[]
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return {
      success: false,
      message: "Failed to retrieve notifications",
      data: []
    };
  }
}

// Send a new notification
export async function sendNotification(
  userId: string, 
  type: NotificationType, 
  title: string, 
  content: string,
  metadata?: Record<string, any>
): Promise<NotificationResponse> {
  try {
    const newNotification = {
      user_id: userId,
      type,
      title,
      content,
      timestamp: new Date().toISOString(),
      read: false,
      metadata
    };
    
    const { data, error } = await supabase
      .from('notifications')
      .insert(newNotification)
      .select()
      .single();
    
    if (error) throw error;
    
    toast.success("Notification sent successfully");
    
    return {
      success: true,
      message: "Notification sent successfully",
      data: data as Notification
    };
  } catch (error) {
    console.error("Error sending notification:", error);
    
    toast.error("Failed to send notification");
    
    return {
      success: false,
      message: "Failed to send notification"
    };
  }
}

// Mark a notification as read
export async function markAsRead(notificationId: string): Promise<NotificationResponse> {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      message: "Notification marked as read",
      data: data as Notification
    };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return {
      success: false,
      message: "Failed to mark notification as read"
    };
  }
}

// Mark all notifications as read
export async function markAllAsRead(userId: string): Promise<NotificationsResponse> {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .select();
    
    if (error) throw error;
    
    toast.success("All notifications marked as read");
    
    return {
      success: true,
      message: "All notifications marked as read",
      data: data as Notification[]
    };
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    
    toast.error("Failed to mark all notifications as read");
    
    return {
      success: false,
      message: "Failed to mark all notifications as read",
      data: []
    };
  }
}

// Get current user ID
export async function getCurrentUserId(): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("No user is currently logged in");
  }
  return user.id;
}
