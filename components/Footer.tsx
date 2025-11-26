import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="mt-20 border-t border-cocoa-900/5 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-cocoa-900/60 pb-10">
      <div>&copy; {new Date().getFullYear()} Cacao Inc.</div>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-cocoa-900 transition-colors">Privacy</a>
        <a href="#" className="hover:text-cocoa-900 transition-colors">Terms</a>
        <a href="#" className="hover:text-cocoa-900 transition-colors">Sitemap</a>
      </div>
    </div>
  );
};

export default Footer;