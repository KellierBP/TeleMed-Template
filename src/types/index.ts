export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  education: string;
  avatar: string;
  availability: string[];
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'video' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface Exercise {
  id: string;
  name: string;
  duration: string;
  sets: number;
  reps: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ProgressData {
  week: string;
  completed: number;
  total: number;
}