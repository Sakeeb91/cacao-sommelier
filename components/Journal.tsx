
import React, { useState, useEffect } from 'react';
import GenAIImage from './GenAIImage';

// --- Types ---

type ContentBlock =
  | { type: 'text'; value: string }
  | { type: 'heading'; value: string }
  | { type: 'quote'; value: string; author?: string }
  | { type: 'image'; prompt: string; staticSrc?: string; alt: string; caption?: string };

interface JournalEntry {
  id: number;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  coverPrompt: string;
  staticCoverSrc?: string;
  readTime: string;
  author: string;
  content: ContentBlock[];
}

// --- Data ---

import { STATIC_PROMPTS } from '../src/constants/prompts';

const journalEntries: JournalEntry[] = [
  {
    id: 1,
    date: "Feb 12, 2025",
    category: "Sourcing",
    title: "The 2025 Harvest Report: A Return to Roots",
    excerpt: "Early indications from our partners in Manabí suggest an exceptionally fruity vintage this year due to the extended dry season.",
    readTime: "5 min read",
    author: "Elena Rossi, Head of Sourcing",
    coverPrompt: STATIC_PROMPTS.JOURNAL_ENTRY_1_COVER.prompt,
    staticCoverSrc: `/images/generated/${STATIC_PROMPTS.JOURNAL_ENTRY_1_COVER.filename}`,
    content: [
      {
        type: 'text',
        value: "The El Niño cycle of late 2024 brought unprecedented heat to the coastal lowlands of Ecuador. For industrial farming, this was a disaster. But for the deep-rooted heirloom Arriba Nacional trees in Manabí, it was a stress test that has yielded something miraculous."
      },
      {
        type: 'heading',
        value: "Concentration Through Adversity"
      },
      {
        type: 'text',
        value: "Cacao trees, much like grapevines, produce their most complex fruit when they struggle slightly. The extended dry season forced the trees to tap deep into the mineral-rich volcanic water table. The result is a harvest with 15% lower yield by weight, but a sugar concentration (Brix) that is shattering our records."
      },
      {
        type: 'image',
        prompt: STATIC_PROMPTS.JOURNAL_ENTRY_1_IMAGE_1.prompt,
        staticSrc: `/images/generated/${STATIC_PROMPTS.JOURNAL_ENTRY_1_IMAGE_1.filename}`,
        alt: "Cut test of 2025 beans",
        caption: "Cut tests reveal a dense, violet interior indicating high polyphenol content."
      },
      {
        type: 'quote',
        value: "The tree speaks through the fruit. This year, it speaks loudly. The usual floral whispers have turned into a shout of tropical fruit.",
        author: "Carlos Mendoza, Lead Farmer"
      },
      {
        type: 'text',
        value: "Our sensory panel has detected notes that are rare for this region. The classic jasmine and orange blossom profile is still there, forming the base. But layered on top are aggressive, vibrant notes of passion fruit, dried fig, and even a hint of wild strawberry. It is a vintage that demands attention."
      },
      {
        type: 'heading',
        value: "Adapting the Process"
      },
      {
        type: 'text',
        value: "To honor this unique profile, we have adjusted our fermentation protocols. We are shortening the anaerobic phase by 12 hours to preserve the bright acidity, and we are extending the drying phase under shade to gently lock in the volatiles. This is not a chocolate for a darker roast; it begs for a light touch."
      }
    ]
  },
  {
    id: 2,
    date: "Jan 28, 2025",
    category: "Science",
    title: "Why Tempering Matters: The Physics of Shine",
    excerpt: "Achieving the perfect snap isn't just art; it's the precise alignment of crystal structures. We dive deep into the beta-5 crystals.",
    readTime: "8 min read",
    author: "Dr. James Wu, Food Scientist",
    coverPrompt: STATIC_PROMPTS.JOURNAL_ENTRY_2_COVER.prompt,
    staticCoverSrc: `/images/generated/${STATIC_PROMPTS.JOURNAL_ENTRY_2_COVER.filename}`,
    content: [
      {
        type: 'text',
        value: "Chocolate is a polymorph. This means the fat within it—cocoa butter—can solidify into six different crystal structures, labeled Form I through Form VI. Only one of them, Form V (Beta-5), is desirable. It is the holy grail of chocolatiers."
      },
      {
        type: 'heading',
        value: "The Search for Form V"
      },
      {
        type: 'text',
        value: "Form V crystals pack tightly together, reflecting light in a uniform way that gives properly tempered chocolate its mirror-like sheen. More importantly, this tight packing creates structural integrity. When you break a bar, it releases energy in a sharp, audible 'snap' rather than a dull thud."
      },
      {
        type: 'image',
        prompt: STATIC_PROMPTS.JOURNAL_ENTRY_2_IMAGE_1.prompt,
        staticSrc: `/images/generated/${STATIC_PROMPTS.JOURNAL_ENTRY_2_IMAGE_1.filename}`,
        alt: "Crystal Lattice Structure",
        caption: "Visualizing the stable Beta-5 crystal lattice structure."
      },
      {
        type: 'text',
        value: "If chocolate melts in your hand, it's likely Form IV. If it looks grey and blooming, it's Form VI. Form V has a melting point of exactly 33.8°C (93°F)—just below human body temperature. This is why good chocolate stays solid on your fingers but explodes into liquid flavor the moment it hits your tongue."
      },
      {
        type: 'heading',
        value: "Taming the Chaos"
      },
      {
        type: 'quote',
        value: "Tempering is not cooking. It is the act of taming chaos into order through temperature and agitation.",
      },
      {
        type: 'text',
        value: "Our continuous tempering machines use a three-stage curve. We heat the mass to 45°C to erase all crystal memory. We cool it rapidly to 27°C to promote crystallization (both good and bad forms). Then, we reheat precisely to 31.5°C. This crucial final step melts away the unstable lower forms, leaving only the stable Beta-5 crystals to act as seeds for the entire batch."
      },
      {
        type: 'image',
        prompt: STATIC_PROMPTS.JOURNAL_ENTRY_2_IMAGE_2.prompt,
        staticSrc: `/images/generated/${STATIC_PROMPTS.JOURNAL_ENTRY_2_IMAGE_2.filename}`,
        alt: "Perfectly Tempered Bar",
        caption: "The result of a perfect temperature curve: the mirror finish."
      }
    ]
  }
];

