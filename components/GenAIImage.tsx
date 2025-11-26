import React, { useState, useEffect } from 'react';
import { generateImage } from '../services/geminiService';

interface GenAIImageProps {
  prompt: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  staticSrc?: string;
}

const GenAIImage: React.FC<GenAIImageProps> = ({ prompt, alt, className, fallbackSrc, staticSrc }) => {
  const [src, setSrc] = useState<string | null>(staticSrc || null);
  const [loading, setLoading] = useState(!staticSrc);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (staticSrc) {
      setSrc(staticSrc);
      setLoading(false);
      return;
    }

    let mounted = true;

    const fetchImage = async () => {
      try {
        setLoading(true);
        const generatedUrl = await generateImage(prompt);
        if (mounted) {
          setSrc(generatedUrl);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to generate image", err);
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      mounted = false;
    };
  }, [prompt, staticSrc]);

  if (loading) {
    return (
      <div className={`bg-gray-100 flex flex-col items-center justify-center ${className}`}>
        <div className="w-8 h-8 border-2 border-cocoa-900/20 border-t-cocoa-900 rounded-full animate-spin mb-2"></div>
        <span className="text-xs font-serif text-cocoa-900/50 animate-pulse">Designing...</span>
      </div>
    );
  }

  if (error || !src) {
    return (
      <img
        src={fallbackSrc || "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=600&auto=format&fit=crop"}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} animate-fade-in-up`}
      onError={() => {
        if (fallbackSrc && src !== fallbackSrc) {
          setSrc(fallbackSrc);
        } else {
          setError(true);
        }
      }}
    />
  );
};

export default GenAIImage;
