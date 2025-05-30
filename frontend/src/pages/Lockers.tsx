
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
import { mockLockers, getUserById } from '@/lib/mock-data';
import { Locker, LockerStatus } from '@/types';
import { Search, PlusCircle, KeyRound } from 'lucide-react';

const Lockers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'assigned'>('all');
  
  // Fetch lockers data
  const { data: lockers, isLoading } = useQuery({
    queryKey: ['lockers'],
    queryFn: () => mockLockers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Filter lockers based on search term and availability
  const filteredLockers = lockers?.filter((locker: Locker) => {
    const lockerNumber = locker.lockerNumber || locker.number || '';
    const matchesSearch = lockerNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (availabilityFilter === 'available') {
      return matchesSearch && (locker.status === LockerStatus.AVAILABLE || !locker.isAssigned);
    } else if (availabilityFilter === 'assigned') {
      return matchesSearch && (locker.status === LockerStatus.ASSIGNED || locker.isAssigned);
    }
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Lockers</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Locker
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Total Lockers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{lockers?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Assigned Lockers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {lockers?.filter(locker => 
                locker.status === LockerStatus.ASSIGNED || locker.isAssigned
              ).length || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Available Lockers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {lockers?.filter(locker => 
                locker.status === LockerStatus.AVAILABLE || !locker.isAssigned
              ).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Locker Management</CardTitle>
          <CardDescription>
            View and manage dormitory lockers and assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6 space-x-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant={availabilityFilter === 'all' ? 'default' : 'outline'} 
                onClick={() => setAvailabilityFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={availabilityFilter === 'assigned' ? 'default' : 'outline'} 
                onClick={() => setAvailabilityFilter('assigned')}
              >
                Assigned
              </Button>
              <Button 
                variant={availabilityFilter === 'available' ? 'default' : 'outline'} 
                onClick={() => setAvailabilityFilter('available')}
              >
                Available
              </Button>
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search lockers..."
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
                    <TableHead>Locker Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Assigned Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLockers && filteredLockers.length > 0 ? (
                    filteredLockers.map((locker) => {
                      // Handle both old and new data structure
                      const assignedToId = typeof locker.assignedTo === 'object' 
                        ? locker.assignedTo?.id 
                        : locker.assignedTo;
                      
                      const user = assignedToId ? getUserById(assignedToId) : null;
                      
                      return (
                        <TableRow key={locker.id}>
                          <TableCell className="font-medium">{locker.lockerNumber || locker.number}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              (locker.status === LockerStatus.ASSIGNED || locker.isAssigned) 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {(locker.status === LockerStatus.ASSIGNED || locker.isAssigned) ? 'Assigned' : 'Available'}
                            </span>
                          </TableCell>
                          <TableCell>
                            {user ? `${user.firstName} ${user.lastName}` : 'N/A'}
                          </TableCell>
                          <TableCell>
                            {(locker.status === LockerStatus.ASSIGNED || locker.isAssigned) ? 
                              new Date(locker.updatedAt || Date.now()).toLocaleDateString() : 
                              'N/A'
                            }
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <KeyRound className="h-4 w-4 mr-1" />
                              {(locker.status === LockerStatus.ASSIGNED || locker.isAssigned) ? 'Reassign' : 'Assign'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">
                        No lockers found
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

export default Lockers;
