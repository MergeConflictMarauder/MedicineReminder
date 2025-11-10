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
import { Alert, AlertDescription } from '../ui/alert';
import { InteractionBadge } from './InteractionBadge';
import { AlertTriangle, Info } from 'lucide-react';
import { DrugInteraction } from '../../types';
import { OverrideDialog } from './OverrideDialog';

interface DrugInteractionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interactions: DrugInteraction[];
  patientName: string;
  onProceed: () => void;
  onCancel: () => void;
}

export function DrugInteractionModal({
  open,
  onOpenChange,
  interactions,
  patientName,
  onProceed,
  onCancel,
}: DrugInteractionModalProps) {
  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState<DrugInteraction | null>(null);

  const highSeverityInteractions = interactions.filter(i => i.severity === 'High');
  const mediumSeverityInteractions = interactions.filter(i => i.severity === 'Medium');
  const lowSeverityInteractions = interactions.filter(i => i.severity === 'Low');

  const hasHighSeverity = highSeverityInteractions.length > 0;

  const handleContinue = () => {
    if (hasHighSeverity) {
      // Require override for high severity
      setSelectedInteraction(highSeverityInteractions[0]);
      setShowOverrideDialog(true);
    } else {
      // Can proceed with warning for medium/low
      onProceed();
      onOpenChange(false);
    }
  };

  const handleOverrideConfirmed = () => {
    setShowOverrideDialog(false);
    onProceed();
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className={hasHighSeverity ? 'text-red-600' : 'text-yellow-600'} size={24} />
              Drug Interaction{interactions.length > 1 ? 's' : ''} Detected
            </DialogTitle>
            <DialogDescription>
              {interactions.length} potential interaction{interactions.length > 1 ? 's' : ''} found for {patientName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {hasHighSeverity && (
              <Alert variant="destructive">
                <AlertTriangle size={16} />
                <AlertDescription className="ml-2">
                  High-risk interactions detected. Override required to proceed.
                </AlertDescription>
              </Alert>
            )}

            {/* High Severity Interactions */}
            {highSeverityInteractions.length > 0 && (
              <div>
                <h4 className="text-red-600 mb-3">High Risk Interactions</h4>
                <div className="space-y-3">
                  {highSeverityInteractions.map((interaction, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-red-900">{interaction.medicationName}</h4>
                        <InteractionBadge severity={interaction.severity} size="sm" />
                      </div>
                      <p className="text-sm text-red-900 mb-2">{interaction.description}</p>
                      <div className="bg-red-100 border border-red-300 rounded p-2">
                        <p className="text-xs text-red-900">
                          <span>Recommendation: </span>
                          {interaction.recommendation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medium Severity Interactions */}
            {mediumSeverityInteractions.length > 0 && (
              <div>
                <h4 className="text-yellow-600 mb-3">Medium Risk Interactions</h4>
                <div className="space-y-3">
                  {mediumSeverityInteractions.map((interaction, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-yellow-900">{interaction.medicationName}</h4>
                        <InteractionBadge severity={interaction.severity} size="sm" />
                      </div>
                      <p className="text-sm text-yellow-900 mb-2">{interaction.description}</p>
                      <div className="bg-yellow-100 border border-yellow-300 rounded p-2">
                        <p className="text-xs text-yellow-900">
                          <span>Recommendation: </span>
                          {interaction.recommendation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Low Severity Interactions */}
            {lowSeverityInteractions.length > 0 && (
              <div>
                <h4 className="text-blue-600 mb-3">Low Risk Interactions</h4>
                <div className="space-y-3">
                  {lowSeverityInteractions.map((interaction, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-blue-900">{interaction.medicationName}</h4>
                        <InteractionBadge severity={interaction.severity} size="sm" />
                      </div>
                      <p className="text-sm text-blue-900 mb-2">{interaction.description}</p>
                      <div className="bg-blue-100 border border-blue-300 rounded p-2">
                        <p className="text-xs text-blue-900">
                          <span>Recommendation: </span>
                          {interaction.recommendation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Alert>
              <Info size={16} />
              <AlertDescription className="ml-2">
                <p className="text-sm mb-2">
                  This interaction check is based on known drug interactions. Always consult with a healthcare professional before making changes to medication.
                </p>
                {hasHighSeverity && (
                  <p className="text-sm text-red-600">
                    Proceeding with high-risk interactions will require additional confirmation and will be logged.
                  </p>
                )}
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              variant={hasHighSeverity ? 'destructive' : 'default'}
            >
              {hasHighSeverity ? 'Override & Continue' : 'Acknowledge & Continue'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Override Dialog for High Severity */}
      {selectedInteraction && (
        <OverrideDialog
          open={showOverrideDialog}
          onOpenChange={setShowOverrideDialog}
          interaction={selectedInteraction}
          patientName={patientName}
          method="typed-confirmation"
          onConfirm={handleOverrideConfirmed}
        />
      )}
    </>
  );
}
