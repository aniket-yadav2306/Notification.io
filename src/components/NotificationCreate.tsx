
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateNotificationForm from "./CreateNotificationForm";

interface NotificationCreateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const NotificationCreate: React.FC<NotificationCreateProps> = ({
  open,
  onOpenChange,
  onSuccess
}) => {
  const handleSuccess = () => {
    if (onSuccess) onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Notification</DialogTitle>
        </DialogHeader>
        <CreateNotificationForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default NotificationCreate;
