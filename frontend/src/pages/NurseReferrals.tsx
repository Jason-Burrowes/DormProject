
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { NurseReferral, ReferralStatus, UserRole } from '@/types';
import { useNurseReferrals } from '@/domains/medical/hooks';
import { 
  ReferralStatusBadge, 
  ReferralStatsCards, 
  ReferralFilterBar,
  ReferralReportDialog,
  ReferralTable
} from '@/domains/medical/components';

const NurseReferrals = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReferralStatus | 'all'>('all');
  const [selectedReferral, setSelectedReferral] = useState<NurseReferral | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [report, setReport] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  
  // Fetch referrals data
  const { data: referrals, isLoading, refetch } = useNurseReferrals();
  
  // Filter referrals based on search term and status with null checks
  const filteredReferrals = referrals?.filter((referral: NurseReferral) => {
    // Safely access properties with optional chaining
    const fullName = referral.user ? `${referral.user.firstName} ${referral.user.lastName}`.toLowerCase() : '';
    const referrerName = referral.referrerUser ? `${referral.referrerUser.firstName} ${referral.referrerUser.lastName}`.toLowerCase() : '';
    const reason = referral.reason ? referral.reason.toLowerCase() : '';
    
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                          referrerName.includes(searchTerm.toLowerCase()) ||
                          reason.includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || referral.status === statusFilter;
    
    // If user is a trainee, only show their own referrals
    if (user?.role === UserRole.TRAINEE) {
      return referral.userId === user.id && matchesSearch && matchesStatus;
    }
    
    return matchesSearch && matchesStatus;
  });

  const handleViewReport = (referral: NurseReferral) => {
    setSelectedReferral(referral);
    if (user?.role === UserRole.NURSE && referral.status === ReferralStatus.PENDING) {
      // If nurse and referral is pending, show the report creation dialog
      setReport('');
      setDoctorNotes('');
      setShowReportDialog(true);
    } else if (referral.status === ReferralStatus.COMPLETED) {
      // Otherwise just show the existing report
      setReport(referral.nurseReport || '');
      setDoctorNotes(referral.doctorNotes || '');
      setShowReportDialog(true);
    }
  };

  const handleSaveReport = () => {
    if (!selectedReferral) return;
    
    toast({
      title: "Report Saved",
      description: "The nurse referral report has been completed successfully.",
    });
    
    setShowReportDialog(false);
    
    // In a real app, this would make an API call to update the database
    setTimeout(() => refetch(), 500);
  };

  const handleMarkAborted = (referral: NurseReferral) => {
    toast({
      title: "Referral Aborted",
      description: "The nurse referral has been marked as aborted.",
    });
    
    // In a real app, this would make an API call to update the database
    setTimeout(() => refetch(), 500);
  };

  // Determine if the current user can add new referrals
  const canAddReferral = user?.role === UserRole.DORM_SUPERVISOR; // Changed from DORM_LEADER

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Nurse Referrals</h1>
        {canAddReferral && (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Referral
          </Button>
        )}
      </div>
      
      <ReferralStatsCards referrals={filteredReferrals} />
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Nurse Referral Management</CardTitle>
          <CardDescription>
            {user?.role === UserRole.NURSE 
              ? "Review and complete referrals from dorm supervisors" // Changed from dorm leaders
              : "View and track nurse referrals"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReferralFilterBar 
            statusFilter={statusFilter} 
            setStatusFilter={setStatusFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          <ReferralTable 
            referrals={filteredReferrals}
            isLoading={isLoading}
            onViewReport={handleViewReport}
            onMarkAborted={handleMarkAborted}
          />
        </CardContent>
      </Card>
      
      <ReferralReportDialog
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        selectedReferral={selectedReferral}
        report={report}
        setReport={setReport}
        doctorNotes={doctorNotes}
        setDoctorNotes={setDoctorNotes}
        onSave={handleSaveReport}
      />
    </div>
  );
};

export default NurseReferrals;
