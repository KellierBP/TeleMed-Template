import { 
  format, 
  isToday, 
  isTomorrow, 
  isYesterday, 
  addDays,  
  startOfDay, 
  endOfDay,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  parseISO
} from 'date-fns';

// Format date for display
export const formatDate = (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

// Format time for display
export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'h:mm a');
};

// Format date and time together
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy h:mm a');
};

// Get relative date string (Today, Tomorrow, Yesterday, or formatted date)
export const getRelativeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) return 'Today';
  if (isTomorrow(dateObj)) return 'Tomorrow';
  if (isYesterday(dateObj)) return 'Yesterday';
  
  return formatDate(dateObj);
};

// Get relative time string (e.g., "2 hours ago", "in 3 days")
export const getRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  
  const diffMinutes = differenceInMinutes(now, dateObj);
  const diffHours = differenceInHours(now, dateObj);
  const diffDays = differenceInDays(now, dateObj);
  
  if (Math.abs(diffMinutes) < 60) {
    return `${Math.abs(diffMinutes)} minute${Math.abs(diffMinutes) !== 1 ? 's' : ''} ${diffMinutes > 0 ? 'ago' : 'from now'}`;
  }
  
  if (Math.abs(diffHours) < 24) {
    return `${Math.abs(diffHours)} hour${Math.abs(diffHours) !== 1 ? 's' : ''} ${diffHours > 0 ? 'ago' : 'from now'}`;
  }
  
  if (Math.abs(diffDays) < 7) {
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ${diffDays > 0 ? 'ago' : 'from now'}`;
  }
  
  return formatDate(dateObj);
};

// Check if appointment is upcoming (within next 24 hours)
export const isUpcoming = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  const tomorrow = addDays(now, 1);
  
  return dateObj >= now && dateObj <= tomorrow;
};

// Check if appointment is overdue
export const isOverdue = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateObj < new Date();
};

// Get available time slots for appointments (9 AM to 5 PM, 30-minute intervals)
export const getAvailableTimeSlots = (date: Date): Date[] => {
  const slots: Date[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slot = new Date(date);
      slot.setHours(hour, minute, 0, 0);
      slots.push(slot);
    }
  }
  
  return slots;
};

// Format appointment duration
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
};

// Get week range for calendar views
export const getWeekRange = (date: Date): { start: Date; end: Date } => {
  const start = startOfDay(date);
  const end = endOfDay(addDays(start, 6));
  return { start, end };
};

// Check if date is in the past
export const isPast = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateObj < new Date();
};

// Check if date is in the future
export const isFuture = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateObj > new Date();
}; 