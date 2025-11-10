import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertTriangle, Lock } from 'lucide-react';
import { DrugInteraction } from '../../types';
import { InteractionBadge } from './InteractionBadge';

interface OverrideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interaction: DrugInteraction;
  patientName: string;
  method: 'pin' | 'typed-confirmation';
  onConfirm: () => void;
}

export function OverrideDialog({
  open,
  onOpenChange,
  interaction,
  patientName,
  method,
  onConfirm,
}: OverrideDialogProps) {
  const [pinValue, setPinValue] = useState('');
  const [typedName, setTypedName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (method === 'pin') {
      // In a real app, this would validate against a stored PIN
      if (pinValue.length === 4) {
        onConfirm();
        setPinValue('');
        setError('');
      } else {
        setError('Please enter a 4-digit PIN');
      }
    } else {
      if (typedName.toLowerCase() === patientName.toLowerCase()) {
        onConfirm();
        setTypedName('');
        setError('');
      } else {
        setError('Patient name does not match');
      }
    }
  };

  const handleCancel = () => {
    setPinValue('');
    setTypedName('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="text-red-600" size={24} />
            Drug Interaction Warning
          </DialogTitle>
          <DialogDescription>
            Override required for high-risk interaction
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert variant="destructive">
            <AlertTriangle size={16} />
            <AlertDescription className="ml-2">
              <div className="mb-2">
                <InteractionBadge severity={interaction.severity} />
              </div>
              <p className="mb-2">{interaction.description}</p>
              <p className="text-sm">{interaction.recommendation}</p>
            </AlertDescription>
          </Alert>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
            <p className="mb-2">
              <span>Interaction between:</span>
            </p>
            <ul className="list-disc list-inside space-y-1 text-yellow-900">
              <li>Current medications</li>
              <li>{interaction.medicationName}</li>
            </ul>
          </div>

          {method === 'pin' && (
            <div className="space-y-2">
              <Label htmlFor="pin" className="flex items-center gap-2">
                <Lock size={14} />
                Enter your 4-digit PIN to override
              </Label>
              <Input
                id="pin"
                type="password"
                maxLength={4}
                value={pinValue}
                onChange={(e) => setPinValue(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className="text-center text-lg tracking-widest"
              />
            </div>
          )}

          {method === 'typed-confirmation' && (
            <div className="space-y-2">
              <Label htmlFor="confirm-name">
                Type <span className="text-red-600">{patientName}</span> to confirm
              </Label>
              <Input
                id="confirm-name"
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="Patient name"
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="text-xs text-muted-foreground border-t pt-3">
            <p>⚠️ This override will be logged and shared with caregivers and prescribing doctor.</p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="destructive"
            disabled={
              method === 'pin' ? pinValue.length !== 4 : !typedName
            }
          >
            Override & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
