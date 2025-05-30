
// Export all residence-related hooks
import { useQuery } from '@tanstack/react-query';
import { mockRooms, mockLockers, getRoomById, getLockerById } from '@/lib/mock-data';

/**
 * Hook to fetch all rooms
 */
export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: () => mockRooms,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch a specific room by ID
 */
export const useRoom = (roomId: string | undefined) => {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoomById(roomId || ''),
    enabled: !!roomId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch all lockers
 */
export const useLockers = () => {
  return useQuery({
    queryKey: ['lockers'],
    queryFn: () => mockLockers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch a specific locker by ID
 */
export const useLocker = (lockerId: string | undefined) => {
  return useQuery({
    queryKey: ['locker', lockerId],
    queryFn: () => getLockerById(lockerId || ''),
    enabled: !!lockerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
