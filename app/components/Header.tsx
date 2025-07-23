'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Camera, LayoutDashboard, LogOut, Menu, ShoppingBag, Upload, User, X } from 'lucide-react';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';


const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isContactPage = pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.nav-item',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2 }
    );
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Browse', href: '#browse' },
    { name: 'Sell', href: '#sell' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '/contact' }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-transparent backdrop-blur-2xl border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
          <div className="flex items-center space-x-2 nav-item">
            <Camera className="h-8 w-8 text-teal-600" />
            <span className="text-2xl font-bold text-white">SnapMarket</span>
          </div>
          </Link>

          {/* Desktop Navigation */}
          { !isAuthPage && !isContactPage && !session && <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-item text-foreground hover:text-primary transition-colors duration-200 font-medium text-teal-600"
              >
                {item.name}
              </a>
            ))}
          </div>}

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session?.user ? (
              <>
                <div className="flex items-center space-x-2 text-foreground">
                  <User className="h-5 w-5" />
                  <span>{session.user.email?.split('@')[0]}</span>
                </div>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="nav-item">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                {session.user.role === 'admin' && (
                  <Link href="/upload">
                    <Button variant="ghost" size="sm" className="nav-item">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </Link>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleSignOut}
                  className="nav-item"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="nav-item">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="nav-item glow-effect">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="nav-item">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-md border border-border rounded-lg mt-2 p-4 space-y-4">
            {!isAuthPage && !isContactPage && !session && navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-foreground hover:text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              {session?.user ? (
                <>
                  <div className="flex items-center space-x-2 text-foreground">
                    <User className="h-5 w-5" />
                    <span>{session.user.email?.split('@')[0]}</span>
                  </div>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  {session.user.role === 'admin' && (
                    <Link href="/upload" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full glow-effect">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
