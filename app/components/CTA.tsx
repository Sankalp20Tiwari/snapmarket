
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-up">
          <Sparkles className="h-16 w-16 text-primary mx-auto mb-8" />
        </div>
        
        <h2 className="fade-up text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Ready to Transform Your
          <br />
          <span className="teal-text">Visual Content?</span>
        </h2>
        
        <p className="fade-up text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of creators and businesses who have discovered the power of premium visual content. 
          Start your journey today with our exclusive collection.
        </p>
        
        <div className="fade-up flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button size="lg" className="glow-effect group text-lg px-10 py-4">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" size="lg" className="text-lg px-10 py-4 border-primary/30 hover:border-primary">
            Browse Gallery
          </Button>
        </div>
        
        <div className="fade-up mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
