
// Export all user-related utility functions
import { User, Gender, UserRole } from '@/types';

/**
 * Format user's full name
 */
export const formatUserName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

/**
 * Check if user is a trainee
 */
export const isTrainee = (user: User): boolean => {
  return user.role === UserRole.TRAINEE;
};

/**
 * Check if user is an admin (management, manager, or program coordinator)
 */
export const isAdmin = (user: User): boolean => {
  return [UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR].includes(user.role);
};

/**
 * Get gender distribution stats
 */
export const getGenderDistribution = (users: User[]) => {
  const maleCount = users.filter(user => user.gender === Gender.MALE).length;
  const femaleCount = users.filter(user => user.gender === Gender.FEMALE).length;
  const otherCount = users.filter(user => user.gender === Gender.OTHER).length;
  
  return { male: maleCount, female: femaleCount, other: otherCount };
};

/**
 * Check if user is management
 */
export const isManagement = (user: User): boolean => {
  return user.role === UserRole.MANAGEMENT;
};

/**
 * Check if user can deploy notifications
 */
export const canDeployNotifications = (user: User): boolean => {
  return [UserRole.MANAGEMENT, UserRole.MANAGER, UserRole.PROGRAM_COORDINATOR, UserRole.DORM_SUPERVISOR, UserRole.NURSE].includes(user.role);
};
