
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ReferralStatus } from '@/types';

interface ReferralFilterBarProps {
  statusFilter: ReferralStatus | 'all';
  setStatusFilter: (status: ReferralStatus | 'all') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const ReferralFilterBar: React.FC<ReferralFilterBarProps> = ({
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm,
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
          variant={statusFilter === ReferralStatus.PENDING ? 'default' : 'outline'} 
          onClick={() => setStatusFilter(ReferralStatus.PENDING)}
          size="sm"
        >
          Pending
        </Button>
        <Button 
          variant={statusFilter === ReferralStatus.COMPLETED ? 'default' : 'outline'} 
          onClick={() => setStatusFilter(ReferralStatus.COMPLETED)}
          size="sm"
        >
          Completed
        </Button>
        <Button 
          variant={statusFilter === ReferralStatus.ABORTED ? 'default' : 'outline'} 
          onClick={() => setStatusFilter(ReferralStatus.ABORTED)}
          size="sm"
        >
          Aborted
        </Button>
      </div>
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search referrals..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
