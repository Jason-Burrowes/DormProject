import { CampusStatus } from './status-types';

// User Role enum - used for access control
export enum UserRole {
  TRAINEE = 'trainee',
  DORM_SUPERVISOR = 'dorm_supervisor',
  NURSE = 'nurse',
  MANAGEMENT = 'management',
  MANAGER = 'manager',
  PROGRAM_COORDINATOR = 'program_coordinator',
  SECURITY = 'security'
}

// Gender enum
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

// Programme Status enum
export enum ProgrammeStatus {
  ACTIVE = 'active',
  ON_LEAVE = 'on_leave',
  COMPLETED = 'completed',
  SUSPENDED = 'suspended',
  WITHDRAWN = 'withdrawn',
  IN_TRAINING = 'in_training',
  WORK_EXPERIENCE = 'work_experience',
  INTERNSHIP = 'internship',
  DISCONTINUED = 'discontinued'
}

// Residential Status enum
export enum ResidentialStatus {
  RESIDENTIAL = 'residential',
  NON_RESIDENTIAL = 'non_residential',
}

// User interface
export interface User {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  gender?: Gender;
  dateOfBirth?: string; // Keep as string for consistency
  phoneNumber?: string;
  campusStatus?: CampusStatus;
  residentialStatus?: ResidentialStatus;
  programmeName?: string;
  programmeStatus?: ProgrammeStatus;
  roomId?: string;
  lockerId?: string;
  residencyStartDate?: string;
  residencyEndDate?: string;
  passesUsed?: number;
  maxPasses?: number;
  extracurricularActivities?: string[];
  medicalNotes?: string[];
  emergencyContacts?: EmergencyContact[];
  // Additional properties needed by the UI
  isActive?: boolean;
  isResident?: boolean;
  onShift?: boolean;
}

// Authentication User interface (after successful login)
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  onShift?: boolean; // Added for nurse role
}

// Auth context type
export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser?: (data: Partial<AuthUser>) => void; // Added for updating user attributes like shift status
}

// Emergency contact interface
export interface EmergencyContact {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  relationship: string;
}

// Security user interface
export interface SecurityUser extends User {
  onShift: boolean;
}

// Nurse user interface
export interface NurseUser extends User {
  onShift: boolean;
}

// Dorm Supervisor user interface
export interface DormSupervisorUser extends User {
  onShift: boolean;
}

// Health Note interface for nurse to add notes to trainees
export interface HealthNote {
  id: string;
  userId: string; // trainee ID
  nurseId: string; // nurse who created the note
  note: string;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean; // whether the note is visible to the trainee
}

// Nurse Visit Report interface
export interface NurseVisitReport {
  id: string;
  referralId: string; // related to NurseReferral
  userId: string; // trainee ID
  nurseId: string; // nurse who created the report
  symptoms: string;
  diagnosis: string;
  treatment: string;
  recommendations: string;
  hasDocumentation: boolean; // indicates if doctor provided documentation
  documentationUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Management user interface
export interface ManagementUser extends User {
  canManageUsers: boolean;
  canApproveLeaves: boolean;
  canDeployNotifications: boolean;
}
