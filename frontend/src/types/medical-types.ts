
import { User } from './user-types';

// Referral Status
export enum ReferralStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ABORTED = 'aborted',
}

// Nurse Referral Interface
export interface NurseReferral {
  id: string;
  userId: string;
  user: User;
  referredBy: string;
  referrerUser: User;
  reason: string;
  status: ReferralStatus;
  referredAt: Date;
  completedAt?: Date;
  doctorNotes?: string;
  doctorDocumentation?: string; 
  nurseReport?: string;
  hasDocumentation?: boolean; // indicates if doctor provided documentation
  createdAt: Date;
  updatedAt: Date;
}

// Nurse Visit Type
export enum VisitType {
  REFERRAL = 'referral',
  WALK_IN = 'walk_in',
  SCHEDULED = 'scheduled',
  EMERGENCY = 'emergency',
}

// Nurse Visit Status
export enum VisitStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

// Nurse Visit Interface
export interface NurseVisit {
  id: string;
  userId: string;
  user: User;
  nurseId: string;
  nurse: User;
  visitType: VisitType;
  referralId?: string; // optional, only for REFERRAL type
  symptoms: string;
  visitDate: Date;
  status: VisitStatus;
  diagnosis?: string;
  treatment?: string;
  recommendations?: string;
  followUpNeeded: boolean;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
