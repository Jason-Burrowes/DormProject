
import React from 'react';
import { Status } from '@/types';

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case Status.APPROVED:
        return 'bg-green-100 text-green-800';
      case Status.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case Status.REJECTED:
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

export default StatusBadge;
