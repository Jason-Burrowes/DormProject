
// Export all leave-related hooks
import { useQuery } from '@tanstack/react-query';
import { mockGatePasses, mockLeaves, getGatePassesByUserId, getLeavesByUserId } from '@/lib/mock-data';
import { Status } from '@/types';

/**
 * Hook to fetch all gate passes
 */
export const useGatePasses = () => {
  return useQuery({
    queryKey: ['gatePasses'],
    queryFn: () => mockGatePasses,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch gate passes by user ID
 */
export const useUserGatePasses = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['gatePasses', userId],
    queryFn: () => getGatePassesByUserId(userId || ''),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch active gate passes
 */
export const useActiveGatePasses = () => {
  return useQuery({
    queryKey: ['gatePasses', 'active'],
    queryFn: () => mockGatePasses.filter(pass => pass.status === Status.APPROVED && !pass.isUsed),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch all leaves
 */
export const useLeaves = () => {
  return useQuery({
    queryKey: ['leaves'],
    queryFn: () => mockLeaves,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch leaves by user ID
 */
export const useUserLeaves = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['leaves', userId],
    queryFn: () => getLeavesByUserId(userId || ''),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
