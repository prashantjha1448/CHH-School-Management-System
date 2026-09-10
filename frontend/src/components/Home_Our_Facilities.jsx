import React, { useEffect, useState } from 'react';
import { THEME_CLASSES } from '../constant/globalVariables';

/**
 * Our_Facilities Component
 * Pixel-perfect implementation matching Figma "World-Class Infrastructure" section mockup.
 * Built API-ready: fetches from backend API with fallback data if API is not yet live.
 */
const Our_Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Default fallback facilities data matching Figma mockup
  const defaultFacilities = [
    {
      id: '1',
      title: 'Science Laboratories',
      description: 'Fully equipped physics, chemistry and biology labs',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'Digital Library',
      description: 'Over 8,000 volumes with digital catalog access',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '3',
      title: 'Computer Lab',
      description: '80-seat computer lab with high-speed internet',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '4',
      title: 'Sports Grounds',
      description: 'Cricket, football, basketball, athletics tracks',
      image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '5',
      title: 'School Transport',
      description: 'Fleet of GPS-tracked school buses on 6 routes',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '6',
      title: 'Safe Campus',
      description: 'CCTV surveillance and trained security staff',
      image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=800&auto=format&fit=crop',
    },
  ];

  useEffect(() => {
    // API-ready hook structure: Replace endpoint when backend API is live
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        // Example future API call:
        // const res = await fetch('/api/v1/facilities');
        // const data = await res.json();
        // setFacilities(data.data);
        setFacilities(defaultFacilities);
      } catch (err) {
        console.log('Facilities API offline, using default facilities', err);
        setFacilities(defaultFacilities);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const displayData = facilities.length > 0 ? facilities : defaultFacilities;

  return (
    <section className="w-full bg-brand-bg-light py-16 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header (Centered) */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-brand-amber font-bold text-xs sm:text-sm tracking-widest uppercase block">
            OUR FACILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            World-Class Infrastructure
          </h2>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-12 text-center">
            <div className="w-8 h-8 border-4 border-brand-amber border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-semibold mt-3">Loading facilities...</p>
          </div>
        )}

        {/* 6 Feature Cards (3-Column x 2-Row Grid) */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayData.map((item) => (
              <div
                key={item.id || item._id}
                className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={item.image || item.imageUrl || '/Hero_image.png'}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-colors" />

                {/* Content at Bottom-Left */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1 z-10">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-brand-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Our_Facilities;