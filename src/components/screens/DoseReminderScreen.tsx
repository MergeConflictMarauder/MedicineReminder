import React, { useState } from 'react';
import { Medication, Patient } from '../../types';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { SnoozeControl } from '../core/SnoozeControl';
import { Pill, CheckCircle, Clock, X, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface DoseReminderScreenProps {
  medication: Medication;
  patient: Patient;
  onBack: () => void;
}

export function DoseReminderScreen({ medication, patient, onBack }: DoseReminderScreenProps) {
  const { addAdherenceEvent, currentUser } = useApp();
  const [showSnooze, setShowSnooze] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [skipReason, setSkipReason] = useState('');

  const handleTaken = () => {
    addAdherenceEvent({
      id: `event-${Date.now()}`,
      patientId: patient.id,
      medicationId: medication.id,
      timeScheduled: new Date().toISOString(),
      action: 'Taken',
      timeLogged: new Date().toISOString(),
      byRole: currentUser?.role || 'patient',
      byUserId: currentUser?.id || '',
    });
    setShowSuccess(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const handleSnooze = (minutes: number) => {
    addAdherenceEvent({
      id: `event-${Date.now()}`,
      patientId: patient.id,
      medicationId: medication.id,
      timeScheduled: new Date().toISOString(),
      action: 'Later',
      timeLogged: new Date().toISOString(),
      byRole: currentUser?.role || 'patient',
      byUserId: currentUser?.id || '',
      notes: `Snoozed for ${minutes} minutes`,
    });
    setShowSnooze(false);
    onBack();
  };

  const handleSkip = () => {
    addAdherenceEvent({
      id: `event-${Date.now()}`,
      patientId: patient.id,
      medicationId: medication.id,
      timeScheduled: new Date().toISOString(),
      action: 'Skip',
      timeLogged: new Date().toISOString(),
      byRole: currentUser?.role || 'patient',
      byUserId: currentUser?.id || '',
      skipReason,
    });
    setShowSkipConfirm(false);
    onBack();
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-32 h-32 bg-white/20 rounded-full mb-6"
          >
            <CheckCircle size={64} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-2"
          >
            Great Job!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-green-100"
          >
            Medication taken successfully
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
            <Pill size={40} className="text-white" />
          </div>

          <Badge className="mb-4 bg-blue-100 text-blue-700">
            <Clock size={14} className="mr-1" />
            Time to take medication
          </Badge>

          <h2 className="mb-2">{medication.genericName}</h2>
          {medication.brandName && (
            <p className="text-muted-foreground mb-4">({medication.brandName})</p>
          )}

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Patient</p>
                <p>{patient.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Dosage</p>
                <p>{medication.dosage}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                <p>{medication.qtyPerDose} {medication.form}{medication.qtyPerDose > 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Time</p>
                <p>{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
              </div>
            </div>
          </div>

          {medication.instructions && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-left">
              <p className="text-sm text-blue-900">
                <span className="opacity-70">Instructions: </span>
                {medication.instructions}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleTaken}
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              <CheckCircle className="mr-2" size={20} />
              I've Taken It
            </Button>

            <Button
              onClick={() => setShowSnooze(true)}
              variant="outline"
              size="lg"
              className="w-full"
            >
              <Clock className="mr-2" size={20} />
              Snooze
            </Button>

            <Button
              onClick={() => setShowSkipConfirm(true)}
              variant="ghost"
              size="lg"
              className="w-full text-muted-foreground hover:text-red-600"
            >
              <X className="mr-2" size={20} />
              Skip This Dose
            </Button>
          </div>
        </Card>

        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full mt-4 text-white hover:bg-white/20"
        >
          Close
        </Button>
      </div>

      {/* Snooze Dialog */}
      <Dialog open={showSnooze} onOpenChange={setShowSnooze}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Snooze Reminder</DialogTitle>
            <DialogDescription>
              Choose how long to snooze this medication reminder
            </DialogDescription>
          </DialogHeader>
          <SnoozeControl
            onSnooze={handleSnooze}
            onCancel={() => setShowSnooze(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Skip Confirmation Dialog */}
      <Dialog open={showSkipConfirm} onOpenChange={setShowSkipConfirm}>
        <DialogContent>
          <DialogHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 mx-auto">
              <AlertTriangle size={32} className="text-red-600" />
            </div>
            <DialogTitle>Skip This Dose?</DialogTitle>
            <DialogDescription>
              Skipping doses may affect your treatment. This will be reported to your caregiver.
            </DialogDescription>
          </DialogHeader>

          <div className="text-left mb-6">
            <label className="text-sm mb-2 block">Reason (optional)</label>
            <select
              value={skipReason}
              onChange={(e) => setSkipReason(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select a reason...</option>
              <option value="forgot">Forgot</option>
              <option value="side-effects">Experiencing side effects</option>
              <option value="feeling-better">Feeling better</option>
              <option value="not-available">Medication not available</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSkipConfirm(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleSkip}
              className="flex-1"
            >
              Skip Dose
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
