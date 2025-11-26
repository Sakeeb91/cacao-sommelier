import React from 'react';
import GenAIImage from './GenAIImage';

const Journal: React.FC = () => {
  return (
    <section id="journal" className="py-24 border-t border-cocoa-900/5 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-6">
        <div className="text-center mb-16">
          <span className="text-orange-700 font-bold tracking-widest uppercase text-xs mb-2 block">Editorial</span>
          <h2 className="font-serif text-4xl text-cocoa-900">Journal</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <article className="flex flex-col gap-4 group cursor-pointer">
            <div className="overflow-hidden rounded-2xl aspect-video smooth-shadow">
               <GenAIImage 
                 prompt="Cinematic shot of colorful cacao pods hanging on a tree in a tropical rainforest, depth of field, sunlight filtering through leaves, photorealistic nature photography"
                 alt="Cacao Pods"
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 fallbackSrc="https://images.unsplash.com/photo-1533230699217-1f067d589f3a?auto=format&fit=crop&q=80&w=800"
               />
            </div>
            <div className="flex gap-4 text-xs font-bold tracking-widest uppercase text-cocoa-900/40 mt-2">
              <span>Feb 12, 2025</span>
              <span>•</span>
              <span>Sourcing</span>
            </div>
            <h3 className="font-serif text-2xl text-cocoa-900 group-hover:text-orange-700 transition-colors">The 2025 Harvest Report: A Return to Roots</h3>
            <p className="text-cocoa-900/60 leading-relaxed">
              Early indications from our partners in Manabí suggest an exceptionally fruity vintage this year due to the extended dry season...
            </p>
          </article>

          <article className="flex flex-col gap-4 group cursor-pointer">
            <div className="overflow-hidden rounded-2xl aspect-video smooth-shadow">
               <GenAIImage 
                 prompt="Close up action shot of molten chocolate being tempered on a marble table, glossy shine, professional chocolatier kitchen, high contrast, steam, delicious"
                 alt="Tempering Chocolate"
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 fallbackSrc="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800"
               />
            </div>
             <div className="flex gap-4 text-xs font-bold tracking-widest uppercase text-cocoa-900/40 mt-2">
              <span>Jan 28, 2025</span>
              <span>•</span>
              <span>Science</span>
            </div>
            <h3 className="font-serif text-2xl text-cocoa-900 group-hover:text-orange-700 transition-colors">Why Tempering Matters: The Physics of Shine</h3>
            <p className="text-cocoa-900/60 leading-relaxed">
              Achieving the perfect snap isn't just art; it's the precise alignment of crystal structures. We dive deep into the beta-5 crystals...
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Journal;