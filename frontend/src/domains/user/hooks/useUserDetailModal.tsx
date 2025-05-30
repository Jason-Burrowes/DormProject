
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, CampusStatus } from '@/types';
import { format } from 'date-fns';

export const useUserDetailModal = (user: User) => {
  const [isOpen, setIsOpen] = useState(false);

  const UserDetailModal = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Resident Details</DialogTitle>
          <DialogDescription>
            Information about {user.firstName} {user.lastName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Name:</span>
            <span className="col-span-3">{user.firstName} {user.lastName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Email:</span>
            <span className="col-span-3">{user.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Phone:</span>
            <span className="col-span-3">{user.phoneNumber}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Gender:</span>
            <span className="col-span-3">{user.gender}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Status:</span>
            <span className="col-span-3">{user.campusStatus}</span>
          </div>
          {user.residencyStartDate && user.residencyEndDate && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium col-span-1">Residency:</span>
              <span className="col-span-3">
                {format(new Date(user.residencyStartDate), 'MMM dd, yyyy')} - {format(new Date(user.residencyEndDate), 'MMM dd, yyyy')}
              </span>
            </div>
          )}
          {user.passesUsed !== undefined && user.maxPasses !== undefined && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium col-span-1">Passes:</span>
              <span className="col-span-3">{user.passesUsed} used of {user.maxPasses} maximum</span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return { UserDetailModal, isOpen, setIsOpen };
};
