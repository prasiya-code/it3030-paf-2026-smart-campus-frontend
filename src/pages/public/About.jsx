import React from 'react';

const About = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            About Opsora
          </h1>
          <p className="text-lg text-slate-600">
            Building the future of campus management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Opsora was created to simplify campus operations and create a seamless 
              experience for students, faculty, and staff. We believe that technology 
              should enhance the campus experience, not complicate it.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our platform brings together event management, resource booking, 
              lost and found, and transportation services in one intuitive interface.
            </p>
          </div>
          <div className="bg-primary-50 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-slate-900">Smart Campus</h3>
            <p className="text-slate-600">Operations Made Simple</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
            <p className="text-slate-600">Active Users</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
            <p className="text-slate-600">Events Managed</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">99%</div>
            <p className="text-slate-600">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
