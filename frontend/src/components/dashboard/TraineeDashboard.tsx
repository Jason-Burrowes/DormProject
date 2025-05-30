
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BedDouble,
  Lock,
  DoorOpen,
  Heart,
  Calendar,
  Clock,
  AlertCircle
} from 'lucide-react';
import { User, GatePass, NurseReferral, Status } from '@/types';
import { format } from 'date-fns';
import { getGatePassesByUserId, getReferralsByUserId, hasResidencyExpired } from '@/lib/mock-data';

interface TraineeDashboardProps {
  user: User;
}

const TraineeDashboard: React.FC<TraineeDashboardProps> = ({ user }) => {
  // Fetch trainee-specific data
  const { data: gatePasses } = useQuery({
    queryKey: ['gatePasses', user.id],
    queryFn: () => getGatePassesByUserId(user.id),
    enabled: !!user.id,
  });

  const { data: referrals } = useQuery({
    queryKey: ['referrals', user.id],
    queryFn: () => getReferralsByUserId(user.id),
    enabled: !!user.id,
  });

  const pendingGatePasses = gatePasses?.filter(pass => pass.status === Status.PENDING).length || 0;
  const approvedGatePasses = gatePasses?.filter(pass => pass.status === Status.APPROVED).length || 0;
  
  const isResidencyExpired = hasResidencyExpired(user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.firstName}!</p>
      </div>
      
      {isResidencyExpired && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <div>
              <p className="text-sm text-red-700 font-medium">Attention: Your residency period has expired!</p>
              <p className="text-sm text-red-700">
                Your residency ended on {format(new Date(user.residencyEndDate!), 'MMM dd, yyyy')}. 
                Please contact the dorm administration.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {user.residentialStatus === 'residential' && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="text-2xl font-bold flex items-center">
                  <BedDouble className="h-5 w-5 mr-2 text-blue-500" />
                  {user.roomId ? `Room ${user.roomId}` : 'Unassigned'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Residency: {format(new Date(user.residencyStartDate!), 'MMM dd, yyyy')} - 
                  {format(new Date(user.residencyEndDate!), 'MMM dd, yyyy')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Locker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-indigo-500" />
                  {user.lockerId ? `Locker ${user.lockerId}` : 'Unassigned'}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Passes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="text-2xl font-bold flex items-center">
                  <DoorOpen className="h-5 w-5 mr-2 text-green-500" />
                  {user.passesUsed} / {user.maxPasses}
                </div>
                <p className="text-xs text-muted-foreground">
                  {pendingGatePasses} pending, {approvedGatePasses} approved
                </p>
              </CardContent>
            </Card>
          </>
        )}
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Program Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold capitalize">
              {user.programmeStatus?.replace('_', ' ')}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Gate Passes</CardTitle>
          </CardHeader>
          <CardContent>
            {gatePasses && gatePasses.length > 0 ? (
              <div className="space-y-4">
                {gatePasses.slice(0, 3).map((pass) => (
                  <div key={pass.id} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{pass.destination}</p>
                      <p className="text-sm text-muted-foreground">{pass.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {format(pass.departureDate, 'MMM dd')}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        pass.status === 'approved' ? 'bg-green-100 text-green-800' :
                        pass.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {pass.status}
                      </span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => window.location.href = "/gate-passes"}>
                  View All
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No gate passes found</p>
                <Button variant="outline" className="mt-2" onClick={() => window.location.href = "/gate-passes"}>
                  Request Pass
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Nurse Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            {referrals && referrals.length > 0 ? (
              <div className="space-y-4">
                {referrals.slice(0, 3).map((referral) => (
                  <div key={referral.id} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{referral.reason}</p>
                      <p className="text-sm text-muted-foreground">
                        Referred by: {referral.referrerUser.firstName} {referral.referrerUser.lastName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {format(referral.referredAt, 'MMM dd')}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        referral.status === 'completed' ? 'bg-green-100 text-green-800' :
                        referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {referral.status}
                      </span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => window.location.href = "/nurse-referrals"}>
                  View All
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No referrals found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {user.extracurricularActivities && user.extracurricularActivities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Extracurricular Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.extracurricularActivities.map((activity, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {activity}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {user.medicalNotes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Medical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.medicalNotes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TraineeDashboard;
