
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string | Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  type?: 'info' | 'warning' | 'error' | 'success';
}
