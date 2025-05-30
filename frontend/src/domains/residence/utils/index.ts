
// Export all residence-related utility functions
import { Room, Locker, User } from '@/types';
import { mockRooms, mockLockers } from '@/lib/mock-data';

/**
 * Get room occupancy percentage
 */
export const getRoomOccupancyPercentage = (): number => {
  const totalOccupants = mockRooms.reduce((acc, room) => acc + room.currentOccupancy, 0);
  const totalCapacity = mockRooms.reduce((acc, room) => acc + room.maxOccupancy, 0);
  
  return totalCapacity > 0 ? (totalOccupants / totalCapacity) * 100 : 0;
};

/**
 * Get locker occupancy percentage
 */
export const getLockerOccupancyPercentage = (): number => {
  const assignedLockers = mockLockers.filter(locker => locker.status === 'assigned').length;
  const totalLockers = mockLockers.length;
  
  return totalLockers > 0 ? (assignedLockers / totalLockers) * 100 : 0;
};

/**
 * Check if a user can be assigned to a room based on gender and capacity
 */
export const canAssignUserToRoom = (user: User, room: Room): boolean => {
  return user.gender === room.gender && room.currentOccupancy < room.maxOccupancy;
};
