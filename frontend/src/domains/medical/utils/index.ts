
// Export all medical-related utility functions
import { NurseReferral, ReferralStatus } from '@/types';

/**
 * Check if a nurse referral is pending
 */
export const isReferralPending = (referral: NurseReferral): boolean => {
  return referral.status === ReferralStatus.PENDING;
};

/**
 * Get days since referral was created
 */
export const getDaysSinceReferral = (referral: NurseReferral): number => {
  const now = new Date();
  const createdDate = new Date(referral.createdAt);
  const diffTime = Math.abs(now.getTime() - createdDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Format referral status for display
 */
export const formatReferralStatus = (status: ReferralStatus): string => {
  switch (status) {
    case ReferralStatus.PENDING:
      return 'Pending';
    case ReferralStatus.COMPLETED:
      return 'Completed';
    case ReferralStatus.ABORTED:
      return 'Aborted';
    default:
      return 'Unknown';
  }
};
