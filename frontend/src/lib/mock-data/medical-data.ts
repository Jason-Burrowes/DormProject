
import { NurseReferral, ReferralStatus } from '@/types';
import { mockUsers } from './user-data';

// Mock Nurse Referrals
export const mockNurseReferrals: NurseReferral[] = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    referredBy: '2',
    referrerUser: mockUsers[1],
    reason: 'Complained of persistent headache',
    status: ReferralStatus.COMPLETED,
    referredAt: new Date('2023-04-15T10:30:00'),
    completedAt: new Date('2023-04-15T14:45:00'),
    doctorNotes: 'Patient has tension headache due to stress',
    doctorDocumentation: 'doctor_note_123.pdf',
    nurseReport: 'Referred to doctor, prescribed pain relievers and advised rest for 24 hours',
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-04-15'),
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    referredBy: '3',
    referrerUser: mockUsers[2],
    reason: 'Fever and sore throat',
    status: ReferralStatus.PENDING,
    referredAt: new Date('2023-05-10T09:15:00'),
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-05-10'),
  },
  {
    id: '3',
    userId: '1',
    user: mockUsers[0],
    referredBy: '2',
    referrerUser: mockUsers[1],
    reason: 'Sprained ankle during sports',
    status: ReferralStatus.ABORTED,
    referredAt: new Date('2023-03-22T16:00:00'),
    createdAt: new Date('2023-03-22'),
    updatedAt: new Date('2023-03-22'),
  },
];

// Helper function to get nurse referrals by user ID
export const getReferralsByUserId = (userId: string): NurseReferral[] => {
  return mockNurseReferrals.filter(referral => referral.userId === userId);
};

// Helper function to get nurse referrals by status
export const getReferralsByStatus = (status: ReferralStatus): NurseReferral[] => {
  return mockNurseReferrals.filter(referral => referral.status === status);
};
