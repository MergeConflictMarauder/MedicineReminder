import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockPharmacies, mockDoctors } from '../../data/mockData';
import { ArrowLeft, MapPin, Phone, Navigation, Clock, Star, Package, Search } from 'lucide-react';

interface PharmacyFinderScreenProps {
  onBack: () => void;
}

export function PharmacyFinderScreen({ onBack }: PharmacyFinderScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'pharmacy' | 'doctor'>('pharmacy');

  const filteredPharmacies = mockPharmacies.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDoctors = mockDoctors.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCall = (phone: string, name: string) => {
    alert(`Calling ${name} at ${phone}`);
  };

  const handleNavigate = (address: string) => {
    alert(`Opening navigation to ${address}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <MapPin size={32} />
            </div>
            <div>
              <h1 className="mb-1">Find Nearby Services</h1>
              <p className="text-blue-100">Pharmacies and doctors in your area</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as 'pharmacy' | 'doctor')} className="space-y-6">
          <TabsList className="bg-white shadow-sm w-full">
            <TabsTrigger value="pharmacy" className="flex-1">
              Pharmacies ({filteredPharmacies.length})
            </TabsTrigger>
            <TabsTrigger value="doctor" className="flex-1">
              Doctors ({filteredDoctors.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pharmacy" className="space-y-4">
            {filteredPharmacies.length === 0 ? (
              <Card className="p-8 text-center">
                <MapPin size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No pharmacies found</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredPharmacies.map((pharmacy) => (
                  <Card key={pharmacy.id} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-xl flex-shrink-0">
                        <Package size={24} className="text-blue-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <h4 className="mb-1">{pharmacy.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {pharmacy.address}
                            </p>
                          </div>
                          <Badge variant="secondary" className="flex-shrink-0">
                            {pharmacy.distance} km
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <div className="flex items-center gap-1 text-sm">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span>{pharmacy.rating}</span>
                          </div>

                          {pharmacy.is24Hours && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 text-xs">
                              <Clock size={12} className="mr-1" />
                              24/7
                            </Badge>
                          )}

                          {pharmacy.hasPrePackaging && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-xs">
                              <Package size={12} className="mr-1" />
                              Pre-packaging
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCall(pharmacy.phone, pharmacy.name)}
                            className="gap-2 flex-1"
                          >
                            <Phone size={14} />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleNavigate(pharmacy.address)}
                            className="gap-2 flex-1 bg-blue-600 hover:bg-blue-700"
                          >
                            <Navigation size={14} />
                            Navigate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="doctor" className="space-y-4">
            {filteredDoctors.length === 0 ? (
              <Card className="p-8 text-center">
                <MapPin size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No doctors found</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-teal-100 rounded-xl flex-shrink-0">
                        <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <h4 className="mb-1">{doctor.name}</h4>
                            <p className="text-sm text-teal-700 mb-1">{doctor.specialty}</p>
                            <p className="text-sm text-muted-foreground mb-1">{doctor.clinic}</p>
                            <p className="text-sm text-muted-foreground">
                              {doctor.address}
                            </p>
                          </div>
                          <Badge variant="secondary" className="flex-shrink-0">
                            {doctor.distance} km
                          </Badge>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCall(doctor.phone, doctor.name)}
                            className="gap-2 flex-1"
                          >
                            <Phone size={14} />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleNavigate(doctor.address)}
                            className="gap-2 flex-1 bg-teal-600 hover:bg-teal-700"
                          >
                            <Navigation size={14} />
                            Navigate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Map Placeholder */}
        <Card className="mt-6 p-4 bg-gradient-to-br from-blue-100 to-green-100 border-blue-200">
          <div className="aspect-video rounded-lg bg-gray-200 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin size={48} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Map view would appear here</p>
              <p className="text-xs mt-1">Showing {selectedType === 'pharmacy' ? 'pharmacies' : 'doctors'} near you</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
