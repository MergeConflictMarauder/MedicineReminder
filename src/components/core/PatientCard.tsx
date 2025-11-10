import React from 'react';
import { Patient } from '../../types';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { AlertCircle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
  variant?: 'compact' | 'regular';
  onClick?: () => void;
  showAdherence?: boolean;
}

export function PatientCard({
  patient,
  variant = 'regular',
  onClick,
  showAdherence = true,
}: PatientCardProps) {
  const getAdherenceColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getAdherenceIcon = (score: number) => {
    if (score >= 90) return CheckCircle;
    return AlertCircle;
  };

  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
  const AdherenceIcon = getAdherenceIcon(patient.adherenceScore);

  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className="w-full text-left transition-transform hover:scale-105"
      >
        <Card className="p-3 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage src={patient.photo} alt={patient.name} />
              <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="truncate">{patient.name}</h3>
              <p className="text-sm text-muted-foreground">{age} years old</p>
            </div>

            {showAdherence && (
              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant="secondary"
                  className={`${getAdherenceColor(patient.adherenceScore)} text-white`}
                >
                  {patient.adherenceScore}%
                </Badge>
                <AdherenceIcon size={14} className={patient.adherenceScore >= 90 ? 'text-green-500' : 'text-yellow-500'} />
              </div>
            )}
          </div>
        </Card>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-transform hover:scale-102"
    >
      <Card className="p-4 hover:shadow-xl transition-all">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-4 border-white shadow-md">
            <AvatarImage src={patient.photo} alt={patient.name} />
            <AvatarFallback className="text-lg">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="mb-1">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">{age} years old • {patient.gender}</p>
              </div>
              
              {showAdherence && (
                <div className="flex flex-col items-end gap-1">
                  <Badge
                    className={`${getAdherenceColor(patient.adherenceScore)} text-white`}
                  >
                    <AdherenceIcon size={14} className="mr-1" />
                    {patient.adherenceScore}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">Adherence</span>
                </div>
              )}
            </div>

            {patient.chronicConditions.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {patient.chronicConditions.slice(0, 3).map((condition, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {condition}
                  </Badge>
                ))}
                {patient.chronicConditions.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{patient.chronicConditions.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            {patient.allergies.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-red-600">
                <AlertCircle size={12} />
                <span>Allergies: {patient.allergies.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </button>
  );
}
