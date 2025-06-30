import React, { useState } from 'react';
import { Star, Calendar, Video, MapPin, Filter } from 'lucide-react';
import type { Doctor } from '../types';

const DoctorProfiles: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      reviews: 127,
      experience: '15 years',
      education: 'Harvard Medical School',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Today', 'Tomorrow', 'Wed']
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Physical Therapist',
      rating: 4.8,
      reviews: 89,
      experience: '12 years',
      education: 'Stanford University',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Today', 'Thu', 'Fri']
    },
    {
      id: '3',
      name: 'Dr. Emily Davis',
      specialty: 'General Practice',
      rating: 4.7,
      reviews: 203,
      experience: '10 years',
      education: 'Johns Hopkins',
      avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Tomorrow', 'Wed', 'Thu']
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Neurologist',
      rating: 4.9,
      reviews: 156,
      experience: '18 years',
      education: 'Mayo Clinic',
      avatar: 'https://images.pexels.com/photos/5452267/pexels-photo-5452267.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Today', 'Wed', 'Fri']
    },
    {
      id: '5',
      name: 'Dr. Lisa Thompson',
      specialty: 'Psychiatrist',
      rating: 4.8,
      reviews: 94,
      experience: '14 years',
      education: 'Yale Medical School',
      avatar: 'https://images.pexels.com/photos/5452258/pexels-photo-5452258.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Tomorrow', 'Thu', 'Sat']
    },
    {
      id: '6',
      name: 'Dr. Robert Martinez',
      specialty: 'Orthopedist',
      rating: 4.6,
      reviews: 78,
      experience: '11 years',
      education: 'UCLA Medical Center',
      avatar: 'https://images.pexels.com/photos/5452277/pexels-photo-5452277.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: ['Today', 'Wed', 'Thu']
    }
  ];

  const specialties = ['All', 'Cardiologist', 'Physical Therapist', 'General Practice', 'Neurologist', 'Psychiatrist', 'Orthopedist'];

  const filteredDoctors = selectedSpecialty === 'All' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialty === selectedSpecialty);

  return (
    <section id="doctors" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Healthcare Professional</h2>
          <p className="text-lg text-gray-600">Connect with certified doctors and specialists</p>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select 
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-500">
            {filteredDoctors.length} doctors available
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={doctor.avatar} 
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">{doctor.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({doctor.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{doctor.experience}</span> experience
                </div>
                <div className="text-sm text-gray-600">{doctor.education}</div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Available:</div>
                <div className="flex flex-wrap gap-2">
                  {doctor.availability.map((day, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  <Video className="h-4 w-4" />
                  <span className="text-sm">Video Call</span>
                </button>
                <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Schedule</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorProfiles;