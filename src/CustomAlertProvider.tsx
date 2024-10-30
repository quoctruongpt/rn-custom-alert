import React, { useState, useCallback } from 'react';
import type { IAlert, IAlertState, IAlertContext } from './types';
import { CustomAlert } from './CustomAlert';

interface ICustomAlertProviderProps {
  children: React.ReactNode;
}

export const AlertContext = React.createContext<IAlertContext | null>(null);

export function CustomAlertProvider({ children }: ICustomAlertProviderProps) {
  const [alerts, setAlerts] = useState<IAlertState[]>([]);
  const currentAlert = alerts.length > 0 ? alerts[alerts.length - 1] : null;

  const show = useCallback((alert: IAlert): void => {
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { ...alert, id: performance.now() },
    ]);
  }, []);

  const hide = useCallback((id: number): void => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ show }}>
      {children}
      {currentAlert ? <CustomAlert {...currentAlert} onHide={hide} /> : null}
    </AlertContext.Provider>
  );
}
