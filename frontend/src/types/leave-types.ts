
import { User } from './user-types';
import { Status } from './status-types';

// Leave Types
export enum LeaveType {
  SICK = 'sick',
  VACATION = 'vacation',
  EMERGENCY = 'emergency',
  OTHER = 'other',
}

// Leave Interface
export interface Leave {
  id: string;
  userId: string;
  user: User;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: Status;
  approvedBy?: string;
  approvedAt?: Date;
  comments?: string;
  medicalCertificate?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Gate Pass Interface
export interface GatePass {
  id: string;
  userId: string;
  requestedBy: User;
  reason: string;
  destination: string;
  requestDate: Date;
  requestTime: string;
  departureDate: Date;
  returnDate: Date;
  status: Status;
  isUsed: boolean;
  confirmedBy?: string;
  approvedBy?: User | string;
  approvedAt?: Date;
  usedAt?: Date;
  comments?: string;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
