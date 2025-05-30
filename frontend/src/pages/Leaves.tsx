
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
import { 
  mockLeaves,
  getUserById
} from '@/lib/mock-data';
import { Leave, LeaveType, Status } from '@/types';
import { Search, Plus, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { AddLeaveDialog } from '@/domains/leave/components';
import { useAuth } from '@/contexts/AuthContext';
import StatusBadge from '@/domains/leave/components/ui/StatusBadge';

const Leaves = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<LeaveType | 'all'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { user } = useAuth();
  
  // Fetch leaves data
  const { data: leaves, isLoading, refetch } = useQuery({
    queryKey: ['leaves'],
    queryFn: () => mockLeaves,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const handleAddLeave = (data: Partial<Leave>) => {
    toast({
      title: "Leave request submitted",
      description: "Your request has been submitted successfully and is pending approval.",
    });
    
    refetch();
  };
  
  // Filter leaves based on search term and type
  const filteredLeaves = leaves?.filter((leave: Leave) => {
    const matchesSearch = leave.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          leave.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          leave.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || leave.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Leaves</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Request Leave
        </Button>
      </div>
      
      <AddLeaveDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
        onSubmit={handleAddLeave} 
      />
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Leave Management</CardTitle>
          <CardDescription>
            View and manage resident leave requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6 space-x-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant={typeFilter === 'all' ? 'default' : 'outline'} 
                onClick={() => setTypeFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={typeFilter === LeaveType.SICK ? 'default' : 'outline'} 
                onClick={() => setTypeFilter(LeaveType.SICK)}
              >
                Sick
              </Button>
              <Button 
                variant={typeFilter === LeaveType.VACATION ? 'default' : 'outline'} 
                onClick={() => setTypeFilter(LeaveType.VACATION)}
              >
                Vacation
              </Button>
              <Button 
                variant={typeFilter === LeaveType.EMERGENCY ? 'default' : 'outline'} 
                onClick={() => setTypeFilter(LeaveType.EMERGENCY)}
              >
                Emergency
              </Button>
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search leaves..."
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
                    <TableHead>Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaves && filteredLeaves.length > 0 ? (
                    filteredLeaves.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell className="font-medium">
                          {leave.user.firstName} {leave.user.lastName}
                        </TableCell>
                        <TableCell>{leave.type}</TableCell>
                        <TableCell>{format(leave.startDate, 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{format(leave.endDate, 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{leave.reason}</TableCell>
                        <TableCell>
                          <StatusBadge status={leave.status} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                        No leaves found
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

export default Leaves;
