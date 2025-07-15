'use client'

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form submitted:', formData);

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">


      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Let's get<br />
                <span className="text-teal-400">in touch</span>
              </h1>
              <div className="w-16 h-1 bg-teal-400 mb-6"></div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Great! We're excited to hear from you and<br />
                let's start something special together.<br />
                Contact us for any inquiry.
              </p>
            </div>

            <div className=" rounded-xl p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-medium">+01 234-567-890</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10   flex items-center justify-center">
                    <Mail className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">hello@snapmarket.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10  flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Address</p>
                    <p className="text-white font-medium">123 Market Street, Digital City,<br />DC 12345, USA</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="#" 
                  className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors"
                >
                  See on Google Map
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>


          <div className=" rounded-xl p-8 items-center justify-center my-auto">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">
                Don't be afraid to<br />
                say hello with us!
            </h3>
            <h2 className="text-2xl font-bold mb-8">Contact</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your interest in SnapMarket..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-teal-500 hover:bg-teal-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send to us</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}