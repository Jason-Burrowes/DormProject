
import { useQuery } from '@tanstack/react-query';
import { getUsersWithInternships } from '@/lib/mock-data/user-data';

export function useInternshipUsers() {
  return useQuery({
    queryKey: ['users-with-internships'],
    queryFn: getUsersWithInternships,
  });
}
