import React from 'react';
import { SCHOOL_INFO } from '../constant/globalVariables';

/**
 * Home_About_deatils Component
 * Pixel-perfect implementation matching the Figma About Section mockup.
 *
 * IMAGE PLOCATION:
 * Place your image at: frontend/public/Home_About_deatils_image.jpg
 */
const Home_About_deatils = () => {
  return (
    <section className="w-full bg-brand-bg-light py-16 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content & Stats */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Kicker */}
            <span className="text-brand-amber font-bold text-xs sm:text-sm tracking-widest uppercase block">
              ABOUT OUR SCHOOL
            </span>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
              A Legacy of Excellence Since {SCHOOL_INFO.ESTABLISHED_YEAR}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Founded with a vision to provide quality education to the children of Katihar
                and surrounding regions, {SCHOOL_INFO.NAME} has grown into one of the
                most respected CBSE schools in North Bihar.
              </p>
              <p>
                Our holistic approach to education — balancing academic rigor with sports,
                arts, and character development — has produced thousands of successful
                alumni across diverse fields.
              </p>
            </div>

            {/* 3 Stat Counters */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80">
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">
                  50+
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                  Years of Excellence
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">
                  1,200+
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                  Students Enrolled
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">
                  80+
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                  Faculty Members
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="/About"
                className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition"
              >
                Learn More About CHH
              </a>
            </div>
          </div>

          {/* Right Column: Image Card with Orange Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
              {/* Main Image */}
              <img
                src="/Home_About_deatils_image.jpg"
                alt={`${SCHOOL_INFO.NAME} Students in Classroom`}
                className="w-full h-[380px] sm:h-[440px] object-cover object-center block"
                onError={(e) => {
                  // Fallback visual if image file is not yet pasted in public/
                  e.currentTarget.src = "/Hero_image.png";
                }}
              />

              {/* Bottom-Left Orange CBSE Badge Overlay */}
              <div className="absolute bottom-4 left-4 bg-brand-amber text-white p-4 rounded-2xl shadow-lg border border-amber-500 min-w-[150px]">
                <h4 className="text-xl sm:text-2xl font-serif font-extrabold leading-none">
                  {SCHOOL_INFO.CBSE_AFFILIATION_NO}
                </h4>
                <p className="text-[11px] font-medium text-amber-100 mt-1">
                  CBSE Affiliation No.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Home_About_deatils;