
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
import { NurseVisit } from '@/types';
import { format } from 'date-fns';
import { FileText } from 'lucide-react';
import { VisitStatusBadge } from './VisitStatusBadge';
import { VisitTypeChip } from './VisitTypeChip';

interface VisitTableProps {
  visits: NurseVisit[] | undefined;
  isLoading: boolean;
  onViewDetails: (visit: NurseVisit) => void;
}

export const VisitTable: React.FC<VisitTableProps> = ({
  visits,
  isLoading,
  onViewDetails,
}) => {
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
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Symptoms</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Follow-up</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visits && visits.length > 0 ? (
            visits.map((visit) => (
              <TableRow key={visit.id}>
                <TableCell className="font-medium">
                  {visit.user ? 
                    `${visit.user.firstName} ${visit.user.lastName}` : 
                    'Unknown User'}
                </TableCell>
                <TableCell>
                  <VisitTypeChip type={visit.visitType} />
                </TableCell>
                <TableCell>{format(new Date(visit.visitDate), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <span className="truncate block max-w-[200px]">{visit.symptoms}</span>
                </TableCell>
                <TableCell>
                  <VisitStatusBadge status={visit.status} />
                </TableCell>
                <TableCell>
                  {visit.followUpNeeded ? (
                    visit.followUpDate ? 
                      format(new Date(visit.followUpDate), 'MMM dd, yyyy') : 
                      'Yes'
                  ) : 'No'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(visit)}
                  >
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">View Details</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-24">
                No visits found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
