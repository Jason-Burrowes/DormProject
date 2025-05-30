
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Notification } from '@/types';
import { format } from 'date-fns';
import { Bell } from 'lucide-react';

interface NotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notification: Notification | null;
  onMarkAsRead?: (id: string) => void;
}

const NotificationDialog: React.FC<NotificationDialogProps> = ({
  open,
  onOpenChange,
  notification,
  onMarkAsRead,
}) => {
  if (!notification) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            {notification.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-sm text-muted-foreground">
            {typeof notification.timestamp === 'string' 
              ? format(new Date(notification.timestamp), 'MMMM dd, yyyy - h:mm a')
              : format(notification.timestamp, 'MMMM dd, yyyy - h:mm a')}
          </div>
          
          <div className="text-sm">
            {notification.message}
          </div>
          
          {notification.actionUrl && (
            <Button asChild className="w-full mt-2">
              <a href={notification.actionUrl}>
                {notification.actionLabel || 'View'}
              </a>
            </Button>
          )}
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          
          {!notification.read && onMarkAsRead && (
            <Button 
              onClick={() => {
                onMarkAsRead(notification.id);
                onOpenChange(false);
              }}
            >
              Mark as read
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDialog;
