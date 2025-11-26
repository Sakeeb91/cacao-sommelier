import React from 'react';
import GenAIImage from './GenAIImage';
import { STATIC_PROMPTS } from '../src/constants/prompts';

const Shop: React.FC = () => {
  const products = [
    {
      name: "Manabí 70%",
      notes: "Floral & Woody",
      price: "$12.00",
      prompt: STATIC_PROMPTS.MANABI_BAR.prompt,
      staticSrc: `/images/generated/${STATIC_PROMPTS.MANABI_BAR.filename}`
    },
    {
      name: "Sambirano 85%",
      notes: "Citrus & Red Berry",
      price: "$14.00",
      prompt: STATIC_PROMPTS.SAMBIRANO_CHUNKS.prompt,
      staticSrc: `/images/generated/${STATIC_PROMPTS.SAMBIRANO_CHUNKS.filename}`
    },
    {
      name: "Dark Milk 55%",
      notes: "Caramel & Malt",
      price: "$12.00",
      prompt: STATIC_PROMPTS.DARK_MILK_STACK.prompt,
      staticSrc: `/images/generated/${STATIC_PROMPTS.DARK_MILK_STACK.filename}`
    }
  ];

  return (
    <section id="shop" className="py-24 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-6">
        <div className="flex justify-between items-end mb-12 border-b border-transparent">
          <div>
            <span className="text-cocoa-900/30 font-bold tracking-[0.2em] uppercase text-xs mb-3 block ml-1">Collection</span>
            <h2 className="font-serif text-5xl text-cocoa-900">Small Batch Bars</h2>
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hidden md:block text-sm font-semibold text-cocoa-900 border-b border-cocoa-900/30 pb-0.5 hover:text-orange-700 hover:border-orange-700 transition-colors mb-2"
          >
            View All Products
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-[2rem] bg-gray-100 aspect-square mb-6">
                <GenAIImage
                  prompt={product.prompt}
                  staticSrc={product.staticSrc}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  fallbackSrc="https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=600&auto=format&fit=crop"
                />
                <button className="absolute bottom-5 right-5 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-cocoa-900 hover:bg-cocoa-900 hover:text-white transition-colors z-10">
                  <i className="fa-solid fa-plus text-sm"></i>
                </button>
              </div>
              <div className="flex justify-between items-start px-1">
                <div>
                  <h3 className="font-serif text-2xl text-cocoa-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-cocoa-900/50 font-medium">{product.notes}</p>
                </div>
                <div className="font-medium text-lg text-cocoa-900 tracking-tight">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;