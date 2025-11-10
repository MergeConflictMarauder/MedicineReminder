import React from 'react';
import { Medication } from '../../types';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface DoseBannerProps {
  medication: Medication;
  scheduledTime: string;
  status: 'now' | 'upcoming' | 'missed';
  patientName?: string;
  onAction?: () => void;
}

const statusConfig = {
  now: {
    label: 'Take Now',
    color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    icon: Clock,
    textColor: 'text-white',
  },
  upcoming: {
    label: 'Upcoming',
    color: 'bg-gradient-to-r from-green-500 to-green-600',
    icon: CheckCircle,
    textColor: 'text-white',
  },
  missed: {
    label: 'Missed',
    color: 'bg-gradient-to-r from-red-500 to-red-600',
    icon: AlertTriangle,
    textColor: 'text-white',
  },
};

export function DoseBanner({
  medication,
  scheduledTime,
  status,
  patientName,
  onAction,
}: DoseBannerProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const timeString = new Date(scheduledTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <button
      onClick={onAction}
      className="w-full text-left transition-transform hover:scale-102"
    >
      <Card className={`${config.color} ${config.textColor} p-4 border-none shadow-lg`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 bg-white/20 rounded-lg">
              <Icon size={24} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-white/30 text-white border-white/50 text-xs">
                  {config.label}
                </Badge>
                <span className="text-sm opacity-90">{timeString}</span>
              </div>
              
              <h4 className="mb-0.5">
                {medication.genericName}
              </h4>
              
              <p className="text-sm opacity-90">
                {medication.dosage} • {medication.qtyPerDose} {medication.form}
                {medication.qtyPerDose > 1 ? 's' : ''}
              </p>

              {patientName && (
                <p className="text-xs opacity-75 mt-1">For: {patientName}</p>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl opacity-90">→</div>
          </div>
        </div>
      </Card>
    </button>
  );
}
