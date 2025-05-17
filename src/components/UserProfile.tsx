
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/auth");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={user.user_metadata?.avatar_url} />
        <AvatarFallback>
          {user.email?.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user.email}</span>
        <Button variant="link" className="h-auto p-0" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
