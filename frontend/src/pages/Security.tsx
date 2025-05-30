
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { mockGatePasses, mockUsers } from '@/lib/mock-data';
import { GatePass, Status, User, CampusStatus } from '@/types';
import { Search, CheckCircle, XCircle, Shield, Users, DoorOpen } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { SecurityStatusToggle } from '@/domains/user/components';
import { TraineeMovementList, PassVerificationModal } from '@/domains/leave/components';
import { SecurityUserCard } from '@/domains/user/components';

const SecurityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'approved' | 'all'>('approved');
  const [usedFilter, setUsedFilter] = useState<boolean | 'all'>('all');
  
  // Fetch gate passes data
  const { data: gatePasses, isLoading, refetch } = useQuery({
    queryKey: ['gatePasses'],
    queryFn: () => mockGatePasses,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Fetch users data
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => mockUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Filter gate passes based on search term, status, and used status
  const filteredGatePasses = gatePasses?.filter((gatePass: GatePass) => {
    const fullName = `${gatePass.requestedBy.firstName} ${gatePass.requestedBy.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                          gatePass.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          gatePass.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || gatePass.status === Status.APPROVED;
    const matchesUsed = usedFilter === 'all' || gatePass.isUsed === usedFilter;
    
    return matchesSearch && matchesStatus && matchesUsed;
  });

  const confirmGatePassUsage = (gatePassId: string, isUsed: boolean) => {
    // In a real application, this would make an API call to update the gate pass
    // Here we'll just show a toast notification
    const gatePass = gatePasses?.find(pass => pass.id === gatePassId);
    
    if (!gatePass) return;
    
    const message = isUsed 
      ? `Confirmed that ${gatePass.requestedBy.firstName} used their gate pass` 
      : `Marked ${gatePass.requestedBy.firstName}'s gate pass as not used`;
    
    toast({
      title: "Gate Pass Updated",
      description: message,
    });
    
    // Trigger a refetch to simulate the update
    setTimeout(() => refetch(), 500);
  };

  const updateTraineeCampusStatus = (userId: string, newStatus: CampusStatus) => {
    // In a real application, this would make an API call to update the user's campus status
    toast({
      title: "Campus Status Updated",
      description: `User's campus status changed to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Security Management</h1>
        <SecurityStatusToggle />
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Approved Passes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gatePasses?.filter(pass => pass.status === Status.APPROVED).length || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Used Passes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gatePasses?.filter(pass => pass.status === Status.APPROVED && pass.isUsed).length || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Off Campus Trainees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users?.filter(user => user.campusStatus === CampusStatus.OFF_CAMPUS).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {users && gatePasses && (
        <TraineeMovementList 
          users={users} 
          gatePasses={gatePasses} 
        />
      )}
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Gate Pass Verification</CardTitle>
          <CardDescription>
            Verify and record gate pass usage by residents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button 
                variant={usedFilter === 'all' ? 'default' : 'outline'} 
                onClick={() => setUsedFilter('all')}
                size="sm"
              >
                All
              </Button>
              <Button 
                variant={usedFilter === true ? 'default' : 'outline'} 
                onClick={() => setUsedFilter(true)}
                size="sm"
              >
                Used
              </Button>
              <Button 
                variant={usedFilter === false ? 'default' : 'outline'} 
                onClick={() => setUsedFilter(false)}
                size="sm"
              >
                Not Used
              </Button>
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search gate passes..."
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
                    <TableHead>Destination</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Return</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGatePasses && filteredGatePasses.length > 0 ? (
                    filteredGatePasses.map((gatePass) => (
                      <TableRow key={gatePass.id}>
                        <TableCell className="font-medium">
                          {gatePass.requestedBy.firstName} {gatePass.requestedBy.lastName}
                        </TableCell>
                        <TableCell>{gatePass.destination}</TableCell>
                        <TableCell>{format(new Date(gatePass.departureDate), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{format(new Date(gatePass.returnDate), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {gatePass.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            gatePass.isUsed ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {gatePass.isUsed ? 'Yes' : 'No'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <PassVerificationModal
                              gatePass={gatePass}
                              onVerify={confirmGatePassUsage}
                              trigger={
                                <Button
                                  variant="ghost"
                                  size="sm"
                                >
                                  {gatePass.isUsed ? (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  ) : (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  )}
                                  <span className="sr-only">
                                    {gatePass.isUsed ? 'Mark as Not Used' : 'Mark as Used'}
                                  </span>
                                </Button>
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center h-24">
                        No gate passes found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Resident Campus Status</CardTitle>
          <CardDescription>
            Update resident campus status and view resident information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {users?.filter(user => user.role === 'trainee').slice(0, 8).map(user => (
              <SecurityUserCard 
                key={user.id} 
                user={user} 
                onUpdateCampusStatus={updateTraineeCampusStatus} 
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityPage;
