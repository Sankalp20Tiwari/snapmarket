'use client'

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Download, Eye } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo('.hero-buttons',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo('.hero-stats',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.2"
      );

      // Floating animation for hero images
      gsap.to('.floating-image', {
        y: "-20px",
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Parallax effect
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="parallax-bg absolute inset-0 premium-gradient opacity-50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Your <span className="gradient-text">Premium</span>
            <br />
            Image Marketplace
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover, buy, and sell stunning high-quality images from talented creators around the world. 
            Join the most exclusive photography marketplace.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="glow-effect group text-lg px-8 py-4">
              Start Exploring
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary/30 hover:border-primary">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="hero-stats text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-primary mr-2" />
                <span className="text-3xl font-bold gradient-text">1M+</span>
              </div>
              <p className="text-muted-foreground">Premium Images</p>
            </div>
            <div className="hero-stats text-center">
              <div className="flex items-center justify-center mb-2">
                <Download className="h-6 w-6 text-primary mr-2" />
                <span className="text-3xl font-bold gradient-text">500K+</span>
              </div>
              <p className="text-muted-foreground">Downloads</p>
            </div>
            <div className="hero-stats text-center">
              <div className="flex items-center justify-center mb-2">
                <Eye className="h-6 w-6 text-primary mr-2" />
                <span className="text-3xl font-bold gradient-text">50K+</span>
              </div>
              <p className="text-muted-foreground">Creators</p>
            </div>
          </div>
        </div>

        {/* Floating images showcase */}
        <div ref={imageRef} className="relative mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="floating-image">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop"
                alt="Premium Image 1"
                className="rounded-xl image-glow w-full h-48 object-cover"
              />
            </div>
            <div className="floating-image mt-8">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop"
                alt="Premium Image 2"
                className="rounded-xl image-glow w-full h-48 object-cover"
              />
            </div>
            <div className="floating-image">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop"
                alt="Premium Image 3"
                className="rounded-xl image-glow w-full h-48 object-cover"
              />
            </div>
            <div className="floating-image mt-8">
              <img 
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=600&fit=crop"
                alt="Premium Image 4"
                className="rounded-xl image-glow w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;