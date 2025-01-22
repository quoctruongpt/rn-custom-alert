import React, { useState, useCallback, useEffect } from 'react';
import type { IAlert, IAlertState, IAlertContext, ICustomAlert } from './types';
import { CustomAlert } from './CustomAlert';
import { Modal } from 'react-native';

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
  const [currentAlert, setCurrentAlert] = useState<IAlertState | null>(null);

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

  useEffect(() => {
    if (alerts.length > 0) {
      setCurrentAlert(alerts[0] || null);
    }
  }, [alerts.length]);

  return (
    <AlertContext.Provider value={{ show, hide, update }}>
      {children}
      {alerts.length > 0 && currentAlert ? (
        <Modal transparent>
          <CustomAlert {...currentAlert} {...props} onHide={hide} />
        </Modal>
      ) : null}
    </AlertContext.Provider>
  );
}
