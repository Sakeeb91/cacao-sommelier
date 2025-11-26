import React from 'react';

const BentoGrid: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* Large Text Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white rounded-4xl p-8 md:p-10 smooth-shadow flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="w-10 h-10 mb-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center">
                <i className="fa-solid fa-fingerprint"></i>
              </div>
              <h3 className="font-serif text-3xl mb-4 text-cocoa-900">Pioneers in <span className="text-orange-700">Bean-to-Bar</span>.</h3>
              <p className="text-cocoa-900/60 leading-relaxed">
                We bypass the middlemen. Our data-driven roasting process ensures that every bean's unique genetic flavor profile is preserved, not burned.
              </p>
            </div>
            <a 
              href="#process" 
              onClick={(e) => scrollToSection(e, 'process')}
              className="mt-8 w-max px-6 py-3 rounded-full bg-orange-50 text-orange-800 text-sm font-semibold hover:bg-orange-100 transition-colors flex items-center gap-2"
            >
              Explore Our Process <i className="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>

          {/* Stat Card 1 */}
          <a 
            href="#origins" 
            onClick={(e) => scrollToSection(e, 'origins')}
            className="col-span-1 bg-cocoa-900 text-white rounded-4xl p-8 smooth-shadow flex flex-col justify-between group cursor-pointer hover:bg-cocoa-800 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <i className="fa-solid fa-globe text-gold-400"></i>
              </div>
              <i className="fa-solid fa-arrow-up-right text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"></i>
            </div>
            <div>
              <div className="text-5xl font-serif mb-2">12</div>
              <div className="text-white/60 text-sm font-medium">Single Origin Countries</div>
            </div>
          </a>

          {/* Stat Card 2 */}
          <div className="col-span-1 bg-white rounded-4xl p-8 smooth-shadow flex flex-col justify-between group hover:ring-2 hover:ring-gold-400/30 transition-all">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-gray-100 rounded-lg">
                <i className="fa-solid fa-percent text-cocoa-900"></i>
              </div>
            </div>
            <div>
              <div className="text-5xl font-serif mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cocoa-900 to-orange-700">99%</div>
              <div className="text-cocoa-900/60 text-sm font-medium">Traceable Supply Chain</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Bento Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Dark Mode Mobile App Preview Card */}
        <div className="col-span-1 md:col-span-2 bg-black rounded-4xl p-8 md:p-12 relative overflow-hidden text-white smooth-shadow min-h-[400px] group">
          {/* Background Mesh */}
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 120%, #d4af37 0%, transparent 50%)' }}></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <i className="fa-solid fa-mobile-screen-button text-2xl"></i>
              <span className="text-xs font-mono border border-white/20 px-2 py-1 rounded">App Beta</span>
            </div>
            
            <div className="max-w-md">
              <h3 className="font-serif text-3xl mb-4">Your Personal Sommelier.</h3>
              <p className="text-white/60 mb-8">Scan any bar wrapper to unlock tasting notes, pairing suggestions, and the exact farmer who grew your beans.</p>
              <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                Download App
              </button>
            </div>
            
            {/* Mock UI Element */}
            <div className="absolute bottom-[-20px] right-8 w-64 bg-gray-900 rounded-t-3xl border border-white/10 p-4 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-orange-500"></div>
                <div>
                  <div className="h-2 w-20 bg-gray-700 rounded mb-1"></div>
                  <div className="h-2 w-12 bg-gray-800 rounded"></div>
                </div>
              </div>
              <div className="h-24 w-full bg-gray-800/50 rounded-xl mb-2"></div>
            </div>
          </div>
        </div>

        {/* Vertical Typography Card */}
        <div className="col-span-1 bg-white rounded-4xl p-8 smooth-shadow flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 font-serif text-9xl leading-none select-none pointer-events-none group-hover:scale-110 transition-transform duration-700 text-cocoa-900">Aa</div>
            
            <div className="relative z-10">
                <div className="font-serif text-4xl md:text-5xl mb-2 tracking-tight text-cocoa-900">Cacao.</div>
                <div className="flex gap-3 justify-center text-xs uppercase tracking-widest text-cocoa-900/40 mt-4">
                    <span>Bold</span>
                    <span>•</span>
                    <span>Earthy</span>
                    <span>•</span>
                    <span>Pure</span>
                </div>
            </div>
            
            {/* Color Swatches */}
            <div className="mt-12 flex gap-4">
                <div className="w-8 h-12 rounded-full bg-cocoa-900 shadow-sm transition-transform hover:-translate-y-2 duration-300"></div>
                <div className="w-8 h-12 rounded-full bg-cocoa-800 shadow-sm mt-4 transition-transform hover:-translate-y-2 duration-300 delay-75"></div>
                <div className="w-8 h-12 rounded-full bg-orange-700 shadow-sm transition-transform hover:-translate-y-2 duration-300 delay-100"></div>
                <div className="w-8 h-12 rounded-full bg-[#fdf8f6] border border-gray-100 shadow-sm mt-4 transition-transform hover:-translate-y-2 duration-300 delay-150"></div>
            </div>
        </div>
      </div>
    </>
  );
};

export default BentoGrid;