
import React from 'react';
import { ReferralStatus } from '@/types';

interface ReferralStatusBadgeProps {
  status: ReferralStatus;
}

export const ReferralStatusBadge: React.FC<ReferralStatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case ReferralStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case ReferralStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case ReferralStatus.ABORTED:
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
