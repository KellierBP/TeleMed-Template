import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Clock, User, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { AppointmentBooking, ContactForm } from '../components/booking';
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

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'appointment' | 'contact'>('appointment');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  // Set initial tab based on URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab') as 'appointment' | 'contact';
    if (tab && (tab === 'appointment' || tab === 'contact')) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Set selected doctor based on URL parameter
  useEffect(() => {
    const doctorId = searchParams.get('doctor');
    if (doctorId) {
      const doctor = doctorsData.doctors.find(d => d.id === doctorId);
      if (doctor) {
        setSelectedDoctor(doctor);
      }
    } else {
      // Default to first doctor if none selected
      setSelectedDoctor(doctorsData.doctors[0]);
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'appointment' | 'contact') => {
    setActiveTab(tab);
    // Update URL without page reload
    navigate(`/booking?tab=${tab}${selectedDoctor ? `&doctor=${selectedDoctor.id}` : ''}`, { replace: true });
  };

  const handleBookAppointment = (appointment: any) => {
    console.log('Appointment booked:', appointment);
    alert('Appointment booked successfully! Check your email for confirmation.');
  };

  const handleContactSubmit = (contactData: any) => {
    console.log('Contact form submitted:', contactData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  };

  const handleDoctorChange = () => {
    navigate('/doctors');
  };

  if (!selectedDoctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Book Appointment</h1>
              <p className="text-sm text-gray-600">Schedule your consultation or get in touch</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  <button
                    onClick={() => handleTabChange('appointment')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'appointment'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Book Appointment</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleTabChange('contact')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'contact'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact Us</span>
                    </div>
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'appointment' ? (
                  <AppointmentBooking
                    doctorId={selectedDoctor.id}
                    doctorName={selectedDoctor.name}
                    specialty={selectedDoctor.specialty}
                    onBook={handleBookAppointment}
                  />
                ) : (
                  <ContactForm onSubmit={handleContactSubmit} />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Doctor Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Doctor</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{selectedDoctor.name}</h4>
                  <p className="text-sm text-blue-600">{selectedDoctor.specialty}</p>
                  <p className="text-xs text-gray-500">{selectedDoctor.subspecialty}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">
                      {selectedDoctor.rating} ({selectedDoctor.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleDoctorChange}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Change Doctor
              </button>
            </div>

            {/* Doctor Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Doctor Details</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{selectedDoctor.hospital}</p>
                    <p className="text-xs text-gray-600">{selectedDoctor.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{selectedDoctor.experience} experience</p>
                    <p className="text-xs text-gray-600">Available: {selectedDoctor.availability.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-green-600">KES {selectedDoctor.consultationFee.toLocaleString()}</span>
                  <span className="text-xs text-gray-600">consultation fee</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {selectedDoctor.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Us</p>
                    <p className="text-sm text-gray-600">support@telecare.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Live Chat</p>
                    <p className="text-sm text-gray-600">Available now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking; 