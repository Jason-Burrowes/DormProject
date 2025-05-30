
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { VisitStatus, VisitType } from '@/types';

interface VisitFilterBarProps {
  statusFilter: VisitStatus | 'all';
  setStatusFilter: (status: VisitStatus | 'all') => void;
  typeFilter: VisitType | 'all';
  setTypeFilter: (type: VisitType | 'all') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const VisitFilterBar: React.FC<VisitFilterBarProps> = ({
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Status:</span>
        <Button 
          variant={statusFilter === 'all' ? 'default' : 'outline'} 
          onClick={() => setStatusFilter('all')}
          size="sm"
        >
          All
        </Button>
        <Button 
          variant={statusFilter === VisitStatus.IN_PROGRESS ? 'default' : 'outline'} 
          onClick={() => setStatusFilter(VisitStatus.IN_PROGRESS)}
          size="sm"
        >
          In Progress
        </Button>
        <Button 
          variant={statusFilter === VisitStatus.COMPLETED ? 'default' : 'outline'} 
          onClick={() => setStatusFilter(VisitStatus.COMPLETED)}
          size="sm"
        >
          Completed
        </Button>
        <Button 
          variant={statusFilter === VisitStatus.CANCELLED ? 'default' : 'outline'} 
          onClick={() => setStatusFilter(VisitStatus.CANCELLED)}
          size="sm"
        >
          Cancelled
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Type:</span>
        <Button 
          variant={typeFilter === 'all' ? 'default' : 'outline'} 
          onClick={() => setTypeFilter('all')}
          size="sm"
        >
          All Types
        </Button>
        <Button 
          variant={typeFilter === VisitType.REFERRAL ? 'default' : 'outline'} 
          onClick={() => setTypeFilter(VisitType.REFERRAL)}
          size="sm"
        >
          Referral
        </Button>
        <Button 
          variant={typeFilter === VisitType.WALK_IN ? 'default' : 'outline'} 
          onClick={() => setTypeFilter(VisitType.WALK_IN)}
          size="sm"
        >
          Walk-in
        </Button>
        <Button 
          variant={typeFilter === VisitType.SCHEDULED ? 'default' : 'outline'} 
          onClick={() => setTypeFilter(VisitType.SCHEDULED)}
          size="sm"
        >
          Scheduled
        </Button>
        <Button 
          variant={typeFilter === VisitType.EMERGENCY ? 'default' : 'outline'} 
          onClick={() => setTypeFilter(VisitType.EMERGENCY)}
          size="sm"
        >
          Emergency
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by trainee name or symptoms..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
