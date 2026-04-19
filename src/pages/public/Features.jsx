import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Features = () => {
  const features = [
    {
      title: 'Event Management',
      description: 'Create, discover, and manage campus events. From academic seminars to social gatherings, keep track of everything happening on campus.',
      icon: '📅',
      highlights: ['Event calendar', 'RSVP system', 'Notifications', 'Venue booking'],
    },
    {
      title: 'Resource Booking',
      description: 'Reserve classrooms, laboratories, sports facilities, and equipment. Check availability in real-time and manage your bookings.',
      icon: '📚',
      highlights: ['Real-time availability', 'Instant booking', 'Equipment catalog', 'Usage reports'],
    },
    {
      title: 'Lost & Found',
      description: 'Report lost items and browse found items. Connect with the campus community to recover your belongings quickly.',
      icon: '🔍',
      highlights: ['Item reporting', 'Photo uploads', 'Claim verification', 'Campus alerts'],
    },
    {
      title: 'Transportation',
      description: 'Track campus shuttle services, view schedules, and plan your commute. Never miss your ride with real-time updates.',
      icon: '🚌',
      highlights: ['Live tracking', 'Route maps', 'Schedule viewer', 'Delay alerts'],
    },
    {
      title: 'Notifications',
      description: 'Stay informed with personalized notifications. Get updates about events, bookings, lost items, and transport changes.',
      icon: '🔔',
      highlights: ['Push notifications', 'Email alerts', 'Custom preferences', 'Smart filtering'],
    },
    {
      title: 'User Profiles',
      description: 'Manage your campus identity. Update your information, view your activity history, and customize your experience.',
      icon: '👤',
      highlights: ['Profile management', 'Activity history', 'Preference settings', 'Privacy controls'],
    },
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            Features
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to navigate campus life efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} variant="elevated" className="flex flex-col">
              <div className="p-6 flex-1">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to experience Opsora?
          </h2>
          <Link to="/signup">
            <Button size="lg">Get Started Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
