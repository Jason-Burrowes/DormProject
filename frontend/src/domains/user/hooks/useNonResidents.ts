
import { useQuery } from '@tanstack/react-query';
import { getUsersByType } from '@/lib/mock-data/user-data';

export function useNonResidents() {
  return useQuery({
    queryKey: ['non-residents'],
    queryFn: () => getUsersByType('non-resident'),
  });
}
