
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
import { Room, RoomStatus, User } from '@/types';

interface RoomDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: Room | null;
  onEdit?: () => void;
}

const RoomDetailsDialog: React.FC<RoomDetailsDialogProps> = ({
  open,
  onOpenChange,
  room,
  onEdit,
}) => {
  if (!room) return null;

  const getStatusBadgeColor = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.OCCUPIED:
        return "bg-green-100 text-green-800";
      case RoomStatus.VACANT:
        return "bg-blue-100 text-blue-800";
      case RoomStatus.MAINTENANCE:
        return "bg-yellow-100 text-yellow-800";
      case RoomStatus.RESERVED:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Room {room.roomNumber} Details</DialogTitle>
          <DialogDescription>
            Building: {room.building}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Status:</span>
            <span className="col-span-3">
              <Badge className={getStatusBadgeColor(room.status)}>
                {room.status}
              </Badge>
            </span>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Capacity:</span>
            <span className="col-span-3">
              {room.currentOccupancy} / {room.maxOccupancy}
            </span>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Type:</span>
            <span className="col-span-3">{room.type}</span>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Floor:</span>
            <span className="col-span-3">{room.floor}</span>
          </div>
          
          {Array.isArray(room.occupants) && room.occupants.length > 0 && (
            <div>
              <div className="text-sm font-medium mb-2">Occupants:</div>
              <div className="space-y-2">
                {room.occupants.map((occupant: User) => (
                  <div key={occupant.id} className="flex items-center p-2 bg-gray-50 rounded-md">
                    <div>
                      <div className="font-medium">{occupant.firstName} {occupant.lastName}</div>
                      <div className="text-xs text-muted-foreground">{occupant.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {room.notes && (
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-sm font-medium col-span-1">Notes:</span>
              <span className="col-span-3">{room.notes}</span>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {onEdit && (
            <Button onClick={() => {
              onEdit();
              onOpenChange(false);
            }}>
              Edit Room
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetailsDialog;
