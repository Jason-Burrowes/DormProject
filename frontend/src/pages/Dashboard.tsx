
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  User, 
  UserMinus, 
  DoorOpen, 
  Clock, 
  BedDouble, 
  Lock,
  UserCheck,
  HeartPulse,
  Plane,
  CheckCircle,
  Bell,
  BookOpen,
  Calendar
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import OccupancyChart from '@/components/dashboard/OccupancyChart';
import GatePassTable from '@/components/dashboard/GatePassTable';
import GenderChart from '@/components/dashboard/GenderChart';
import { mockDashboardStats, mockUsers } from '@/lib/mock-data';
import { UserRole } from '@/types';
import TraineeDashboard from '@/components/dashboard/TraineeDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [greeting, setGreeting] = useState('');
  
  // For demo purposes, get the full user object from the mock data
  const fullUserData = mockUsers.find(u => u.id === user?.id);
  
  useEffect(() => {
    // Set appropriate greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);
  
  // If user is a trainee, show trainee-specific dashboard
  if (user?.role === UserRole.TRAINEE && fullUserData) {
    return <TraineeDashboard user={fullUserData} />;
  }

  // Determine which stats to show based on role
  const showMedicalStats = [UserRole.NURSE, UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR].includes(user?.role as UserRole);
  const showAllStats = [UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR].includes(user?.role as UserRole);
  const showSecurityStats = [UserRole.SECURITY, UserRole.MANAGEMENT].includes(user?.role as UserRole);
  const showDormStats = [UserRole.DORM_SUPERVISOR, UserRole.MANAGEMENT].includes(user?.role as UserRole);
  
  // Get role-specific greeting
  const getRoleSpecificContent = () => {
    switch(user?.role) {
      case UserRole.NURSE:
        return {
          title: "Nurse Dashboard",
          subtitle: "Overview of medical needs and resident health"
        };
      case UserRole.SECURITY:
        return {
          title: "Security Dashboard",
          subtitle: "Monitor resident movements and gate passes"
        };
      case UserRole.DORM_SUPERVISOR:
        return {
          title: "Dorm Supervisor Dashboard",
          subtitle: "Manage dormitory and resident needs"
        };
      default:
        return {
          title: "Dashboard",
          subtitle: "Overview of the dormitory system"
        };
    }
  };
  
  const roleContent = getRoleSpecificContent();
  
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{roleContent.title}</h1>
        <p className="text-muted-foreground">{roleContent.subtitle}</p>
      </div>
      
      <Card className="border-primary/10 bg-primary/5 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-medium">{greeting}, {user?.firstName}</h2>
              <p className="text-muted-foreground">
                {user?.role === UserRole.NURSE && user?.onShift ? 'You are currently on shift' : 
                 user?.role === UserRole.SECURITY && user?.onShift ? 'You are currently on duty' : 
                 'Welcome to the dashboard'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {showSecurityStats && (
          <>
            <StatCard
              title="Active Gate Passes"
              value={mockDashboardStats.activeGatePasses}
              icon={<DoorOpen size={18} />}
              description="Currently out of dormitory"
              className="animate-fade-in animate-delay-100"
            />
            
            <StatCard
              title="Pending Approvals"
              value={mockDashboardStats.pendingGatePasses}
              icon={<Clock size={18} />}
              description="Gate passes awaiting approval"
              className="animate-fade-in animate-delay-200"
            />
          </>
        )}
        
        {(showAllStats || showDormStats) && (
          <>
            <StatCard
              title="Total Residents"
              value={mockDashboardStats.totalResidents}
              icon={<Users size={18} />}
              description="Active dormitory residents"
              trend={{ value: 5.2, isPositive: true }}
              className="animate-fade-in animate-delay-100"
            />
            
            <StatCard
              title="Non-Residents"
              value={mockDashboardStats.totalNonResidents}
              icon={<UserMinus size={18} />}
              description="Staff and external users"
              className="animate-fade-in animate-delay-200"
            />
          </>
        )}
      </div>
      
      {(showAllStats || showDormStats) && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Male Residents"
            value={mockDashboardStats.totalMale}
            icon={<User size={18} />}
            className="animate-fade-in animate-delay-100"
          />
          
          <StatCard
            title="Female Residents"
            value={mockDashboardStats.totalFemale}
            icon={<User size={18} />}
            className="animate-fade-in animate-delay-200"
          />
          
          <StatCard
            title="Room Occupancy"
            value={`${mockDashboardStats.roomOccupancy.toFixed(1)}%`}
            icon={<BedDouble size={18} />}
            description="Of total room capacity"
            className="animate-fade-in animate-delay-300"
          />
          
          <StatCard
            title="Locker Occupancy"
            value={`${mockDashboardStats.lockerOccupancy.toFixed(1)}%`}
            icon={<Lock size={18} />}
            description="Of total lockers"
            className="animate-fade-in animate-delay-400"
          />
        </div>
      )}
      
      {/* Custom role-specific section */}
      {user?.role === UserRole.NURSE && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Sick Leaves"
            value={mockDashboardStats.activeSickLeaves}
            icon={<HeartPulse size={18} />}
            description="Currently on sick leave"
            className="animate-fade-in animate-delay-100"
          />
          
          <StatCard
            title="Pending Referrals"
            value="5"
            icon={<Bell size={18} />}
            description="Waiting for your attention"
            className="animate-fade-in animate-delay-200 bg-yellow-50 border-yellow-200"
          />
          
          <StatCard
            title="Today's Appointments"
            value="3"
            icon={<Calendar size={18} />}
            description="Scheduled for today"
            className="animate-fade-in animate-delay-300"
          />
          
          <StatCard
            title="Completed Today"
            value="7"
            icon={<CheckCircle size={18} />}
            description="Cases resolved today"
            className="animate-fade-in animate-delay-400"
          />
        </div>
      )}
      
      {user?.role === UserRole.DORM_SUPERVISOR && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Check-ins Today"
            value="12"
            icon={<CheckCircle size={18} />}
            description="New arrivals today"
            className="animate-fade-in animate-delay-100"
          />
          
          <StatCard
            title="Pending Requests"
            value="8"
            icon={<Bell size={18} />}
            description="Requiring your attention"
            className="animate-fade-in animate-delay-200 bg-yellow-50 border-yellow-200"
          />
          
          <StatCard
            title="Room Changes"
            value="2"
            icon={<BedDouble size={18} />}
            description="Scheduled this week"
            className="animate-fade-in animate-delay-300"
          />
          
          <StatCard
            title="Maintenance Issues"
            value="4"
            icon={<BookOpen size={18} />}
            description="Active maintenance tickets"
            className="animate-fade-in animate-delay-400"
          />
        </div>
      )}
      
      {showMedicalStats && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Sick Leaves"
            value={mockDashboardStats.activeSickLeaves}
            icon={<HeartPulse size={18} />}
            description="Currently on sick leave"
            className="animate-fade-in animate-delay-100"
          />
          
          <StatCard
            title="On Vacation"
            value={mockDashboardStats.activeVacations}
            icon={<Plane size={18} />}
            description="Currently on vacation"
            className="animate-fade-in animate-delay-200"
          />

          <StatCard
            title="Work Experience"
            value="3"
            icon={<UserCheck size={18} />}
            description="Trainees with work experience"
            className="animate-fade-in animate-delay-300"
          />
          
          <StatCard
            title="Internships"
            value="2"
            icon={<UserCheck size={18} />}
            description="Trainees in internships"
            className="animate-fade-in animate-delay-400"
          />
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {(showAllStats || showDormStats) && (
          <>
            <OccupancyChart 
              roomOccupancy={mockDashboardStats.roomOccupancy} 
              lockerOccupancy={mockDashboardStats.lockerOccupancy} 
            />
            
            <GenderChart 
              maleCount={mockDashboardStats.totalMale}
              femaleCount={mockDashboardStats.totalFemale}
              otherCount={mockDashboardStats.totalOther}
            />
          </>
        )}
      </div>
      
      {showSecurityStats && (
        <div className={isMobile ? "mt-4" : ""}>
          <h2 className="text-xl font-semibold mb-4">Recent Gate Passes</h2>
          <GatePassTable />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
