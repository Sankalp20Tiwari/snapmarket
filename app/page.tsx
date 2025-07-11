'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import Features from './components/Features';
import ImageShowcase from './components/ImageShowcase';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered animations
      gsap.utils.toArray('.fade-up').forEach((element) => {
        gsap.fromTo(element as Element, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element as Element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.utils.toArray('.fade-in').forEach((element) => {
        gsap.fromTo(element as Element,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element as Element,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.utils.toArray('.scale-up').forEach((element) => {
        gsap.fromTo(element as Element,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: element as Element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">
      <Hero />
      <Features />
      <ImageShowcase />
      <Stats />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;











