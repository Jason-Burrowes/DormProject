
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockUsers } from '@/lib/mock-data';
import { User, UserRole } from '@/types';
import { UserPlus } from 'lucide-react';
import UserFilters from '@/domains/user/components/UserFilters';
import UsersTable from '@/domains/user/components/UsersTable';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => mockUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const filteredUsers = users?.filter((user: User) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            View and manage system users and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserFilters 
            searchTerm={searchTerm}
            roleFilter={roleFilter}
            onSearchChange={setSearchTerm}
            onRoleFilterChange={setRoleFilter}
          />
          
          <UsersTable 
            users={filteredUsers} 
            isLoading={isLoading} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
