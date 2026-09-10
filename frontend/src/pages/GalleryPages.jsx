import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { getGalleryItems } from '../api/gallery';

/**
 * GalleryPages Component
 * Matches Figma screenshot media_1788996875860.png
 * Fully API-driven with category filtering, lightbox, and graceful fallbacks.
 */
const GalleryPages = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLightbox, setActiveLightbox] = useState(null);

  // Category Filter Options
  const categories = ['All', 'Campus', 'Events', 'Sports', 'Annual Function', 'Classrooms'];

  // Fallback dataset if backend API has no data or is offline
  const fallbackGallery = [
    {
      id: 'g1',
      title: 'Modern Interactive Classroom',
      category: 'Classrooms',
      imageUrl: '/Hero_image.png',
      caption: 'Spacious CBSE classrooms equipped with digital smart boards and ergonomic furniture.',
    },
    {
      id: 'g2',
      title: 'Annual Cultural Function Auditorium',
      category: 'Annual Function',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      caption: 'Students performing at the annual cultural gala in the main auditorium.',
    },
    {
      id: 'g3',
      title: 'Inter-School Sports Ground',
      category: 'Sports',
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      caption: 'State-of-the-art football turf and athletic grounds.',
    },
    {
      id: 'g4',
      title: 'Annual Sports Meet Opening',
      category: 'Annual Function',
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
      caption: 'Enthusiastic participation during the annual intra-house sports competition.',
    },
    {
      id: 'g5',
      title: 'Digital Smart Class Lecture',
      category: 'Classrooms',
      imageUrl: '/Hero_image.png',
      caption: 'Interactive digital learning environment fostering visual concept comprehension.',
    },
    {
      id: 'g6',
      title: 'New Science & Tech Infrastructure',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
      caption: 'Ongoing campus expansion featuring advanced Physics, Chemistry, and Bio labs.',
    },
    {
      id: 'g7',
      title: 'Athletics & Cycling Tournament',
      category: 'Sports',
      imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80',
      caption: 'Students competing in the annual district athletic championship.',
    },
    {
      id: 'g8',
      title: 'Parent Teacher Interactive Session',
      category: 'Events',
      imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      caption: 'Regular collaborative sessions between parents and educators.',
    },
    {
      id: 'g9',
      title: 'Central Library & Knowledge Hub',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      caption: 'Extensive collection of reference books, encyclopedias, and digital journals.',
    },
  ];

  // Fetch Gallery Items from Backend API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getGalleryItems(selectedCategory);
        
        let fetchedData = [];
        if (res?.data?.data && Array.isArray(res.data.data)) {
          fetchedData = res.data.data;
        } else if (Array.isArray(res?.data)) {
          fetchedData = res.data;
        }

        if (fetchedData.length > 0) {
          setGalleryItems(fetchedData);
        } else {
          // Filter fallback data client-side if API returned empty array
          const filtered = selectedCategory === 'All'
            ? fallbackGallery
            : fallbackGallery.filter(item => item.category === selectedCategory);
          setGalleryItems(filtered);
        }
      } catch (err) {
        console.warn('Backend API /gallery not reachable, displaying sample gallery data.');
        const filtered = selectedCategory === 'All'
          ? fallbackGallery
          : fallbackGallery.filter(item => item.category === selectedCategory);
        setGalleryItems(filtered);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between">
      <div>
        <NavBar activePath="/Gallery" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          
          {/* Header & Subtitle */}
          <div className="mb-8">
            <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest block mb-1">
              GALLERY
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
              Life at CHH
            </h1>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-6 mb-4">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 text-xs sm:text-sm rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0F172A] text-white font-bold shadow-xs'
                      : 'bg-slate-200/70 hover:bg-slate-300 text-slate-700 font-semibold'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Gallery Items Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div key={idx} className="h-60 bg-slate-200/80 rounded-2xl"></div>
              ))}
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80">
              <p className="text-slate-500 text-sm font-medium">No gallery items found for this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id || item._id}
                  onClick={() => setActiveLightbox(item)}
                  className="group relative h-60 sm:h-64 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/80 bg-slate-900 cursor-pointer"
                >
                  {/* Image */}
                  <img
                    src={item.imageUrl || item.image || '/Hero_image.png'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/Hero_image.png';
                    }}
                  />

                  {/* Dark Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  {/* Expand icon badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6v6m0-6L14 10M9 21H3v-6m0 6l7-7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-slate-800 animate-in fade-in zoom-in duration-150">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-950/60 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Preview */}
            <div className="w-full max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightbox.imageUrl || activeLightbox.image || '/Hero_image.png'}
                alt={activeLightbox.title}
                className="w-full h-full object-contain max-h-[65vh]"
              />
            </div>

            {/* Details Footer */}
            <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                  {activeLightbox.category}
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                {activeLightbox.title}
              </h3>
              {activeLightbox.caption && (
                <p className="text-xs sm:text-sm text-slate-400">
                  {activeLightbox.caption}
                </p>
              )}
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPages;