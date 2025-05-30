
// Status types for various entities
export enum StatusType {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired'
}

// General Status enum used across the application
export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired'
}

// Campus status for tracking whether a user is on campus or not
export enum CampusStatus {
  ON_CAMPUS = 'on-campus',
  OFF_CAMPUS = 'off-campus'
}
