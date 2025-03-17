import React from 'react';
import { Navbar } from './Navbar';
import { SecondaryNav } from './SecondaryNav';
import { Hero } from './Hero';
import { AppBanner } from './AppBanner';
import { Services } from './Services';
import { Footer } from './Footer';

export function ParcelTracking() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SecondaryNav />
      <Hero />
      <AppBanner />
      <Services />
      <Footer />
    </div>
  );
}