import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, CheckCircle, Clock, Target, BarChart3 } from 'lucide-react';
import type { Exercise, ProgressData } from '../types';
import doctorsData from '../data/doctors.json';

const Rehabilitation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('exercises');
  const navigate = useNavigate();

  // Find an orthopedic surgeon for rehabilitation sessions
  const rehabilitationDoctor = doctorsData.doctors.find(doctor => 
    doctor.specialty === 'Orthopedic Surgeon'
  ) || doctorsData.doctors[3]; // Fallback to Dr. James Kiprop Cheruiyot

  const exercises: Exercise[] = [
    { id: '1', name: 'Shoulder Rolls', duration: '5 min', sets: 3, reps: 10, completed: true, difficulty: 'easy' },
    { id: '2', name: 'Leg Extensions', duration: '8 min', sets: 2, reps: 15, completed: true, difficulty: 'medium' },
    { id: '3', name: 'Core Strengthening', duration: '12 min', sets: 3, reps: 12, completed: false, difficulty: 'medium' },
    { id: '4', name: 'Balance Training', duration: '10 min', sets: 2, reps: 8, completed: false, difficulty: 'hard' },
    { id: '5', name: 'Range of Motion', duration: '6 min', sets: 1, reps: 20, completed: false, difficulty: 'easy' },
  ];

  const progressData: ProgressData[] = [
    { week: 'Week 1', completed: 12, total: 15 },
    { week: 'Week 2', completed: 18, total: 20 },
    { week: 'Week 3', completed: 22, total: 25 },
    { week: 'Week 4', completed: 19, total: 25 },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleJoinSession = () => {
    navigate(`/booking?doctor=${rehabilitationDoctor.id}`);
  };

  const completedExercises = exercises.filter(ex => ex.completed).length;
  const totalExercises = exercises.length;
  const completionRate = Math.round((completedExercises / totalExercises) * 100);

  return (
    <section id="rehabilitation" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Rehabilitation Program</h2>
          <p className="text-lg text-gray-600">Track your recovery journey with personalized exercises</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'exercises' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Today's Exercises
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'progress' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Progress Tracking
            </button>
          </div>
        </div>

        {activeTab === 'exercises' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Exercise List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Today's Program</h3>
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">
                      {completedExercises}/{totalExercises} completed
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {exercises.map((exercise) => (
                    <div 
                      key={exercise.id} 
                      className={`border rounded-xl p-4 transition-colors ${
                        exercise.completed 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            exercise.completed 
                              ? 'bg-green-600' 
                              : 'bg-gray-200 hover:bg-blue-600 cursor-pointer group'
                          }`}>
                            {exercise.completed ? (
                              <CheckCircle className="h-5 w-5 text-white" />
                            ) : (
                              <Play className="h-4 w-4 text-gray-600 group-hover:text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {exercise.duration}
                              </span>
                              <span>{exercise.sets} sets × {exercise.reps} reps</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                            {exercise.difficulty}
                          </span>
                          {!exercise.completed && (
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                              Start
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600">{completionRate}%</div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 text-center">
                  {completedExercises} of {totalExercises} exercises completed
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-medium text-gray-900">5 sessions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Time</span>
                    <span className="font-medium text-gray-900">2h 45m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Streak</span>
                    <span className="font-medium text-green-600">12 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Session</h3>
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-900">{rehabilitationDoctor.specialty}</div>
                  <div className="text-sm text-gray-600">with {rehabilitationDoctor.name}</div>
                  <div className="text-sm text-blue-600 mt-2">Tomorrow at 10:30 AM</div>
                  <button 
                    onClick={handleJoinSession}
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Join Video Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Weekly Progress</h3>
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {progressData.map((week, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-3">
                    <div className="h-32 flex items-end justify-center">
                      <div 
                        className="bg-blue-600 rounded-t w-8 transition-all duration-500"
                        style={{ height: `${(week.completed / week.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{week.week}</div>
                  <div className="text-xs text-gray-600">{week.completed}/{week.total}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-gray-600">Average Completion</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">71</div>
                <div className="text-sm text-gray-600">Total Sessions</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">28</div>
                <div className="text-sm text-gray-600">Days Active</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rehabilitation;