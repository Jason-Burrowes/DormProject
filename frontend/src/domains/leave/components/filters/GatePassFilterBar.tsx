
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Status, Gender } from '@/types';

interface GatePassFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: Status | 'all';
  setStatusFilter: (status: Status | 'all') => void;
  genderFilter: Gender | 'all';
  setGenderFilter: (gender: Gender | 'all') => void;
}

const GatePassFilterBar: React.FC<GatePassFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  genderFilter,
  setGenderFilter
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button 
          variant={statusFilter === 'all' ? 'default' : 'outline'} 
          onClick={() => setStatusFilter('all')}
          size="sm"
        >
          All
        </Button>
        <Button 
          variant={statusFilter === Status.PENDING ? 'default' : 'outline'} 
          onClick={() => setStatusFilter(Status.PENDING)}
          size="sm"
        >
          Pending
        </Button>
        <Button 
          variant={statusFilter === Status.APPROVED ? 'default' : 'outline'} 
          onClick={() => setStatusFilter(Status.APPROVED)}
          size="sm"
        >
          Approved
        </Button>
        <Button 
          variant={statusFilter === Status.REJECTED ? 'default' : 'outline'} 
          onClick={() => setStatusFilter(Status.REJECTED)}
          size="sm"
        >
          Rejected
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant={genderFilter === 'all' ? 'default' : 'outline'} 
          onClick={() => setGenderFilter('all')}
          size="sm"
        >
          All Genders
        </Button>
        <Button 
          variant={genderFilter === Gender.MALE ? 'default' : 'outline'} 
          onClick={() => setGenderFilter(Gender.MALE)}
          size="sm"
        >
          Male
        </Button>
        <Button 
          variant={genderFilter === Gender.FEMALE ? 'default' : 'outline'} 
          onClick={() => setGenderFilter(Gender.FEMALE)}
          size="sm"
        >
          Female
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
  );
};

export default GatePassFilterBar;
