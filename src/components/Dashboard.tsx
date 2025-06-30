import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Activity, Heart, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import type { HealthMetric, Appointment } from '../types';
import { getRelativeDate, isUpcoming } from '../utils/dateUtils';
import doctorsData from '../data/doctors.json';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const healthMetrics: HealthMetric[] = [
    { id: '1', name: 'Blood Pressure', value: '120/80', unit: 'mmHg', trend: 'stable', lastUpdated: '2 hours ago' },
    { id: '2', name: 'Heart Rate', value: '72', unit: 'bpm', trend: 'down', lastUpdated: '1 hour ago' },
    { id: '3', name: 'Temperature', value: '98.6', unit: '°F', trend: 'stable', lastUpdated: '30 mins ago' },
    { id: '4', name: 'Weight', value: '165', unit: 'lbs', trend: 'down', lastUpdated: '1 day ago' },
  ];

  // Use 3 doctors from doctors.json for upcoming appointments
  const selectedDoctors = doctorsData.doctors.slice(0, 3);
  
  const upcomingAppointments: Appointment[] = [
    { 
      id: '1', 
      doctorName: selectedDoctors[0].name, 
      specialty: selectedDoctors[0].specialty, 
      date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      time: '2:00 PM', 
      type: 'video', 
      status: 'upcoming' 
    },
    { 
      id: '2', 
      doctorName: selectedDoctors[1].name, 
      specialty: selectedDoctors[1].specialty, 
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // tomorrow
      time: '10:30 AM', 
      type: 'video', 
      status: 'upcoming' 
    },
    { 
      id: '3', 
      doctorName: selectedDoctors[2].name, 
      specialty: selectedDoctors[2].specialty, 
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      time: '3:15 PM', 
      type: 'in-person', 
      status: 'upcoming' 
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-blue-500"></div>;
    }
  };

  const handleScheduleNew = () => {
    navigate('/doctors');
  };

  const handleViewAllRecords = () => {
    navigate('/medical-records');
  };

  return (
    <section id="dashboard" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Patient Dashboard</h2>
          <p className="text-lg text-gray-600">Monitor your health metrics and manage your care</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Health Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Health Metrics</h3>
                <button 
                  onClick={handleViewAllRecords}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {healthMetrics.map((metric) => (
                  <div key={metric.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">{metric.name}</span>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                      <span className="text-sm text-gray-500">{metric.unit}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Updated {metric.lastUpdated}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Exercise Completion</span>
                    <span className="font-medium text-gray-900">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Medication Adherence</span>
                    <span className="font-medium text-gray-900">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Appointment Attendance</span>
                    <span className="font-medium text-gray-900">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming</h3>
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border-l-4 border-blue-600 pl-4 py-2">
                    <div className="font-medium text-gray-900">{appointment.doctorName}</div>
                    <div className="text-sm text-gray-600">{appointment.specialty}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {getRelativeDate(appointment.date)} at {appointment.time}
                    </div>
                    <div className="flex items-center mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.type === 'video' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {appointment.type === 'video' ? 'Video Call' : 'In-Person'}
                      </span>
                      {isUpcoming(appointment.date) && (
                        <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Soon
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={handleScheduleNew}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule New
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-gray-700">Log Symptoms</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Activity className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Update Vitals</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">Emergency Contact</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;