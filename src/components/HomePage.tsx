import React from 'react';
import { Bell, Plus, CheckCircle, Clock, AlertCircle, Heart, Activity, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface HomePageProps {
  onViewMedicine: (medicineId: string) => void;
}

export function HomePage({ onViewMedicine }: HomePageProps) {
  // Mock data for today's medicines
  const todayMedicines = [
    {
      id: '1',
      name: 'Vitamin D',
      dosage: '1000 IU',
      time: '08:00 AM',
      status: 'taken',
      type: 'tablet',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      id: '2',
      name: 'Blood Pressure',
      dosage: '10mg',
      time: '12:00 PM',
      status: 'pending',
      type: 'tablet',
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50'
    },
    {
      id: '3',
      name: 'Calcium',
      dosage: '500mg',
      time: '06:00 PM',
      status: 'upcoming',
      type: 'tablet',
      color: 'from-green-400 to-teal-500',
      bgColor: 'bg-green-50'
    },
    {
      id: '4',
      name: 'Sleep Aid',
      dosage: '5mg',
      time: '10:00 PM',
      status: 'upcoming',
      type: 'tablet',
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'pending':
        return <AlertCircle className="text-orange-500 animate-pulse" size={20} />;
      case 'upcoming':
        return <Clock className="text-blue-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'taken':
        return <Badge className="bg-green-100 text-green-700 border-green-200">✓ Taken</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200 animate-pulse">⏰ Due Now</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="text-blue-600 border-blue-200">📅 Upcoming</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header with Gradient */}
      <div className="gradient-primary p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-white text-2xl font-bold">Good Morning! 🌅</h1>
              <p className="text-blue-100">Friday, January 24, 2025</p>
            </div>
            <Button variant="secondary" size="icon" className="bg-white/20 hover:bg-white/30 border-0">
              <Bell size={20} className="text-white" />
            </Button>
          </div>

          {/* Health Score */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-medium">Today's Health Score</h3>
              <Heart className="text-pink-200" size={20} />
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={85} className="flex-1 h-3" />
              <span className="text-white font-bold">85%</span>
            </div>
            <p className="text-blue-100 text-sm mt-1">Great job! Keep it up! 💪</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-2">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="medicine-card p-4 text-center border-0">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-lg">4</span>
            </div>
            <p className="text-xs text-gray-600">Today's Meds</p>
          </Card>
          <Card className="medicine-card p-4 text-center border-0">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="text-white" size={20} />
            </div>
            <p className="text-xs text-gray-600">Completed</p>
          </Card>
          <Card className="medicine-card p-4 text-center border-0">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-2 animate-pulse">
              <AlertCircle className="text-white" size={20} />
            </div>
            <p className="text-xs text-gray-600">Due Now</p>
          </Card>
        </div>

        {/* Today's Schedule */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800 flex items-center space-x-2">
              <Activity className="text-purple-500" size={20} />
              <span>Today's Schedule</span>
            </h2>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </div>

          <div className="space-y-3">
            {todayMedicines.map((medicine) => (
              <Card key={medicine.id} className="medicine-card p-4 border-0 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Medicine Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-r ${medicine.color} rounded-2xl flex items-center justify-center relative`}>
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="absolute -top-1 -right-1">
                        {getStatusIcon(medicine.status)}
                      </div>
                    </div>
                    
                    {/* Medicine Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{medicine.name}</h3>
                      <p className="text-sm text-gray-600">{medicine.dosage} • {medicine.time}</p>
                      <div className="mt-1">
                        {getStatusBadge(medicine.status)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewMedicine(medicine.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View
                    </Button>
                    {medicine.status === 'pending' && (
                      <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                        Take Now
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-gray-800 mb-3 flex items-center space-x-2">
            <Zap className="text-yellow-500" size={20} />
            <span>Quick Actions</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="medicine-card p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-200 border-0 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Plus size={24} className="text-white" />
              </div>
              <p className="font-medium text-gray-800">Add Medicine</p>
              <p className="text-xs text-gray-500 mt-1">Set up new medication</p>
            </Card>
            
            <Card className="medicine-card p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-200 border-0 group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Bell size={24} className="text-white" />
              </div>
              <p className="font-medium text-gray-800">Set Reminder</p>
              <p className="text-xs text-gray-500 mt-1">Configure notifications</p>
            </Card>
          </div>
        </div>

        {/* Weekly Progress */}
        <Card className="medicine-card p-4 border-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 flex items-center space-x-2">
              <Activity className="text-indigo-500" size={20} />
              <span>This Week</span>
            </h3>
            <span className="text-sm text-gray-500">92% adherence</span>
          </div>
          
          <div className="space-y-2">
            <Progress value={92} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
          
          <div className="flex justify-between mt-4 text-sm">
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
              <span className="text-gray-600">28 taken</span>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
              <span className="text-gray-600">2 missed</span>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
              <span className="text-gray-600">5 upcoming</span>
            </div>
          </div>
        </Card>

        {/* Bottom spacing for navigation */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}