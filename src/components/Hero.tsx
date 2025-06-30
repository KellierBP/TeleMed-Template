import React from 'react';
import { Video, Calendar, Activity, Shield, Clock, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Health,
                <span className="text-blue-600"> Anywhere</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with certified healthcare professionals and track your rehabilitation progress 
                from the comfort of your home. Quality care made accessible.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Book Consultation
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-gray-600 mt-1">Certified Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50k+</div>
                <div className="text-sm text-gray-600 mt-1">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600 mt-1">Support</div>
              </div>
            </div>
          </div>

          {/* Right content - Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Consultations</h3>
              <p className="text-gray-600 text-sm">Secure HD video calls with healthcare professionals</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Scheduling</h3>
              <p className="text-gray-600 text-sm">Book appointments that fit your schedule</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">Monitor your rehabilitation journey</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">HIPAA compliant with end-to-end encryption</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;