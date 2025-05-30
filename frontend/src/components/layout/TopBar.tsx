
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BellIcon, 
  SunIcon, 
  MoonIcon,
  PanelLeftIcon,
  Bot
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@/hooks/use-notifications';
import { useSidebar } from '@/components/ui/sidebar';
import AIAssistant from '@/components/ai/AIAssistant';
import { UserRole } from '@/types';

const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const { toggleSidebar } = useSidebar();
  const { notifications, markAsRead } = useNotifications();
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const getInitials = () => {
    if (!user) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  const getRoleBadgeVariant = () => {
    switch (user?.role) {
      case UserRole.TRAINEE:
        return 'secondary';
      case UserRole.DORM_SUPERVISOR:
        return 'default';
      case UserRole.NURSE:
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="border-b border-border bg-card z-10">
      <div className="flex h-16 items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full" 
            onClick={toggleSidebar}
          >
            <PanelLeftIcon size={18} />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          
          <h1 className="text-xl font-semibold tracking-tight">
            {user && `Welcome, ${user.firstName}`}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={() => setShowAIAssistant(prev => !prev)}
          >
            <Bot size={18} />
            <span className="sr-only">AI Assistant</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={toggleTheme}
          >
            {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <BellIcon size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length === 0 ? (
                <div className="py-4 px-2 text-center text-muted-foreground">
                  No notifications
                </div>
              ) : (
                <div className="max-h-[60vh] overflow-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id} 
                      className="flex flex-col items-start px-4 py-3 cursor-pointer"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex w-full justify-between items-start mb-1">
                        <span className="font-medium">{notification.title}</span>
                        {!notification.read && (
                          <Badge variant="outline" className="bg-primary/10 text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{notification.message}</p>
                      <span className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full p-1 h-9">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.firstName} {user?.lastName}</span>
                  <span className="text-xs text-muted-foreground">{user?.email}</span>
                  <Badge variant={getRoleBadgeVariant()} className="mt-2 w-fit capitalize">
                    {user?.role.replace('_', ' ')}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {showAIAssistant && <AIAssistant onClose={() => setShowAIAssistant(false)} />}
    </header>
  );
};

export default TopBar;
