import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { PatientCard } from '../core/PatientCard';
import { DeviceStatusWidget } from '../core/DeviceStatusWidget';
import { AlertToast } from '../core/AlertToast';
import { DoseBanner } from '../core/DoseBanner';
import { Users, Plus, Bell, Settings, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface HouseholdDashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function HouseholdDashboard({ onNavigate }: HouseholdDashboardProps) {
  const {
    household,
    patients,
    currentUser,
    medications,
    device,
    deviceMode,
    alerts,
    resolveAlert,
    setSelectedPatient,
  } = useApp();

  const unresolvedAlerts = alerts.filter(a => !a.resolved);
  const todayDoses = medications.filter(med => med.schedule.length > 0).slice(0, 3);

  const handlePatientClick = (patient: typeof patients[0]) => {
    setSelectedPatient(patient);
    onNavigate('patient-profile', { patient });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-1">{household?.name}</h1>
              <p className="text-blue-100">Welcome back, {currentUser?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('caregiver-dashboard')}
                className="text-white hover:bg-white/20"
              >
                Caregiver View
              </Button>
              <button
                onClick={() => onNavigate('settings')}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Settings size={24} />
              </button>
              <div className="relative">
                <button
                  onClick={() => onNavigate('alerts')}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Bell size={24} />
                </button>
                {unresolvedAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unresolvedAlerts.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge className="bg-white/20 text-white border-white/30">
              {deviceMode === 'device' ? 'Device Mode' : 'Standalone Mode'}
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              {patients.length} Patients
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="alerts">
              Alerts
              {unresolvedAlerts.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {unresolvedAlerts.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Today's Doses */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2">
                  <Calendar className="text-blue-600" size={24} />
                  Today's Schedule
                </h2>
                <Button variant="outline" size="sm" onClick={() => onNavigate('schedule')}>
                  View All
                </Button>
              </div>
              <div className="grid gap-3">
                {todayDoses.map((med, idx) => {
                  const patient = patients.find(p => p.id === med.patientId);
                  const nextSchedule = med.schedule[0];
                  if (!nextSchedule || !patient) return null;
                  
                  return (
                    <DoseBanner
                      key={med.id}
                      medication={med}
                      scheduledTime={new Date().toISOString()}
                      status={idx === 0 ? 'now' : 'upcoming'}
                      patientName={patient.name}
                      onAction={() => onNavigate('dose-reminder', { medication: med, patient })}
                    />
                  );
                })}
              </div>
            </div>

            {/* Device Status */}
            {deviceMode === 'device' && (
              <div>
                <h2 className="mb-4">Device Status</h2>
                <DeviceStatusWidget device={device} variant="detailed" />
                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => onNavigate('device-dashboard')}
                >
                  View Device Details
                </Button>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 text-white rounded-lg">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-2xl">{patients.length}</p>
                    <p className="text-sm text-muted-foreground">Patients</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 text-white rounded-lg">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-2xl">
                      {Math.round(patients.reduce((acc, p) => acc + p.adherenceScore, 0) / patients.length)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Avg Adherence</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 text-white rounded-lg">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-2xl">{medications.length}</p>
                    <p className="text-sm text-muted-foreground">Active Meds</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500 text-white rounded-lg">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <p className="text-2xl">{unresolvedAlerts.length}</p>
                    <p className="text-sm text-muted-foreground">Alerts</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2>Patients ({patients.length})</h2>
              <Button onClick={() => onNavigate('add-patient')} className="gap-2">
                <Plus size={16} />
                Add Patient
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {patients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  variant="regular"
                  onClick={() => handlePatientClick(patient)}
                  showAdherence
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <h2>Active Alerts ({unresolvedAlerts.length})</h2>
            
            {unresolvedAlerts.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Badge className="bg-green-500" />
                </div>
                <h3 className="mb-2">All Clear!</h3>
                <p className="text-muted-foreground">No active alerts at the moment</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {unresolvedAlerts.map((alert) => (
                  <AlertToast
                    key={alert.id}
                    alert={alert}
                    onResolve={() => resolveAlert(alert.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
