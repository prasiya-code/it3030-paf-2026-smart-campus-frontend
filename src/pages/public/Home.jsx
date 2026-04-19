import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const Home = () => {
  const features = [
    {
      title: 'Event Management',
      description: 'Discover and participate in campus events, workshops, and activities.',
      icon: '📅',
    },
    {
      title: 'Resource Booking',
      description: 'Reserve classrooms, labs, and equipment with ease.',
      icon: '📚',
    },
    {
      title: 'Lost & Found',
      description: 'Report and find lost items on campus quickly.',
      icon: '🔍',
    },
    {
      title: 'Transportation',
      description: 'Track campus shuttle services and plan your commute.',
      icon: '🚌',
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Welcome to <span className="text-primary-600">Opsora</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Smart Campus Operations System - Streamlining campus management 
              for students, faculty, and administrators.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Button variant="secondary" size="lg">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Opsora brings together all campus services in one powerful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} variant="hover" className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-600 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Join thousands of students and faculty using Opsora today.
            </p>
            <Link to="/signup">
              <Button variant="secondary" size="lg">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
