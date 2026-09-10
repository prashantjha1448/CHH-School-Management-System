import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { getAllNotices } from '../api/notice';

/**
 * NoticesPages Component
 * Matches Figma screenshot media_1788997051679.png
 * Fully API-driven with search, category filtering, lightbox detail view, and fallbacks.
 */
const NoticesPages = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeNotice, setActiveNotice] = useState(null);

  const categories = ['All', 'General', 'Admission', 'Examination', 'Holiday', 'Event', 'CBSE', 'Important'];

  // Sample Fallback notices matching Figma screenshot media_1788997051679.png
  const fallbackNotices = [
    {
      id: 'n1',
      title: 'Annual Sports Day — Registration Open',
      category: 'Event',
      isHighPriority: true,
      date: '2026-09-05',
      content: 'The Annual Sports Day will be held on 25th September 2026. All students from Class III to XII are encouraged to register for track events, field events, and team sports. Registration forms are available at the school office.',
      pdfUrl: '#',
    },
    {
      id: 'n2',
      title: 'Half-Yearly Examination Schedule 2026',
      category: 'Examination',
      isHighPriority: true,
      date: '2026-08-28',
      content: 'Half-yearly examinations will commence from 12th October 2026. Detailed timetable has been sent via the student portal and will be displayed on notice boards.',
      pdfUrl: '#',
    },
    {
      id: 'n3',
      title: 'Parent-Teacher Meeting — Class IX & X',
      category: 'General',
      isHighPriority: false,
      date: '2026-08-20',
      content: 'A Parent-Teacher Meeting is scheduled for Class IX and X students on 28th September 2026 from 10:00 AM to 1:00 PM. All parents are requested to attend.',
      pdfUrl: '#',
    },
    {
      id: 'n4',
      title: 'Fee Submission Deadline — September 2026',
      category: 'Admission',
      isHighPriority: false,
      date: '2026-08-15',
      content: 'The last date for fee submission for the month of September is 10th September 2026. Parents are requested to clear dues before the deadline to avoid late fees.',
      pdfUrl: '#',
    },
    {
      id: 'n5',
      title: 'Gandhi Jayanti Holiday',
      category: 'Holiday',
      isHighPriority: false,
      date: '2026-08-01',
      content: 'The school will remain closed on 2nd October 2026 on account of Gandhi Jayanti. Regular classes will resume on 3rd October 2026.',
      pdfUrl: '#',
    },
    {
      id: 'n6',
      title: 'CBSE Mandatory Public Disclosure 2026–27',
      category: 'CBSE',
      isHighPriority: true,
      date: '2026-07-30',
      content: 'As per CBSE Circular No. Acad-05/2026, the updated mandatory public disclosure documents including affiliation letter, NOC, building safety certificate, and DEO certificate have been published on the CBSE Corner tab.',
      pdfUrl: '#',
    },
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const res = await getAllNotices();
        let list = [];
        if (res?.data?.data && Array.isArray(res.data.data)) {
          list = res.data.data;
        } else if (Array.isArray(res?.data)) {
          list = res.data;
        }

        if (list.length > 0) {
          setNotices(list);
        } else {
          setNotices(fallbackNotices);
        }
      } catch (err) {
        console.warn('Backend API /notices not reachable, using sample notices data.');
        setNotices(fallbackNotices);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Filter Notices based on Search Query & Category
  const filteredNotices = notices.filter((notice) => {
    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'Important'
        ? notice.isHighPriority || notice.priority === 'High'
        : notice.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === '' ||
      notice.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between">
      <div>
        <NavBar activePath="/Notices" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          
          {/* Header Subtitle & Title */}
          <div className="mb-8">
            <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest block mb-1">
              ANNOUNCEMENTS
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
              Notice Board
            </h1>
          </div>

          {/* Search Bar & Category Filter Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8">
            
            {/* Search Input Box */}
            <div className="relative w-full lg:w-72 shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition shadow-2xs text-slate-800 placeholder-slate-400"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs rounded-lg border transition-all duration-150 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-medium'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Notices Cards List */}
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-white rounded-xl border border-slate-200/80 p-6"></div>
              ))}
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200/80">
              <p className="text-slate-500 text-sm font-medium">No notices found matching your search or category criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotices.map((item) => (
                <div
                  key={item.id || item._id}
                  onClick={() => setActiveNotice(item)}
                  className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 sm:p-6 hover:border-amber-400/80 transition-all duration-200 cursor-pointer space-y-3 group"
                >
                  {/* Notice Badges & Date Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* Category Tag */}
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200/80 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        {item.category || 'NOTICE'}
                      </span>

                      {/* High Priority Tag */}
                      {(item.isHighPriority || item.priority === 'High') && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          HIGH PRIORITY
                        </span>
                      )}
                    </div>

                    {/* Publication Date */}
                    <span className="text-xs text-slate-400 font-mono font-medium">
                      {item.date || item.createdAt?.substring(0, 10) || '2026-09-01'}
                    </span>
                  </div>

                  {/* Notice Title */}
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#D97706] transition leading-snug">
                    {item.title}
                  </h3>

                  {/* Notice Snippet */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {item.content || item.description}
                  </p>

                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* NOTICE DETAILS MODAL */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl space-y-6 relative animate-in fade-in zoom-in duration-150">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveNotice(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg transition cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Badges & Date */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200/80 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  {activeNotice.category || 'NOTICE'}
                </span>
                {(activeNotice.isHighPriority || activeNotice.priority === 'High') && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    HIGH PRIORITY
                  </span>
                )}
              </div>

              <span className="text-xs text-slate-400 font-mono font-medium">
                Published: {activeNotice.date || activeNotice.createdAt?.substring(0, 10) || '2026-09-01'}
              </span>
            </div>

            {/* Full Title */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A]">
              {activeNotice.title}
            </h2>

            {/* Content Body */}
            <div className="border-t border-slate-100 pt-4 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {activeNotice.content || activeNotice.description}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {activeNotice.pdfUrl ? (
                <a
                  href={activeNotice.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition inline-flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Attachment (PDF)
                </a>
              ) : <div></div>}

              <button
                onClick={() => setActiveNotice(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#D97706] hover:bg-[#B45309] rounded-lg transition cursor-pointer"
              >
                Close Notice
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default NoticesPages;