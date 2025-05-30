
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GatePass } from '@/types';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';

interface PassVerificationModalProps {
  gatePass: GatePass;
  onVerify: (gatePassId: string, isUsed: boolean) => void;
  trigger?: React.ReactNode;
}

const PassVerificationModal: React.FC<PassVerificationModalProps> = ({
  gatePass,
  onVerify,
  trigger
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleVerify = (isUsed: boolean) => {
    onVerify(gatePass.id, isUsed);
    setIsOpen(false);
    
    const message = isUsed 
      ? `Confirmed that ${gatePass.requestedBy.firstName} used their gate pass` 
      : `Marked ${gatePass.requestedBy.firstName}'s gate pass as not used`;
    
    toast({
      title: "Gate Pass Updated",
      description: message,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="outline">Verify Pass</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verify Gate Pass</DialogTitle>
          <DialogDescription>
            Confirm whether this gate pass is being used
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
            <span className="text-sm font-medium col-span-1">Destination:</span>
            <span className="col-span-3">{gatePass.destination}</span>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Reason:</span>
            <span className="col-span-3">{gatePass.reason}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Status:</span>
            <span className="col-span-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {gatePass.status}
              </span>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Used:</span>
            <span className="col-span-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                gatePass.isUsed ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {gatePass.isUsed ? 'Yes' : 'No'}
              </span>
            </span>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => handleVerify(false)}
            disabled={!gatePass.isUsed}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Mark as Not Used
          </Button>
          <Button
            onClick={() => handleVerify(true)}
            disabled={gatePass.isUsed}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Used
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PassVerificationModal;
