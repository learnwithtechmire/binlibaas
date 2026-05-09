import React, { useEffect } from 'react';

const Wishlist = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-ivory min-h-screen text-charcoal pt-32">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold uppercase tracking-widest border-b border-gold pb-4 mb-8">My Wishlist</h1>
        <div className="bg-white p-8 shadow-sm border border-gray-100 text-center py-20">
          <p className="text-gray-500 tracking-widest text-sm uppercase">Your wishlist is currently empty.</p>
          <a href="/products" className="inline-block mt-6 bg-charcoal text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold transition-colors">Discover Collections</a>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
