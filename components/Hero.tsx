import React, { useState } from 'react';
import { generateTastingAudio } from '../services/geminiService';
import FlavorRadar from './FlavorRadar';

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const sensoryText = "Nutty & Floral with a hint of toasted caramel finish.";

  const handlePlayAudio = async () => {
    if (loadingAudio || isPlaying) return;

    setLoadingAudio(true);
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      
      const audioBuffer = await generateTastingAudio(sensoryText, audioCtx);
      
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      
      source.onended = () => {
        setIsPlaying(false);
        audioCtx.close();
      };

      source.start();
      setIsPlaying(true);
    } catch (error) {
      console.error("Audio playback failed", error);
      alert("Could not play audio. Please check your connection.");
    } finally {
      setLoadingAudio(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-center">
      {/* Left: Typography */}
      <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-cocoa-900/5 text-xs font-semibold tracking-wide uppercase text-cocoa-800/70">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          New Harvest 2025
        </div>
        
        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-cocoa-900">
          The Physics <br/>
          <span className="italic font-light opacity-80 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cocoa-900 to-gold-500">of Pleasure</span>
        </h1>
        
        <p className="text-lg md:text-xl text-cocoa-800/70 max-w-lg leading-relaxed font-light">
          Chocolate redefined with single-origin precision. We craft tailored roast profiles to supercharge your serotonin and elevate your daily ritual.
        </p>

        <div className="flex flex-wrap gap-4 items-center pt-2">
          <button className="px-8 py-4 bg-cocoa-900 text-white rounded-full font-medium hover:bg-cocoa-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cocoa-900/20">
            Taste the Collection
          </button>
          <div className="flex items-center -space-x-3 ml-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src={`https://picsum.photos/seed/${i * 123}/50/50`} alt="User" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-white flex items-center justify-center text-xs font-bold text-cocoa-900 shadow-sm">+2k</div>
          </div>
          <div className="text-sm font-medium opacity-60 text-cocoa-900">Happy Connoisseurs</div>
        </div>
        
        <div className="flex gap-6 pt-8 opacity-40 text-cocoa-900">
          <i className="fa-brands fa-envira text-2xl hover:opacity-100 transition-opacity cursor-pointer"></i>
          <i className="fa-solid fa-seedling text-2xl hover:opacity-100 transition-opacity cursor-pointer"></i>
          <i className="fa-solid fa-medal text-2xl hover:opacity-100 transition-opacity cursor-pointer"></i>
        </div>
      </div>

      {/* Right: Visual */}
      <div className="lg:col-span-5 relative">
        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] smooth-shadow group">
          <img 
            src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop"
            alt="Artistic Stack of Premium Dark Chocolate" 
            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Glass Card */}
          <div className="absolute bottom-8 left-8 right-8 glass-card p-4 rounded-2xl flex items-center gap-4 animate-fade-in-up">
            <div className="w-12 h-12 rounded-xl bg-cocoa-900 text-white flex items-center justify-center shrink-0">
              {loadingAudio ? (
                 <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : isPlaying ? (
                 <i className="fa-solid fa-volume-high animate-pulse"></i>
              ) : (
                 <i className="fa-solid fa-droplet"></i>
              )}
            </div>
            <div className="flex-grow">
              <h4 className="text-xs font-bold tracking-wider uppercase text-cocoa-900/60 mb-0.5">Sensory Profile</h4>
              <div className="font-serif text-lg leading-none text-cocoa-900">Nutty & Floral</div>
            </div>
            <button 
              onClick={handlePlayAudio}
              disabled={loadingAudio || isPlaying}
              className={`w-10 h-10 rounded-full transition-colors text-lg flex items-center justify-center p-2
                ${isPlaying ? 'bg-gold-400 text-white' : 'bg-cocoa-900/5 hover:bg-cocoa-900/10 text-cocoa-900/80'}
              `}
            >
              {loadingAudio ? (
                <span className="text-xs">...</span>
              ) : (
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-xs ml-0.5`}></i>
              )}
            </button>
          </div>
        </div>

        {/* Floating Graph - Absolute positioned decoration */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/90 backdrop-blur-sm rounded-full smooth-shadow p-2 hidden xl:block animate-pulse-slow">
            <FlavorRadar />
        </div>
      </div>
    </div>
  );
};

export default Hero;