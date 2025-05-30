
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/lib/mock-data';
import { User } from '@/types';

/**
 * Hook to fetch a single user by ID
 */
export const useUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId || ''),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
