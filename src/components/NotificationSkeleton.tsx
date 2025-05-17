
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const NotificationSkeleton = () => {
  return (
    <Card className="p-4 mb-3">
      <div className="flex items-start gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-3/4 mt-1" />
          <div className="mt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NotificationSkeleton;
