import React from 'react';
import Logo from './Logo/Logo';
import { SCHOOL_INFO } from '../constant/globalVariables';

/**
 * Children's Happy Home Official Footer Component
 * Matches Figma screenshots media_1788995499059.png & media_1788995512818.png
 */
const Footer = () => {
  return (
    <footer className="w-full bg-[#0B1528] text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brand Info Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/90 p-1.5 rounded-lg shrink-0">
                <Logo height={36} />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              A CBSE-affiliated institution committed to holistic education, character development, and academic excellence for over five decades in Katihar, Bihar.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {['F', 'T', 'Y', 'I'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-7 h-7 rounded-full bg-slate-800 hover:bg-[#D97706] text-slate-300 hover:text-white flex items-center justify-center text-xs font-semibold transition"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="/About" className="hover:text-amber-400 transition">About School</a>
              </li>
              <li>
                <a href="/Academics" className="hover:text-amber-400 transition">Academic Programs</a>
              </li>
              <li>
                <a href="/Facilities" className="hover:text-amber-400 transition">Facilities</a>
              </li>
              <li>
                <a href="/CBSE_Corner" className="hover:text-amber-400 transition">CBSE Disclosure</a>
              </li>
              <li>
                <a href="/Notices" className="hover:text-amber-400 transition">Notice Board</a>
              </li>
              <li>
                <a href="/Contact" className="hover:text-amber-400 transition">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{SCHOOL_INFO.ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${SCHOOL_INFO.PHONES.PRIMARY}`} className="hover:text-white transition">
                  {SCHOOL_INFO.PHONES.PRIMARY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${SCHOOL_INFO.EMAIL}`} className="hover:text-white transition">
                  {SCHOOL_INFO.EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>8:00 AM – 4:00 PM (Mon–Sat)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} {SCHOOL_INFO.NAME}. All Rights Reserved.</p>
          <p>Affiliated to CBSE, New Delhi (Affiliation No. {SCHOOL_INFO.CBSE_AFFILIATION_NO})</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
