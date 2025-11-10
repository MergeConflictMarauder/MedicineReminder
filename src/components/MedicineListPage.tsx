import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Pill, Clock, Calendar, TrendingUp, Award, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface MedicineListPageProps {
  onViewMedicine: (medicineId: string) => void;
}

export function MedicineListPage({ onViewMedicine }: MedicineListPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for medicines with enhanced details
  const medicines = [
    {
      id: '1',
      name: 'Vitamin D',
      dosage: '1000 IU',
      type: 'tablet',
      frequency: 'Once Daily',
      nextDose: '08:00 AM',
      status: 'active',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      adherence: 95,
      streak: 12,
      totalDoses: 30,
      takenDoses: 28
    },
    {
      id: '2',
      name: 'Blood Pressure Medication',
      dosage: '10mg',
      type: 'tablet',
      frequency: 'Twice Daily',
      nextDose: '12:00 PM',
      status: 'active',
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50',
      adherence: 89,
      streak: 8,
      totalDoses: 60,
      takenDoses: 53
    },
    {
      id: '3',
      name: 'Calcium Supplement',
      dosage: '500mg',
      type: 'tablet',
      frequency: 'Twice Daily',
      nextDose: '06:00 PM',
      status: 'active',
      color: 'from-green-400 to-teal-500',
      bgColor: 'bg-green-50',
      adherence: 92,
      streak: 15,
      totalDoses: 60,
      takenDoses: 55
    },
    {
      id: '4',
      name: 'Sleep Aid',
      dosage: '5mg',
      type: 'tablet',
      frequency: 'As Needed',
      nextDose: 'As needed',
      status: 'active',
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-purple-50',
      adherence: 100,
      streak: 5,
      totalDoses: 10,
      takenDoses: 10
    },
    {
      id: '5',
      name: 'Antibiotic Course',
      dosage: '250mg',
      type: 'capsule',
      frequency: 'Three times daily',
      nextDose: 'Completed',
      status: 'completed',
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      adherence: 100,
      streak: 7,
      totalDoses: 21,
      takenDoses: 21
    },
    {
      id: '6',
      name: 'Pain Relief',
      dosage: '400mg',
      type: 'tablet',
      frequency: 'As Needed',
      nextDose: 'Paused',
      status: 'paused',
      color: 'from-orange-400 to-yellow-500',
      bgColor: 'bg-orange-50',
      adherence: 75,
      streak: 0,
      totalDoses: 20,
      takenDoses: 15
    }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || medicine.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string, adherence: number) => {
    switch (status) {
      case 'active':
        if (adherence >= 90) {
          return <Badge className="bg-green-100 text-green-700 border-green-200">🟢 Excellent</Badge>;
        } else if (adherence >= 80) {
          return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">🟡 Good</Badge>;
        } else {
          return <Badge className="bg-orange-100 text-orange-700 border-orange-200">🟠 Needs Attention</Badge>;
        }
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">✅ Completed</Badge>;
      case 'paused':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">⏸️ Paused</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStreakBadge = (streak: number) => {
    if (streak >= 10) {
      return <Badge className="bg-purple-100 text-purple-700 border-purple-200">🔥 {streak} days</Badge>;
    } else if (streak >= 5) {
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">⭐ {streak} days</Badge>;
    } else if (streak > 0) {
      return <Badge className="bg-green-100 text-green-700 border-green-200">✨ {streak} days</Badge>;
    }
    return null;
  };

  const overallAdherence = Math.round(
    filteredMedicines.reduce((sum, med) => sum + med.adherence, 0) / filteredMedicines.length
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Gradient */}
      <div className="gradient-success p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Pill History 📊</h1>
          <p className="text-green-100 mb-4">Track your medication journey</p>
          
          {/* Overall Stats */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-medium">Overall Adherence</h3>
              <TrendingUp className="text-green-200" size={20} />
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={overallAdherence} className="flex-1 h-3" />
              <span className="text-white font-bold">{overallAdherence}%</span>
            </div>
            <p className="text-green-100 text-sm mt-1">Keep up the great work! 💪</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Search and Filter */}
        <div className="flex space-x-3 mb-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-white border-gray-200 hover:border-blue-400">
                <Filter size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedFilter('all')}>
                All Medicines
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter('active')}>
                Active Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter('completed')}>
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter('paused')}>
                Paused
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
            className={selectedFilter === 'all' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white border-gray-200'}
          >
            All ({medicines.length})
          </Button>
          <Button
            variant={selectedFilter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('active')}
            className={selectedFilter === 'active' ? 'bg-gradient-to-r from-green-500 to-teal-600' : 'bg-white border-gray-200'}
          >
            Active ({medicines.filter(m => m.status === 'active').length})
          </Button>
          <Button
            variant={selectedFilter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('completed')}
            className={selectedFilter === 'completed' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-white border-gray-200'}
          >
            Completed ({medicines.filter(m => m.status === 'completed').length})
          </Button>
        </div>

        {/* Medicine List */}
        {filteredMedicines.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Pill size={32} className="text-gray-500" />
            </div>
            <h3 className="text-gray-700 mb-2">No medicines found</h3>
            <p className="text-gray-500 text-sm">
              {searchQuery ? 'Try adjusting your search terms' : 'Add your first medicine to get started'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMedicines.map((medicine) => (
              <Card key={medicine.id} className="medicine-card p-5 border-0 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Medicine Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${medicine.color} rounded-2xl flex items-center justify-center relative`}>
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <Pill size={16} className="text-gray-600" />
                      </div>
                      {medicine.streak >= 10 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Award size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Medicine Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{medicine.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{medicine.dosage} • {medicine.type}</p>
                      
                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs font-medium text-gray-700">
                            {medicine.takenDoses}/{medicine.totalDoses}
                          </span>
                        </div>
                        <Progress value={(medicine.takenDoses / medicine.totalDoses) * 100} className="h-2" />
                      </div>
                      
                      {/* Schedule Info */}
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-600">{medicine.frequency}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-600">Next: {medicine.nextDose}</span>
                        </div>
                      </div>
                      
                      {/* Status Badges */}
                      <div className="flex items-center space-x-2 flex-wrap">
                        {getStatusBadge(medicine.status, medicine.adherence)}
                        {getStreakBadge(medicine.streak)}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewMedicine(medicine.id)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>
                          {medicine.status === 'active' ? 'Pause' : 'Resume'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Adherence Visualization */}
                <div className={`${medicine.bgColor} p-3 rounded-xl`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target size={14} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Adherence</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">{medicine.adherence}%</span>
                  </div>
                  <Progress value={medicine.adherence} className="h-1 mt-2" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom spacing for navigation */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}