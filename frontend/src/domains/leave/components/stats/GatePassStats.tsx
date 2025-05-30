
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Status, GatePass } from '@/types';

interface GatePassStatsProps {
  gatePasses: GatePass[] | undefined;
}

const GatePassStats: React.FC<GatePassStatsProps> = ({ gatePasses = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{gatePasses.length || 0}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {gatePasses.filter(pass => pass.status === Status.PENDING).length || 0}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Approved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {gatePasses.filter(pass => pass.status === Status.APPROVED).length || 0}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GatePassStats;
