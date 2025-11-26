import React, { useState } from 'react';
import { getPairingSuggestion } from '../services/geminiService';
import { GroundingSource } from '../types';

const PairingAdvisor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlePairing = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSuggestion(null);
    setError(false);
    setSources([]);

    try {
      const result = await getPairingSuggestion(query);
      setSuggestion(result.suggestion);
      setSources(result.sources);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          handlePairing();
      }
  }

  return (
    <div className="mt-20 py-16 px-6 md:px-16 bg-cocoa-100 rounded-4xl smooth-shadow relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
        <h2 className="font-serif text-4xl mb-3 text-cocoa-900">
          The Pairing Advisor <span className="text-gold-400">✨</span>
        </h2>
        <p className="text-lg text-cocoa-800/70">
          Ask our Gemini-powered sommelier for the perfect chocolate pairing for your favorite drink or dish.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-3xl smooth-shadow relative z-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 'espresso', 'blue cheese', 'cabernet'"
            className="flex-grow p-4 rounded-full border border-cocoa-900/10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-cocoa-50/50 text-cocoa-900 placeholder:text-cocoa-900/30"
          />
          <button
            onClick={handlePairing}
            disabled={loading}
            className="flex-shrink-0 px-8 py-4 bg-orange-700 text-white rounded-full font-semibold hover:bg-orange-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-orange-700/20"
          >
            {loading ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
            ) : (
                <>
                <span className="text-lg leading-none">✨</span> Pair
                </>
            )}
          </button>
        </div>

        {/* Result Area */}
        <div className="min-h-[120px] flex flex-col items-center justify-center p-6 border border-dashed border-cocoa-900/10 rounded-2xl text-center bg-cocoa-50/30">
          {loading ? (
            <div className="text-center">
              <p className="text-sm text-cocoa-900/60 animate-pulse">Consulting the flavor matrix...</p>
            </div>
          ) : error ? (
            <p className="text-red-500">The sommelier is currently unavailable. Please try again.</p>
          ) : suggestion ? (
            <div className="animate-fade-in-up">
              <p className="font-serif text-xl text-cocoa-900 leading-relaxed mb-4">
                "{suggestion}"
              </p>
              {sources.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center text-xs mt-4 border-t border-cocoa-900/5 pt-4">
                  <span className="opacity-50 uppercase tracking-wide">Sources:</span>
                  {sources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-700 hover:underline bg-orange-50 px-2 py-0.5 rounded-md"
                    >
                      {source.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-cocoa-900/40 italic">Your expert pairing suggestion will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PairingAdvisor;