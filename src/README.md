# MedAdhere - Medication Adherence Platform

A comprehensive, multi-role medication adherence application that works with or without a connected smart pill-dispenser device.

## Overview

MedAdhere is a polished, component-driven medication management platform designed to help households manage medications for multiple patients with support from caregivers and doctors. The app provides intelligent tracking, drug interaction checking, adherence reporting, and gamification to improve medication compliance.

## Key Features

### Multi-Role System
- **Owner**: Full household management and device control
- **Patient**: View medications and confirm doses
- **Caregiver**: Monitor multiple patients with alerts
- **Doctor**: Prescribe medications and review adherence

### Device Modes
- **Device Mode**: Integrates with smart pill dispensers for automatic tracking
- **Standalone Mode**: Manual confirmation with full feature parity

### Core Capabilities

#### 1. Household & Patient Management
- Create households with multiple patients (4+)
- Comprehensive patient profiles with:
  - Demographics and medical history
  - Chronic conditions and allergies
  - Emergency contacts
  - Uploaded prescriptions and lab results

#### 2. Medication Management
- Multiple input methods:
  - Manual entry
  - Barcode/QR scanning (placeholder)
  - Prescription photo OCR (placeholder)
  - Pharmacy database search (placeholder)
- Support for various medication forms:
  - Pills, capsules, syrups, inhalers, injections
  - Pre-packed pharmacy pouches
- Flexible scheduling with timezone support
- Real-time inventory tracking with low-stock alerts

#### 3. Drug Interaction Checking
- Automatic interaction detection
- Three severity levels: Low, Medium, High
- Plain-language explanations
- Override system for high-risk interactions:
  - PIN entry or typed confirmation
  - Logged and shared with caregivers/doctors

#### 4. Smart Reminders & Alerts
- Multi-channel notifications (push, sound, vibration)
- Dose confirmation options:
  - Taken
  - Later (smart snooze: 10/30/custom minutes)
  - Skip (with reason tracking)
- Escalation system:
  - 1st reminder
  - 2nd reminder
  - Caregiver notification
- Motivational messages

#### 5. Device Integration (Device Mode)
- Real-time device status monitoring:
  - Battery level
  - Connectivity status
  - Tray status
  - Compartment temperatures
- Automatic dispensing
- Tray removal detection
- Multi-compartment management

#### 6. Adherence Tracking & Reports
- Visual adherence charts (bar/line graphs)
- Weekly and monthly reports
- Event logging (Scheduled/Taken/Missed/Skipped/Overridden)
- Export to PDF/CSV
- Family dashboard view

#### 7. Gamification
- Achievement badges:
  - Perfect Week (7 days 100% adherence)
  - Early Bird (30 days on-time morning doses)
  - One Month Perfect (30 days 100%)
  - Team Player (assist 3 patients)
- Progress tracking
- Motivational feedback

#### 8. Caregiver Features
- Multi-patient monitoring dashboard
- Instant alerts for missed/wrong medications
- Quick-call to patients, doctors, emergency contacts
- GPS status for severe events
- Priority-based patient lists

#### 9. Location-Based Services
- Find nearby pharmacies:
  - Filter by 24/7 availability
  - Pre-packaging capability
  - Distance and ratings
- Find doctors and clinics
- One-tap navigation and calling

#### 10. Accessibility & Localization
- 6 language support:
  - English, French, Persian (Farsi), Chinese, Arabic, German
- RTL layout support for Arabic/Persian
- Theme options: Light, Dark, Auto
- High contrast mode
- Scalable text sizes
- WCAG AA compliance

## Technology Stack

- **React** - Component framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Motion (Framer Motion)** - Animations

## Component Architecture

### Core Components

- `RoleChip` - Display user roles with icons
- `PatientCard` - Patient information cards (compact/regular variants)
- `MedicationCard` - Medication display with form-specific styling
- `DeviceStatusWidget` - Smart dispenser status (compact/detailed)
- `InteractionBadge` - Drug interaction severity indicators
- `AlertToast` - Notification alerts with actions
- `DoseBanner` - Medication reminders (now/upcoming/missed)
- `SnoozeControl` - Snooze time selection
- `OverrideDialog` - High-risk interaction override
- `AdherenceChart` - Visual adherence reporting
- `DrugInteractionModal` - Interaction details and warnings

### Screens

- `WelcomeScreen` - Onboarding with mode selection
- `HouseholdDashboard` - Main dashboard with tabs
- `PatientProfileScreen` - Detailed patient view with tabs
- `DoseReminderScreen` - Full-screen dose reminders
- `CaregiverDashboard` - Multi-patient caregiver view
- `PharmacyFinderScreen` - Location-based services
- `ComprehensiveSettings` - Full settings management

## Data Models

### Key Types

- `User` - User account with role and preferences
- `Patient` - Patient profile with medical history
- `Medication` - Medication with schedule and stock
- `AdherenceEvent` - Dose tracking events
- `Device` - Smart dispenser status
- `Alert` - System alerts and notifications
- `Household` - Family workspace
- `DrugInteraction` - Interaction details

## Usage

### Getting Started

1. Launch the app - welcomed by splash screen
2. Choose Device Mode or Standalone Mode
3. Create household and add patients (minimum 4)
4. Add medications for each patient
5. Set up reminders and schedules
6. Monitor adherence and respond to alerts

### For Owners

- Full access to all household features
- Add/edit patients and medications
- Manage device pairing
- Refill inventory (restricted permission)
- View all reports

### For Caregivers

- Monitor multiple patients
- Receive escalation alerts
- Quick contact options
- View adherence reports
- Cannot modify medications

### For Doctors

- View patient list and adherence
- Upload/edit e-prescriptions
- Review reports
- Push changes to patients

### For Patients

- View their own medications
- Confirm doses taken
- Snooze or skip reminders
- Track personal badges

## Edge Cases Handled

- Missed doses with multiple escalations
- High-severity drug interactions requiring override
- Low stock predictions (48h warning)
- Offline device with stale status
- Standalone mode with all device features gracefully hidden
- Multiple patients with simultaneous dose times
- RTL language support
- Long medication names on small screens

## Mock Data

The app includes comprehensive mock data:
- 4 sample patients with varied conditions
- 7 medications across different forms
- Smart device with 4 compartments
- Active alerts and adherence events
- Gamification badges
- Nearby pharmacies and doctors

## Security & Privacy

- Biometric authentication support
- PIN protection for sensitive actions
- Override logging and audit trail
- Emergency contact management
- HIPAA compliance considerations (Note: Not for PII or sensitive data in this prototype)

## Future Enhancements

- Real Supabase backend integration
- Actual OCR for prescription scanning
- Real barcode/QR scanning
- Wearables integration (HR, BP, sleep)
- AI assistant with health insights
- Digital signature for e-prescriptions
- Real-time pharmacy inventory
- Telemedicine integration
- Medication reminder widget
- Apple Health / Google Fit sync

## Development Notes

This is a prototype/demo application. For production use:
- Implement real authentication
- Connect to medical databases
- Add HIPAA-compliant backend
- Implement real device communication protocols
- Add comprehensive error handling
- Perform security audits
- Add unit and integration tests
- Implement offline-first architecture
- Add real-time sync

## License

MIT License - See LICENSE file for details

---

Built with ❤️ for better medication adherence
