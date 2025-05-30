
// Dashboard Stats Interface
export interface DashboardStats {
  totalResidents: number;
  totalNonResidents: number;
  totalMale: number;
  totalFemale: number;
  totalOther: number;
  activeGatePasses: number;
  pendingGatePasses: number;
  activeSickLeaves: number;
  activeVacations: number;
  roomOccupancy: number;
  lockerOccupancy: number;
}
