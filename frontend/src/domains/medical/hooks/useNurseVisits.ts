
import { useQuery } from '@tanstack/react-query';
import { mockNurseVisits, getVisitsByUserId, getVisitsByNurseId, getVisitsByStatus, getVisitsByType } from '@/lib/mock-data';
import { VisitStatus, VisitType } from '@/types';

/**
 * Hook to fetch all nurse visits
 */
export const useNurseVisits = () => {
  return useQuery({
    queryKey: ['nurseVisits'],
    queryFn: () => mockNurseVisits,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch nurse visits by user ID
 */
export const useUserNurseVisits = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['nurseVisits', 'user', userId],
    queryFn: () => getVisitsByUserId(userId || ''),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch nurse visits by nurse ID
 */
export const useNurseVisitsByNurseId = (nurseId: string | undefined) => {
  return useQuery({
    queryKey: ['nurseVisits', 'nurse', nurseId],
    queryFn: () => getVisitsByNurseId(nurseId || ''),
    enabled: !!nurseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch nurse visits by status
 */
export const useNurseVisitsByStatus = (status: VisitStatus) => {
  return useQuery({
    queryKey: ['nurseVisits', 'status', status],
    queryFn: () => getVisitsByStatus(status),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch nurse visits by type
 */
export const useNurseVisitsByType = (type: VisitType) => {
  return useQuery({
    queryKey: ['nurseVisits', 'type', type],
    queryFn: () => getVisitsByType(type),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
