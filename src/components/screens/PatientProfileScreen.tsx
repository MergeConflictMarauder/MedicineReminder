import React, { useState } from 'react';
import { Patient } from '../../types';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MedicationCard } from '../core/MedicationCard';
import { AdherenceChart } from '../core/AdherenceChart';
import { ArrowLeft, Edit, Heart, AlertCircle, Phone, Plus, FileText, Award } from 'lucide-react';

interface PatientProfileScreenProps {
  patient: Patient;
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

export function PatientProfileScreen({ patient, onNavigate, onBack }: PatientProfileScreenProps) {
  const { getMedicationsByPatient, badges } = useApp();
  const medications = getMedicationsByPatient(patient.id);
  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();

  // Mock adherence data for the chart
  const adherenceData = [
    { date: 'Mon', adherence: 100, taken: 4, missed: 0 },
    { date: 'Tue', adherence: 100, taken: 4, missed: 0 },
    { date: 'Wed', adherence: 75, taken: 3, missed: 1 },
    { date: 'Thu', adherence: 100, taken: 4, missed: 0 },
    { date: 'Fri', adherence: 100, taken: 4, missed: 0 },
    { date: 'Sat', adherence: 100, taken: 4, missed: 0 },
    { date: 'Sun', adherence: 100, taken: 4, missed: 0 },
  ];

  const earnedBadges = badges.filter(b => b.earnedAt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
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

          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              <AvatarImage src={patient.photo} alt={patient.name} />
              <AvatarFallback className="text-2xl">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="mb-2">{patient.name}</h1>
              <p className="text-blue-100 mb-3">{age} years old • {patient.gender}</p>
              
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-white/30 gap-1">
                  <Heart size={14} />
                  {patient.adherenceScore}% Adherence
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  {medications.length} Medications
                </Badge>
              </div>
            </div>

            <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Edit size={16} className="mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Medical Info */}
            <Card className="p-6">
              <h3 className="mb-4">Medical Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Chronic Conditions</p>
                  {patient.chronicConditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.chronicConditions.map((condition, idx) => (
                        <Badge key={idx} variant="outline">{condition}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">None reported</p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Allergies</p>
                  {patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, idx) => (
                        <Badge key={idx} variant="destructive" className="gap-1">
                          <AlertCircle size={12} />
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">None reported</p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-2">Emergency Contact</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p>{patient.emergencyContact.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.emergencyContact.relationship} • {patient.emergencyContact.phone}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone size={14} />
                    Call
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4"
                onClick={() => onNavigate('add-medication', { patient })}
              >
                <div className="text-center w-full">
                  <Plus className="mx-auto mb-2" size={24} />
                  <div>Add Medication</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto py-4"
                onClick={() => onNavigate('diary', { patient })}
              >
                <div className="text-center w-full">
                  <FileText className="mx-auto mb-2" size={24} />
                  <div>Health Diary</div>
                </div>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="medications" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3>Active Medications ({medications.length})</h3>
              <Button onClick={() => onNavigate('add-medication', { patient })} className="gap-2">
                <Plus size={16} />
                Add Medication
              </Button>
            </div>

            {medications.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No medications yet</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => onNavigate('add-medication', { patient })}
                >
                  Add First Medication
                </Button>
              </Card>
            ) : (
              <div className="grid gap-3">
                {medications.map((med) => (
                  <MedicationCard
                    key={med.id}
                    medication={med}
                    onClick={() => onNavigate('medication-detail', { medication: med })}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3>Adherence Reports</h3>
              <Button variant="outline" size="sm">
                Export PDF
              </Button>
            </div>

            <AdherenceChart data={adherenceData} type="bar" title="Weekly Adherence" />
            
            <AdherenceChart data={adherenceData} type="line" />

            <Card className="p-6">
              <h4 className="mb-4">Statistics</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl text-green-600 mb-1">{patient.adherenceScore}%</p>
                  <p className="text-sm text-muted-foreground">Current Score</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl text-blue-600 mb-1">7</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl text-purple-600 mb-1">28</p>
                  <p className="text-sm text-muted-foreground">Total Days</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <h3>Medical History</h3>
            
            {patient.medicalHistory.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No medical history uploaded</p>
                <Button variant="outline">
                  Upload Document
                </Button>
              </Card>
            ) : (
              <div className="grid gap-3">
                {patient.medicalHistory.map((doc, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded">
                        <FileText className="text-blue-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="capitalize">{doc.type}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded: {new Date(doc.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <h3>Achievements & Badges</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {earnedBadges.map((badge) => (
                <Card key={badge.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-4xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h4 className="mb-1">{badge.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                      <p className="text-xs text-green-600">
                        Earned: {new Date(badge.earnedAt!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <h4 className="mb-3">In Progress</h4>
              <div className="grid gap-3">
                {badges.filter(b => !b.earnedAt && b.progress).map((badge) => (
                  <Card key={badge.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl opacity-50">{badge.icon}</div>
                      <div className="flex-1">
                        <h4 className="mb-1">{badge.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 transition-all"
                              style={{ width: `${badge.progress}%` }}
                            />
                          </div>
                          <span className="text-sm">{badge.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
