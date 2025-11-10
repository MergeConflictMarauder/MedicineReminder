import React from 'react';
import { InteractionSeverity } from '../../types';
import { Badge } from '../ui/badge';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface InteractionBadgeProps {
  severity: InteractionSeverity;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const severityConfig = {
  Low: {
    label: 'Low Risk',
    icon: Info,
    className: 'bg-blue-100 text-blue-700 border-blue-300',
  },
  Medium: {
    label: 'Medium Risk',
    icon: AlertCircle,
    className: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  },
  High: {
    label: 'High Risk',
    icon: AlertTriangle,
    className: 'bg-red-100 text-red-700 border-red-300',
  },
};

export function InteractionBadge({ severity, size = 'md', showIcon = true }: InteractionBadgeProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'px-3 py-1.5',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <Badge
      variant="outline"
      className={`${config.className} ${sizeClasses[size]} inline-flex items-center gap-1 border`}
    >
      {showIcon && <Icon size={iconSizes[size]} />}
      <span>{config.label}</span>
    </Badge>
  );
}
