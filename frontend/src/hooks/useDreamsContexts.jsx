import { DreamsContext } from '../contexts/DreamContext';
import { useContext } from 'react';

export const useDreamsContext = () => {
  const context = useContext(DreamsContext);
  if (!context)
    throw new Error(
      'useDreamsContext must be used within a DreamsContextProvider'
    );
  return context;
};
