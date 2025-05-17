
export type NotificationType = "email" | "sms" | "in-app";

export interface Notification {
  id: string;
  user_id: string;  // Changed from userId to user_id to match Supabase schema
  type: NotificationType;
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  metadata?: Record<string, any>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface NotificationResponse {
  success: boolean;
  message: string;
  data?: Notification;
}

export interface NotificationsResponse {
  success: boolean;
  message: string;
  data: Notification[];
}
