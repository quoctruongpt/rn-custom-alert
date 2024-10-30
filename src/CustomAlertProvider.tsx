import React, { useState, useCallback } from 'react';
import type { IAlert, IAlertState, IAlertContext, ICustomAlert } from './types';
import { CustomAlert } from './CustomAlert';

interface ICustomAlertProviderProps extends ICustomAlert {
  children: React.ReactNode;
}

export const AlertContext = React.createContext<IAlertContext>({
  show: () => {},
  hide: () => {},
  update: () => {},
});

export function CustomAlertProvider({
  children,
  ...props
}: ICustomAlertProviderProps) {
  const [alerts, setAlerts] = useState<IAlertState[]>([]);
  const currentAlert = alerts.length > 0 ? alerts[alerts.length - 1] : null;

  const show = useCallback((alert: IAlert): number => {
    const id = performance.now();
    setAlerts((prevAlerts) => [...prevAlerts, { ...alert, id }]);

    return id;
  }, []);

  const hide = useCallback((id: number): void => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  const update = useCallback((id: number, alert: IAlert): void => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((prevAlert) =>
        prevAlert.id === id ? { ...prevAlert, ...alert } : prevAlert
      )
    );
  }, []);

  return (
    <AlertContext.Provider value={{ show, hide, update }}>
      {children}
      {currentAlert ? (
        <CustomAlert {...currentAlert} {...props} onHide={hide} />
      ) : null}
    </AlertContext.Provider>
  );
}
