import React from 'react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type = 'info', message, onClose }) => {
  const typeClasses = {
    success: 'tw-bg-green-100 tw-text-green-800 tw-border-green-300',
    error: 'tw-bg-red-100 tw-text-red-800 tw-border-red-300',
    warning: 'tw-bg-yellow-100 tw-text-yellow-800 tw-border-yellow-300',
    info: 'tw-bg-blue-100 tw-text-blue-800 tw-border-blue-300',
  };

  return (
    <div className="tw-fixed tw-top-4 tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-z-50 tw-w-11/12 sm:tw-w-96">
      <div
        className={`tw-border tw-rounded-md tw-p-4 tw-flex tw-justify-between tw-items-center ${typeClasses[type]}`}
      >
        <span>{message}</span>
        {onClose && (
          <button
            className="tw-text-sm tw-font-bold tw-ml-4 hover:tw-underline"
            onClick={onClose}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
