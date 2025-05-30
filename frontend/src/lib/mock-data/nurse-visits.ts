
import { NurseVisit, VisitStatus, VisitType } from '@/types';
import { mockUsers } from './user-data';

// Mock Nurse Visits
export const mockNurseVisits: NurseVisit[] = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    nurseId: '3',
    nurse: mockUsers[2],
    visitType: VisitType.REFERRAL,
    referralId: '1',
    symptoms: 'Persistent headache for 3 days',
    visitDate: new Date('2023-04-15T14:00:00'),
    status: VisitStatus.COMPLETED,
    diagnosis: 'Tension headache',
    treatment: 'Prescribed pain relievers and rest',
    recommendations: 'Reduce screen time and ensure adequate hydration',
    followUpNeeded: true,
    followUpDate: new Date('2023-04-22T10:00:00'),
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-04-15'),
  },
  {
    id: '2',
    userId: '1',
    user: mockUsers[0],
    nurseId: '3',
    nurse: mockUsers[2],
    visitType: VisitType.WALK_IN,
    symptoms: 'Sore throat and mild fever',
    visitDate: new Date('2023-03-22T11:30:00'),
    status: VisitStatus.COMPLETED,
    diagnosis: 'Mild viral infection',
    treatment: 'Prescribed throat lozenges and paracetamol',
    recommendations: 'Rest and increased fluid intake',
    followUpNeeded: false,
    createdAt: new Date('2023-03-22'),
    updatedAt: new Date('2023-03-22'),
  },
  {
    id: '3',
    userId: '2',
    user: mockUsers[1],
    nurseId: '3',
    nurse: mockUsers[2],
    visitType: VisitType.SCHEDULED,
    symptoms: 'Routine health check',
    visitDate: new Date('2023-05-10T09:30:00'),
    status: VisitStatus.IN_PROGRESS,
    followUpNeeded: false,
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-05-10'),
  },
  {
    id: '4',
    userId: '1',
    user: mockUsers[0],
    nurseId: '3',
    nurse: mockUsers[2],
    visitType: VisitType.EMERGENCY,
    symptoms: 'Sprained ankle during sports',
    visitDate: new Date('2023-02-15T16:45:00'),
    status: VisitStatus.COMPLETED,
    diagnosis: 'Grade 1 ankle sprain',
    treatment: 'RICE protocol (Rest, Ice, Compression, Elevation)',
    recommendations: 'Avoid weight-bearing activities for 1 week',
    followUpNeeded: true,
    followUpDate: new Date('2023-02-22T14:00:00'),
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    id: '5',
    userId: '1',
    user: mockUsers[0],
    nurseId: '3',
    nurse: mockUsers[2],
    visitType: VisitType.SCHEDULED,
    symptoms: 'Follow-up for ankle sprain',
    visitDate: new Date('2023-02-22T14:00:00'),
    status: VisitStatus.CANCELLED,
    followUpNeeded: false,
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-20'),
  },
];

// Helper function to get nurse visits by user ID
export const getVisitsByUserId = (userId: string): NurseVisit[] => {
  return mockNurseVisits.filter(visit => visit.userId === userId);
};

// Helper function to get nurse visits by nurse ID
export const getVisitsByNurseId = (nurseId: string): NurseVisit[] => {
  return mockNurseVisits.filter(visit => visit.nurseId === nurseId);
};

// Helper function to get nurse visits by status
export const getVisitsByStatus = (status: VisitStatus): NurseVisit[] => {
  return mockNurseVisits.filter(visit => visit.status === status);
};

// Helper function to get nurse visits by visit type
export const getVisitsByType = (visitType: VisitType): NurseVisit[] => {
  return mockNurseVisits.filter(visit => visit.visitType === visitType);
};