const Journal: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedEntry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEntry]);

  return (
    <section id="journal" className="py-24 border-t border-cocoa-900/5 scroll-mt-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-6">
        <div className="text-center mb-16">
          <span className="text-orange-700 font-bold tracking-widest uppercase text-xs mb-2 block">Editorial</span>
          <h2 className="font-serif text-4xl text-cocoa-900">Journal</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {journalEntries.map((entry) => (
            <article
              key={entry.id}
              className="flex flex-col gap-4 group cursor-pointer"
              onClick={() => setSelectedEntry(entry)}
            >
              <div className="overflow-hidden rounded-2xl aspect-video smooth-shadow relative">
                <GenAIImage
                  prompt={entry.coverPrompt}
                  staticSrc={entry.staticCoverSrc}
                  alt={entry.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="flex gap-4 text-xs font-bold tracking-widest uppercase text-cocoa-900/40 mt-2">
                <span>{entry.date}</span>
                <span>•</span>
                <span>{entry.category}</span>
                <span>•</span>
                <span>{entry.readTime}</span>
              </div>
              <h3 className="font-serif text-2xl text-cocoa-900 group-hover:text-orange-700 transition-colors leading-tight">
                {entry.title}
              </h3>
              <p className="text-cocoa-900/60 leading-relaxed line-clamp-2">
                {entry.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* --- Article Reading Modal --- */}
      {selectedEntry && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-white animate-fade-in-up">

          {/* Close Button */}
          <button
            onClick={() => setSelectedEntry(null)}
            className="fixed top-6 right-6 z-[110] w-12 h-12 bg-white/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-cocoa-900 hover:bg-cocoa-900 hover:text-white transition-all hover:rotate-90"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>

          {/* Hero Image */}
          <div className="w-full h-[50vh] md:h-[60vh] relative">
            <GenAIImage
              prompt={selectedEntry.coverPrompt}
              staticSrc={selectedEntry.staticCoverSrc}
              alt={selectedEntry.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30"></div>
          </div>

          {/* Article Body */}
          <div className="max-w-3xl mx-auto px-6 pb-24 -mt-32 relative z-10">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-cocoa-50">

              <div className="flex gap-3 text-xs font-bold tracking-widest uppercase text-orange-700 mb-6">
                <span>{selectedEntry.category}</span>
                <span className="text-cocoa-200">|</span>
                <span>{selectedEntry.date}</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cocoa-900 mb-6 leading-tight">
                {selectedEntry.title}
              </h1>

              <div className="flex items-center gap-4 mb-10 border-b border-cocoa-100 pb-8">
                <div className="w-10 h-10 rounded-full bg-cocoa-100 flex items-center justify-center text-cocoa-900">
                  <i className="fa-solid fa-pen-nib"></i>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-cocoa-900">{selectedEntry.author}</div>
                  <div className="text-cocoa-900/50">{selectedEntry.readTime}</div>
                </div>
              </div>

              <div className="space-y-8">
                {selectedEntry.content.map((block, idx) => {
                  switch (block.type) {
                    case 'heading':
                      return (
                        <h3 key={idx} className="font-serif text-2xl md:text-3xl text-cocoa-900 mt-8 mb-2">
                          {block.value}
                        </h3>
                      );
                    case 'quote':
                      return (
                        <blockquote key={idx} className="border-l-4 border-gold-400 pl-6 my-8 italic text-xl md:text-2xl text-cocoa-900/80 font-serif leading-relaxed">
                          "{block.value}"
                          {block.author && <footer className="text-sm font-sans font-bold uppercase tracking-widest not-italic mt-4 text-cocoa-900/40">- {block.author}</footer>}
                        </blockquote>
                      );
                    case 'image':
                      return (
                        <figure key={idx} className="my-8">
                          <div className="rounded-2xl overflow-hidden shadow-md aspect-video">
                            <GenAIImage
                              prompt={block.prompt}
                              staticSrc={block.staticSrc}
                              alt={block.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {block.caption && (
                            <figcaption className="text-center text-xs text-cocoa-900/50 mt-3 italic">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    case 'text':
                    default:
                      return (
                        <p key={idx} className="text-lg text-cocoa-900/70 leading-loose font-light">
                          {block.value}
                        </p>
                      );
                  }
                })}
              </div>

              <div className="mt-16 pt-10 border-t border-cocoa-100 flex justify-center">
                <button className="px-8 py-3 rounded-full border border-cocoa-200 text-cocoa-900 hover:bg-cocoa-900 hover:text-white transition-all flex items-center gap-2">
                  <i className="fa-solid fa-share-nodes"></i> Share Article
                </button>
              </div>

            </div>
          </div>

        </div>
      )}
    </section>
  );
};

export default Journal;
