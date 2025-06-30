import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Send } from 'lucide-react';

interface ContactFormProps {
  onSubmit?: (contactData: any) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactMethod: 'email' as 'email' | 'phone'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onSubmit?.(formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      contactMethod: 'email'
    });
  };

  const isFormValid = formData.name && formData.message && 
    (formData.contactMethod === 'email' ? formData.email : formData.phone);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
        <p className="text-gray-600">Get in touch with our support team</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact Method
            </label>
            <select
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address {formData.contactMethod === 'email' && '*'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required={formData.contactMethod === 'email'}
                disabled={formData.contactMethod === 'phone'}
                className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formData.contactMethod === 'phone' ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number {formData.contactMethod === 'phone' && '*'}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required={formData.contactMethod === 'phone'}
                disabled={formData.contactMethod === 'email'}
                className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formData.contactMethod === 'email' ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="appointment">Appointment Question</option>
            <option value="technical">Technical Support</option>
            <option value="billing">Billing Question</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us how we can help you..."
            />
          </div>
        </div>

        {/* Response Time Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Response Time</h4>
          <div className="space-y-1 text-sm text-blue-800">
            <p>• Email: Within 24 hours</p>
            <p>• Phone: Within 2 hours during business hours</p>
            <p>• Emergency: Call 911 for medical emergencies</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>

      {/* Alternative Contact Methods */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Other Ways to Reach Us</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Phone className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900">Call Us</h5>
            <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
            <p className="text-xs text-gray-500">Mon-Fri 9AM-5PM</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Mail className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900">Email Us</h5>
            <p className="text-sm text-gray-600">support@telecare.com</p>
            <p className="text-xs text-gray-500">24/7 Support</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <MessageSquare className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900">Live Chat</h5>
            <p className="text-sm text-gray-600">Available Now</p>
            <p className="text-xs text-gray-500">Instant Response</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm; 