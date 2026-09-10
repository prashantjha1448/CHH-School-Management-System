/**
 * Children's Happy Home - Centralized Global Theme Variables & School Constants
 * Single source of truth for brand colors, typography, school metadata, and navigation paths.
 */

// ---------------- 1. BRAND & THEME COLOR TOKENS ----------------
export const THEME_COLORS = {
  // Brand Primary Amber / Gold
  AMBER_PRIMARY: '#D97706',
  AMBER_HOVER: '#B45309',
  GOLD_ACCENT: '#EAB308',
  GOLD_HOVER: '#CA8A04',
  GOLD_LIGHT_BG: '#FEF3C7',

  // Brand Navy & Dark Shades
  NAVY_PRIMARY: '#0F172A',
  NAVY_DARK: '#0B132B',
  NAVY_HEADER: '#0B1528',
  NAVY_CARD_BG: '#0F1C33',

  // Crest Emblem Royal Blue & Red
  CREST_BLUE: '#0043C6',
  CREST_BLUE_DARK: '#00359E',
  CREST_RED: '#DC0000',

  // Background Light Shades
  BG_PAGE_LIGHT: '#FAF9F6',
  BG_CARD_LIGHT: '#F8F9FA',
  BG_CARD_SUBTLE: '#F1F5F9',

  // Text Shades
  TEXT_DARK: '#111827',
  TEXT_NAVY: '#0F172A',
  TEXT_MUTED: '#64748B',
  TEXT_LIGHT: '#F8FAFC',
};

// ---------------- 2. TAILWIND CSS VARIABLE CLASSES ----------------
export const THEME_CLASSES = {
  bgNavbar: 'bg-[#FAF9F6]',
  bgHero: 'bg-[#0B132B]',
  bgHeroStat: 'bg-[#0F1C33]',
  bgAmber: 'bg-[#D97706]',
  bgAmberHover: 'hover:bg-[#B45309]',
  bgGold: 'bg-[#EAB308]',
  bgGoldHover: 'hover:bg-[#CA8A04]',
  textAmber: 'text-[#D97706]',
  textGold: 'text-[#EAB308]',
  textNavy: 'text-[#0F172A]',
  borderLight: 'border-slate-200/80',
};

// ---------------- 3. AUTHORITATIVE SCHOOL METADATA ----------------
export const SCHOOL_INFO = {
  NAME: "Children's Happy Home",
  SHORT_NAME: "CHH Katihar",
  MOTTO: "Knowledge is Power",
  TAGLINE: "Nurturing Minds, Building Futures",
  ESTABLISHED_YEAR: 1972,
  CBSE_AFFILIATION_NO: "330759",
  SCHOOL_CODE: "65759",
  PRINCIPAL: "Mr. Ajay Kumar Mishra",
  ADDRESS: "Near Gas Godown, Rojidpur, Katihar, Bihar - 854105",
  PHONES: {
    PRIMARY: "+91 78588 79081",
    ADMISSION: "+91 62035 60206",
    ACCOUNTS: "+91 73527 71509",
  },
  EMAIL: "contact@childrenshappyhome.com",
};

// ---------------- 4. MAIN PUBLIC NAVBAR NAVIGATION ----------------
export const PUBLIC_NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/About' },
  { label: 'Academics', path: '/Academics' },
  { label: 'Facilities', path: '/Facilities' },
  { label: 'Gallery', path: '/Gallery' },
  { label: 'CBSE Corner', path: '/CBSE_Corner' },
  { label: 'Contact', path: '/Contact' },
  { label: 'Notices', path: '/Notices' },
];
