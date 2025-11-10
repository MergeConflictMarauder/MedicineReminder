import React, { useState } from 'react';
import { 
  Bell, 
  User, 
  Shield, 
  Smartphone, 
  Moon, 
  Globe, 
  HelpCircle, 
  FileText, 
  MessageSquare,
  ChevronRight,
  Download,
  Trash2
} from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [reminderSnooze, setReminderSnooze] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    action, 
    onClick 
  }: {
    icon: any;
    title: string;
    description?: string;
    action?: React.ReactNode;
    onClick?: () => void;
  }) => (
    <div 
      className={`flex items-center justify-between p-4 ${onClick ? 'cursor-pointer hover:bg-accent rounded-lg' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <Icon size={20} className="text-muted-foreground" />
        <div>
          <p className="font-medium">{title}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
      {onClick && <ChevronRight size={16} className="text-muted-foreground" />}
    </div>
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Header */}
        <h1>Settings</h1>

        {/* Profile Section */}
        <Card>
          <SettingItem
            icon={User}
            title="Profile"
            description="Manage your personal information"
            onClick={() => {}}
          />
        </Card>

        {/* Notifications */}
        <Card className="space-y-0">
          <div className="p-4 border-b border-border">
            <h3 className="flex items-center space-x-2">
              <Bell size={18} />
              <span>Notifications</span>
            </h3>
          </div>
          
          <SettingItem
            icon={Bell}
            title="Enable Notifications"
            description="Get reminders for your medicines"
            action={
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            }
          />
          
          {notificationsEnabled && (
            <>
              <Separator />
              <SettingItem
                icon={Smartphone}
                title="Sound"
                description="Play sound with notifications"
                action={
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                }
              />
              
              <Separator />
              <SettingItem
                icon={Smartphone}
                title="Vibration"
                description="Vibrate when receiving notifications"
                action={
                  <Switch
                    checked={vibrationEnabled}
                    onCheckedChange={setVibrationEnabled}
                  />
                }
              />
              
              <Separator />
              <SettingItem
                icon={Bell}
                title="Snooze Reminders"
                description="Allow snoozing medication reminders"
                action={
                  <Switch
                    checked={reminderSnooze}
                    onCheckedChange={setReminderSnooze}
                  />
                }
              />
              
              <Separator />
              <SettingItem
                icon={Bell}
                title="Notification Schedule"
                description="Set quiet hours and advanced settings"
                onClick={() => {}}
              />
            </>
          )}
        </Card>

        {/* Appearance */}
        <Card className="space-y-0">
          <div className="p-4 border-b border-border">
            <h3 className="flex items-center space-x-2">
              <Moon size={18} />
              <span>Appearance</span>
            </h3>
          </div>
          
          <SettingItem
            icon={Moon}
            title="Dark Mode"
            description="Use dark theme"
            action={
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            }
          />
          
          <Separator />
          <SettingItem
            icon={Globe}
            title="Language"
            description="Change app language"
            onClick={() => {}}
          />
        </Card>

        {/* Data & Privacy */}
        <Card className="space-y-0">
          <div className="p-4 border-b border-border">
            <h3 className="flex items-center space-x-2">
              <Shield size={18} />
              <span>Data &amp; Privacy</span>
            </h3>
          </div>
          
          <SettingItem
            icon={Download}
            title="Export Data"
            description="Download your medicine data"
            onClick={() => {}}
          />
          
          <Separator />
          <SettingItem
            icon={Shield}
            title="Privacy Settings"
            description="Manage data sharing preferences"
            onClick={() => {}}
          />
          
          <Separator />
          <SettingItem
            icon={Trash2}
            title="Delete All Data"
            description="Permanently remove all your data"
            onClick={() => {}}
          />
        </Card>

        {/* Support */}
        <Card className="space-y-0">
          <div className="p-4 border-b border-border">
            <h3 className="flex items-center space-x-2">
              <HelpCircle size={18} />
              <span>Support</span>
            </h3>
          </div>
          
          <SettingItem
            icon={HelpCircle}
            title="Help Center"
            description="Get help and find answers"
            onClick={() => {}}
          />
          
          <Separator />
          <SettingItem
            icon={MessageSquare}
            title="Contact Support"
            description="Send feedback or report issues"
            onClick={() => {}}
          />
          
          <Separator />
          <SettingItem
            icon={FileText}
            title="Terms of Service"
            description="Read our terms and conditions"
            onClick={() => {}}
          />
          
          <Separator />
          <SettingItem
            icon={Shield}
            title="Privacy Policy"
            description="Learn how we protect your data"
            onClick={() => {}}
          />
        </Card>

        {/* App Info */}
        <Card>
          <div className="p-4 text-center space-y-2">
            <h3>MediRemind</h3>
            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            <p className="text-xs text-muted-foreground">
              Built with care to help you manage your medications
            </p>
          </div>
        </Card>

        {/* Bottom spacing for navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}