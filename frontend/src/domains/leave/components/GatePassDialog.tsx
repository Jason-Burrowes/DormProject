
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
import { GatePass, Status } from '@/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface GatePassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gatePass: GatePass | null;
}

const GatePassDialog: React.FC<GatePassDialogProps> = ({
  open,
  onOpenChange,
  gatePass,
}) => {
  if (!gatePass) return null;

  const getStatusBadgeColor = (status: Status) => {
    switch (status) {
      case Status.APPROVED:
        return "bg-green-100 text-green-800";
      case Status.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case Status.REJECTED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gate Pass Details</DialogTitle>
          <DialogDescription>
            Details for gate pass #{gatePass.id.slice(0, 8)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Resident:</span>
            <span className="col-span-3">
              {gatePass.requestedBy.firstName} {gatePass.requestedBy.lastName}
            </span>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Status:</span>
            <span className="col-span-3">
              <Badge className={getStatusBadgeColor(gatePass.status)}>
                {gatePass.status}
              </Badge>
            </span>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Destination:</span>
            <span className="col-span-3">{gatePass.destination}</span>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Reason:</span>
            <span className="col-span-3">{gatePass.reason}</span>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Departure:</span>
            <span className="col-span-3">
              {format(new Date(gatePass.departureDate), 'MMM dd, yyyy')}
            </span>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Return:</span>
            <span className="col-span-3">
              {format(new Date(gatePass.returnDate), 'MMM dd, yyyy')}
            </span>
          </div>
          
          {gatePass.approvedBy && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium col-span-1">Approved by:</span>
              <span className="col-span-3">
                {typeof gatePass.approvedBy === 'object' ? 
                  `${gatePass.approvedBy.firstName} ${gatePass.approvedBy.lastName}` : 
                  'User ID: ' + gatePass.approvedBy}
              </span>
            </div>
          )}
          
          {gatePass.rejectionReason && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium col-span-1">Rejection reason:</span>
              <span className="col-span-3">{gatePass.rejectionReason}</span>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GatePassDialog;
