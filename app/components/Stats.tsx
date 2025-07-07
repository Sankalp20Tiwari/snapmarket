
import { stats } from '@/data/stats';
import React from 'react';


const Stats = () => {
  

  return (
    <section className="py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="fade-up text-4xl md:text-5xl font-bold mb-6">
            Growing <span className="teal-text">Every Day</span>
          </h2>
          <p className="fade-up text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of creators and buyers who trust SnapMarket for their visual content needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="scale-up text-center group"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110 transform">
                  <stat.icon className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="mb-2">
                <span className="text-5xl font-bold teal-text">{stat.value}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {stat.label}
              </h3>
              <p className="text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
