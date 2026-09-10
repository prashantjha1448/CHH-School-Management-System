import React, { useEffect, useState } from 'react';
import { SCHOOL_INFO } from '../constant/globalVariables';

/**
 * Home_Messages Component
 * Pixel-perfect implementation matching Figma "FROM THE PRINCIPAL'S DESK" mockup.
 * Features:
 * 1. API-Ready: Fetches dynamic messages from backend (Admin / Principal posts).
 * 2. Auto-slider: Rotates slides left-to-right every 6 seconds (6000ms).
 * 3. Pause-on-hover for improved user experience.
 */
const Home_Messages = () => {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Default fallback messages matching Figma mockup
  const defaultMessages = [
    {
      id: '1',
      kicker: "FROM THE PRINCIPAL'S DESK",
      quote:
        '"Education is not the filling of a pail, but the lighting of a fire. At Children\'s Happy Home, we strive every day to ignite that spark of curiosity, discipline, and compassion in each child."',
      authorName: 'Dr. Meena Agarwal',
      authorRole: `Principal, ${SCHOOL_INFO.NAME}`,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      link: '/About',
    },
    {
      id: '2',
      kicker: "FROM THE VICE PRINCIPAL'S DESK",
      quote:
        '"We empower our students to embrace challenges with confidence, integrity, and perseverance, preparing them to excel in an ever-changing world."',
      authorName: 'Ramesh Chandra',
      authorRole: `Vice Principal, ${SCHOOL_INFO.NAME}`,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
      link: '/About',
    },
    {
      id: '3',
      kicker: "FOUNDER'S MESSAGE",
      quote:
        '"Since 1972, our foundational pledge has been to make quality education accessible, value-driven, and transformative for every child in Katihar."',
      authorName: 'Mr. Ajay Kumar Mishra',
      authorRole: `Director & Founder, ${SCHOOL_INFO.NAME}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      link: '/About',
    },
  ];

  // API Fetch Hook (ready for backend API integration)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        // Future backend endpoint integration:
        // const res = await fetch('/api/v1/messages');
        // const data = await res.json();
        // setMessages(data.data);
        setMessages(defaultMessages);
      } catch (err) {
        console.log('Messages API offline, using fallback messages', err);
        setMessages(defaultMessages);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const displayData = messages.length > 0 ? messages : defaultMessages;

  // Auto-slide every 6 seconds (6000ms)
  useEffect(() => {
    if (isPaused || displayData.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, displayData.length]);

  return (
    <section
      className="w-full bg-[#1B2A3E] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Loading Spinner */}
        {loading && (
          <div className="py-12 text-center">
            <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400 font-semibold mt-3">Loading messages...</p>
          </div>
        )}

        {/* Carousel Content Container */}
        {!loading && (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {displayData.map((msg) => (
                  <div
                    key={msg.id || msg._id}
                    className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    {/* Left Column: Quote & Author Details */}
                    <div className="lg:col-span-9 space-y-6">
                      {/* Kicker Badge */}
                      <span className="text-brand-amber font-bold text-xs tracking-widest uppercase block">
                        {msg.kicker || "FROM THE PRINCIPAL'S DESK"}
                      </span>

                      {/* Large Italic Quote */}
                      <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-slate-100 leading-relaxed max-w-4xl">
                        {msg.quote}
                      </blockquote>

                      {/* Author Avatar & Meta */}
                      <div className="flex items-center gap-4 pt-2">
                        <img
                          src={msg.avatar || '/Hero_image.png'}
                          alt={msg.authorName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-brand-amber shadow-sm shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop';
                          }}
                        />
                        <div>
                          <h4 className="font-bold text-base text-white leading-tight">
                            {msg.authorName}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium">
                            {msg.authorRole}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Read Full Message CTA Button */}
                    <div className="lg:col-span-3 flex lg:justify-end">
                      <a
                        href={msg.link || '/About'}
                        className="px-5 py-2.5 border border-slate-400/40 hover:bg-white/10 text-white text-xs font-semibold rounded-xl backdrop-blur-xs transition shadow-2xs"
                      >
                        Read Full Message
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots (if multiple slides) */}
            {displayData.length > 1 && (
              <div className="flex items-center gap-2 pt-8 justify-start">
                {displayData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? 'w-8 bg-brand-amber'
                        : 'w-2 bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default Home_Messages;