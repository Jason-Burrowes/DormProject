
// Export all dashboard-related hooks
import { useQuery } from '@tanstack/react-query';
import { mockDashboardStats } from '@/lib/mock-data';

/**
 * Hook to fetch dashboard statistics
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => mockDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
