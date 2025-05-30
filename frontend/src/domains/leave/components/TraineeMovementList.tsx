
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { User, CampusStatus, GatePass, Status } from '@/types';
import { format } from 'date-fns';
import { useUserDetailModal } from '@/domains/user/hooks/useUserDetailModal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface TraineeMovementListProps {
  users: User[];
  gatePasses: GatePass[];
}

const TraineeMovementList: React.FC<TraineeMovementListProps> = ({ 
  users, 
  gatePasses 
}) => {
  // Filter only trainees who are off campus
  const offCampusTrainees = users.filter(
    user => user.campusStatus === CampusStatus.OFF_CAMPUS
  );

  // Get the active gate pass for each trainee
  const traineesWithPassInfo = offCampusTrainees.map(trainee => {
    const activePass = gatePasses.find(
      pass => pass.userId === trainee.id && 
              pass.status === Status.APPROVED &&
              pass.isUsed &&
              new Date(pass.returnDate) >= new Date()
    );
    
    return { trainee, activePass };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trainee Movement</CardTitle>
        <CardDescription>
          Real-time list of trainees currently off-campus
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Expected Return</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {traineesWithPassInfo.length > 0 ? (
              traineesWithPassInfo.map(({ trainee, activePass }) => {
                const UserDetailModalHook = useUserDetailModal(trainee);
                return (
                  <TableRow key={trainee.id}>
                    <TableCell className="font-medium">
                      {trainee.firstName} {trainee.lastName}
                    </TableCell>
                    <TableCell>{activePass?.destination || "Unknown"}</TableCell>
                    <TableCell>
                      {activePass ? 
                        format(new Date(activePass.departureDate), 'MMM dd, yyyy') : 
                        "Unknown"}
                    </TableCell>
                    <TableCell>
                      {activePass ? 
                        format(new Date(activePass.returnDate), 'MMM dd, yyyy') : 
                        "Unknown"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => UserDetailModalHook.setIsOpen(true)}
                          >
                            <Info className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                      <UserDetailModalHook.UserDetailModal />
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No trainees currently off campus
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TraineeMovementList;
