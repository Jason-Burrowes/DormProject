
import { useEffect, useState } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Load notifications from localStorage on mount
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      // Sample notifications for demo purposes
      const demoNotifications: Notification[] = [
        {
          id: '1',
          title: 'Gate Pass Approved',
          message: 'Your gate pass request has been approved by the dorm leader.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
          read: false,
        },
        {
          id: '2',
          title: 'Room Assignment Updated',
          message: 'Your room assignment has been updated to Room 203.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          read: false,
        },
        {
          id: '3',
          title: 'New Announcement',
          message: 'There will be a dorm meeting this Saturday at 5pm.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          read: true,
        }
      ];
      setNotifications(demoNotifications);
      localStorage.setItem('notifications', JSON.stringify(demoNotifications));
    }
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    
    return newNotification;
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    );
    
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const removeNotification = (id: string) => {
    const updatedNotifications = notifications.filter(
      notification => notification.id !== id
    );
    
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('notifications');
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  };
}
