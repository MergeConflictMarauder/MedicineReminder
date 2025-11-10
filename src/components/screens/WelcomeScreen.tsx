import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Box, Smartphone, ArrowRight, CheckCircle } from 'lucide-react';
import { DeviceMode } from '../../types';

interface WelcomeScreenProps {
  onSelectMode: (mode: DeviceMode) => void;
  onSkipOnboarding: () => void;
}

export function WelcomeScreen({ onSelectMode, onSkipOnboarding }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-4 shadow-lg">
            <Box size={40} className="text-white" />
          </div>
          <h1 className="mb-2">Welcome to MedAdhere</h1>
          <p className="text-muted-foreground text-lg">
            Your comprehensive medication adherence platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <button
            onClick={() => onSelectMode('device')}
            className="text-left transition-transform hover:scale-105"
          >
            <Card className="p-6 h-full border-2 hover:border-blue-500 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Box size={32} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">With Smart Device</h3>
                  <Badge className="bg-blue-500 mb-2">Recommended</Badge>
                  <p className="text-sm text-muted-foreground">
                    Connect to a smart pill dispenser for automatic tracking
                  </p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Automatic medication dispensing</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Tray removal detection</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time inventory tracking</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Temperature monitoring</span>
                </li>
              </ul>

              <div className="flex items-center justify-end text-blue-600">
                <span className="text-sm mr-2">Continue with device</span>
                <ArrowRight size={16} />
              </div>
            </Card>
          </button>

          <button
            onClick={() => onSelectMode('standalone')}
            className="text-left transition-transform hover:scale-105"
          >
            <Card className="p-6 h-full border-2 hover:border-purple-500 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Smartphone size={32} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">Standalone Mode</h3>
                  <Badge variant="outline" className="mb-2">No device needed</Badge>
                  <p className="text-sm text-muted-foreground">
                    Manage medications manually with app-only tracking
                  </p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Manual confirmation tracking</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Smart reminders & alerts</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Full adherence reports</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Multi-patient management</span>
                </li>
              </ul>

              <div className="flex items-center justify-end text-purple-600">
                <span className="text-sm mr-2">Continue standalone</span>
                <ArrowRight size={16} />
              </div>
            </Card>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            You can always change this setting later
          </p>
          <Button variant="ghost" onClick={onSkipOnboarding}>
            Skip and explore demo
          </Button>
        </div>
      </div>
    </div>
  );
}
