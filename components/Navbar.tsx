import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = ['Origins', 'Process', 'Shop', 'Journal'];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 px-6 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 bg-cocoa-900 rounded-lg flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <span className="font-serif italic font-bold">C</span>
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-cocoa-900">Cacao.</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-cocoa-900 opacity-80">
          {navLinks.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => scrollToSection(e, item.toLowerCase())}
              className="hover:text-cocoa-800 hover:opacity-100 transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button className="hidden md:block px-5 py-2.5 rounded-full border border-cocoa-900/10 hover:bg-cocoa-900 hover:text-white transition-all duration-300 text-sm font-medium text-cocoa-900">
          Cart (0)
        </button>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-2xl text-cocoa-900 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
        </button>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white rounded-2xl shadow-xl mt-4 p-6 flex flex-col gap-4 md:hidden animate-fade-in-up border border-cocoa-100">
            {navLinks.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className="text-lg font-serif text-cocoa-900 border-b border-cocoa-50 pb-2 hover:text-orange-700 transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="mt-2 w-full px-5 py-3 rounded-full bg-cocoa-900 text-white font-medium hover:bg-cocoa-800 transition-all">
              Cart (0)
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;