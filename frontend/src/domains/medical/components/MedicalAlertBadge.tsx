
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MedicalAlertBadgeProps {
  hasAlert: boolean;
  text?: string;
}

const MedicalAlertBadge: React.FC<MedicalAlertBadgeProps> = ({ 
  hasAlert, 
  text = "Medical Alert" 
}) => {
  if (!hasAlert) {
    return null;
  }

  return (
    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
      <AlertCircle className="h-3 w-3 mr-1" />
      {text}
    </div>
  );
};

export default MedicalAlertBadge;
