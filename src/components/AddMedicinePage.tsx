import React, { useState } from 'react';
import { ArrowLeft, Camera, Clock, Plus, Trash2, Pill, Droplets, Syringe, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';

interface AddMedicinePageProps {
  onBack: () => void;
}

export function AddMedicinePage({ onBack }: AddMedicinePageProps) {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTimes, setReminderTimes] = useState(['08:00']);

  const medicineTypes = [
    { value: 'tablet', label: 'Tablet', icon: Pill, color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-50' },
    { value: 'capsule', label: 'Capsule', icon: Pill, color: 'from-green-400 to-green-600', bgColor: 'bg-green-50' },
    { value: 'liquid', label: 'Liquid', icon: Droplets, color: 'from-purple-400 to-purple-600', bgColor: 'bg-purple-50' },
    { value: 'injection', label: 'Injection', icon: Syringe, color: 'from-red-400 to-red-600', bgColor: 'bg-red-50' },
    { value: 'drops', label: 'Drops', icon: Droplets, color: 'from-teal-400 to-teal-600', bgColor: 'bg-teal-50' },
    { value: 'inhaler', label: 'Inhaler', icon: Pill, color: 'from-orange-400 to-orange-600', bgColor: 'bg-orange-50' },
    { value: 'cream', label: 'Cream', icon: Sparkles, color: 'from-pink-400 to-pink-600', bgColor: 'bg-pink-50' }
  ];

  const addReminderTime = () => {
    setReminderTimes([...reminderTimes, '12:00']);
  };

  const removeReminderTime = (index: number) => {
    const newTimes = reminderTimes.filter((_, i) => i !== index);
    setReminderTimes(newTimes);
  };

  const updateReminderTime = (index: number, time: string) => {
    const newTimes = [...reminderTimes];
    newTimes[index] = time;
    setReminderTimes(newTimes);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="gradient-primary p-4 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="ml-2 text-xl font-bold">Add New Medicine 💊</h1>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
            Save
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Medicine Photo */}
        <Card className="medicine-card p-6 border-0">
          <Label className="block mb-3 flex items-center space-x-2">
            <Camera className="text-purple-500" size={18} />
            <span>Medicine Photo (Optional)</span>
          </Label>
          <div className="border-2 border-dashed border-purple-200 rounded-2xl p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Camera size={24} className="text-white" />
            </div>
            <p className="text-gray-600 font-medium">Tap to add photo</p>
            <p className="text-sm text-gray-500 mt-1">Help identify your medicine</p>
          </div>
        </Card>

        {/* Basic Information */}
        <Card className="medicine-card p-6 space-y-4 border-0">
          <h3 className="flex items-center space-x-2 text-gray-800">
            <Pill className="text-blue-500" size={20} />
            <span>Basic Information</span>
          </h3>
          
          <div className="space-y-3">
            <Label htmlFor="medicine-name" className="text-gray-700">Medicine Name *</Label>
            <Input
              id="medicine-name"
              placeholder="Enter medicine name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="dosage" className="text-gray-700">Dosage *</Label>
              <Input
                id="dosage"
                placeholder="e.g., 500mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="medicine-type" className="text-gray-700">Type</Label>
              <Select value={medicineType} onValueChange={setMedicineType}>
                <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {medicineTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                            <IconComponent size={12} className="text-white" />
                          </div>
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Medicine Type Visual */}
        {medicineType && (
          <Card className="medicine-card p-4 border-0">
            <h4 className="text-gray-700 mb-3">Selected Medicine Type</h4>
            <div className="flex items-center space-x-4">
              {medicineTypes.map((type) => {
                if (type.value === medicineType) {
                  const IconComponent = type.icon;
                  return (
                    <div key={type.value} className={`${type.bgColor} p-4 rounded-2xl flex items-center space-x-3 flex-1`}>
                      <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center`}>
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{type.label}</p>
                        <p className="text-sm text-gray-600">Perfect choice!</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </Card>
        )}

        {/* Schedule */}
        <Card className="medicine-card p-6 space-y-4 border-0">
          <h3 className="flex items-center space-x-2 text-gray-800">
            <Clock className="text-green-500" size={20} />
            <span>Schedule</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="frequency" className="text-gray-700">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white">
                  <SelectValue placeholder="How often?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once-daily">🌅 Once Daily</SelectItem>
                  <SelectItem value="twice-daily">🌅🌙 Twice Daily</SelectItem>
                  <SelectItem value="three-times">🌅☀️🌙 3 Times Daily</SelectItem>
                  <SelectItem value="four-times">🌅☀️🌆🌙 4 Times Daily</SelectItem>
                  <SelectItem value="as-needed">🔔 As Needed</SelectItem>
                  <SelectItem value="custom">⚙️ Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="duration" className="text-gray-700">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white">
                  <SelectValue placeholder="How long?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7-days">📅 7 Days</SelectItem>
                  <SelectItem value="14-days">📅 14 Days</SelectItem>
                  <SelectItem value="30-days">📅 30 Days</SelectItem>
                  <SelectItem value="90-days">📅 90 Days</SelectItem>
                  <SelectItem value="ongoing">🔄 Ongoing</SelectItem>
                  <SelectItem value="custom">⚙️ Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Reminders */}
        <Card className="medicine-card p-6 space-y-4 border-0">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center space-x-2 text-gray-800">
              <Clock className="text-orange-500" size={20} />
              <span>Reminders</span>
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Enable</span>
              <Switch
                checked={reminderEnabled}
                onCheckedChange={setReminderEnabled}
              />
            </div>
          </div>

          {reminderEnabled && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700 font-medium">⏰ Set your reminder times</p>
                <p className="text-xs text-gray-600 mt-1">We'll notify you when it's time to take your medicine</p>
              </div>
              
              <div className="space-y-3">
                <Label className="text-gray-700">Reminder Times</Label>
                {reminderTimes.map((time, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-1 flex items-center space-x-3 bg-white p-3 rounded-xl border border-gray-200">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                        <Clock size={16} className="text-white" />
                      </div>
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => updateReminderTime(index, e.target.value)}
                        className="border-0 bg-transparent focus:ring-0"
                      />
                    </div>
                    {reminderTimes.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeReminderTime(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addReminderTime}
                  className="w-full border-dashed border-gray-300 hover:border-blue-400 hover:text-blue-600"
                >
                  <Plus size={16} className="mr-2" />
                  Add Another Time
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Additional Notes */}
        <Card className="medicine-card p-6 space-y-4 border-0">
          <h3 className="flex items-center space-x-2 text-gray-800">
            <Sparkles className="text-purple-500" size={20} />
            <span>Additional Notes</span>
          </h3>
          <div className="space-y-3">
            <Label htmlFor="notes" className="text-gray-700">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special instructions, side effects to watch for, or reminders..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 bg-white resize-none"
            />
          </div>
        </Card>

        {/* Instructions */}
        <Card className="medicine-card p-6 space-y-4 border-0">
          <h3 className="flex items-center space-x-2 text-gray-800">
            <Clock className="text-teal-500" size={20} />
            <span>Instructions</span>
          </h3>
          <div className="space-y-3">
            <Label htmlFor="instructions" className="text-gray-700">When to take</Label>
            <Select>
              <SelectTrigger className="border-gray-200 focus:border-teal-400 focus:ring-teal-400/20 bg-white">
                <SelectValue placeholder="Select timing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="before-meals">🍽️ Before meals</SelectItem>
                <SelectItem value="after-meals">🍽️ After meals</SelectItem>
                <SelectItem value="with-meals">🍽️ With meals</SelectItem>
                <SelectItem value="empty-stomach">⭕ On empty stomach</SelectItem>
                <SelectItem value="bedtime">🛏️ At bedtime</SelectItem>
                <SelectItem value="anytime">⏰ Anytime</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Save Button */}
        <div className="pb-6">
          <Button className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium text-lg">
            ✨ Save Medicine
          </Button>
        </div>
      </div>
    </div>
  );
}