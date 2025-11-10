import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { RoleChip } from '../core/RoleChip';
import { DeviceStatusWidget } from '../core/DeviceStatusWidget';
import {
  ArrowLeft,
  Globe,
  Palette,
  Bell,
  Lock,
  Phone,
  Box,
  Users,
  Shield,
  Volume2,
  Moon,
  Sun,
  Plus,
} from 'lucide-react';
import type { Language } from '../../types';

interface ComprehensiveSettingsProps {
  onBack: () => void;
}

export function ComprehensiveSettings({ onBack }: ComprehensiveSettingsProps) {
  const {
    currentUser,
    language,
    setLanguage,
    theme,
    setTheme,
    deviceMode,
    setDeviceMode,
    device,
  } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(currentUser?.biometricEnabled || false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
          <h1>Settings</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white shadow-sm grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="device">Device</TabsTrigger>
            <TabsTrigger value="household">Household</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe size={24} className="text-blue-600" />
                <div>
                  <h3 className="mb-1">Language & Region</h3>
                  <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="language" className="mb-2 block">Language</Label>
                  <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.nativeName} ({lang.name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">
                    The app will display in your selected language
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette size={24} className="text-purple-600" />
                <div>
                  <h3 className="mb-1">Appearance</h3>
                  <p className="text-sm text-muted-foreground">Customize how the app looks</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="mb-3 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <Sun size={24} className="mx-auto mb-2 text-yellow-600" />
                      <p className="text-sm">Light</p>
                    </button>
                    
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <Moon size={24} className="mx-auto mb-2 text-blue-600" />
                      <p className="text-sm">Dark</p>
                    </button>
                    
                    <button
                      onClick={() => setTheme('auto')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        theme === 'auto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex mx-auto mb-2 w-6">
                        <Sun size={12} className="text-yellow-600" />
                        <Moon size={12} className="text-blue-600" />
                      </div>
                      <p className="text-sm">Auto</p>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Label htmlFor="high-contrast">High Contrast Mode</Label>
                  <Switch id="high-contrast" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="large-text">Large Text</Label>
                  <Switch id="large-text" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell size={24} className="text-orange-600" />
                <div>
                  <h3 className="mb-1">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">Manage how you receive alerts</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications-enabled">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts on your device</p>
                  </div>
                  <Switch
                    id="notifications-enabled"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound">Sound</Label>
                    <p className="text-sm text-muted-foreground">Play sound for reminders</p>
                  </div>
                  <Switch
                    id="sound"
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                    disabled={!notificationsEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="vibration">Vibration</Label>
                    <p className="text-sm text-muted-foreground">Vibrate for reminders</p>
                  </div>
                  <Switch
                    id="vibration"
                    checked={vibrationEnabled}
                    onCheckedChange={setVibrationEnabled}
                    disabled={!notificationsEnabled}
                  />
                </div>

                <Separator />

                <div>
                  <Label className="mb-3 block">Escalation Settings</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">1st reminder after</span>
                      <Select defaultValue="15">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 min</SelectItem>
                          <SelectItem value="10">10 min</SelectItem>
                          <SelectItem value="15">15 min</SelectItem>
                          <SelectItem value="30">30 min</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">2nd reminder after</span>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 min</SelectItem>
                          <SelectItem value="30">30 min</SelectItem>
                          <SelectItem value="60">60 min</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Notify caregiver after</span>
                      <Select defaultValue="60">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 min</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock size={24} className="text-red-600" />
                <div>
                  <h3 className="mb-1">Security & Privacy</h3>
                  <p className="text-sm text-muted-foreground">Protect your account</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="biometric">Biometric Authentication</Label>
                    <p className="text-sm text-muted-foreground">Use fingerprint or Face ID</p>
                  </div>
                  <Switch
                    id="biometric"
                    checked={biometricEnabled}
                    onCheckedChange={setBiometricEnabled}
                  />
                </div>

                <Separator />

                <div>
                  <Button variant="outline" className="w-full">
                    Change PIN
                  </Button>
                </div>

                <div>
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Emergency Contacts</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone size={20} className="text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm">Emergency Services</p>
                        <p className="text-xs text-muted-foreground">911</p>
                      </div>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Phone size={14} className="mr-2" />
                    Add Contact
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="device" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Box size={24} className="text-blue-600" />
                <div>
                  <h3 className="mb-1">Device Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage your smart dispenser</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Operating Mode</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDeviceMode('device')}
                      className={`p-4 border-2 rounded-lg transition-all text-left ${
                        deviceMode === 'device' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <Box size={24} className="mb-2 text-blue-600" />
                      <p className="mb-1">Device Mode</p>
                      <p className="text-xs text-muted-foreground">
                        With smart dispenser
                      </p>
                    </button>
                    
                    <button
                      onClick={() => setDeviceMode('standalone')}
                      className={`p-4 border-2 rounded-lg transition-all text-left ${
                        deviceMode === 'standalone' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <Phone size={24} className="mb-2 text-purple-600" />
                      <p className="mb-1">Standalone</p>
                      <p className="text-xs text-muted-foreground">
                        Manual tracking
                      </p>
                    </button>
                  </div>
                </div>

                {deviceMode === 'device' && (
                  <>
                    <Separator />
                    <DeviceStatusWidget device={device} variant="detailed" />
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline">Sync Now</Button>
                      <Button variant="outline">Pair New Device</Button>
                    </div>
                  </>
                )}

                {deviceMode === 'standalone' && (
                  <>
                    <Separator />
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        Running in standalone mode. You can pair a device anytime to enable automatic tracking.
                      </p>
                      <Button variant="outline" size="sm" className="mt-3">
                        Pair Device
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="household" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users size={24} className="text-purple-600" />
                <div>
                  <h3 className="mb-1">Household Management</h3>
                  <p className="text-sm text-muted-foreground">Manage members and roles</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Your Role</Label>
                  {currentUser && <RoleChip role={currentUser.role} size="lg" />}
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4>Members</h4>
                    <Button size="sm" variant="outline">
                      <Plus size={14} className="mr-2" />
                      Invite
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="mb-1">{currentUser?.name}</p>
                        <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
                      </div>
                      <RoleChip role={currentUser?.role || 'owner'} size="sm" />
                      <Badge>You</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3 text-red-600">Danger Zone</h4>
                  <Button variant="destructive" className="w-full">
                    Leave Household
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
