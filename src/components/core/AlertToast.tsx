import React from 'react';
import { Alert } from '../../types';
import { AlertCircle, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';
import { Alert as AlertUI, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';

interface AlertToastProps {
  alert: Alert;
  onResolve?: () => void;
  onDismiss?: () => void;
}

const severityConfig = {
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-900',
  },
  warn: {
    icon: AlertCircle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  },
  error: {
    icon: AlertTriangle,
    className: 'bg-red-50 border-red-200 text-red-900',
  },
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-200 text-green-900',
  },
};

export function AlertToast({ alert, onResolve, onDismiss }: AlertToastProps) {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <AlertUI className={`${config.className} relative`}>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 p-1 rounded hover:bg-black/5"
        >
          <X size={16} />
        </button>
      )}

      <div className="flex gap-3">
        <Icon size={20} className="mt-0.5 flex-shrink-0" />
        
        <div className="flex-1">
          <AlertTitle className="mb-1">
            {alert.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </AlertTitle>
          
          <AlertDescription className="text-sm">
            {alert.message}
          </AlertDescription>

          {alert.actionRequired && (
            <p className="text-sm mt-2 opacity-80">
              Action: {alert.actionRequired}
            </p>
          )}

          {alert.escalationLevel > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-red-600 text-white rounded">
                Escalation Level {alert.escalationLevel}
              </span>
            </div>
          )}

          {onResolve && !alert.resolved && (
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={onResolve}
                className="text-xs"
              >
                Mark as Resolved
              </Button>
            </div>
          )}
        </div>
      </div>
    </AlertUI>
  );
}
