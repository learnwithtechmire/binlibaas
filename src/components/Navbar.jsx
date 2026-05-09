import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, Mail, Search, Heart, User, Globe } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../pages/CartContext.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();
  const [showAddedNotify, setShowAddedNotify] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(0);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (cartCount > prevCartCount) {
      setShowAddedNotify(true);
      const timer = setTimeout(() => setShowAddedNotify(false), 3000);
      setPrevCartCount(cartCount);
      return () => clearTimeout(timer);
    }
    setPrevCartCount(cartCount);
  }, [cartCount]);

  // Pages with dark hero sections need white navbar text
  const darkHeroPages = ['/about', '/contact', '/privacy-policy', '/disclaimer', '/shipping', '/store-locator', '/blogs', '/fabric-glossary', '/feedback-survey', '/faqs'];
  const isDarkHeroPage = darkHeroPages.some(path => location.pathname === path);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : isDarkHeroPage ? 'bg-charcoal/90 py-4' : 'bg-transparent py-6'}`}>
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img src="/site_logo.png" alt="Bin Labas Logo" className="h-10 w-auto object-contain" />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-8 flex items-baseline space-x-6 lg:space-x-8">
              
              {/* NEW IN Mega Menu */}
              <div className="group">
                <a href="/products" className={`${scrolled || isDarkHeroPage ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors duration-300 uppercase text-xs font-bold tracking-[0.2em] pb-8`}>
                  New In
                </a>
                <div className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 top-[70px] pointer-events-none group-hover:pointer-events-auto">
                  <div className="max-w-[1440px] mx-auto px-8 py-12 flex justify-between">
                    <div className="grid grid-cols-2 gap-12 w-2/3 pr-12">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-extrabold tracking-widest text-charcoal uppercase">Women</h4>
                        <ul className="space-y-3">
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">SPRING SUMMER'26 <span className="text-pink-400">🌸</span></a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">READY TO STITCH</a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">READY TO WEAR</a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">HAND BAGS</a></li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-extrabold tracking-widest text-charcoal uppercase">Home</h4>
                        <ul className="space-y-3">
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">BEDROOM</a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">LIVING ROOM</a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">KITCHEN & DINING ROOM</a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">BATHROOM</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-1/3 flex gap-6">
                      <div className="flex-1 space-y-4 text-center group/card cursor-pointer">
                        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                          <img src="https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&q=80&w=800" alt="Spring" className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                        </div>
                        <p className="text-[9px] tracking-widest text-charcoal mt-1 font-bold uppercase">SPRING SUMMER'26 <span className="text-pink-400">🌸</span></p>
                      </div>
                      <div className="flex-1 space-y-4 text-center group/card cursor-pointer">
                        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" alt="Eid" className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                        </div>
                        <p className="text-[9px] tracking-widest text-charcoal mt-1 font-bold uppercase">RTW: EID EDIT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WOMEN Mega Menu */}
              <div className="group">
                <a href="/products" className={`${scrolled || isDarkHeroPage ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors duration-300 uppercase text-xs font-bold tracking-[0.2em] pb-8`}>
                  Women
                </a>
                <div className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 top-[70px] pointer-events-none group-hover:pointer-events-auto">
                  <div className="max-w-[1440px] mx-auto px-8 py-12 flex justify-between">
                    <div className="grid grid-cols-3 gap-12 w-2/3 pr-12">
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-extrabold tracking-widest text-charcoal uppercase">READY TO STITCH</h4>
                          <ul className="space-y-3">
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">SPRING SUMMER'26 <span className="text-pink-400">🌸</span></a></li>
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">BASICS</a></li>
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">ESSENTIALS</a></li>
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">SIGNATURE</a></li>
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">CAPSULE</a></li>
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">LUXE</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-extrabold tracking-widest text-charcoal uppercase">READY TO WEAR</h4>
                          <ul className="space-y-3">
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">BASICS</a></li>
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">ESSENTIALS</a></li>
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">SIGNATURE</a></li>
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">LUXE</a></li>
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">FUSION</a></li>
                            <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">MODEST</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-4">
                          <h4 className="text-[10px] font-extrabold tracking-widest text-charcoal flex items-center uppercase">
                            ACCESSORIES <span className="ml-2 text-[8px] text-[#ff3333] font-bold bg-red-50 px-1 py-0.5 rounded">NEW</span>
                          </h4>
                          <ul className="space-y-3">
                            <li><Link to="/products?category=Accessories" className="text-[11px] text-gray-500 hover:text-gold font-medium">HAND BAGS</Link></li>
                            <li><Link to="/products?category=Accessories" className="text-[11px] text-gray-500 hover:text-gold font-medium">JEWELRY</Link></li>
                          </ul>
                        </div>
                    </div>
                    <div className="w-1/3 flex gap-6">
                      <div className="flex-1 space-y-4 text-center group/card cursor-pointer">
                        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                          <img src="https://binlabasonline.store/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-17-at-6.49.08-PM.jpeg" alt="Capsule" className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                        </div>
                        <div>
                          <h5 className="text-[10px] font-bold tracking-widest text-charcoal">CAPSULE</h5>
                          <p className="text-[9px] tracking-widest text-gray-400 mt-1">LATEST DROPS</p>
                        </div>
                      </div>
                      <div className="flex-1 space-y-4 text-center group/card cursor-pointer">
                        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                          <img src="https://binlabasonline.store/wp-content/uploads/2026/02/Gemini_Generated_Image_x46tqfx46tqfx46t.png" alt="Women RTW" className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                        </div>
                        <div>
                          <h5 className="text-[10px] font-bold tracking-widest text-charcoal">WOMEN RTW</h5>
                          <p className="text-[9px] tracking-widest text-gray-400 mt-1">LATEST DROPS</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HOME Mega Menu */}
              <div className="group">
                <a href="/products?category=home" className={`${scrolled || isDarkHeroPage ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors duration-300 uppercase text-xs font-bold tracking-[0.2em] pb-8`}>
                  Home
                </a>
                <div className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 top-[70px] pointer-events-none group-hover:pointer-events-auto">
                  <div className="max-w-[1440px] mx-auto px-8 py-12 flex justify-between">
                    <div className="grid grid-cols-2 gap-16 w-2/3 pr-12">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-extrabold tracking-widest text-charcoal uppercase">CUSTOMER CARE</h4>
                        <ul className="space-y-3">
                          <li><a href="/contact" className="text-[11px] text-gray-500 hover:text-gold font-medium">Contact Us</a></li>
                          <li><a href="/feedback-survey" className="text-[11px] text-gray-500 hover:text-gold font-medium">Feedback Survey</a></li>
                          <li><a href="/privacy-policy" className="text-[11px] text-gray-500 hover:text-gold font-medium">Privacy Policy</a></li>
                          <li><a href="/faqs" className="text-[11px] text-gray-500 hover:text-gold font-medium">FAQs</a></li>
                          <li><a href="/disclaimer" className="text-[11px] text-gray-500 hover:text-gold font-medium">Disclaimer</a></li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-extrabold tracking-widest text-charcoal uppercase">INFORMATION</h4>
                        <ul className="space-y-3">
                          <li><Link to="/about" className="text-[11px] text-gray-500 hover:text-gold font-medium">About Us</Link></li>
                          <li><Link to="/shipping" className="text-[11px] text-gray-500 hover:text-gold font-medium">Shipping and Handling</Link></li>
                          <li><Link to="/store-locator" className="text-[11px] text-gray-500 hover:text-gold font-medium">Store Locator</Link></li>
                          <li><Link to="/blogs" className="text-[11px] text-gray-500 hover:text-gold font-medium">Blogs</Link></li>
                          <li><Link to="/fabric-glossary" className="text-[11px] text-gray-500 hover:text-gold font-medium">Fabric Glossary</Link></li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-1/3 flex justify-end">
                      <div className="w-64 space-y-4 text-center group/card cursor-pointer">
                        <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" alt="Customer Service" className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                        </div>
                        <p className="text-[9px] tracking-widest text-gray-400 mt-2 font-bold uppercase">WE ARE HERE TO HELP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SALE Mega Menu */}
              <div className="group">
                <a href="/products?sale=true" className={`${scrolled ? 'text-[#FEBE59]' : 'text-[#FEBE59]'} hover:text-gold transition-colors duration-300 uppercase text-xs font-bold tracking-[0.2em] pb-8`}>
                  Sale
                </a>
                <div className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 top-[70px] pointer-events-none group-hover:pointer-events-auto">
                  <div className="max-w-[1440px] mx-auto px-8 py-12 flex justify-between">
                    <div className="grid grid-cols-2 gap-12 w-3/4 pr-12">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-extrabold tracking-widest text-charcoal uppercase">SHOP BY COLLECTION</h4>
                        <ul className="space-y-3">
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">SPECIAL PRICE</a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">SPRING SUMMER</a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">WINTER SALE</a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">CLEARANCE</a></li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-extrabold tracking-widest text-charcoal uppercase">WOMEN SALE</h4>
                        <ul className="space-y-3">
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">READY TO STITCH</a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">READY TO WEAR</a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">UNSTITCHED</a></li>
                          <li><a href="#" className="text-[11px] text-gray-500 hover:text-gold font-medium">ACCESSORIES</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-1/4 flex justify-end">
                      <div className="w-64 text-center group/card cursor-pointer">
                        <div className="bg-white border-[6px] border-[#ff3333] p-8 aspect-[3/4] flex flex-col items-center justify-center relative shadow-lg">
                          <h2 className="text-[40px] font-black uppercase text-charcoal leading-[0.8] tracking-tighter">REAL</h2>
                          <h2 className="text-[40px] font-black uppercase text-charcoal leading-[0.8] tracking-tighter mt-1">RELIEF</h2>
                          <div className="mt-4 flex flex-col items-center">
                            <span className="bg-charcoal text-white py-1 px-3 text-[10px] font-bold uppercase tracking-widest">UP TO</span>
                            <div className="flex items-start mt-2">
                              <span className="text-8xl font-black text-[#ff3333] leading-none tracking-tighter">60</span>
                              <span className="text-4xl font-black text-[#ff3333] mt-2">%</span>
                            </div>
                            <span className="bg-charcoal text-white py-1 px-3 text-[10px] font-bold uppercase tracking-widest mt-1">OFF</span>
                          </div>
                        </div>
                        <p className="text-[10px] tracking-widest text-gray-400 mt-4 uppercase font-bold">SALE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="flex items-center space-x-5">

            {/* Search Widget */}
            <div className="relative flex items-center">
              <form 
                onSubmit={handleSearchSubmit}
                className={`absolute right-full top-1/2 -translate-y-1/2 flex items-center transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-40 md:w-56 opacity-100 mr-4' : 'w-0 opacity-0'}`}
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full bg-transparent border-b ${scrolled || isDarkHeroPage ? 'border-white/50 text-white placeholder-white/50' : 'border-charcoal/30 text-charcoal placeholder-charcoal/50'} focus:outline-none focus:border-gold py-1 text-xs`}
                  autoFocus={isSearchOpen}
                />
              </form>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`${scrolled || isDarkHeroPage ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors`}
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>
            </div>
            
            {/* Country Selector - Hidden on mobile */}
            <div className="hidden md:flex relative items-center group cursor-pointer py-2">
              <Globe size={18} className={`${scrolled || isDarkHeroPage ? 'text-white' : 'text-charcoal'} group-hover:text-gold transition-colors`} />
              <span className={`ml-1 text-[10px] font-bold ${scrolled || isDarkHeroPage ? 'text-white' : 'text-charcoal'} group-hover:text-gold uppercase transition-colors`}>PK</span>
              <div className="absolute top-full right-0 bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[200px]">
                <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 text-[11px] uppercase tracking-widest font-bold cursor-pointer text-charcoal">Pakistan (PKR)</div>
                <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 text-[11px] uppercase tracking-widest font-bold cursor-pointer text-charcoal">United Arab Emirates (AED)</div>
                <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 text-[11px] uppercase tracking-widest font-bold cursor-pointer text-charcoal">United States (USD)</div>
                <div className="px-4 py-3 hover:bg-gray-50 text-[11px] uppercase tracking-widest font-bold cursor-pointer text-charcoal">United Kingdom (GBP)</div>
              </div>
            </div>

            <Link to="/auth" className={`hidden md:block ${scrolled || isDarkHeroPage ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors`}>
              <User size={20} />
            </Link>
            
            <Link to="/wishlist" className={`hidden md:block ${scrolled || isDarkHeroPage ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors`}>
              <Heart size={20} />
            </Link>

            <Link to="/cart" className={`relative ${scrolled || isDarkHeroPage ? 'text-white' : 'text-charcoal'} hover:text-gold transition-colors`}>
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                  {cartCount}
                </span>
              )}
              {/* Added to Cart Pop-up */}
              {showAddedNotify && (
                <div className="absolute top-12 right-0 bg-gold text-white text-[10px] font-bold py-2 px-4 whitespace-nowrap shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 rounded-lg">
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-gold rotate-45"></div>
                  Item Added!
                </div>
              )}
            </Link>
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className={`${scrolled || isDarkHeroPage ? 'text-white' : 'text-charcoal'}`}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      </nav>

      {/* Mobile Menu - Full Screen Overlay (Moved outside nav to avoid stacking issues) */}
      <div className={`md:hidden fixed inset-0 bg-[#000000] z-[100] transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center px-4 py-6 border-b border-white/10">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img src="/site_logo.png" alt="Bin Libas Logo" className="h-8 w-auto object-contain" />
            </Link>
            <button onClick={() => setIsOpen(false)} className="text-white p-2">
              <X size={28} />
            </button>
          </div>
          
          <div className="px-6 py-8 space-y-6 h-full overflow-y-auto">
            <Link to="/" className="block text-white hover:text-gold uppercase text-sm font-semibold tracking-widest py-2 border-b border-white/10" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/products" className="block text-white hover:text-gold uppercase text-sm font-semibold tracking-widest py-2 border-b border-white/10" onClick={() => setIsOpen(false)}>New Arrivals</Link>
            <Link to="/category/unstitched" className="block text-white hover:text-gold uppercase text-sm font-semibold tracking-widest py-2 border-b border-white/10" onClick={() => setIsOpen(false)}>Unstitched</Link>
            <Link to="/category/ready-to-wear" className="block text-white hover:text-gold uppercase text-sm font-semibold tracking-widest py-2 border-b border-white/10" onClick={() => setIsOpen(false)}>Ready to Wear</Link>
            <Link to="/category/luxe-edition" className="block text-white hover:text-gold uppercase text-sm font-semibold tracking-widest py-2 border-b border-white/10" onClick={() => setIsOpen(false)}>Luxe Edition</Link>
            <Link to="/category/accessories" className="block text-white hover:text-gold uppercase text-sm font-semibold tracking-widest py-2 border-b border-white/10" onClick={() => setIsOpen(false)}>Accessories</Link>
            <Link to="/about" className="block text-white hover:text-gold uppercase text-sm font-semibold tracking-widest py-2 border-b border-white/10" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" className="block text-white hover:text-gold uppercase text-sm font-semibold tracking-widest py-2 border-b border-white/10" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/products" className="block text-[#FEBE59] hover:text-gold uppercase text-sm font-semibold tracking-widest py-2 border-b border-white/10" onClick={() => setIsOpen(false)}>Sale</Link>
            
            {/* Mobile Menu Footer - Country, Account, Wishlist */}
            <div className="pt-6 mt-6 border-t border-white/20">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Settings & Account</p>
              <div className="flex flex-wrap gap-6">
                {/* Country Selector */}
                <div className="flex items-center gap-2 text-white">
                  <Globe size={20} className="text-gold" />
                  <span className="text-sm font-bold uppercase">PK</span>
                </div>
                <a href="/auth" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-white hover:text-gold transition-colors">
                  <User size={20} />
                  <span className="text-sm">Account</span>
                </a>
                <a href="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-white hover:text-gold transition-colors">
                  <Heart size={20} />
                  <span className="text-sm">Wishlist</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
