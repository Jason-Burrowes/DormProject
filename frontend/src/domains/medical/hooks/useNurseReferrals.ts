
import { useQuery } from '@tanstack/react-query';
import { mockNurseReferrals } from '@/lib/mock-data';
import { NurseReferral, ReferralStatus } from '@/types';

/**
 * Hook to fetch all nurse referrals
 */
export const useNurseReferrals = () => {
  return useQuery({
    queryKey: ['nurseReferrals'],
    queryFn: () => mockNurseReferrals,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch nurse referrals by user ID
 */
export const useUserNurseReferrals = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['nurseReferrals', 'user', userId],
    queryFn: () => {
      if (!userId) return [];
      return mockNurseReferrals.filter(referral => referral.userId === userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch nurse referrals by status
 */
export const useNurseReferralsByStatus = (status: ReferralStatus) => {
  return useQuery({
    queryKey: ['nurseReferrals', 'status', status],
    queryFn: () => {
      return mockNurseReferrals.filter(referral => referral.status === status);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
