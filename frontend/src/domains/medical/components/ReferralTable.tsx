
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { NurseReferral, UserRole, ReferralStatus } from '@/types';
import { format } from 'date-fns';
import { FileText, X } from 'lucide-react';
import { ReferralStatusBadge } from './ReferralStatusBadge';
import { useAuth } from '@/contexts/AuthContext';

interface ReferralTableProps {
  referrals: NurseReferral[] | undefined;
  isLoading: boolean;
  onViewReport: (referral: NurseReferral) => void;
  onMarkAborted: (referral: NurseReferral) => void;
}

export const ReferralTable: React.FC<ReferralTableProps> = ({
  referrals,
  isLoading,
  onViewReport,
  onMarkAborted,
}) => {
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-pulse space-y-2">
          <div className="h-4 w-48 bg-muted rounded"></div>
          <div className="h-4 w-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trainee</TableHead>
            <TableHead>Referred By</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {referrals && referrals.length > 0 ? (
            referrals.map((referral) => (
              <TableRow key={referral.id}>
                <TableCell className="font-medium">
                  {referral.user ? 
                    `${referral.user.firstName} ${referral.user.lastName}` : 
                    'Unknown User'}
                </TableCell>
                <TableCell>
                  {referral.referrerUser ? 
                    `${referral.referrerUser.firstName} ${referral.referrerUser.lastName}` : 
                    'Unknown User'}
                </TableCell>
                <TableCell>{referral.reason}</TableCell>
                <TableCell>{format(new Date(referral.referredAt), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <ReferralStatusBadge status={referral.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewReport(referral)}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View Report</span>
                    </Button>
                    
                    {user?.role === UserRole.NURSE && referral.status === ReferralStatus.PENDING && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onMarkAborted(referral)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Mark Aborted</span>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">
                No referrals found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
