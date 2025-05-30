
import React from 'react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { GatePass } from '@/types';
import StatusBadge from '../ui/StatusBadge';

interface GatePassTableProps {
  gatePasses: GatePass[] | undefined;
  isLoading: boolean;
}

const GatePassTable: React.FC<GatePassTableProps> = ({ gatePasses, isLoading }) => {
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
            <TableHead>Resident</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Return</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gatePasses && gatePasses.length > 0 ? (
            gatePasses.map((gatePass) => (
              <TableRow key={gatePass.id}>
                <TableCell className="font-medium">
                  {gatePass.requestedBy.firstName} {gatePass.requestedBy.lastName}
                </TableCell>
                <TableCell>{gatePass.destination}</TableCell>
                <TableCell>{gatePass.reason}</TableCell>
                <TableCell>{format(gatePass.departureDate, 'MMM dd, yyyy')}</TableCell>
                <TableCell>{format(gatePass.returnDate, 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <StatusBadge status={gatePass.status} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">
                No gate passes found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GatePassTable;
