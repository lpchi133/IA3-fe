import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
  type: 'success' | 'error'; // Type để xác định màu sắc
}

const Notification: React.FC<NotificationProps> = ({ message, onClose, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Tự động tắt sau 3 giây

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
    >
      {message}
    </div>
  );
};

export default Notification;
