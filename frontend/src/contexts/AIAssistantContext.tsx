
import React, { createContext, useContext, useState, ReactNode } from 'react';
import AIAssistant from '@/components/ai/AIAssistant';

interface AIAssistantContextType {
  isOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (context === undefined) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};

interface AIAssistantProviderProps {
  children: ReactNode;
}

export const AIAssistantProvider: React.FC<AIAssistantProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAssistant = () => setIsOpen(true);
  const closeAssistant = () => setIsOpen(false);
  const toggleAssistant = () => setIsOpen(prev => !prev);

  return (
    <AIAssistantContext.Provider
      value={{
        isOpen,
        openAssistant,
        closeAssistant,
        toggleAssistant,
      }}
    >
      {children}
      {isOpen && <AIAssistant onClose={closeAssistant} />}
    </AIAssistantContext.Provider>
  );
};
