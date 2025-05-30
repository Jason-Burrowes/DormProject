
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserRole } from '@/types';
import { Search } from 'lucide-react';

interface UserFiltersProps {
  searchTerm: string;
  roleFilter: UserRole | 'all';
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (role: UserRole | 'all') => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  roleFilter,
  onSearchChange,
  onRoleFilterChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button 
          variant={roleFilter === 'all' ? 'default' : 'outline'} 
          onClick={() => onRoleFilterChange('all')}
          size="sm"
        >
          All
        </Button>
        <Button 
          variant={roleFilter === UserRole.TRAINEE ? 'default' : 'outline'}
          onClick={() => onRoleFilterChange(UserRole.TRAINEE)}
          size="sm"
        >
          Trainees
        </Button>
        <Button 
          variant={roleFilter === UserRole.DORM_SUPERVISOR ? 'default' : 'outline'}
          onClick={() => onRoleFilterChange(UserRole.DORM_SUPERVISOR)}
          size="sm"
        >
          Dorm Supervisors
        </Button>
        <Button 
          variant={roleFilter === UserRole.NURSE ? 'default' : 'outline'}
          onClick={() => onRoleFilterChange(UserRole.NURSE)}
          size="sm"
        >
          Nurses
        </Button>
        <Button 
          variant={roleFilter === UserRole.MANAGEMENT ? 'default' : 'outline'}
          onClick={() => onRoleFilterChange(UserRole.MANAGEMENT)}
          size="sm"
        >
          Management
        </Button>
      </div>
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UserFilters;
