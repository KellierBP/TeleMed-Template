import React from 'react';
import DatePickerLib from 'react-datepicker';
import { Calendar } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  showTimeSelect?: boolean;
  timeIntervals?: number;
  className?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  placeholder = "Select date",
  minDate,
  maxDate,
  showTimeSelect = false,
  timeIntervals = 15,
  className = "",
  disabled = false
}) => {
  return (
    <div className={`relative ${className}`}>
      <DatePickerLib
        selected={selected}
        onChange={onChange}
        showTimeSelect={showTimeSelect}
        timeIntervals={timeIntervals}
        timeFormat="HH:mm"
        dateFormat={showTimeSelect ? "MMM dd, yyyy h:mm aa" : "MMM dd, yyyy"}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        placeholderText={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        popperClassName="z-50"
        customInput={
          <div className="relative">
            <input
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder={placeholder}
              disabled={disabled}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        }
      />
    </div>
  );
};

export default DatePicker; 