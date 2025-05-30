
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NurseReferral, ReferralStatus } from '@/types';

interface ReferralStatsCardsProps {
  referrals: NurseReferral[] | undefined;
}

export const ReferralStatsCards: React.FC<ReferralStatsCardsProps> = ({ referrals }) => {
  const pendingCount = referrals?.filter(ref => ref.status === ReferralStatus.PENDING).length || 0;
  const completedCount = referrals?.filter(ref => ref.status === ReferralStatus.COMPLETED).length || 0;
  const totalCount = referrals?.length || 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};
