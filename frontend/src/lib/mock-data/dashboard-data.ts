
import { DashboardStats } from '@/types';

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalResidents: 4,
  totalNonResidents: 2,
  totalMale: 3,
  totalFemale: 3,
  totalOther: 0,
  activeGatePasses: 1,
  pendingGatePasses: 1,
  activeSickLeaves: 1,
  activeVacations: 0,
  roomOccupancy: 5 / 12 * 100, // 5 occupants out of 12 capacity
  lockerOccupancy: 4 / 5 * 100, // 4 assigned out of 5 lockers
};
