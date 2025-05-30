
// Export all leave-related utility functions
import { GatePass, Leave, Status } from '@/types';

/**
 * Check if a gate pass is active
 */
export const isGatePassActive = (gatePass: GatePass): boolean => {
  return gatePass.status === Status.APPROVED && !gatePass.isUsed;
};

/**
 * Check if a leave is active
 */
export const isLeaveActive = (leave: Leave): boolean => {
  const now = new Date();
  return (
    leave.status === Status.APPROVED &&
    now >= leave.startDate &&
    now <= leave.endDate
  );
};

/**
 * Get remaining days for a leave
 */
export const getRemainingLeaveDays = (leave: Leave): number => {
  const now = new Date();
  if (!isLeaveActive(leave)) return 0;
  
  const endDate = new Date(leave.endDate);
  const diffTime = Math.abs(endDate.getTime() - now.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
