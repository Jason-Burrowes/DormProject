
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { mockLeaves } from '@/lib/mock-data';
import { Leave, LeaveType, Status } from '@/types';
import { Search, PlusCircle, FileText } from 'lucide-react';
import { format } from 'date-fns';

const SickRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch sick leave data
  const { data: leaves, isLoading } = useQuery({
    queryKey: ['sickLeaves'],
    queryFn: () => mockLeaves.filter(leave => leave.type === LeaveType.SICK),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Filter leaves based on search term
  const filteredLeaves = leaves?.filter((leave: Leave) => {
    const fullName = `${leave.user.firstName} ${leave.user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           leave.reason.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Sick Records</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Sick Record
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Medical Records</CardTitle>
          <CardDescription>
            View and manage resident sick records and medical information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search records..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-pulse space-y-2">
                <div className="h-4 w-48 bg-muted rounded"></div>
                <div className="h-4 w-64 bg-muted rounded"></div>
              </div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resident</TableHead>
                    <TableHead>Illness</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Medical Certificate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaves && filteredLeaves.length > 0 ? (
                    filteredLeaves.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell className="font-medium">
                          {leave.user.firstName} {leave.user.lastName}
                        </TableCell>
                        <TableCell>{leave.reason}</TableCell>
                        <TableCell>{format(leave.startDate, 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{format(leave.endDate, 'MMM dd, yyyy')}</TableCell>
                        <TableCell>
                          {leave.medicalCertificate ? (
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            leave.status === Status.APPROVED ? 'bg-green-100 text-green-800' : 
                            leave.status === Status.PENDING ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {leave.status}
                          </span>
                        </TableCell>
                        <TableCell>{leave.comments || 'No notes'}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center h-24">
                        No sick records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SickRecords;
