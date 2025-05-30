import React, { useState } from 'react';
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
import { Search, UserPlus } from 'lucide-react';
import { User } from '@/types';
import { useResidents, useNonResidents } from '@/domains/user';
import { formatUserName } from '@/domains/user/utils';

const Residents = () => {
  const [filter, setFilter] = useState('residents'); // 'residents' or 'non-residents'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch residents data using our domain hooks
  const residentsQuery = useResidents();
  const nonResidentsQuery = useNonResidents();
  
  const isLoading = filter === 'residents' ? residentsQuery.isLoading : nonResidentsQuery.isLoading;
  const users = filter === 'residents' ? residentsQuery.data : nonResidentsQuery.data;
  
  // Filter users based on search term
  const filteredUsers = users?.filter((user: User) => {
    const fullName = formatUserName(user).toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Residents</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Resident
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Resident Management</CardTitle>
          <CardDescription>
            View and manage dormitory residents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6 space-x-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant={filter === 'residents' ? 'default' : 'outline'} 
                onClick={() => setFilter('residents')}
              >
                Residents
              </Button>
              <Button 
                variant={filter === 'non-residents' ? 'default' : 'outline'} 
                onClick={() => setFilter('non-residents')}
              >
                Non-Residents
              </Button>
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search residents..."
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Locker</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers && filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.gender}</TableCell>
                        <TableCell>{user.roomId || 'N/A'}</TableCell>
                        <TableCell>{user.lockerId || 'N/A'}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                        No residents found
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

export default Residents;
