
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { NurseVisit, VisitStatus } from '@/types';
import { VisitStatusBadge } from './VisitStatusBadge';
import { VisitTypeChip } from './VisitTypeChip';

interface VisitDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visit: NurseVisit | null;
}

export const VisitDetailsDialog: React.FC<VisitDetailsDialogProps> = ({
  open,
  onOpenChange,
  visit,
}) => {
  if (!visit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Visit Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="flex justify-between">
            <div>
              <Label>Status</Label>
              <div className="mt-1">
                <VisitStatusBadge status={visit.status} />
              </div>
            </div>
            <div>
              <Label>Type</Label>
              <div className="mt-1">
                <VisitTypeChip type={visit.visitType} />
              </div>
            </div>
          </div>
          
          <div>
            <Label>Trainee</Label>
            <div className="text-sm mt-1">
              {visit.user ? `${visit.user.firstName} ${visit.user.lastName}` : 'Unknown User'}
            </div>
          </div>
          
          <div>
            <Label>Nurse</Label>
            <div className="text-sm mt-1">
              {visit.nurse ? `${visit.nurse.firstName} ${visit.nurse.lastName}` : 'Unknown Nurse'}
            </div>
          </div>
          
          <div>
            <Label>Date & Time</Label>
            <div className="text-sm mt-1">
              {format(new Date(visit.visitDate), 'MMM dd, yyyy HH:mm')}
            </div>
          </div>
          
          <div>
            <Label>Symptoms</Label>
            <div className="text-sm mt-1 p-2 bg-gray-50 rounded border">
              {visit.symptoms}
            </div>
          </div>
          
          {visit.diagnosis && (
            <div>
              <Label>Diagnosis</Label>
              <div className="text-sm mt-1 p-2 bg-gray-50 rounded border">
                {visit.diagnosis}
              </div>
            </div>
          )}
          
          {visit.treatment && (
            <div>
              <Label>Treatment</Label>
              <div className="text-sm mt-1 p-2 bg-gray-50 rounded border">
                {visit.treatment}
              </div>
            </div>
          )}
          
          {visit.recommendations && (
            <div>
              <Label>Recommendations</Label>
              <div className="text-sm mt-1 p-2 bg-gray-50 rounded border">
                {visit.recommendations}
              </div>
            </div>
          )}
          
          <div>
            <Label>Follow-up Required</Label>
            <div className="text-sm mt-1">
              {visit.followUpNeeded ? 'Yes' : 'No'}
              {visit.followUpNeeded && visit.followUpDate && (
                <span className="ml-2">
                  (Scheduled for {format(new Date(visit.followUpDate), 'MMM dd, yyyy')})
                </span>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
