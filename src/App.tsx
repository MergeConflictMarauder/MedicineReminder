import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { HouseholdDashboard } from './components/screens/HouseholdDashboard';
import { PatientProfileScreen } from './components/screens/PatientProfileScreen';
import { DoseReminderScreen } from './components/screens/DoseReminderScreen';
import { ComprehensiveSettings } from './components/screens/ComprehensiveSettings';
import { CaregiverDashboard } from './components/screens/CaregiverDashboard';
import { PharmacyFinderScreen } from './components/screens/PharmacyFinderScreen';
import { DeviceMode, Patient, Medication } from './types';

type Screen = 
  | 'welcome'
  | 'dashboard'
  | 'patient-profile'
  | 'dose-reminder'
  | 'settings'
  | 'caregiver-dashboard'
  | 'pharmacy-finder'
  | 'device-dashboard'
  | 'add-medication'
  | 'alerts'
  | 'schedule';

interface NavigationData {
  patient?: Patient;
  medication?: Medication;
  [key: string]: any;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [navigationData, setNavigationData] = useState<NavigationData>({});
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleSelectMode = (mode: DeviceMode) => {
    // In a real app, this would be saved to context/backend
    setShowOnboarding(false);
    setCurrentScreen('dashboard');
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: Screen, data?: NavigationData) => {
    setNavigationData(data || {});
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
    setNavigationData({});
  };

  const renderScreen = () => {
    if (showOnboarding) {
      return (
        <WelcomeScreen
          onSelectMode={handleSelectMode}
          onSkipOnboarding={handleSkipOnboarding}
        />
      );
    }

    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onSelectMode={handleSelectMode}
            onSkipOnboarding={handleSkipOnboarding}
          />
        );

      case 'dashboard':
        return <HouseholdDashboard onNavigate={handleNavigate} />;

      case 'patient-profile':
        return navigationData.patient ? (
          <PatientProfileScreen
            patient={navigationData.patient}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        ) : (
          <HouseholdDashboard onNavigate={handleNavigate} />
        );

      case 'dose-reminder':
        return navigationData.medication && navigationData.patient ? (
          <DoseReminderScreen
            medication={navigationData.medication}
            patient={navigationData.patient}
            onBack={handleBack}
          />
        ) : (
          <HouseholdDashboard onNavigate={handleNavigate} />
        );

      case 'settings':
        return <ComprehensiveSettings onBack={handleBack} />;

      case 'caregiver-dashboard':
        return <CaregiverDashboard onNavigate={handleNavigate} />;

      case 'pharmacy-finder':
        return <PharmacyFinderScreen onBack={handleBack} />;

      default:
        return <HouseholdDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        {renderScreen()}
      </div>
    </AppProvider>
  );
}
