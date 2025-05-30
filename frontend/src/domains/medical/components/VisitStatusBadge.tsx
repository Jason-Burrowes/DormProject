
import React from 'react';
import { VisitStatus } from '@/types';

interface VisitStatusBadgeProps {
  status: VisitStatus;
}

export const VisitStatusBadge: React.FC<VisitStatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case VisitStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case VisitStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case VisitStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};
