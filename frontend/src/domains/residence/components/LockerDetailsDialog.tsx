
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Locker, LockerStatus } from '@/types';

interface LockerDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locker: Locker | null;
  onAssign?: () => void;
  onUnassign?: () => void;
}

const LockerDetailsDialog: React.FC<LockerDetailsDialogProps> = ({
  open,
  onOpenChange,
  locker,
  onAssign,
  onUnassign,
}) => {
  if (!locker) return null;

  const getStatusBadgeColor = (status: LockerStatus) => {
    switch (status) {
      case LockerStatus.ASSIGNED:
        return "bg-green-100 text-green-800";
      case LockerStatus.AVAILABLE:
        return "bg-blue-100 text-blue-800";
      case LockerStatus.MAINTENANCE:
        return "bg-yellow-100 text-yellow-800";
      case LockerStatus.RESERVED:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Locker {locker.lockerNumber} Details</DialogTitle>
          <DialogDescription>
            Location: {locker.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Status:</span>
            <span className="col-span-3">
              <Badge className={getStatusBadgeColor(locker.status)}>
                {locker.status}
              </Badge>
            </span>
          </div>
          
          {locker.assignedTo && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium col-span-1">Assigned to:</span>
              <span className="col-span-3">
                {typeof locker.assignedTo === 'object' ? 
                  `${locker.assignedTo.firstName} ${locker.assignedTo.lastName}` : 
                  'Loading user...'}
              </span>
            </div>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Size:</span>
            <span className="col-span-3">{locker.size}</span>
          </div>
          
          {locker.notes && (
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-sm font-medium col-span-1">Notes:</span>
              <span className="col-span-3">{locker.notes}</span>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          
          <div className="flex gap-2">
            {locker.status === LockerStatus.ASSIGNED && onUnassign && (
              <Button 
                variant="destructive" 
                onClick={() => {
                  onUnassign();
                  onOpenChange(false);
                }}
              >
                Unassign
              </Button>
            )}
            
            {locker.status === LockerStatus.AVAILABLE && onAssign && (
              <Button 
                onClick={() => {
                  onAssign();
                  onOpenChange(false);
                }}
              >
                Assign
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LockerDetailsDialog;
