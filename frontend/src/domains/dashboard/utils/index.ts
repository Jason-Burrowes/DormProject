
// Export all dashboard-related utility functions
import { DashboardStats } from '@/types';

/**
 * Calculate total users
 */
export const calculateTotalUsers = (stats: DashboardStats): number => {
  return stats.totalResidents + stats.totalNonResidents;
};

/**
 * Format occupancy percentage
 */
export const formatOccupancyPercentage = (percentage: number): string => {
  return `${Math.round(percentage)}%`;
};

/**
 * Check if occupancy is critical (above 90%)
 */
export const isOccupancyCritical = (percentage: number): boolean => {
  return percentage > 90;
};
