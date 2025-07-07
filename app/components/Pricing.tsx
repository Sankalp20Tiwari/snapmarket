
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check} from 'lucide-react';
import { plans } from '@/data/pricing';

const Pricing = () => {
  

  return (
    <section id="pricing" className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="fade-up text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="teal-text">Perfect Plan</span>
          </h2>
          <p className="fade-up text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible pricing options designed to grow with your needs. Start free and upgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={` relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'bg-card border-primary shadow-lg shadow-primary h-full'
                  : 'bg-card border-border hover:border-primary/50 hover:shadow-primary/10 mt-16 '
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 scale-150">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="mb-4 flex justify-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    plan.popular ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <plan.icon className={`h-8 w-8 ${
                      plan.popular ? 'text-primary' : 'text-primary/80'
                    }`} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold teal-text">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${plan.popular ? 'glow-effect' : ''}`}
                variant={plan.buttonVariant}
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All plans include SSL encryption, 99.9% uptime, and our satisfaction guarantee.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
