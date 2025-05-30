
import { Room, Locker, Gender, RoomStatus, LockerStatus } from '@/types';
import { mockUsers } from './user-data';

// Mock Rooms
export const mockRooms: Room[] = [
  {
    id: '1',
    roomNumber: '101',
    number: '101',
    building: 'Building A',
    floor: '1',
    type: 'Dormitory',
    status: RoomStatus.OCCUPIED,
    currentOccupancy: 2,
    maxOccupancy: 4,
    occupants: mockUsers.slice(0, 2),
    capacity: 4,
    maxCapacity: 12,
    gender: Gender.MALE,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    roomNumber: '102',
    number: '102',
    building: 'Building A',
    floor: '1',
    type: 'Dormitory',
    status: RoomStatus.OCCUPIED,
    currentOccupancy: 1,
    maxOccupancy: 4,
    occupants: mockUsers.slice(2, 3),
    capacity: 4,
    maxCapacity: 12,
    gender: Gender.MALE,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '3',
    roomNumber: '201',
    number: '201',
    building: 'Building B',
    floor: '2',
    type: 'Dormitory',
    status: RoomStatus.OCCUPIED,
    currentOccupancy: 2,
    maxOccupancy: 4,
    occupants: mockUsers.slice(3, 5),
    capacity: 4,
    maxCapacity: 12,
    gender: Gender.FEMALE,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
];

// Mock Lockers
export const mockLockers: Locker[] = [
  {
    id: '1',
    lockerNumber: 'L101',
    number: 'L101',
    location: 'Building A',
    status: LockerStatus.ASSIGNED,
    size: 'Medium',
    assignedTo: mockUsers[0],
    isAssigned: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    lockerNumber: 'L102',
    number: 'L102',
    location: 'Building A',
    status: LockerStatus.ASSIGNED,
    size: 'Medium',
    assignedTo: mockUsers[1],
    isAssigned: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '3',
    lockerNumber: 'L103',
    number: 'L103',
    location: 'Building B',
    status: LockerStatus.ASSIGNED,
    size: 'Medium',
    assignedTo: mockUsers[2],
    isAssigned: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '4',
    lockerNumber: 'L104',
    number: 'L104',
    location: 'Building B',
    status: LockerStatus.ASSIGNED,
    size: 'Large',
    assignedTo: mockUsers[3],
    isAssigned: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '5',
    lockerNumber: 'L105',
    number: 'L105',
    location: 'Building C',
    status: LockerStatus.AVAILABLE,
    size: 'Small',
    isAssigned: false,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
];

// Helper function to get a room by ID
export const getRoomById = (id: string): Room | undefined => {
  return mockRooms.find(room => room.id === id);
};

// Helper function to get a locker by ID
export const getLockerById = (id: string): Locker | undefined => {
  return mockLockers.find(locker => locker.id === id);
};
