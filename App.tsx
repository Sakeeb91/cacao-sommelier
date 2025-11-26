import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Origins from './components/Origins';
import Process from './components/Process';
import Shop from './components/Shop';
import Journal from './components/Journal';
import PairingAdvisor from './components/PairingAdvisor';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-cocoa-900 font-sans selection:bg-cocoa-900 selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <Hero />
          <BentoGrid />
          <Origins />
          <Process />
          <Shop />
          <PairingAdvisor />
          <Journal />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default App;