import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  User,
  Patient,
  Medication,
  Device,
  Household,
  AdherenceEvent,
  Alert,
  GamificationBadge,
  DeviceMode,
  Language,
  HealthDiaryEntry,
} from '../types';
import { mockHousehold, mockUser, mockPatients, mockMedications, mockDevice, mockAlerts, mockAdherenceEvents, mockBadges } from '../data/mockData';

interface AppContextType {
  // User & Household
  currentUser: User | null;
  household: Household | null;
  setCurrentUser: (user: User | null) => void;
  setHousehold: (household: Household | null) => void;
  
  // Patients
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  
  // Medications
  medications: Medication[];
  addMedication: (medication: Medication) => void;
  updateMedication: (medication: Medication) => void;
  deleteMedication: (id: string) => void;
  getMedicationsByPatient: (patientId: string) => Medication[];
  
  // Device
  device: Device | null;
  setDevice: (device: Device | null) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  
  // Adherence
  adherenceEvents: AdherenceEvent[];
  addAdherenceEvent: (event: AdherenceEvent) => void;
  getPatientAdherence: (patientId: string, days: number) => number;
  
  // Alerts
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  resolveAlert: (alertId: string) => void;
  getUnresolvedAlerts: () => Alert[];
  
  // Gamification
  badges: GamificationBadge[];
  addBadge: (badge: GamificationBadge) => void;
  
  // Settings
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  
  // UI State
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUser);
  const [household, setHousehold] = useState<Household | null>(mockHousehold);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(mockPatients[0]);
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [device, setDevice] = useState<Device | null>(mockDevice);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>(mockHousehold.deviceMode);
  const [adherenceEvents, setAdherenceEvents] = useState<AdherenceEvent[]>(mockAdherenceEvents);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [badges, setBadges] = useState<GamificationBadge[]>(mockBadges);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const addPatient = (patient: Patient) => {
    setPatients([...patients, patient]);
  };

  const updatePatient = (updatedPatient: Patient) => {
    setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
  };

  const addMedication = (medication: Medication) => {
    setMedications([...medications, medication]);
  };

  const updateMedication = (updatedMedication: Medication) => {
    setMedications(medications.map(m => m.id === updatedMedication.id ? updatedMedication : m));
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const getMedicationsByPatient = (patientId: string) => {
    return medications.filter(m => m.patientId === patientId);
  };

  const addAdherenceEvent = (event: AdherenceEvent) => {
    setAdherenceEvents([...adherenceEvents, event]);
  };

  const getPatientAdherence = (patientId: string, days: number): number => {
    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    const events = adherenceEvents.filter(
      e => e.patientId === patientId && new Date(e.timeScheduled) >= startDate
    );
    
    if (events.length === 0) return 100;
    
    const takenEvents = events.filter(e => e.action === 'Taken' || e.action === 'Manual');
    return Math.round((takenEvents.length / events.length) * 100);
  };

  const addAlert = (alert: Alert) => {
    setAlerts([...alerts, alert]);
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, resolved: true } : a));
  };

  const getUnresolvedAlerts = () => {
    return alerts.filter(a => !a.resolved);
  };

  const addBadge = (badge: GamificationBadge) => {
    setBadges([...badges, badge]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        household,
        setCurrentUser,
        setHousehold,
        patients,
        selectedPatient,
        setSelectedPatient,
        addPatient,
        updatePatient,
        medications,
        addMedication,
        updateMedication,
        deleteMedication,
        getMedicationsByPatient,
        device,
        setDevice,
        deviceMode,
        setDeviceMode,
        adherenceEvents,
        addAdherenceEvent,
        getPatientAdherence,
        alerts,
        addAlert,
        resolveAlert,
        getUnresolvedAlerts,
        badges,
        addBadge,
        language,
        setLanguage,
        theme,
        setTheme,
        showOnboarding,
        setShowOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
