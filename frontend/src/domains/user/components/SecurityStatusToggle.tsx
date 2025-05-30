
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ShieldOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { User, UserRole } from '@/types';

interface SecurityStatusToggleProps {
  user?: User | null; // Add user prop
}

const SecurityStatusToggle: React.FC<SecurityStatusToggleProps> = ({ user }) => {
  const { user: authUser, updateUser } = useAuth();
  
  // Use passed user prop if available, otherwise fall back to authUser
  const currentUser = user || authUser;
  
  // Initial state based on user's current shift status
  const [isOnShift, setIsOnShift] = useState(currentUser?.onShift || false);

  const toggleShiftStatus = () => {
    // In a real application with user prop, this might behave differently
    // For now, we'll just update the local state and show a toast
    setIsOnShift(!isOnShift);
    
    // If this is for the current logged-in security user, also update auth context
    if (updateUser && currentUser && currentUser.id === authUser?.id) {
      updateUser({ onShift: !isOnShift });
    }
    
    toast({
      title: "Shift status updated",
      description: !isOnShift ? "You are now on shift" : "You are now off shift",
    });
  };

  if (currentUser?.role !== UserRole.SECURITY) {
    return null;
  }

  return (
    <Button 
      onClick={toggleShiftStatus}
      variant={isOnShift ? "default" : "outline"}
      className="gap-2"
    >
      {isOnShift ? (
        <>
          <Shield className="h-4 w-4" />
          <span>On Shift</span>
        </>
      ) : (
        <>
          <ShieldOff className="h-4 w-4" />
          <span>Off Shift</span>
        </>
      )}
    </Button>
  );
};

export default SecurityStatusToggle;
