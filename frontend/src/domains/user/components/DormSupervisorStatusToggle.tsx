
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { User, UserRole } from '@/types';

interface DormSupervisorStatusToggleProps {
  className?: string;
  user?: User | null; // Make user prop optional
}

const DormSupervisorStatusToggle: React.FC<DormSupervisorStatusToggleProps> = ({ className, user }) => {
  const { user: authUser, updateUser } = useAuth();
  
  // Use passed user prop if available, otherwise fall back to authUser
  const currentUser = user || authUser;
  
  // Only show for dorm supervisors
  if (currentUser?.role !== UserRole.DORM_SUPERVISOR) return null;
  
  const handleShiftToggle = () => {
    if (updateUser && currentUser) {
      updateUser({ onShift: !currentUser.onShift });
      
      toast({
        title: `Shift status changed to ${!currentUser.onShift ? 'On Shift' : 'Off Shift'}`,
        description: `You are now ${!currentUser.onShift ? 'available' : 'unavailable'} for dorm duties`,
      });
    }
  };
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Switch 
        checked={currentUser?.onShift || false} 
        onCheckedChange={handleShiftToggle} 
        id="dorm-supervisor-shift-mode"
      />
      <span className={`text-sm ${currentUser?.onShift ? 'text-green-600' : 'text-slate-500'}`}>
        {currentUser?.onShift ? 'On Shift' : 'Off Shift'}
      </span>
    </div>
  );
};

export default DormSupervisorStatusToggle;
