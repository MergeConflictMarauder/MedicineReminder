import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Clock } from 'lucide-react';
import { Input } from '../ui/input';

interface SnoozeControlProps {
  onSnooze: (minutes: number) => void;
  onCancel?: () => void;
}

export function SnoozeControl({ onSnooze, onCancel }: SnoozeControlProps) {
  const [customMinutes, setCustomMinutes] = useState('');

  const presetOptions = [
    { label: '10 min', minutes: 10 },
    { label: '30 min', minutes: 30 },
    { label: '1 hour', minutes: 60 },
  ];

  const handleCustomSnooze = () => {
    const minutes = parseInt(customMinutes);
    if (minutes > 0 && minutes <= 1440) {
      onSnooze(minutes);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Clock size={16} />
        <span>Snooze for how long?</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {presetOptions.map((option) => (
          <Button
            key={option.minutes}
            variant="outline"
            onClick={() => onSnooze(option.minutes)}
            className="h-auto py-3"
          >
            <div className="text-center">
              <div className="text-lg">{option.minutes}</div>
              <div className="text-xs opacity-70">minutes</div>
            </div>
          </Button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Custom minutes"
          value={customMinutes}
          onChange={(e) => setCustomMinutes(e.target.value)}
          min="1"
          max="1440"
          className="flex-1"
        />
        <Button onClick={handleCustomSnooze} disabled={!customMinutes}>
          Set
        </Button>
      </div>

      {onCancel && (
        <Button variant="ghost" onClick={onCancel} className="w-full">
          Cancel
        </Button>
      )}
    </div>
  );
}
