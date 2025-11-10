import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Bell, Zap, Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';

export function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [reminderSettings, setReminderSettings] = useState({
    morningReminder: true,
    afternoonReminder: true,
    eveningReminder: true,
    smartNotifications: true
  });

  // Mock schedule data with enhanced time periods
  const scheduleData = {
    'Monday': [
      { id: '1', name: 'Vitamin D', time: '08:00', dosage: '1000 IU', status: 'taken', period: 'morning' },
      { id: '2', name: 'Blood Pressure Med', time: '12:00', dosage: '10mg', status: 'taken', period: 'afternoon' },
      { id: '3', name: 'Calcium', time: '18:00', dosage: '500mg', status: 'taken', period: 'evening' },
      { id: '4', name: 'Blood Pressure Med', time: '20:00', dosage: '10mg', status: 'taken', period: 'night' }
    ],
    'Tuesday': [
      { id: '1', name: 'Vitamin D', time: '08:00', dosage: '1000 IU', status: 'taken', period: 'morning' },
      { id: '2', name: 'Blood Pressure Med', time: '12:00', dosage: '10mg', status: 'taken', period: 'afternoon' },
      { id: '4', name: 'Calcium', time: '18:00', dosage: '500mg', status: 'taken', period: 'evening' },
      { id: '2', name: 'Blood Pressure Med', time: '20:00', dosage: '10mg', status: 'taken', period: 'night' }
    ],
    'Wednesday': [
      { id: '1', name: 'Vitamin D', time: '08:00', dosage: '1000 IU', status: 'taken', period: 'morning' },
      { id: '2', name: 'Blood Pressure Med', time: '12:00', dosage: '10mg', status: 'taken', period: 'afternoon' },
      { id: '4', name: 'Calcium', time: '18:00', dosage: '500mg', status: 'missed', period: 'evening' },
      { id: '2', name: 'Blood Pressure Med', time: '20:00', dosage: '10mg', status: 'taken', period: 'night' }
    ],
    'Thursday': [
      { id: '1', name: 'Vitamin D', time: '08:00', dosage: '1000 IU', status: 'pending', period: 'morning' },
      { id: '2', name: 'Blood Pressure Med', time: '12:00', dosage: '10mg', status: 'upcoming', period: 'afternoon' },
      { id: '4', name: 'Calcium', time: '18:00', dosage: '500mg', status: 'upcoming', period: 'evening' },
      { id: '2', name: 'Blood Pressure Med', time: '20:00', dosage: '10mg', status: 'upcoming', period: 'night' }
    ],
    'Friday': [
      { id: '1', name: 'Vitamin D', time: '08:00', dosage: '1000 IU', status: 'upcoming', period: 'morning' },
      { id: '2', name: 'Blood Pressure Med', time: '12:00', dosage: '10mg', status: 'upcoming', period: 'afternoon' },
      { id: '4', name: 'Calcium', time: '18:00', dosage: '500mg', status: 'upcoming', period: 'evening' },
      { id: '2', name: 'Blood Pressure Med', time: '20:00', dosage: '10mg', status: 'upcoming', period: 'night' }
    ],
    'Saturday': [
      { id: '1', name: 'Vitamin D', time: '08:00', dosage: '1000 IU', status: 'upcoming', period: 'morning' },
      { id: '2', name: 'Blood Pressure Med', time: '12:00', dosage: '10mg', status: 'upcoming', period: 'afternoon' },
      { id: '4', name: 'Calcium', time: '18:00', dosage: '500mg', status: 'upcoming', period: 'evening' },
      { id: '2', name: 'Blood Pressure Med', time: '20:00', dosage: '10mg', status: 'upcoming', period: 'night' }
    ],
    'Sunday': [
      { id: '1', name: 'Vitamin D', time: '08:00', dosage: '1000 IU', status: 'upcoming', period: 'morning' },
      { id: '2', name: 'Blood Pressure Med', time: '12:00', dosage: '10mg', status: 'upcoming', period: 'afternoon' },
      { id: '4', name: 'Calcium', time: '18:00', dosage: '500mg', status: 'upcoming', period: 'evening' },
      { id: '2', name: 'Blood Pressure Med', time: '20:00', dosage: '10mg', status: 'upcoming', period: 'night' }
    ]
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentDate = new Date();
  const currentDayIndex = (currentDate.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken':
        return 'bg-green-500';
      case 'missed':
        return 'bg-red-500';
      case 'pending':
        return 'bg-orange-500 animate-pulse';
      case 'upcoming':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'taken':
        return <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">✓ Done</Badge>;
      case 'missed':
        return <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">⚠️ Missed</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs animate-pulse">🔔 Due</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="text-blue-600 border-blue-200 text-xs">⏰ Soon</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">?</Badge>;
    }
  };

  const getPeriodIcon = (period: string) => {
    switch (period) {
      case 'morning':
        return <Sunrise size={14} className="text-yellow-500" />;
      case 'afternoon':
        return <Sun size={14} className="text-orange-500" />;
      case 'evening':
        return <Sunset size={14} className="text-purple-500" />;
      case 'night':
        return <Moon size={14} className="text-indigo-500" />;
      default:
        return <Clock size={14} className="text-gray-500" />;
    }
  };

  const getPeriodGradient = (period: string) => {
    switch (period) {
      case 'morning':
        return 'from-yellow-50 to-orange-50';
      case 'afternoon':
        return 'from-orange-50 to-red-50';
      case 'evening':
        return 'from-purple-50 to-pink-50';
      case 'night':
        return 'from-indigo-50 to-purple-50';
      default:
        return 'from-gray-50 to-gray-100';
    }
  };

  const formatDate = (dayIndex: number) => {
    const date = new Date();
    const diff = dayIndex - currentDayIndex;
    date.setDate(date.getDate() + diff);
    return date.getDate();
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header with Gradient */}
      <div className="gradient-info p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Smart Reminders ⏰</h1>
              <p className="text-blue-100">Never miss your medication</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ChevronLeft size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
          
          {/* Week Summary */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-blue-100" />
                <span className="font-medium text-white">This Week Summary</span>
              </div>
              <Zap className="text-yellow-200" size={18} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-blue-100">28 Taken</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-blue-100">2 Missed</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-blue-100">18 Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder Settings */}
      <div className="p-4">
        <Card className="medicine-card p-4 border-0 mb-4">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Bell className="text-purple-500" size={18} />
            <span>Reminder Settings</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Sunrise className="text-yellow-500" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Morning Reminders</p>
                  <p className="text-sm text-gray-600">6:00 AM - 12:00 PM</p>
                </div>
              </div>
              <Switch
                checked={reminderSettings.morningReminder}
                onCheckedChange={(checked) => setReminderSettings({...reminderSettings, morningReminder: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Sun className="text-orange-500" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Afternoon Reminders</p>
                  <p className="text-sm text-gray-600">12:00 PM - 6:00 PM</p>
                </div>
              </div>
              <Switch
                checked={reminderSettings.afternoonReminder}
                onCheckedChange={(checked) => setReminderSettings({...reminderSettings, afternoonReminder: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Moon className="text-purple-500" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Evening Reminders</p>
                  <p className="text-sm text-gray-600">6:00 PM - 10:00 PM</p>
                </div>
              </div>
              <Switch
                checked={reminderSettings.eveningReminder}
                onCheckedChange={(checked) => setReminderSettings({...reminderSettings, eveningReminder: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Zap className="text-blue-500" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Smart Notifications</p>
                  <p className="text-sm text-gray-600">AI-powered reminder timing</p>
                </div>
              </div>
              <Switch
                checked={reminderSettings.smartNotifications}
                onCheckedChange={(checked) => setReminderSettings({...reminderSettings, smartNotifications: checked})}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Schedule Grid */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="space-y-4 pb-6">
          {days.map((day, dayIndex) => (
            <Card key={day} className={`medicine-card p-4 border-0 ${dayIndex === currentDayIndex ? 'ring-2 ring-blue-400 bg-gradient-to-r from-blue-50 to-purple-50' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className={`font-semibold ${dayIndex === currentDayIndex ? 'text-blue-700' : 'text-gray-800'}`}>
                    {day}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Jan {formatDate(dayIndex)}
                  </span>
                  {dayIndex === currentDayIndex && (
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">Today</Badge>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {scheduleData[day as keyof typeof scheduleData]?.length || 0} doses
                </div>
              </div>

              <div className="space-y-3">
                {scheduleData[day as keyof typeof scheduleData]?.map((dose, index) => (
                  <div key={`${dose.id}-${index}`} className={`flex items-center justify-between p-3 bg-gradient-to-r ${getPeriodGradient(dose.period)} rounded-xl border border-white/50`}>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getPeriodIcon(dose.period)}
                        <span className="text-sm font-semibold text-gray-700">{dose.time}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{dose.name}</p>
                        <p className="text-xs text-gray-600">{dose.dosage}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(dose.status)}
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(dose.status)}`}></div>
                    </div>
                  </div>
                ))}
                
                {(!scheduleData[day as keyof typeof scheduleData] || scheduleData[day as keyof typeof scheduleData].length === 0) && (
                  <div className="text-center py-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <p className="text-sm text-gray-500">No medicines scheduled</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}