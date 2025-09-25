'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Notification({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show notification
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto hide notification
    const hideTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div
      className={`
        fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className={`
        ${getBgColor()}
        border rounded-lg shadow-lg p-4
        flex items-start gap-3
      `}>
        {getIcon()}
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 text-sm text-subheading">
            {title}
          </h4>
          {message && (
            <p className="text-gray-600 text-xs mt-1 text-body">
              {message}
            </p>
          )}
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:bg-gray-200 rounded transition-colors"
          aria-label="إغلاق الإشعار"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
}

// Notification Container Component
interface NotificationContainerProps {
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
  }>;
  onRemove: (id: string) => void;
}

export function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
  return (
    <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={onRemove}
        />
      ))}
    </div>
  );
}


