// Core data models for the medication adherence app

export type UserRole = 'owner' | 'patient' | 'caregiver' | 'doctor';

export type MedicationForm = 'pill' | 'capsule' | 'syrup' | 'pouch' | 'injection' | 'inhaler';

export type AdherenceAction = 'Taken' | 'Later' | 'Skip' | 'Missed' | 'Overridden' | 'Manual';

export type AlertSeverity = 'info' | 'warn' | 'error' | 'success';

export type InteractionSeverity = 'Low' | 'Medium' | 'High';

export type DeviceMode = 'device' | 'standalone';

export type Language = 'en' | 'fr' | 'fa' | 'zh' | 'ar' | 'de';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  householdId: string;
  avatar?: string;
  biometricEnabled: boolean;
  preferredLanguage: Language;
  theme: 'light' | 'dark' | 'auto';
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  photo?: string;
  allergies: string[];
  chronicConditions: string[];
  doctorRef?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: {
    type: 'prescription' | 'lab' | 'other';
    url: string;
    date: string;
  }[];
  adherenceScore: number; // 0-100
  householdId: string;
}

export interface Medication {
  id: string;
  patientId: string;
  genericName: string;
  brandName?: string;
  form: MedicationForm;
  dosage: string;
  qtyPerDose: number;
  schedule: Schedule[];
  stock: number;
  packCount?: number;
  instructions: string;
  photos: string[];
  isPrePacked: boolean;
  barcode?: string;
  interactions: DrugInteraction[];
  compartmentNumber?: number; // For device mode
  createdAt: string;
  prescribedBy?: string;
}

export interface Schedule {
  id: string;
  time: string; // HH:mm format
  days: number[]; // 0-6 (Sunday-Saturday)
  timezone: string;
  enabled: boolean;
}

export interface DrugInteraction {
  medicationId: string;
  medicationName: string;
  severity: InteractionSeverity;
  description: string;
  recommendation: string;
}

export interface AdherenceEvent {
  id: string;
  patientId: string;
  medicationId: string;
  timeScheduled: string;
  action: AdherenceAction;
  timeLogged: string;
  byRole: UserRole;
  byUserId: string;
  notes?: string;
  skipReason?: string;
  overrideConsent?: {
    timestamp: string;
    method: 'pin' | 'typed-confirmation';
  };
}

export interface Device {
  id: string;
  serial: string;
  firmware: string;
  battery: number; // 0-100
  connectivity: 'connected' | 'disconnected' | 'weak';
  trayStatus: 'empty' | 'ready' | 'removed' | 'error';
  temps: number[]; // Temperature readings for compartments
  compartments: Compartment[];
  lastSync: string;
  householdId: string;
}

export interface Compartment {
  number: number;
  medicationId?: string;
  status: 'empty' | 'filled' | 'low';
  lastRefill?: string;
  sensorWorking: boolean;
}

export interface Alert {
  id: string;
  type: 'missed-dose' | 'low-stock' | 'device-error' | 'interaction' | 'escalation';
  severity: AlertSeverity;
  targetRole: UserRole[];
  escalationLevel: number; // 0, 1, 2
  timestamp: string;
  resolved: boolean;
  patientId: string;
  medicationId?: string;
  message: string;
  actionRequired?: string;
}

export interface Household {
  id: string;
  name: string;
  ownerId: string;
  deviceMode: DeviceMode;
  deviceId?: string;
  createdAt: string;
  members: {
    userId: string;
    role: UserRole;
    permissions: string[];
  }[];
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  distance?: number; // in km
  hasPrePackaging: boolean;
  is24Hours: boolean;
  rating: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

export interface GamificationBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  progress?: number; // 0-100
  requirement: string;
}

export interface HealthDiaryEntry {
  id: string;
  patientId: string;
  date: string;
  mood?: number; // 1-5
  symptoms: string[];
  notes: string;
  vitals?: {
    bloodPressure?: { systolic: number; diastolic: number };
    heartRate?: number;
    temperature?: number;
    weight?: number;
  };
}
