
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import GenAIImage from './GenAIImage';

// --- Types & Data ---

interface ProcessStep {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  prompt: string; // For thumbnail
  detailPrompt: string; // For modal hero
}

const steps: ProcessStep[] = [
  { 
    id: 1, 
    title: "Harvest", 
    shortDesc: "Hand-picked at peak ripeness.", 
    longDesc: "The journey begins in the shade of the canopy. Unlike industrial farming where machines strip the trees, our partners harvest exclusively by hand. They look for the specific hue of yellow-orange that signals peak sugar content in the mucilage. This manual selection is crucial because unripe pods introduce astringency that no amount of processing can remove. The pods are cracked open immediately using a wooden baton to avoid damaging the beans inside.",
    prompt: "Close up of hands gently cutting a yellow cacao pod from a tree trunk, rainforest background, soft dappled light, photorealistic, cinematic 4k",
    detailPrompt: "Wide shot of cacao farmers gathering colorful pods in a lush tropical forest, sunbeams filtering through leaves, documentary style"
  },
  { 
    id: 2, 
    title: "Ferment", 
    shortDesc: "6 days in wooden boxes.", 
    longDesc: "This is where flavor is born. The wet beans are placed in tiered wooden boxes (often cedar or laurel) and covered with banana leaves. Over 6 days, naturally occurring yeasts and bacteria consume the sugars in the fruit pulp, generating heat up to 50°C. We monitor this temperature religiously. This fermentation kills the germ and activates enzymes that form the precursors of chocolate flavor—converting bitter polyphenols into complex aromatic compounds.",
    prompt: "Wooden fermentation boxes filled with cacao beans covered in banana leaves, steam rising, warm lighting, rustic texture, macro photography",
    detailPrompt: "Close up texture shot of wet cacao beans fermenting, steam, rich organic textures, banana leaf covering, warm earth tones"
  },
  { 
    id: 3, 
    title: "Roast", 
    shortDesc: "Low & slow profile.", 
    longDesc: "Roasting is an act of translation. We take the potential created during fermentation and make it legible to the palate. Unlike coffee roasting which seeks to caramelize heavily, our cacao roasting is gentle. We use a modified vintage ball roaster to tumble the beans at lower temperatures (115-130°C). This 'low and slow' approach drives off acetic acid (vinegar notes) while preserving the delicate floral and fruit top notes that make single-origin cacao unique.",
    prompt: "Antique coffee roaster machine roasting cacao beans, motion blur of spinning drum, dark moody industrial lighting, copper and steel",
    detailPrompt: "Interior view of a cacao roaster, beans tumbling in mid-air, heat waves, cinematic lighting, glowing heating elements"
  },
  { 
    id: 4, 
    title: "Conch", 
    shortDesc: "72 hours of aeration.", 
    longDesc: "Conching is the final polish. The roasted nibs are ground into a paste (liquor) and then agitated in a stone melanger for up to 3 days. This constant movement aerates the chocolate, evaporating remaining volatile acids and coating every microscopic solid particle in cocoa butter. The result is a texture that melts seamlessly on the tongue and a flavor profile that is rounded, mellow, and incredibly long-lasting.",
    prompt: "Liquid chocolate flowing in a stone conching machine, silky smooth texture, ripples, macro photography, cinematic lighting, delicious",
    detailPrompt: "Macro abstract shot of swirling liquid dark chocolate, silky texture, light reflections, high contrast, mouth-watering"
  },
];

// Mock Data for Roast Profiles Chart
const roastData = [
  { time: 0, temp: 20 },
  { time: 2, temp: 45 },
  { time: 5, temp: 95, note: "Drying Phase" },
  { time: 10, temp: 110 },
  { time: 15, temp: 120, nordic: 122, full: 125 },
  { time: 20, temp: 125, nordic: 128, full: 135 },
  { time: 25, temp: 130, nordic: 125, full: 142 }, // Cooling for Nordic
  { time: 30, temp: 60,  nordic: 40,  full: 150 }, // Cooling
];

// --- Component ---

