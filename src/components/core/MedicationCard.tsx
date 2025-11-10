import React from 'react';
import { Medication } from '../../types';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Pill, Droplet, Syringe, Wind, Package, AlertTriangle, Clock, Calendar } from 'lucide-react';

interface MedicationCardProps {
  medication: Medication;
  patientName?: string;
  nextDoseTime?: string;
  onClick?: () => void;
  showStock?: boolean;
}

const formIcons = {
  pill: Pill,
  capsule: Pill,
  syrup: Droplet,
  pouch: Package,
  injection: Syringe,
  inhaler: Wind,
};

const formColors = {
  pill: 'bg-blue-50 text-blue-700 border-blue-200',
  capsule: 'bg-purple-50 text-purple-700 border-purple-200',
  syrup: 'bg-orange-50 text-orange-700 border-orange-200',
  pouch: 'bg-green-50 text-green-700 border-green-200',
  injection: 'bg-red-50 text-red-700 border-red-200',
  inhaler: 'bg-cyan-50 text-cyan-700 border-cyan-200',
};

export function MedicationCard({
  medication,
  patientName,
  nextDoseTime,
  onClick,
  showStock = true,
}: MedicationCardProps) {
  const Icon = formIcons[medication.form];
  const stockLevel = medication.stock;
  const daysRemaining = Math.floor(
    stockLevel / (medication.qtyPerDose * medication.schedule.filter(s => s.enabled).length || 1)
  );

  const getStockStatus = () => {
    if (daysRemaining <= 2) return { label: 'Critical', color: 'bg-red-500', textColor: 'text-red-700' };
    if (daysRemaining <= 7) return { label: 'Low', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    return { label: 'Good', color: 'bg-green-500', textColor: 'text-green-700' };
  };

  const stockStatus = getStockStatus();
  const hasInteractions = medication.interactions && medication.interactions.length > 0;

  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-transform hover:scale-102"
    >
      <Card className={`p-4 border-2 ${formColors[medication.form]} hover:shadow-lg transition-all`}>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Icon size={24} className="text-current" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h4 className="mb-0.5">
                  {medication.genericName}
                </h4>
                {medication.brandName && (
                  <p className="text-sm text-muted-foreground">
                    {medication.brandName}
                  </p>
                )}
              </div>
              
              {medication.isPrePacked && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  Pre-packed
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 mb-2 text-sm">
              <Badge variant="outline" className="text-xs">
                {medication.dosage}
              </Badge>
              {medication.form !== 'pouch' && (
                <Badge variant="outline" className="text-xs">
                  {medication.qtyPerDose} {medication.qtyPerDose > 1 ? 'units' : 'unit'}
                </Badge>
              )}
            </div>

            {nextDoseTime && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                <Clock size={14} />
                <span>Next: {nextDoseTime}</span>
              </div>
            )}

            {patientName && (
              <p className="text-sm text-muted-foreground mb-2">For: {patientName}</p>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              {showStock && (
                <div className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${stockStatus.color}`} />
                  <span className={`text-xs ${stockStatus.textColor}`}>
                    {stockLevel} left ({daysRemaining}d)
                  </span>
                </div>
              )}

              {hasInteractions && (
                <Badge variant="destructive" className="text-xs gap-1">
                  <AlertTriangle size={12} />
                  Interaction
                </Badge>
              )}

              {medication.schedule.length > 0 && (
                <Badge variant="secondary" className="text-xs gap-1">
                  <Calendar size={12} />
                  {medication.schedule.length}x daily
                </Badge>
              )}
            </div>

            {medication.instructions && (
              <p className="text-xs text-muted-foreground mt-2 italic">
                {medication.instructions}
              </p>
            )}
          </div>
        </div>
      </Card>
    </button>
  );
}
