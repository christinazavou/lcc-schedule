import { useState, useCallback } from 'react';
import Alert from 'components/alert/Alert';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertState {
  message: string;
  type: AlertType;
  visible: boolean;
}

export const useAlert = () => {
  const [alertstate, setAlertstate] = useState<AlertState>({
    message: '',
    type: 'info',
    visible: false,
  });

  const showAlert = useCallback(
    (message: string, type: AlertType = 'info', duration = 3000) => {
      setAlertstate({ message, type, visible: true });
      setTimeout(() => {
        setAlertstate((prev) => ({ ...prev, visible: false }));
      }, duration);
    },
    []
  );

  const hideAlert = useCallback(() => {
    setAlertstate((prev) => ({ ...prev, visible: false }));
  }, []);

  const AlertComponent = alertstate.visible ? (
    <Alert
      message={alertstate.message}
      type={alertstate.type}
      onClose={hideAlert}
    />
  ) : null;

  return { showAlert, AlertComponent };
};
