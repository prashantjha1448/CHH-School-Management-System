import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const FacilitiesPages = () => {
  const facilitiesList = [
    {
      title: 'Advanced Science Laboratories',
      category: 'Academic Infra',
      description: 'Fully equipped, dedicated laboratories for Physics, Chemistry, and Biology designed to CBSE curriculum practical guidelines with strict safety protocols.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
      features: ['Individual experiment stations', 'Modern optical microscopes', 'Safety eyewash & fume hoods', 'Digital measurement sensors'],
    },
    {
      title: 'High-Tech Computer & Digital Lab',
      category: 'Technology',
      description: '80+ modern workstations with high-speed fiber internet, coding environments, educational software, and interactive digital multimedia terminals.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
      features: ['High-speed optical fiber connectivity', 'Python & Web Development tools', 'Robotics & STEM equipment', 'Dedicated lab assistants'],
    },
    {
      title: 'Central Digital Library & Reading Lounge',
      category: 'Knowledge Hub',
      description: 'Over 8,000 physical volumes, reference encyclopedias, national daily periodicals, CBSE exemplar books, and digital e-book reading kiosks.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
      features: ['Automated book checkout system', 'Quiet study individual carrels', 'NCERT & Olympiad reference sections', 'National & international periodicals'],
    },
    {
      title: 'Smart Interactive Classrooms',
      category: 'Classroom Infra',
      description: 'Well-ventilated, ergonomic classrooms featuring interactive interactive smart boards, audio-visual projections, and comfortable modular student seating.',
      image: '/Hero_image.png',
      features: ['Interactive multi-touch smart boards', 'Ergonomic dual-desk seating', 'Acoustic sound design', 'Natural lighting & cross-ventilation'],
    },
    {
      title: 'Sports Arena & Athletic Ground',
      category: 'Physical Education',
      description: 'Expansive outdoor athletic fields supporting football, cricket nets, basketball courts, badminton courts, and dedicated yoga and martial arts training.',
      image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=800&auto=format&fit=crop',
      features: ['Standard size football turf', 'Cricket practice turf pitches', 'Outdoor basketball court', 'Certified Physical Education coaches'],
    },
    {
      title: 'GPS-Tracked Safe School Transport',
      category: 'Logistics',
      description: 'A fleet of well-maintained school buses covering 6 primary routes across Katihar district, equipped with real-time GPS tracking, speed governors, and trained attendants.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
      features: ['Live GPS tracking for parents', 'Female attendants in each bus', 'First-aid kit & emergency alarms', 'Strict speed governor compliance'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between">
      <div>
        <NavBar activePath="/Facilities" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
          {/* Header */}
          <div className="space-y-3">
            <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest block">
              CAMPUS INFRASTRUCTURE
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
              World-Class Facilities for Holistic Development
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              At Children's Happy Home, we believe a modern, safe, and stimulating environment is the foundation for academic curiosity and personal growth.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilitiesList.map((facility, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative bg-slate-900">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = '/Hero_image.png'; }}
                    />
                    <div className="absolute top-3 left-3 bg-[#0F172A]/85 backdrop-blur-xs text-amber-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {facility.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#D97706] transition">
                      {facility.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {facility.description}
                    </p>
                    
                    <ul className="pt-2 space-y-1.5 border-t border-slate-100">
                      {facility.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-xs text-slate-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="/Contact"
                    className="inline-flex items-center text-xs font-bold text-[#D97706] hover:text-[#B45309] hover:underline gap-1 transition"
                  >
                    Enquire for Campus Tour →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Safety & Care Assurance Banner */}
          <div className="bg-[#FAF5ED] border border-amber-200/90 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                CAMPUS SAFETY ASSURANCE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A]">
                24/7 Monitored Safe & Secure Environment
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                The entire school premises is covered by over 60 high-definition CCTV cameras, trained security staff at all access gates, fire-fighting infrastructure, and an on-campus first-aid infirmary.
              </p>
            </div>
            <a
              href="/Contact"
              className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#D97706] hover:bg-[#B45309] rounded-xl shadow-xs shrink-0 transition"
            >
              Contact School Office
            </a>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default FacilitiesPages;
