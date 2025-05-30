
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { NurseReferral, ReferralStatus, UserRole } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ReferralReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedReferral: NurseReferral | null;
  report: string;
  setReport: (report: string) => void;
  doctorNotes: string;
  setDoctorNotes: (notes: string) => void;
  onSave: () => void;
}

export const ReferralReportDialog: React.FC<ReferralReportDialogProps> = ({
  open,
  onOpenChange,
  selectedReferral,
  report,
  setReport,
  doctorNotes,
  setDoctorNotes,
  onSave,
}) => {
  const { user } = useAuth();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedReferral?.status === ReferralStatus.COMPLETED 
              ? "Referral Report" 
              : "Complete Referral"}
          </DialogTitle>
          <DialogDescription>
            {selectedReferral?.status === ReferralStatus.COMPLETED 
              ? "View the completed referral report" 
              : "Fill in the details to complete this referral"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Trainee</Label>
            <div className="text-sm mt-1">
              {selectedReferral?.user ? 
                `${selectedReferral.user.firstName} ${selectedReferral.user.lastName}` : 
                'Unknown User'}
            </div>
          </div>
          
          <div>
            <Label>Reason for Referral</Label>
            <div className="text-sm mt-1">
              {selectedReferral?.reason}
            </div>
          </div>
          
          <div>
            <Label htmlFor="doctorNotes">Doctor's Notes</Label>
            <Textarea
              id="doctorNotes"
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="Enter doctor's notes..."
              readOnly={selectedReferral?.status === ReferralStatus.COMPLETED}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="nurseReport">Nurse Report</Label>
            <Textarea
              id="nurseReport"
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Enter your medical assessment and recommendations..."
              readOnly={selectedReferral?.status === ReferralStatus.COMPLETED}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Date of Referral</Label>
            <div className="text-sm mt-1">
              {selectedReferral && format(new Date(selectedReferral.referredAt), 'MMM dd, yyyy HH:mm')}
            </div>
          </div>
          
          {selectedReferral?.status === ReferralStatus.COMPLETED && selectedReferral.completedAt && (
            <div>
              <Label>Date Completed</Label>
              <div className="text-sm mt-1">
                {format(new Date(selectedReferral.completedAt), 'MMM dd, yyyy HH:mm')}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          {selectedReferral?.status === ReferralStatus.PENDING && user?.role === UserRole.NURSE ? (
            <Button onClick={onSave} className="w-full">Complete Referral</Button>
          ) : (
            <Button onClick={() => onOpenChange(false)} className="w-full">Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
