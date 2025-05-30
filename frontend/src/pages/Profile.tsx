
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileSidebar from '@/domains/user/components/ProfileSidebar';
import ProfileForm from '@/domains/user/components/ProfileForm';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  
  const handleProfileSubmit = (data: any) => {
    if (updateUser) {
      updateUser(data);
    }
    console.log('Profile update submitted:', data);
  };

  const handleShiftToggle = () => {
    if (updateUser && user) {
      updateUser({ onShift: !user.onShift });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ProfileSidebar 
          user={user} 
          onShiftToggle={handleShiftToggle} 
        />
        <ProfileForm 
          user={user} 
          onSubmit={handleProfileSubmit} 
        />
      </div>
    </div>
  );
};

export default Profile;
