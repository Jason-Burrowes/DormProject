
import { useQuery } from '@tanstack/react-query';
import { getUsersWithWorkExperience } from '@/lib/mock-data/user-data';

export function useWorkExperienceUsers() {
  return useQuery({
    queryKey: ['users-with-work-experience'],
    queryFn: getUsersWithWorkExperience,
  });
}
