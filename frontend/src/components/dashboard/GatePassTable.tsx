
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Status } from '@/types';
import { mockGatePasses } from '@/lib/mock-data';
import { format } from 'date-fns';

const GatePassTable: React.FC = () => {
  const getStatusBadge = (status: Status) => {
    switch (status) {
      case Status.PENDING:
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Pending</Badge>;
      case Status.APPROVED:
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Approved</Badge>;
      case Status.REJECTED:
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Gate Passes</CardTitle>
        <CardDescription>Overview of recent gate pass requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-medium py-3 px-4">Resident</th>
                <th className="text-left font-medium py-3 px-4">Departure</th>
                <th className="text-left font-medium py-3 px-4">Return</th>
                <th className="text-left font-medium py-3 px-4">Destination</th>
                <th className="text-left font-medium py-3 px-4">Reason</th>
                <th className="text-left font-medium py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockGatePasses.map((gatePass) => (
                <tr key={gatePass.id} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4">
                    {gatePass.requestedBy.firstName} {gatePass.requestedBy.lastName}
                  </td>
                  <td className="py-3 px-4">{format(gatePass.departureDate, 'MMM dd, yyyy')}</td>
                  <td className="py-3 px-4">{format(gatePass.returnDate, 'MMM dd, yyyy')}</td>
                  <td className="py-3 px-4">{gatePass.destination}</td>
                  <td className="py-3 px-4">{gatePass.reason}</td>
                  <td className="py-3 px-4">{getStatusBadge(gatePass.status)}</td>
                </tr>
              ))}
              {mockGatePasses.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-muted-foreground">
                    No gate passes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default GatePassTable;
