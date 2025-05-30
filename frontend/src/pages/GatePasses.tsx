
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
import { mockGatePasses } from '@/lib/mock-data';
import { GatePass, Status, Gender } from '@/types';
import { PlusCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { AddGatePassDialog } from '@/domains/leave/components';
import GatePassFilterBar from '@/domains/leave/components/filters/GatePassFilterBar';
import GatePassStats from '@/domains/leave/components/stats/GatePassStats';
import GatePassTable from '@/domains/leave/components/tables/GatePassTable';

const GatePasses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [genderFilter, setGenderFilter] = useState<Gender | 'all'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { user } = useAuth();
  
  const { data: gatePasses, isLoading, refetch } = useQuery({
    queryKey: ['gatePasses'],
    queryFn: () => mockGatePasses,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const handleAddGatePass = (data: Partial<GatePass>) => {
    toast({
      title: "Gate pass request submitted",
      description: "Your request has been submitted successfully and is pending approval.",
    });
    
    refetch();
  };
  
  // Filter gate passes based on search term, status and gender
  const filteredGatePasses = gatePasses?.filter((gatePass: GatePass) => {
    const fullName = `${gatePass.requestedBy.firstName} ${gatePass.requestedBy.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                          gatePass.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          gatePass.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || gatePass.status === statusFilter;
    const matchesGender = genderFilter === 'all' || gatePass.requestedBy.gender === genderFilter;
    
    return matchesSearch && matchesStatus && matchesGender;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Gate Passes</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Request Gate Pass
        </Button>
      </div>
      
      <AddGatePassDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
        onSubmit={handleAddGatePass} 
      />
      
      <GatePassStats gatePasses={gatePasses} />
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Gate Pass Management</CardTitle>
          <CardDescription>
            View and approve gate pass requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GatePassFilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
          />
          
          <GatePassTable 
            gatePasses={filteredGatePasses} 
            isLoading={isLoading} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default GatePasses;
