import { GatePass, Leave, LeaveType, Status } from '@/types';
import { mockUsers } from './user-data';

// Mock Gate Passes
export const mockGatePasses: GatePass[] = [
  {
    id: '1',
    userId: '1',
    requestedBy: mockUsers[0],
    reason: 'Family visit',
    destination: 'Home',
    requestDate: new Date('2023-04-20'),
    requestTime: '09:00',
    departureDate: new Date('2023-05-01'),
    returnDate: new Date('2023-05-03'),
    status: Status.APPROVED,
    isUsed: true,
    approvedBy: '3',
    confirmedBy: '7',
    approvedAt: new Date('2023-04-25'),
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-04-25'),
  },
  {
    id: '2',
    userId: '2',
    requestedBy: mockUsers[1],
    reason: 'Medical appointment',
    destination: 'Hospital',
    requestDate: new Date('2023-05-01'),
    requestTime: '14:30',
    departureDate: new Date('2023-05-05'),
    returnDate: new Date('2023-05-05'),
    status: Status.PENDING,
    isUsed: false,
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-05-01'),
  },
  {
    id: '3',
    userId: '6',
    requestedBy: mockUsers[0],
    reason: 'Personal',
    destination: 'Shopping mall',
    requestDate: new Date('2023-05-02'),
    requestTime: '10:15',
    departureDate: new Date('2023-05-06'),
    returnDate: new Date('2023-05-06'),
    status: Status.REJECTED,
    isUsed: false,
    approvedBy: '3',
    approvedAt: new Date('2023-05-04'),
    comments: 'Not a valid reason for a gate pass.',
    createdAt: new Date('2023-05-02'),
    updatedAt: new Date('2023-05-04'),
  },
];

// Mock Leaves
export const mockLeaves: Leave[] = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    type: LeaveType.SICK,
    startDate: new Date('2023-05-10'),
    endDate: new Date('2023-05-12'),
    reason: 'Fever',
    status: Status.APPROVED,
    approvedBy: '4',
    approvedAt: new Date('2023-05-10'),
    comments: 'Rest and take medication as prescribed.',
    medicalCertificate: 'cert_123.pdf',
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-05-10'),
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    type: LeaveType.VACATION,
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-06-07'),
    reason: 'Summer vacation',
    status: Status.PENDING,
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-15'),
  },
];

// Helper function to get gate passes by user ID
export const getGatePassesByUserId = (userId: string): GatePass[] => {
  return mockGatePasses.filter(gatePass => gatePass.userId === userId);
};

// Helper function to get leaves by user ID
export const getLeavesByUserId = (userId: string): Leave[] => {
  return mockLeaves.filter(leave => leave.userId === userId);
};
