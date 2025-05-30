
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import TraineeProfile from '@/components/trainee/TraineeProfile';
import EmergencyContactForm from '@/components/trainee/EmergencyContactForm';
import PassRequestForm from '@/components/trainee/PassRequestForm';
import { useUser } from '@/domains/user';

const TraineeProfilePage = () => {
  const { user: authUser } = useAuth();
  
  // Fetch user data using our domain hook
  const { data: user, isLoading } = useUser(authUser?.id);
  
  const handleProfileUpdate = (data: any) => {
    // In a real app, this would be an API call
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleEmergencyContactSave = (data: any) => {
    // In a real app, this would be an API call
    toast({
      title: "Emergency contact saved",
      description: "Your emergency contact information has been updated successfully.",
    });
  };
  
  const handlePassRequest = (data: any) => {
    // In a real app, this would be an API call
    toast({
      title: "Pass request submitted",
      description: "Your pass request has been submitted successfully.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-pulse space-y-2">
          <div className="h-4 w-48 bg-muted rounded"></div>
          <div className="h-4 w-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">User not found</h2>
        <p className="text-muted-foreground">Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="profile">Personal Info</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          <TabsTrigger value="pass">Request Pass</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <TraineeProfile user={user} onUpdate={handleProfileUpdate} />
        </TabsContent>
        
        <TabsContent value="emergency">
          <EmergencyContactForm 
            userId={user.id} 
            contact={user.emergencyContacts?.[0]}
            onSave={handleEmergencyContactSave} 
          />
        </TabsContent>
        
        <TabsContent value="pass">
          <PassRequestForm 
            userId={user.id}
            onSubmit={handlePassRequest}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TraineeProfilePage;
