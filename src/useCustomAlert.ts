import { useContext } from 'react';
import { AlertContext } from './CustomAlertProvider';

export const useCustomAlert = () => {
  const alertContext = useContext(AlertContext);

  return alertContext;
};
