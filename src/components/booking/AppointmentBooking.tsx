import React, { useState } from 'react';
import { Calendar, Clock, User, Video, MapPin } from 'lucide-react';
import DatePicker from '../ui/DatePicker';
import { formatDateTime, getAvailableTimeSlots, formatDuration } from '../../utils/dateUtils';

interface AppointmentBookingProps {
  doctorId?: string;
  doctorName?: string;
  specialty?: string;
  onBook?: (appointment: any) => void;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  doctorId,
  doctorName = 'Dr. Sarah Johnson',
  specialty = 'Cardiologist',
  onBook
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [appointmentType, setAppointmentType] = useState<'video' | 'in-person'>('video');
  const [notes, setNotes] = useState('');

  const availableTimeSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : [];

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      const appointment = {
        id: Date.now().toString(),
        doctorId,
        doctorName,
        specialty,
        date: selectedTime.toISOString(),
        type: appointmentType,
        notes,
        status: 'upcoming' as const
      };
      
      onBook?.(appointment);
      // Reset form
      setSelectedDate(null);
      setSelectedTime(null);
      setNotes('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Book Appointment</h3>
        <p className="text-gray-600">Schedule your consultation</p>
      </div>

      {/* Doctor Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{doctorName}</h4>
            <p className="text-sm text-gray-600">{specialty}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholder="Choose appointment date"
            minDate={new Date()}
            className="w-full"
          />
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
              {availableTimeSlots.map((slot) => (
                <button
                  key={slot.toISOString()}
                  type="button"
                  onClick={() => handleTimeSelect(slot)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    selectedTime?.getTime() === slot.getTime()
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {slot.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Appointment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Appointment Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAppointmentType('video')}
              className={`p-3 rounded-lg border transition-colors flex items-center space-x-2 ${
                appointmentType === 'video'
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <Video className="h-4 w-4" />
              <span>Video Call</span>
            </button>
            <button
              type="button"
              onClick={() => setAppointmentType('in-person')}
              className={`p-3 rounded-lg border transition-colors flex items-center space-x-2 ${
                appointmentType === 'in-person'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>In-Person</span>
            </button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any specific concerns or questions..."
          />
        </div>

        {/* Summary */}
        {selectedDate && selectedTime && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Appointment Summary</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDateTime(selectedTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Duration: {formatDuration(30)}</span>
              </div>
              <div className="flex items-center space-x-2">
                {appointmentType === 'video' ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                <span>{appointmentType === 'video' ? 'Video Consultation' : 'In-Person Visit'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedDate || !selectedTime}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentBooking; 