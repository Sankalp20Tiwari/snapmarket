import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Download, Eye, Star } from 'lucide-react';
import { showcaseImages } from '@/data/showcaseImage';

const ImageShowcase = () => {
  

  return (
    <section id="browse" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="fade-up text-4xl md:text-5xl font-bold mb-6">
            Discover <span className="gradient-text">Premium</span> Images
          </h2>
          <p className="fade-up text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our curated collection of high-quality images from talented creators worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {showcaseImages.slice(0, 6).map((image) => (
            <div
              key={image.id}
              className="scale-up group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay buttons */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <Button size="sm" className="glow-effect">
                      <Download className="h-4 w-4 mr-1" />
                      Buy
                    </Button>
                    <Button size="sm" variant="outline" className="bg-black/20 backdrop-blur-sm border-white/20">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {image.title}
                </h3>
                <p className="text-muted-foreground mb-3">by {image.creator}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {image.downloads}
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {image.likes}
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-primary">{image.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="glow-effect">
            View All Images
            <Eye className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImageShowcase;