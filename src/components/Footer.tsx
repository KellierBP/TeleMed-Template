import React from 'react';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">TeleCare</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Making quality healthcare accessible to everyone, anywhere. Your health journey, simplified and supported.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Video Consultations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rehabilitation Programs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Health Monitoring</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Prescription Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Emergency Care</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-TELECARE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@telecare.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Healthcare Blvd<br />Medical District, CA 90210</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-600 rounded-lg">
              <div className="text-sm font-medium">24/7 Emergency Support</div>
              <div className="text-xs text-blue-100 mt-1">Always here when you need us</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400">
            © 2025 TeleCare. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">HIPAA Compliant</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">SSL Secured</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">FDA Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;