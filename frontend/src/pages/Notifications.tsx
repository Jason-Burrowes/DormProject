
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/use-notifications';
import { Input } from '@/components/ui/input';
import { Search, Trash2, Bell, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';

const Notifications = () => {
  const { 
    notifications, 
    addNotification, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // Filter notifications based on search term
  const filteredNotifications = notifications.filter(notification => 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNotification = () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Title and message are required",
        variant: "destructive",
      });
      return;
    }

    addNotification({ title, message });
    setTitle('');
    setMessage('');
    toast({
      title: "Notification Added",
      description: "The notification has been created successfully.",
    });
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast({
      title: "All Notifications Marked as Read",
      description: "All notifications have been marked as read.",
    });
  };

  const handleClearAll = () => {
    clearAllNotifications();
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been cleared.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={!notifications.some(n => !n.read)}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
          <Button
            variant="outline"
            onClick={handleClearAll}
            disabled={notifications.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Notification</CardTitle>
            <CardDescription>Create and send a new notification to users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Notification title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full min-h-[100px] p-2 border border-border rounded-md"
                  placeholder="Notification message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button onClick={handleAddNotification} className="w-full">
                <Bell className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Analytics</CardTitle>
            <CardDescription>Overview of your notification system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-3xl font-bold">{notifications.length}</p>
                <p className="text-sm text-muted-foreground">Total Notifications</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-3xl font-bold">{notifications.filter(n => !n.read).length}</p>
                <p className="text-sm text-muted-foreground">Unread Notifications</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center col-span-2">
                <p className="text-3xl font-bold">{(notifications.filter(n => n.read).length / (notifications.length || 1) * 100).toFixed(0)}%</p>
                <p className="text-sm text-muted-foreground">Read Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Notification Management</CardTitle>
              <CardDescription>Manage and track sent notifications</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notifications..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <Alert>
              <Bell className="h-4 w-4" />
              <AlertTitle>No notifications found</AlertTitle>
              <AlertDescription>
                {notifications.length === 0 
                  ? "You don't have any notifications yet."
                  : "No notifications match your search criteria."}
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border rounded-lg ${notification.read ? 'bg-background' : 'bg-primary/5 border-primary/20'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium flex items-center">
                      {notification.title}
                      {!notification.read && (
                        <Badge variant="outline" className="ml-2 bg-primary/10 text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="sr-only">Mark as Read</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
