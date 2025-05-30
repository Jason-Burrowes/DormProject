
import { User, UserRole, Gender, ProgrammeStatus, CampusStatus, ResidentialStatus } from '@/types';

// Mock user data
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'trainee@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.TRAINEE,
    gender: Gender.MALE,
    dateOfBirth: '1995-05-15',
    phoneNumber: '+1234567890',
    campusStatus: CampusStatus.ON_CAMPUS,
    residentialStatus: ResidentialStatus.RESIDENTIAL,
    programmeName: 'Software Development',
    programmeStatus: ProgrammeStatus.ACTIVE,
    roomId: 'room-101',
    lockerId: 'locker-201',
    residencyStartDate: '2023-01-10',
    residencyEndDate: '2024-12-31',
    passesUsed: 2,
    maxPasses: 5,
    extracurricularActivities: ['Basketball', 'Chess Club'],
    medicalNotes: ['Allergic to peanuts'],
    emergencyContacts: [
      {
        id: 'ec-1',
        userId: '1',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '+1987654321',
        relationship: 'Sister'
      }
    ],
    isActive: true,
    isResident: true
  },
  {
    id: '2',
    email: 'dormsupervisor@example.com',
    password: 'password123',
    firstName: 'Michael',
    lastName: 'Johnson',
    role: UserRole.DORM_SUPERVISOR,
    gender: Gender.MALE,
    dateOfBirth: '1990-03-22',
    phoneNumber: '+2345678901',
    campusStatus: CampusStatus.ON_CAMPUS,
    residentialStatus: ResidentialStatus.RESIDENTIAL,
    passesUsed: 0,
    maxPasses: 10,
    isActive: true,
    isResident: true,
    onShift: true
  },
  {
    id: '3',
    email: 'nurse@example.com',
    password: 'password123',
    firstName: 'Emily',
    lastName: 'Williams',
    role: UserRole.NURSE,
    gender: Gender.FEMALE,
    dateOfBirth: '1985-11-08',
    phoneNumber: '+3456789012',
    campusStatus: CampusStatus.ON_CAMPUS,
    residentialStatus: ResidentialStatus.NON_RESIDENTIAL,
    isActive: true,
    isResident: false,
    onShift: true
  },
  {
    id: '4',
    email: 'management@example.com',
    password: 'password123',
    firstName: 'David',
    lastName: 'Brown',
    role: UserRole.MANAGEMENT,
    gender: Gender.MALE,
    dateOfBirth: '1975-07-30',
    phoneNumber: '+4567890123',
    campusStatus: CampusStatus.ON_CAMPUS,
    residentialStatus: ResidentialStatus.NON_RESIDENTIAL,
    isActive: true,
    isResident: false
  },
  {
    id: '5',
    email: 'security@example.com',
    password: 'password123',
    firstName: 'Robert',
    lastName: 'Johnson',
    role: UserRole.SECURITY,
    gender: Gender.MALE,
    dateOfBirth: '1988-09-12',
    phoneNumber: '+5678901234',
    campusStatus: CampusStatus.ON_CAMPUS,
    residentialStatus: ResidentialStatus.NON_RESIDENTIAL,
    onShift: true,
    isActive: true,
    isResident: false
  }
];

// Get users by type (resident/non-resident)
export const getUsersByType = (type: string): User[] => {
  return mockUsers.filter(user => user.residentialStatus === type);
};

// Get users with work experience
export const getUsersWithWorkExperience = (): User[] => {
  // In a real app, this would filter based on actual work experience
  return mockUsers.filter(user => user.role === UserRole.TRAINEE).slice(0, 3);
};

// Get users with internships
export const getUsersWithInternships = (): User[] => {
  // In a real app, this would filter based on actual internship data
  return mockUsers.filter(user => user.role === UserRole.TRAINEE).slice(0, 2);
};

// Utility function to check if residency has expired
export const hasResidencyExpired = (user: User): boolean => {
  if (!user.residencyEndDate) return false;
  
  const endDate = new Date(user.residencyEndDate);
  const currentDate = new Date();
  
  return endDate < currentDate;
};

// Get user by ID
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// Get all residents
export const getResidents = (): User[] => {
  return mockUsers.filter(user => user.residentialStatus === ResidentialStatus.RESIDENTIAL);
};

// Get all non-residents
export const getNonResidents = (): User[] => {
  return mockUsers.filter(user => user.residentialStatus === ResidentialStatus.NON_RESIDENTIAL);
};

// Get nurses
export const getNurses = (): User[] => {
  return mockUsers.filter(user => user.role === UserRole.NURSE);
};

// Get nurses on shift
export const getNursesOnShift = (): User[] => {
  return mockUsers.filter(user => user.role === UserRole.NURSE && user.onShift === true);
};

// Get trainees
export const getTrainees = (): User[] => {
  return mockUsers.filter(user => user.role === UserRole.TRAINEE);
};

// Get dorm supervisors
export const getDormSupervisors = (): User[] => {
  return mockUsers.filter(user => user.role === UserRole.DORM_SUPERVISOR);
};

// Get dorm supervisors on shift
export const getDormSupervisorsOnShift = (): User[] => {
  return mockUsers.filter(user => user.role === UserRole.DORM_SUPERVISOR && user.onShift === true);
};
