import React, { useState } from 'react';
import { 
  FileText, 
  Activity, 
  Pill, 
  TestTube, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Download,
  Filter,
  Search,
  Heart,
  Thermometer,
  Scale,
  Droplets
} from 'lucide-react';

interface VitalSign {
  id: string;
  name: string;
  value: string;
  unit: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
  normalRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'discontinued' | 'completed';
  prescribedBy: string;
  instructions: string;
}

interface LabResult {
  id: string;
  testName: string;
  result: string;
  unit: string;
  date: string;
  normalRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  lab: string;
}

interface MedicalHistory {
  id: string;
  condition: string;
  diagnosisDate: string;
  status: 'active' | 'resolved' | 'chronic';
  doctor: string;
  notes: string;
  treatments: string[];
}

const MedicalRecords: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vitals' | 'medications' | 'labs' | 'history'>('vitals');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock vital signs data
  const vitalSigns: VitalSign[] = [
    {
      id: '1',
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      date: '2024-01-15',
      trend: 'stable',
      normalRange: '90/60 - 140/90',
      status: 'normal'
    },
    {
      id: '2',
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      date: '2024-01-15',
      trend: 'down',
      normalRange: '60-100',
      status: 'normal'
    },
    {
      id: '3',
      name: 'Temperature',
      value: '98.6',
      unit: '°F',
      date: '2024-01-15',
      trend: 'stable',
      normalRange: '97.8-99.0',
      status: 'normal'
    },
    {
      id: '4',
      name: 'Weight',
      value: '165',
      unit: 'lbs',
      date: '2024-01-15',
      trend: 'down',
      normalRange: '140-180',
      status: 'normal'
    },
    {
      id: '5',
      name: 'Blood Oxygen',
      value: '98',
      unit: '%',
      date: '2024-01-15',
      trend: 'stable',
      normalRange: '95-100',
      status: 'normal'
    },
    {
      id: '6',
      name: 'Blood Glucose',
      value: '95',
      unit: 'mg/dL',
      date: '2024-01-15',
      trend: 'stable',
      normalRange: '70-140',
      status: 'normal'
    }
  ];

  // Mock medications data
  const medications: Medication[] = [
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      startDate: '2023-06-15',
      status: 'active',
      prescribedBy: 'Dr. Sarah Wanjiku Kamau',
      instructions: 'Take in the morning with or without food'
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      startDate: '2023-08-20',
      status: 'active',
      prescribedBy: 'Dr. Anne Wambui Kariuki',
      instructions: 'Take with meals to reduce stomach upset'
    },
    {
      id: '3',
      name: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      startDate: '2023-12-01',
      endDate: '2024-01-10',
      status: 'completed',
      prescribedBy: 'Dr. James Kiprop Cheruiyot',
      instructions: 'Take for pain relief, maximum 4 times per day'
    },
    {
      id: '4',
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      startDate: '2023-01-01',
      status: 'active',
      prescribedBy: 'Dr. Grace Akinyi Ochieng',
      instructions: 'Take with food for better absorption'
    }
  ];

  // Mock lab results data
  const labResults: LabResult[] = [
    {
      id: '1',
      testName: 'Complete Blood Count (CBC)',
      result: 'Normal',
      unit: '',
      date: '2024-01-10',
      normalRange: 'Normal range',
      status: 'normal',
      lab: 'Kenyatta National Hospital Lab'
    },
    {
      id: '2',
      testName: 'Hemoglobin A1c',
      result: '5.8',
      unit: '%',
      date: '2024-01-10',
      normalRange: '4.0-5.6',
      status: 'high',
      lab: 'Aga Khan University Hospital Lab'
    },
    {
      id: '3',
      testName: 'Cholesterol Panel',
      result: '180',
      unit: 'mg/dL',
      date: '2024-01-10',
      normalRange: '<200',
      status: 'normal',
      lab: 'Kenyatta National Hospital Lab'
    },
    {
      id: '4',
      testName: 'Creatinine',
      result: '0.9',
      unit: 'mg/dL',
      date: '2024-01-10',
      normalRange: '0.6-1.2',
      status: 'normal',
      lab: 'Aga Khan University Hospital Lab'
    },
    {
      id: '5',
      testName: 'Thyroid Stimulating Hormone',
      result: '2.1',
      unit: 'mIU/L',
      date: '2024-01-10',
      normalRange: '0.4-4.0',
      status: 'normal',
      lab: 'Kenyatta National Hospital Lab'
    }
  ];

  // Mock medical history data
  const medicalHistory: MedicalHistory[] = [
    {
      id: '1',
      condition: 'Hypertension',
      diagnosisDate: '2023-06-15',
      status: 'chronic',
      doctor: 'Dr. Sarah Wanjiku Kamau',
      notes: 'Essential hypertension, well-controlled with medication',
      treatments: ['Lisinopril 10mg daily', 'Lifestyle modifications', 'Regular monitoring']
    },
    {
      id: '2',
      condition: 'Type 2 Diabetes',
      diagnosisDate: '2023-08-20',
      status: 'chronic',
      doctor: 'Dr. Anne Wambui Kariuki',
      notes: 'Early stage diabetes, managed with diet and medication',
      treatments: ['Metformin 500mg twice daily', 'Dietary changes', 'Exercise program']
    },
    {
      id: '3',
      condition: 'Knee Injury',
      diagnosisDate: '2023-12-01',
      status: 'resolved',
      doctor: 'Dr. James Kiprop Cheruiyot',
      notes: 'Sports-related injury, fully recovered with physical therapy',
      treatments: ['Physical therapy', 'Rest and ice', 'Pain management']
    },
    {
      id: '4',
      condition: 'Vitamin D Deficiency',
      diagnosisDate: '2023-01-01',
      status: 'resolved',
      doctor: 'Dr. Grace Akinyi Ochieng',
      notes: 'Mild deficiency, corrected with supplementation',
      treatments: ['Vitamin D3 1000 IU daily', 'Increased sun exposure']
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <Minus className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'high':
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVitalIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'heart rate':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'temperature':
        return <Thermometer className="h-5 w-5 text-orange-500" />;
      case 'weight':
        return <Scale className="h-5 w-5 text-blue-500" />;
      case 'blood oxygen':
        return <Droplets className="h-5 w-5 text-cyan-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Records</h1>
                <p className="text-lg text-gray-600">Your complete health history and medical data</p>
              </div>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Export Records</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medical records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('vitals')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'vitals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Vital Signs</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('medications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'medications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Pill className="h-4 w-4" />
                  <span>Medications</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('labs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'labs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <TestTube className="h-4 w-4" />
                  <span>Lab Results</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Medical History</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'vitals' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vitalSigns.map((vital) => (
                  <div key={vital.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getVitalIcon(vital.name)}
                        <div>
                          <h3 className="font-medium text-gray-900">{vital.name}</h3>
                          <p className="text-sm text-gray-600">Normal: {vital.normalRange}</p>
                        </div>
                      </div>
                      {getTrendIcon(vital.trend)}
                    </div>
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">{vital.value}</span>
                      <span className="text-lg text-gray-500">{vital.unit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vital.status)}`}>
                        {vital.status}
                      </span>
                      <span className="text-sm text-gray-500">{vital.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'medications' && (
              <div className="space-y-6">
                {medications.map((medication) => (
                  <div key={medication.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{medication.name}</h3>
                        <p className="text-sm text-gray-600">{medication.dosage} • {medication.frequency}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        medication.status === 'active' ? 'bg-green-100 text-green-800' :
                        medication.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {medication.status}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Prescribed by: <span className="font-medium text-gray-900">{medication.prescribedBy}</span></p>
                        <p className="text-gray-600">Started: <span className="font-medium text-gray-900">{medication.startDate}</span></p>
                        {medication.endDate && (
                          <p className="text-gray-600">Ended: <span className="font-medium text-gray-900">{medication.endDate}</span></p>
                        )}
                      </div>
                      <div>
                        <p className="text-gray-600">Instructions:</p>
                        <p className="font-medium text-gray-900">{medication.instructions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'labs' && (
              <div className="space-y-6">
                {labResults.map((lab) => (
                  <div key={lab.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{lab.testName}</h3>
                        <p className="text-sm text-gray-600">{lab.lab}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lab.status)}`}>
                        {lab.status}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Result:</p>
                        <p className="font-medium text-gray-900">{lab.result} {lab.unit}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Normal Range:</p>
                        <p className="font-medium text-gray-900">{lab.normalRange}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date:</p>
                        <p className="font-medium text-gray-900">{lab.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                {medicalHistory.map((condition) => (
                  <div key={condition.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{condition.condition}</h3>
                        <p className="text-sm text-gray-600">Diagnosed: {condition.diagnosisDate}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        condition.status === 'active' ? 'bg-red-100 text-red-800' :
                        condition.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {condition.status}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-600">Doctor:</p>
                        <p className="font-medium text-gray-900">{condition.doctor}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Notes:</p>
                        <p className="font-medium text-gray-900">{condition.notes}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2">Treatments:</p>
                      <div className="flex flex-wrap gap-2">
                        {condition.treatments.map((treatment, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {treatment}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords; 