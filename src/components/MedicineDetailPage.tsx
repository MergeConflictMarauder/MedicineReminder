import React from 'react';
import { 
  ArrowLeft, 
  Edit, 
  MoreVertical, 
  Clock, 
  Calendar, 
  Pill, 
  AlertCircle,
  CheckCircle,
  PlayCircle,
  PauseCircle
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface MedicineDetailPageProps {
  medicineId: string | null;
  onBack: () => void;
}

export function MedicineDetailPage({ medicineId, onBack }: MedicineDetailPageProps) {
  // Mock medicine data
  const medicine = {
    id: medicineId,
    name: 'Blood Pressure Medication',
    genericName: 'Lisinopril',
    dosage: '10mg',
    type: 'tablet',
    frequency: 'Twice Daily',
    duration: '90 days',
    startDate: '2024-12-01',
    endDate: '2025-03-01',
    status: 'active',
    color: 'bg-red-100',
    prescribedBy: 'Dr. Sarah Johnson',
    pharmacy: 'MediCare Pharmacy',
    instructions: 'Take with food. Avoid alcohol.',
    notes: 'Monitor blood pressure weekly',
    sideEffects: 'May cause dizziness, dry cough',
    progress: 65,
    totalDoses: 180,
    takenDoses: 117,
    missedDoses: 3,
    nextDose: '12:00 PM Today'
  };

  const recentHistory = [
    { date: '2025-01-24', time: '08:00 AM', status: 'taken', note: '' },
    { date: '2025-01-23', time: '08:00 PM', status: 'taken', note: '' },
    { date: '2025-01-23', time: '08:00 AM', status: 'taken', note: '' },
    { date: '2025-01-22', time: '08:00 PM', status: 'missed', note: 'Forgot to take' },
    { date: '2025-01-22', time: '08:00 AM', status: 'taken', note: '' },
    { date: '2025-01-21', time: '08:00 PM', status: 'taken', note: '' },
    { date: '2025-01-21', time: '08:00 AM', status: 'taken', note: '' }
  ];

  const upcomingDoses = [
    { date: 'Today', time: '12:00 PM', status: 'pending' },
    { date: 'Today', time: '08:00 PM', status: 'upcoming' },
    { date: 'Tomorrow', time: '08:00 AM', status: 'upcoming' },
    { date: 'Tomorrow', time: '08:00 PM', status: 'upcoming' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'missed':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'pending':
        return <Clock size={16} className="text-orange-500" />;
      case 'upcoming':
        return <Clock size={16} className="text-blue-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  if (!medicineId) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Medicine not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="ml-2">Medicine Details</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Edit size={18} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <PlayCircle size={16} className="mr-2" />
                Take Now
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PauseCircle size={16} className="mr-2" />
                Pause Medicine
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit size={16} className="mr-2" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete Medicine
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Medicine Overview */}
        <Card className="p-4">
          <div className="flex items-start space-x-4">
            <div className={`w-16 h-16 rounded-xl ${medicine.color} flex items-center justify-center`}>
              <Pill size={24} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <h2>{medicine.name}</h2>
              <p className="text-muted-foreground">{medicine.genericName}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {medicine.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{medicine.dosage} {medicine.type}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Progress */}
        <Card className="p-4">
          <h3 className="mb-3">Treatment Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Course completion</span>
              <span>{medicine.progress}%</span>
            </div>
            <Progress value={medicine.progress} className="h-2" />
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <div className="text-green-600 font-medium">{medicine.takenDoses}</div>
                <p className="text-xs text-muted-foreground">Taken</p>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-medium">{medicine.missedDoses}</div>
                <p className="text-xs text-muted-foreground">Missed</p>
              </div>
              <div className="text-center">
                <div className="text-blue-600 font-medium">{medicine.totalDoses - medicine.takenDoses - medicine.missedDoses}</div>
                <p className="text-xs text-muted-foreground">Remaining</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Next Dose */}
        <Card className="p-4">
          <h3 className="mb-3">Next Dose</h3>
          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <div className="flex items-center space-x-3">
              <Clock size={20} className="text-orange-500" />
              <div>
                <p className="font-medium">{medicine.nextDose}</p>
                <p className="text-sm text-muted-foreground">{medicine.dosage}</p>
              </div>
            </div>
            <Button size="sm">Take Now</Button>
          </div>
        </Card>

        {/* Schedule */}
        <Card className="p-4">
          <h3 className="mb-3">Schedule Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Frequency</span>
              <span>{medicine.frequency}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span>{medicine.duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Start Date</span>
              <span>{new Date(medicine.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">End Date</span>
              <span>{new Date(medicine.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </Card>

        {/* Upcoming Doses */}
        <Card className="p-4">
          <h3 className="mb-3">Upcoming Doses</h3>
          <div className="space-y-2">
            {upcomingDoses.map((dose, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-background border">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(dose.status)}
                  <div>
                    <p className="text-sm font-medium">{dose.date} at {dose.time}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground capitalize">{dose.status}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent History */}
        <Card className="p-4">
          <h3 className="mb-3">Recent History</h3>
          <div className="space-y-2">
            {recentHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-background border">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(entry.status)}
                  <div>
                    <p className="text-sm font-medium">{entry.date} at {entry.time}</p>
                    {entry.note && (
                      <p className="text-xs text-muted-foreground">{entry.note}</p>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground capitalize">{entry.status}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Medical Information */}
        <Card className="p-4">
          <h3 className="mb-3">Medical Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Prescribed by</p>
              <p>{medicine.prescribedBy}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pharmacy</p>
              <p>{medicine.pharmacy}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Instructions</p>
              <p>{medicine.instructions}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Side Effects</p>
              <p>{medicine.sideEffects}</p>
            </div>
            {medicine.notes && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notes</p>
                <p>{medicine.notes}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}