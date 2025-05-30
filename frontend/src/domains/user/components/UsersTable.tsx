
import React from 'react';
import { User, UserRole } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface UsersTableProps {
  users: User[] | undefined;
  isLoading: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, isLoading }) => {
  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case UserRole.TRAINEE:
        return 'bg-blue-100 text-blue-800';
      case UserRole.DORM_SUPERVISOR:
        return 'bg-purple-100 text-purple-800';
      case UserRole.NURSE:
        return 'bg-green-100 text-green-800';
      case UserRole.MANAGEMENT:
        return 'bg-red-100 text-red-800';
      case UserRole.MANAGER:
        return 'bg-yellow-100 text-yellow-800';
      case UserRole.PROGRAM_COORDINATOR:
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
