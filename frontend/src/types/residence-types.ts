
import { User, Gender } from './user-types';
import { CampusStatus } from './status-types';

// Room Status enum
export enum RoomStatus {
  OCCUPIED = 'occupied',
  VACANT = 'vacant',
  MAINTENANCE = 'maintenance',
  RESERVED = 'reserved'
}

// Locker Status enum
export enum LockerStatus {
  ASSIGNED = 'assigned',
  AVAILABLE = 'available',
  MAINTENANCE = 'maintenance',
  RESERVED = 'reserved'
}

// Room Interface
export interface Room {
  id: string;
  roomNumber: string;
  building: string;
  floor: string;
  type: string;
  status: RoomStatus;
  currentOccupancy: number;
  maxOccupancy: number;
  occupants: User[];
  notes?: string;
  // Backward compatibility fields
  number?: string;
  capacity?: number;
  maxCapacity?: number;
  gender?: Gender;
  createdAt?: Date;
  updatedAt?: Date;
}

// Locker Interface
export interface Locker {
  id: string;
  lockerNumber: string;
  location: string;
  status: LockerStatus;
  size: string;
  notes?: string;
  assignedTo?: User;
  // Backward compatibility fields
  number?: string;
  isAssigned?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
