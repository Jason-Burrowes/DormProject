
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useNurseVisits } from '@/domains/medical/hooks';
import { NurseVisit, VisitStatus, VisitType, UserRole } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { 
  VisitFilterBar,
  VisitDetailsDialog,
  VisitTable
} from '@/domains/medical/components';

const ITEMS_PER_PAGE = 10;

const NurseVisitHistory = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<VisitStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<VisitType | 'all'>('all');
  const [selectedVisit, setSelectedVisit] = useState<NurseVisit | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch visits data
  const { data: visits, isLoading } = useNurseVisits();
  
  // Filter visits based on search term, status, and type with null checks
  const filteredVisits = visits?.filter((visit: NurseVisit) => {
    // Safely access properties with optional chaining
    const fullName = visit.user ? `${visit.user.firstName} ${visit.user.lastName}`.toLowerCase() : '';
    const nurseName = visit.nurse ? `${visit.nurse.firstName} ${visit.nurse.lastName}`.toLowerCase() : '';
    const symptoms = visit.symptoms ? visit.symptoms.toLowerCase() : '';
    
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                          nurseName.includes(searchTerm.toLowerCase()) ||
                          symptoms.includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || visit.status === statusFilter;
    const matchesType = typeFilter === 'all' || visit.visitType === typeFilter;
    
    // If user is a trainee, only show their own visits
    if (user?.role === UserRole.TRAINEE) {
      return visit.userId === user.id && matchesSearch && matchesStatus && matchesType;
    }
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Pagination
  const totalPages = filteredVisits ? Math.ceil(filteredVisits.length / ITEMS_PER_PAGE) : 0;
  const paginatedVisits = filteredVisits?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const handleViewDetails = (visit: NurseVisit) => {
    setSelectedVisit(visit);
    setShowDetailsDialog(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Nurse Visit History</h1>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Visit History</CardTitle>
          <CardDescription>
            {user?.role === UserRole.NURSE 
              ? "View and manage all nurse visits" 
              : "View your medical visit history"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <VisitFilterBar 
            statusFilter={statusFilter} 
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          <VisitTable 
            visits={paginatedVisits}
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
          />
          
          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
      
      <VisitDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        visit={selectedVisit}
      />
    </div>
  );
};

export default NurseVisitHistory;
