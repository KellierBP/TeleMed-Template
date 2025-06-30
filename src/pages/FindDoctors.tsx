import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Clock, Phone, Calendar, Heart } from 'lucide-react';
import doctorsData from '../data/doctors.json';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subspecialty: string;
  rating: number;
  reviews: number;
  experience: string;
  education: string;
  languages: string[];
  avatar: string;
  availability: string[];
  consultationFee: number;
  location: string;
  hospital: string;
  about: string;
  services: string[];
  certifications: string[];
}

const FindDoctors: React.FC = () => {
  const navigate = useNavigate();
  const [doctors] = useState<Doctor[]>(doctorsData.doctors);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctorsData.doctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique specialties and locations
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  const locations = [...new Set(doctors.map(doctor => doctor.location))];

  useEffect(() => {
    let filtered = doctors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by specialty
    if (selectedSpecialty) {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
    }

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter(doctor => doctor.location === selectedLocation);
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'fee':
          return a.consultationFee - b.consultationFee;
        default:
          return 0;
      }
    });

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, selectedSpecialty, selectedLocation, sortBy]);

  const handleBookAppointment = (doctor: Doctor) => {
    navigate(`/booking?doctor=${doctor.id}`);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
            <p className="text-lg text-gray-600">Connect with experienced healthcare professionals</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by doctor name, specialty, or hospital..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'experience' | 'fee')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="experience">Sort by Experience</option>
              <option value="fee">Sort by Fee</option>
            </select>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Doctor Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{doctor.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
                    <p className="text-xs text-gray-500">{doctor.subspecialty}</p>
                    {renderStars(doctor.rating)}
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{doctor.hospital}, {doctor.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{doctor.experience} experience</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="font-medium text-green-600">KES {doctor.consultationFee.toLocaleString()}</span>
                  <span>consultation fee</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {doctor.languages.slice(0, 2).map((language, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {language}
                    </span>
                  ))}
                  {doctor.languages.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{doctor.languages.length - 2} more
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">{doctor.about}</p>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Book Appointment</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctors; 