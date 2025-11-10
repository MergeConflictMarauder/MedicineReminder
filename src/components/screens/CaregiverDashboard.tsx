import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { PatientCard } from '../core/PatientCard';
import { AlertToast } from '../core/AlertToast';
import { Heart, Phone, AlertTriangle, CheckCircle, TrendingUp, Clock, MapPin, AlertCircle } from 'lucide-react';

interface CaregiverDashboardProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack?: () => void;
}

export function CaregiverDashboard({ onNavigate }: CaregiverDashboardProps) {
  const { patients, alerts, medications, resolveAlert, setSelectedPatient } = useApp();

  const urgentAlerts = alerts.filter(a => !a.resolved && a.severity === 'error');
  const warningAlerts = alerts.filter(a => !a.resolved && a.severity === 'warn');

  const handlePatientClick = (patient: typeof patients[0]) => {
    setSelectedPatient(patient);
    onNavigate('patient-profile', { patient });
  };

  const handleQuickCall = (patient: typeof patients[0]) => {
    // In a real app, this would initiate a call
    alert(`Calling ${patient.emergencyContact.name} at ${patient.emergencyContact.phone}`);
  };

  const getPatientsNeedingAttention = () => {
    return patients.filter(p => {
      const patientAlerts = alerts.filter(a => !a.resolved && a.patientId === p.id);
      return patientAlerts.length > 0 || p.adherenceScore < 80;
    });
  };

  const patientsNeedingAttention = getPatientsNeedingAttention();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Heart size={32} />
            </div>
            <div>
              <h1 className="mb-1">Caregiver Dashboard</h1>
              <p className="text-pink-100">Monitoring {patients.length} patients</p>
            </div>
          </div>

          <div className="flex gap-2">
            {urgentAlerts.length > 0 && (
              <Badge className="bg-red-500 text-white gap-1">
                <AlertTriangle size={14} />
                {urgentAlerts.length} Urgent
              </Badge>
            )}
            {warningAlerts.length > 0 && (
              <Badge className="bg-yellow-500 text-white gap-1">
                <Clock size={14} />
                {warningAlerts.length} Warnings
              </Badge>
            )}
            {urgentAlerts.length === 0 && warningAlerts.length === 0 && (
              <Badge className="bg-green-500 text-white gap-1">
                <CheckCircle size={14} />
                All Good
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Urgent Alerts */}
        {urgentAlerts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-red-600" size={24} />
              <h2 className="text-red-600">Urgent Attention Required</h2>
            </div>
            <div className="space-y-3">
              {urgentAlerts.map((alert) => {
                const patient = patients.find(p => p.id === alert.patientId);
                return (
                  <div key={alert.id} className="relative">
                    <AlertToast
                      alert={alert}
                      onResolve={() => resolveAlert(alert.id)}
                    />
                    {patient && (
                      <div className="mt-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickCall(patient)}
                          className="gap-2"
                        >
                          <Phone size={14} />
                          Call {patient.emergencyContact.name}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePatientClick(patient)}
                        >
                          View Patient
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Patients Needing Attention */}
        {patientsNeedingAttention.length > 0 && (
          <div>
            <h2 className="mb-4 flex items-center gap-2">
              <AlertCircle className="text-yellow-600" size={24} />
              Needs Attention ({patientsNeedingAttention.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {patientsNeedingAttention.map((patient) => {
                const patientAlerts = alerts.filter(a => !a.resolved && a.patientId === patient.id);
                return (
                  <div key={patient.id} className="relative">
                    <PatientCard
                      patient={patient}
                      variant="regular"
                      onClick={() => handlePatientClick(patient)}
                      showAdherence
                    />
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickCall(patient);
                        }}
                        className="flex-1 gap-2"
                      >
                        <Phone size={14} />
                        Quick Call
                      </Button>
                      {patientAlerts.length > 0 && (
                        <Badge variant="destructive" className="gap-1">
                          {patientAlerts.length} Alert{patientAlerts.length > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Patients Overview */}
        <div>
          <h2 className="mb-4">All Patients</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {patients.map((patient) => (
              <div key={patient.id}>
                <PatientCard
                  patient={patient}
                  variant="regular"
                  onClick={() => handlePatientClick(patient)}
                  showAdherence
                />
                <div className="mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickCall(patient);
                    }}
                    className="w-full gap-2"
                  >
                    <Phone size={14} />
                    Call {patient.emergencyContact.relationship}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <h3 className="mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="h-auto py-4"
              onClick={() => onNavigate('pharmacy-finder')}
            >
              <div className="text-center w-full">
                <MapPin className="mx-auto mb-2 text-blue-600" size={24} />
                <div className="text-sm">Find Pharmacy</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4"
              onClick={() => onNavigate('reports')}
            >
              <div className="text-center w-full">
                <TrendingUp className="mx-auto mb-2 text-green-600" size={24} />
                <div className="text-sm">View Reports</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4"
              onClick={() => onNavigate('alerts')}
            >
              <div className="text-center w-full">
                <AlertTriangle className="mx-auto mb-2 text-orange-600" size={24} />
                <div className="text-sm">All Alerts</div>
              </div>
            </Button>
          </div>
        </Card>

        {/* Statistics */}
        <Card className="p-6">
          <h3 className="mb-4">Today's Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl text-green-600 mb-1">
                {Math.round(patients.reduce((acc, p) => acc + p.adherenceScore, 0) / patients.length)}%
              </p>
              <p className="text-sm text-muted-foreground">Avg Adherence</p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl text-blue-600 mb-1">{medications.length}</p>
              <p className="text-sm text-muted-foreground">Active Meds</p>
            </div>

            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-3xl text-yellow-600 mb-1">{warningAlerts.length}</p>
              <p className="text-sm text-muted-foreground">Warnings</p>
            </div>

            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-3xl text-red-600 mb-1">{urgentAlerts.length}</p>
              <p className="text-sm text-muted-foreground">Urgent</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
