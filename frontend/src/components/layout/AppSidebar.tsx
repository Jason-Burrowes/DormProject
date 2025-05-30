
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  DoorOpen, 
  BedDouble, 
  Lock, 
  Settings, 
  LogOut,
  UserPlus,
  ClipboardList,
  Heart,
  Map,
  Shield,
  Bell
} from 'lucide-react';

const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Define menu items based on user role
  const getMenuItems = () => {
    const items = [
      {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard',
        roles: [UserRole.TRAINEE, UserRole.DORM_SUPERVISOR, UserRole.NURSE, UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR, UserRole.SECURITY],
      },
      {
        title: 'Gate Passes',
        icon: DoorOpen,
        path: '/gate-passes',
        roles: [UserRole.TRAINEE, UserRole.DORM_SUPERVISOR, UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR, UserRole.SECURITY],
      },
      {
        title: 'Residents',
        icon: Users,
        path: '/residents',
        roles: [UserRole.DORM_SUPERVISOR, UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR, UserRole.SECURITY],
      },
      {
        title: 'Leaves',
        icon: CalendarClock,
        path: '/leaves',
        roles: [UserRole.TRAINEE, UserRole.DORM_SUPERVISOR, UserRole.NURSE, UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR],
      },
      {
        title: 'Sick Records',
        icon: Heart,
        path: '/sick-records',
        roles: [UserRole.NURSE, UserRole.DORM_SUPERVISOR, UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR],
      },
      {
        title: 'Nurse Referrals',
        icon: Heart,
        path: '/nurse-referrals',
        roles: [UserRole.TRAINEE, UserRole.DORM_SUPERVISOR, UserRole.NURSE, UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR],
      },
      {
        title: 'Nurse Visit History',
        icon: Heart,
        path: '/nurse-visit-history',
        roles: [UserRole.DORM_SUPERVISOR, UserRole.NURSE, UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR],
      },
      {
        title: 'Rooms',
        icon: BedDouble,
        path: '/rooms',
        roles: [UserRole.DORM_SUPERVISOR, UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR],
      },
      {
        title: 'Lockers',
        icon: Lock,
        path: '/lockers',
        roles: [UserRole.DORM_SUPERVISOR, UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR],
      },
      {
        title: 'Work Experience',
        icon: ClipboardList,
        path: '/work-experience',
        roles: [UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR],
      },
      {
        title: 'Internships',
        icon: Map,
        path: '/internships',
        roles: [UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR],
      },
      {
        title: 'User Management',
        icon: UserPlus,
        path: '/users',
        roles: [UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR],
      },
      {
        title: 'Security',
        icon: Shield,
        path: '/security',
        roles: [UserRole.SECURITY],
      },
      {
        title: 'Notifications',
        icon: Bell,
        path: '/notifications',
        roles: [UserRole.DORM_SUPERVISOR, UserRole.NURSE, UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR],
      },
      {
        title: 'Settings',
        icon: Settings,
        path: '/settings',
        roles: [UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR],
      },
    ];

    return items.filter(item => user && item.roles.includes(user.role));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-medium text-sm">DS</span>
          </div>
          <div className="font-semibold tracking-tight text-lg">Dorm System</div>
        </div>
        <SidebarTrigger className="absolute right-2 top-5" />
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>
            {getMenuItems().map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                >
                  <button className="w-full">
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