const Process: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);
  const [showRoastModal, setShowRoastModal] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedStep || showRoastModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedStep, showRoastModal]);

  return (
    <section id="process" className="py-24 bg-cocoa-900 relative overflow-hidden scroll-mt-28 transition-colors duration-700">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-gold-400 rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
          <div className="lg:col-span-7">
            <span className="text-gold-400 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Methodology</span>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
              The Alchemy <br/> of Process
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl font-light">
              We don't just make chocolate; we engineer flavor. By controlling every variable from fermentation temperature to roasting curves, we express the full potential of the cacao bean.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
             <button 
                onClick={() => setShowRoastModal(true)}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full overflow-hidden hover:border-gold-400 transition-colors"
             >
                <span className="absolute inset-0 bg-gold-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative font-medium tracking-wide">View Roast Profiles</span>
                <i className="fa-solid fa-chart-line relative text-gold-400 group-hover:text-white transition-colors"></i>
             </button>
          </div>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div 
              key={step.id} 
              onClick={() => setSelectedStep(step)}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-cocoa-800/30 backdrop-blur-sm"
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80">
                 <GenAIImage 
                    prompt={step.prompt}
                    alt={step.title}
                    className="w-full h-full object-cover"
                 />
              </div>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900 via-cocoa-900/40 to-transparent opacity-90 transition-opacity group-hover:opacity-70"></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-start transition-transform duration-300 group-hover:-translate-y-2">
                <div className="text-gold-400 text-6xl font-serif opacity-20 absolute top-6 right-6 font-bold">{`0${step.id}`}</div>
                
                <h3 className="font-serif text-3xl text-white mb-2">{step.title}</h3>
                <div className="h-0.5 w-12 bg-gold-400 mb-4 transition-all duration-300 group-hover:w-full"></div>
                <p className="text-white/70 text-sm font-light leading-relaxed group-hover:text-white transition-colors">
                  {step.shortDesc}
                </p>
                <div className="mt-6 text-xs font-bold uppercase tracking-widest text-gold-400 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                   Explore <i className="fa-solid fa-arrow-right ml-1"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL: Process Detail --- */}
      {selectedStep && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-cocoa-900/95 backdrop-blur-md animate-fade-in-up" onClick={() => setSelectedStep(null)}></div>
           
           <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-fade-in-up">
              
              <button 
                onClick={() => setSelectedStep(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white hover:text-cocoa-900 transition-all"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              {/* Left: Image */}
              <div className="lg:w-1/2 relative h-64 lg:h-auto">
                 <GenAIImage 
                    prompt={selectedStep.detailPrompt}
                    alt={selectedStep.title}
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden"></div>
                 <h2 className="absolute bottom-6 left-6 text-4xl text-white font-serif lg:hidden">{selectedStep.title}</h2>
              </div>

              {/* Right: Text */}
              <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 overflow-y-auto">
                 <div className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-2">Step 0{selectedStep.id}</div>
                 <h2 className="hidden lg:block font-serif text-5xl text-cocoa-900 mb-8">{selectedStep.title}</h2>
                 
                 <p className="text-cocoa-900/80 text-lg leading-relaxed font-light mb-8">
                   {selectedStep.longDesc}
                 </p>

                 <div className="bg-cocoa-50 p-6 rounded-2xl border border-cocoa-100">
                    <h4 className="font-serif text-xl text-cocoa-900 mb-2">Why it matters</h4>
                    <p className="text-sm text-cocoa-900/60">
                       Mastering this stage is critical. A deviation of just a few degrees or hours can transform a world-class bean into a mediocre product.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- MODAL: Roast Profiles --- */}
      {showRoastModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowRoastModal(false)}></div>
           
           <div className="relative bg-white w-full max-w-4xl rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in-up">
              <button 
                onClick={() => setShowRoastModal(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-cocoa-900 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div className="text-center mb-10">
                 <h3 className="font-serif text-3xl md:text-4xl text-cocoa-900 mb-2">The Roast Curve</h3>
                 <p className="text-cocoa-900/60">Comparing flavor development across time and temperature.</p>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={roastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eaddd7" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Time (min)', position: 'insideBottomRight', offset: -10 }} 
                      stroke="#5d4037"
                    />
                    <YAxis 
                      label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }} 
                      stroke="#5d4037"
                      domain={[0, 160]}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      labelStyle={{ color: '#5d4037', fontWeight: 'bold' }}
                    />
                    <Legend verticalAlign="top" height={36}/>
                    {/* Standard Curve */}
                    <Line type="monotone" dataKey="temp" name="Standard Roast" stroke="#d4af37" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    {/* Nordic Curve - Lighter */}
                    <Line type="monotone" dataKey="nordic" name="Nordic (Floral)" stroke="#e87c55" strokeWidth={2} strokeDasharray="5 5" />
                     {/* Full City Curve - Darker */}
                    <Line type="monotone" dataKey="full" name="Full City (Nutty)" stroke="#5d4037" strokeWidth={2} strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                 <div className="text-center p-4 rounded-xl bg-orange-50 border border-orange-100">
                    <div className="text-orange-800 font-bold mb-1">Nordic</div>
                    <div className="text-xs text-orange-800/60">High acidity, floral, fruit-forward. Preserves origin character.</div>
                 </div>
                 <div className="text-center p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                    <div className="text-yellow-800 font-bold mb-1">Standard</div>
                    <div className="text-xs text-yellow-800/60">Balanced. Caramel sweetness meets fruit acidity.</div>
                 </div>
                 <div className="text-center p-4 rounded-xl bg-cocoa-50 border border-cocoa-100">
                    <div className="text-cocoa-900 font-bold mb-1">Full City</div>
                    <div className="text-xs text-cocoa-900/60">Low acidity, nutty, chocolatey. Developed sugar browning.</div>
                 </div>
              </div>

           </div>
        </div>
      )}

    </section>
  );
};

export default Process;
