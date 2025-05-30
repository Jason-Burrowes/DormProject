
import { useQuery } from '@tanstack/react-query';
import { getUsersByType } from '@/lib/mock-data/user-data';

export function useResidents() {
  return useQuery({
    queryKey: ['residents'],
    queryFn: () => getUsersByType('resident'),
  });
}
