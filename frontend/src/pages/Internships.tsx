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
import { Search, FileEdit, GraduationCap } from 'lucide-react';
import { User } from '@/types';
import { useInternshipUsers } from '@/domains/user';
import { formatUserName } from '@/domains/user/utils';

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch internship data using our domain hook
  const { data: users, isLoading } = useInternshipUsers();
  
  // Filter users based on search term
  const filteredUsers = users?.filter((user: User) => {
    const fullName = formatUserName(user).toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Internships</h1>
        <Button>
          <FileEdit className="mr-2 h-4 w-4" />
          Add Internship Record
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Internship Records</CardTitle>
          <CardDescription>
            View and manage trainee internship records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search trainees..."
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
                    <TableHead>Resident</TableHead>
                    <TableHead>Internship Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers && filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.gender}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.isResident ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.isResident ? 'Resident' : 'Non-Resident'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            In Internship
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <GraduationCap className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                        No internship records found
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

export default Internships;
