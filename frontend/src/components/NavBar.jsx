import React from 'react';
import Logo from './Logo/Logo';
import { PUBLIC_NAV_LINKS } from '../constant/globalVariables';

/**
 * Children's Happy Home Official Navbar Component
 * Refactored to use centralized global variables and theme tokens.
 */
const NavBar = ({ activePath = '/' }) => {
  return (
    <header className="w-full bg-[#FAF9F6] border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <a href="/" className="flex items-center shrink-0 hover:opacity-95 transition">
          <Logo height={38} />
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {PUBLIC_NAV_LINKS.map((item) => {
            const isActive = activePath === item.path;
            return (
              <a
                key={item.label}
                href={item.path}
                className={`transition-colors font-medium ${
                  isActive
                    ? 'text-[#D97706] font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/login"
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition shadow-2xs"
          >
            Login
          </a>
          <a
            href="/Contact"
            className="px-4 py-2 text-xs font-bold text-white bg-[#D97706] hover:bg-[#B45309] rounded-lg shadow-sm transition"
          >
            Admissions
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;