
import React, { useState, useEffect } from 'react';
import GenAIImage from './GenAIImage';
import { STATIC_PROMPTS } from '../src/constants/prompts';

interface RegionData {
  name: string;
  profile: string;
  desc: string;
  prompt: string;
  staticSrc?: string;
  fallback: string;
  storyTitle: string;
  story: string;
  peopleTitle: string;
  people: string;
  peoplePrompt: string;
  staticPeopleSrc?: string;
  cacaoTitle: string;
  cacao: string;
  cacaoPrompt: string;
  staticCacaoSrc?: string;
}

const Origins: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedRegion) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRegion]);



  const regions: RegionData[] = [
    {
      name: "Manabí, Ecuador",
      profile: "Floral, Woody, Dried Fruit",
      desc: "Home to the ancient Arriba Nacional variety, our beans from Manabí offer a complex floral bouquet unmatched by any other region.",
      prompt: STATIC_PROMPTS.ORIGIN_MANABI_MAIN.prompt,
      staticSrc: `/images/generated/${STATIC_PROMPTS.ORIGIN_MANABI_MAIN.filename}`,
      fallback: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=800",
      storyTitle: "The Cloud Forest Legacy",
      story: "In the misty hills of Manabí, the Arriba Nacional bean traces its lineage back 5,300 years. Here, the collision of the Humboldt current and tropical air creates a perpetual cloud forest, shielding the delicate trees from the harsh equator sun. The soil, enriched by volcanic ash from the Andes, imparts a distinct minerality that serves as the backbone for the bean's famous floral notes.",
      peopleTitle: "The Mendoza Family",
      people: "For four generations, the Mendoza family has guarded a patch of heirloom trees that have never been cross-bred. Avoiding modern monoculture, they plant citrus and mango trees alongside the cacao to provide shade and natural pest control.",
      peoplePrompt: STATIC_PROMPTS.ORIGIN_MANABI_PEOPLE.prompt,
      staticPeopleSrc: `/images/generated/${STATIC_PROMPTS.ORIGIN_MANABI_PEOPLE.filename}`,
      cacaoTitle: "Genetic Purity",
      cacao: "Our Manabí beans are DNA-tested to ensure 100% Arriba Nacional heritage. We ferment them for only 3 days to preserve the delicate jasmine and orange blossom aromatics that would be destroyed by a heavier roast.",
      cacaoPrompt: STATIC_PROMPTS.ORIGIN_MANABI_CACAO.prompt,
      staticCacaoSrc: `/images/generated/${STATIC_PROMPTS.ORIGIN_MANABI_CACAO.filename}`
    },
    {
      name: "Sambirano, Madagascar",
      profile: "Bright Citrus, Raspberry, Roasted Nut",
      desc: "Grown in the mineral-rich soil of the Sambirano Valley, these beans provide a striking acidity and vibrant red fruit notes.",
      prompt: STATIC_PROMPTS.ORIGIN_SAMBIRANO_MAIN.prompt,
      staticSrc: `/images/generated/${STATIC_PROMPTS.ORIGIN_SAMBIRANO_MAIN.filename}`,
      fallback: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&q=80&w=800",
      storyTitle: "The Green Ribbon",
      story: "The Sambirano Valley is a lush ribbon of green dissecting the arid north of Madagascar. It is here that Trinitario beans, introduced a century ago, have adapted to the unique microclimate. The intense heat of the day followed by cool river breezes creates a stress response in the fruit that concentrates sugars and acids, resulting in the world's most vibrant fruit-forward chocolate.",
      peopleTitle: "Akesson's Cooperative",
      people: "We source exclusively from a cooperative that has revolutionized fermentation techniques. By rotating the beans in tiered wooden boxes, they ensure an even temperature distribution that unlocks the precursor flavors of tart cherry and citrus.",
      peoplePrompt: STATIC_PROMPTS.ORIGIN_SAMBIRANO_PEOPLE.prompt,
      staticPeopleSrc: `/images/generated/${STATIC_PROMPTS.ORIGIN_SAMBIRANO_PEOPLE.filename}`,
      cacaoTitle: "The 'Red' Bean",
      cacao: "Locally known as 'red gold', these beans are famous for their high citric acid content. We roast them quickly at high heat to snap the acidity into a caramel finish, avoiding the sourness associated with lesser roasts.",
      cacaoPrompt: STATIC_PROMPTS.ORIGIN_SAMBIRANO_CACAO.prompt,
      staticCacaoSrc: `/images/generated/${STATIC_PROMPTS.ORIGIN_SAMBIRANO_CACAO.filename}`
    },
    {
      name: "Chuao, Venezuela",
      profile: "Intense Chocolate, Earthy, Spice",
      desc: "Legendary beans from a village accessible only by sea. Deep, profound chocolate flavor with a lingering earthy finish.",
      prompt: STATIC_PROMPTS.ORIGIN_CHUAO_MAIN.prompt,
      staticSrc: `/images/generated/${STATIC_PROMPTS.ORIGIN_CHUAO_MAIN.filename}`,
      fallback: "https://images.unsplash.com/photo-1549416878-b971e90974bc?auto=format&fit=crop&q=80&w=800",
      storyTitle: "The Holy Grail",
      story: "Accessible only by boat, the isolated village of Chuao is mythical in the world of chocolate. For 400 years, the harvest here has been a communal ritual. The beans are dried on the patio of the colonial church, blessed by the sea salt air that drifts inland. This unique drying process, combined with ancient Criollo genetics, creates a chocolate of immense depth.",
      peopleTitle: "Sangue de Cacao",
      people: "The women of Chuao, often called the 'Queens of Cacao', manage the post-harvest process with an almost religious devotion. They sing traditional harvest songs while raking the beans, a rhythm that ensures every bean turns in unison with the sun.",
      peoplePrompt: STATIC_PROMPTS.ORIGIN_CHUAO_PEOPLE.prompt,
      staticPeopleSrc: `/images/generated/${STATIC_PROMPTS.ORIGIN_CHUAO_PEOPLE.filename}`,
      cacaoTitle: "Deep Earth",
      cacao: "Chuao beans are known for their lack of bitterness. They possess a profound bass note of dark fudge and molasses, with a finish that lingers like fine aged rum. We use a long, low-temperature roast to honor this complexity.",
      cacaoPrompt: STATIC_PROMPTS.ORIGIN_CHUAO_CACAO.prompt,
      staticCacaoSrc: `/images/generated/${STATIC_PROMPTS.ORIGIN_CHUAO_CACAO.filename}`
    }
  ];

  return (
    <section id="origins" className="py-24 relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-6">
        <div className="mb-16">
          <span className="text-orange-700 font-bold tracking-widest uppercase text-xs mb-2 block">The Source</span>
          <h2 className="font-serif text-4xl md:text-5xl text-cocoa-900 mb-6">Origins & Terroir</h2>
          <p className="max-w-xl text-cocoa-900/60 leading-relaxed">
            Great chocolate begins in the soil. We partner directly with farmers in three distinct micro-climates to harvest beans with unique genetic flavor profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regions.map((region, idx) => (
            <div
              key={idx}
              className="group cursor-pointer"
              onClick={() => setSelectedRegion(region)}
            >
              <div className="overflow-hidden rounded-2xl mb-6 aspect-[4/3] smooth-shadow relative">
                <GenAIImage
                  prompt={region.prompt}
                  staticSrc={region.staticSrc}
                  alt={region.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  fallbackSrc={region.fallback}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur text-cocoa-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Read Story
                  </div>
                </div>
              </div>
              <h3 className="font-serif text-2xl text-cocoa-900 mb-2 group-hover:text-orange-700 transition-colors">{region.name}</h3>
              <div className="text-xs font-bold text-gold-500 uppercase tracking-wide mb-3">{region.profile}</div>
              <p className="text-sm text-cocoa-900/60 leading-relaxed">{region.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Story Modal */}
      {selectedRegion && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-white animate-fade-in-up">
          <button
            onClick={() => setSelectedRegion(null)}
            className="fixed top-6 right-6 z-[110] w-12 h-12 bg-white/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-cocoa-900 hover:bg-cocoa-900 hover:text-white transition-all hover:rotate-90"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>

          {/* Hero Section */}
          <div className="relative w-full h-[60vh] md:h-[70vh]">
            <GenAIImage
              prompt={selectedRegion.prompt}
              staticSrc={selectedRegion.staticSrc}
              alt={selectedRegion.name}
              className="w-full h-full object-cover"
              fallbackSrc={selectedRegion.fallback}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900 via-cocoa-900/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
              <div className="max-w-7xl mx-auto">
                <span className="block text-gold-400 font-bold tracking-widest uppercase text-sm mb-4">Origin Story</span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-4">{selectedRegion.name}</h1>
                <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl">{selectedRegion.profile}</p>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

              {/* Left Column: The Story */}
              <div className="lg:col-span-7">
                <h3 className="font-serif text-4xl text-cocoa-900 mb-8">{selectedRegion.storyTitle}</h3>
                <p className="text-lg text-cocoa-900/70 leading-relaxed mb-8 font-light first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-cocoa-900">
                  {selectedRegion.story}
                </p>

                <div className="my-12 rounded-3xl overflow-hidden aspect-video smooth-shadow">
                  <GenAIImage
                    prompt={selectedRegion.cacaoPrompt}
                    staticSrc={selectedRegion.staticCacaoSrc}
                    alt="Cacao Details"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="font-serif text-2xl text-cocoa-900 mb-4">{selectedRegion.cacaoTitle}</h4>
                <p className="text-cocoa-900/70 leading-relaxed mb-8">
                  {selectedRegion.cacao}
                </p>
              </div>

              {/* Right Column: The People & Sidebar */}
              <div className="lg:col-span-5 flex flex-col gap-12">

                <div className="bg-cocoa-50 p-8 rounded-[2.5rem]">
                  <div className="rounded-full overflow-hidden w-24 h-24 mb-6 border-4 border-white shadow-sm">
                    <GenAIImage
                      prompt={selectedRegion.peoplePrompt}
                      staticSrc={selectedRegion.staticPeopleSrc}
                      alt="Farmer Portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-serif text-2xl text-cocoa-900 mb-4">{selectedRegion.peopleTitle}</h4>
                  <p className="text-sm text-cocoa-900/70 leading-relaxed italic">
                    "{selectedRegion.people}"
                  </p>
                </div>

                <div className="border-t border-b border-cocoa-900/10 py-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-cocoa-900/40 mb-1">Harvest</div>
                      <div className="font-serif text-xl text-cocoa-900">May - July</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-cocoa-900/40 mb-1">Elevation</div>
                      <div className="font-serif text-xl text-cocoa-900">450m</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-cocoa-900/40 mb-1">Variety</div>
                      <div className="font-serif text-xl text-cocoa-900">Heirloom</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-cocoa-900/40 mb-1">Fermentation</div>
                      <div className="font-serif text-xl text-cocoa-900">Wooden Box</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      )}
    </section>
  );
};

export default Origins;
