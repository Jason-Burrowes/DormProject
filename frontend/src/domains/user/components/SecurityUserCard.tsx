
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, CampusStatus } from '@/types';
import { 
  DoorOpen, 
  Home,
  UserCheck,
  UserMinus
} from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useUserDetailModal } from '@/domains/user/hooks';

interface SecurityUserCardProps {
  user: User;
  onUpdateCampusStatus: (userId: string, newStatus: CampusStatus) => void;
}

const SecurityUserCard: React.FC<SecurityUserCardProps> = ({ 
  user, 
  onUpdateCampusStatus 
}) => {
  const { UserDetailModal, setIsOpen } = useUserDetailModal(user);
  
  const toggleCampusStatus = () => {
    const newStatus = user.campusStatus === CampusStatus.ON_CAMPUS 
      ? CampusStatus.OFF_CAMPUS 
      : CampusStatus.ON_CAMPUS;
    
    onUpdateCampusStatus(user.id, newStatus);
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            {user.firstName} {user.lastName}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-1 gap-1 text-sm">
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">Status:</span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                user.campusStatus === CampusStatus.ON_CAMPUS
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user.campusStatus === CampusStatus.ON_CAMPUS ? (
                  <><Home className="h-3 w-3 mr-1" /> On Campus</>
                ) : (
                  <><DoorOpen className="h-3 w-3 mr-1" /> Off Campus</>
                )}
              </span>
            </div>
            {user.passesUsed !== undefined && user.maxPasses !== undefined && (
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Passes:</span>
                <span>{user.passesUsed} / {user.maxPasses} used</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsOpen(true)}
              >
                <UserCheck className="h-4 w-4 mr-1" /> View Details
              </Button>
            </DialogTrigger>
          </Dialog>
          <Button 
            variant={user.campusStatus === CampusStatus.ON_CAMPUS ? "default" : "secondary"} 
            size="sm"
            onClick={toggleCampusStatus}
          >
            {user.campusStatus === CampusStatus.ON_CAMPUS ? (
              <><UserMinus className="h-4 w-4 mr-1" /> Mark as Off Campus</>
            ) : (
              <><UserCheck className="h-4 w-4 mr-1" /> Mark as On Campus</>
            )}
          </Button>
        </CardFooter>
      </Card>
      <UserDetailModal />
    </>
  );
};

export default SecurityUserCard;
