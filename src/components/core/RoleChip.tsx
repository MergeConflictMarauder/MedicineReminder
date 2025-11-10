import React from 'react';
import { UserRole } from '../../types';
import { User, Heart, Shield, Stethoscope } from 'lucide-react';
import { Badge } from '../ui/badge';

interface RoleChipProps {
  role: UserRole;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  selectable?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const roleConfig = {
  owner: {
    label: 'Owner',
    icon: Shield,
    color: 'bg-purple-500 hover:bg-purple-600',
    textColor: 'text-white',
    outlineColor: 'border-purple-500 text-purple-700',
  },
  patient: {
    label: 'Patient',
    icon: User,
    color: 'bg-blue-500 hover:bg-blue-600',
    textColor: 'text-white',
    outlineColor: 'border-blue-500 text-blue-700',
  },
  caregiver: {
    label: 'Caregiver',
    icon: Heart,
    color: 'bg-pink-500 hover:bg-pink-600',
    textColor: 'text-white',
    outlineColor: 'border-pink-500 text-pink-700',
  },
  doctor: {
    label: 'Doctor',
    icon: Stethoscope,
    color: 'bg-teal-500 hover:bg-teal-600',
    textColor: 'text-white',
    outlineColor: 'border-teal-500 text-teal-700',
  },
};

export function RoleChip({
  role,
  variant = 'default',
  size = 'md',
  selectable = false,
  selected = false,
  onClick,
}: RoleChipProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-3 py-1.5 gap-1.5',
    lg: 'px-4 py-2 gap-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  if (variant === 'default') {
    return (
      <button
        onClick={onClick}
        disabled={!selectable}
        className={`
          inline-flex items-center rounded-full transition-all
          ${sizeClasses[size]}
          ${config.color}
          ${config.textColor}
          ${selectable ? 'cursor-pointer' : 'cursor-default'}
          ${selected && selectable ? 'ring-2 ring-offset-2 ring-current' : ''}
          ${!selectable ? 'opacity-90' : ''}
        `}
      >
        <Icon size={iconSizes[size]} />
        <span>{config.label}</span>
      </button>
    );
  }

  return (
    <Badge
      variant={variant}
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 cursor-default
        ${variant === 'outline' ? config.outlineColor : ''}
        ${selectable ? 'cursor-pointer hover:opacity-80' : ''}
        ${selected && selectable ? 'ring-2 ring-offset-2' : ''}
      `}
    >
      <Icon size={iconSizes[size]} />
      <span>{config.label}</span>
    </Badge>
  );
}
