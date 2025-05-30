
import React from 'react';
import { User, UserRole } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from "@/components/ui/switch";
import { KeyRound, User as UserIcon } from 'lucide-react';
import { DormSupervisorStatusToggle } from '@/domains/user/components';
import { SecurityStatusToggle } from '@/domains/user/components';

interface ProfileSidebarProps {
  user: User | null;
  onShiftToggle?: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ user, onShiftToggle }) => {
  const getRoleName = (role?: UserRole) => {
    if (!role) return 'User';
    
    switch (role) {
      case UserRole.TRAINEE:
        return 'Trainee';
      case UserRole.DORM_SUPERVISOR:
        return 'Dorm Supervisor';
      case UserRole.NURSE:
        return 'Nurse';
      case UserRole.MANAGEMENT:
        return 'Management';
      case UserRole.MANAGER:
        return 'Manager';
      case UserRole.PROGRAM_COORDINATOR:
        return 'Program Coordinator';
      case UserRole.SECURITY:
        return 'Security';
      default:
        return 'User';
    }
  };
  
  return (
    <Card className="md:col-span-1">
      <CardHeader className="pb-3">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <UserIcon className="h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">{user?.firstName} {user?.lastName}</CardTitle>
          <div className="text-center text-muted-foreground">
            {getRoleName(user?.role)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium">Email</div>
            <div className="text-sm text-muted-foreground">{user?.email}</div>
          </div>
          <Separator />
          <div>
            <div className="text-sm font-medium">Role</div>
            <div className="text-sm text-muted-foreground">{getRoleName(user?.role)}</div>
          </div>
          <Separator />
          <div>
            <div className="text-sm font-medium">Account Status</div>
            <div className="inline-flex items-center text-sm px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
              Active
            </div>
          </div>
          
          {user?.role === UserRole.NURSE && (
            <>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Shift Status</div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={user?.onShift || false} 
                    onCheckedChange={onShiftToggle} 
                    id="shift-mode"
                  />
                  <span className={`text-xs ${user?.onShift ? 'text-green-600' : 'text-slate-500'}`}>
                    {user?.onShift ? 'On Shift' : 'Off Shift'}
                  </span>
                </div>
              </div>
            </>
          )}
          
          {user?.role === UserRole.DORM_SUPERVISOR && (
            <>
              <Separator />
              <DormSupervisorStatusToggle user={user} />
            </>
          )}
          
          {user?.role === UserRole.SECURITY && (
            <>
              <Separator />
              <SecurityStatusToggle user={user} />
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <KeyRound className="mr-2 h-4 w-4" />
          Change Password
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileSidebar;
