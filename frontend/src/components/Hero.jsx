import React from 'react';
import { SCHOOL_INFO } from '../constant/globalVariables';

/**
 * Children's Happy Home Official Hero Component
 * Refactored to use centralized global variables and theme tokens.
 */
const Hero = () => {
  return (
    <section className="relative w-full bg-brand-navy-dark text-white overflow-hidden">
      {/* Background Image & Gradient Overlay Container */}
      <div className="relative min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] flex items-center">
        {/* Background Image */}
        <img
          src="/Hero_image.png"
          alt={`${SCHOOL_INFO.NAME} Campus Classroom`}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay for Dark Vignette & High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-header/95 via-brand-navy-header/85 to-brand-navy-header/35" />

        {/* Hero Content Area */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full z-10">
          <div className="max-w-2xl space-y-6">
            {/* Top Badges: Affiliation No & ESTD Year */}
            <div className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-wider">
              <span className="bg-brand-navy/80 border border-slate-500/80 text-white px-3 py-1 rounded uppercase">
                CBSE AFFILIATION NO. {SCHOOL_INFO.CBSE_AFFILIATION_NO}
              </span>
              <span className="w-5 h-[1px] bg-slate-400/60" />
              <span className="bg-brand-navy/80 border border-slate-500/80 text-slate-200 px-2.5 py-1 rounded">
                Est. {SCHOOL_INFO.ESTABLISHED_YEAR}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                Nurturing Minds,
              </h1>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-gold tracking-tight leading-tight">
                Building Futures
              </h1>
            </div>

            {/* Description Paragraph */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl pt-1">
              {SCHOOL_INFO.NAME} has been a beacon of quality education in
              Katihar for over five decades. A CBSE-affiliated school offering
              Nursery through Class XII.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/admissions"
                className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-slate-950 font-bold text-sm rounded-lg shadow-md transition transform active:scale-95"
              >
                Apply for Admission
              </a>
              <a
                href="/About"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-slate-400/40 text-white font-semibold text-sm rounded-lg transition backdrop-blur-xs"
              >
                Explore School
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stat Bar (4 Columns) matching Figma Design */}
      <div className="bg-brand-navy-card border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800/80">
          <div className="p-4 sm:p-6 text-center">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-gold">
              {SCHOOL_INFO.ESTABLISHED_YEAR}
            </h3>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
              ESTABLISHED
            </p>
          </div>

          <div className="p-4 sm:p-6 text-center">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-gold">
              CBSE
            </h3>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
              AFFILIATION
            </p>
          </div>

          <div className="p-4 sm:p-6 text-center">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-gold">
              Nursery – XII
            </h3>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
              CLASSES
            </p>
          </div>

          <div className="p-4 sm:p-6 text-center">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-gold">
              Katihar, Bihar
            </h3>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
              LOCATION
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;