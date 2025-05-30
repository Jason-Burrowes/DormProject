
import React from 'react';
import { VisitType } from '@/types';

interface VisitTypeChipProps {
  type: VisitType;
}

export const VisitTypeChip: React.FC<VisitTypeChipProps> = ({ type }) => {
  const getTypeStyles = () => {
    switch (type) {
      case VisitType.REFERRAL:
        return 'bg-purple-100 text-purple-800';
      case VisitType.WALK_IN:
        return 'bg-orange-100 text-orange-800';
      case VisitType.SCHEDULED:
        return 'bg-blue-100 text-blue-800';
      case VisitType.EMERGENCY:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeStyles()}`}>
      {type}
    </span>
  );
};
