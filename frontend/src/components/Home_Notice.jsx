import React, { useEffect, useState } from 'react';
import { getAllNotices, getSingleNotice } from '../api/notice';

/**
 * Home_Notice Component
 * Pixel-perfect implementation matching the Figma Notice Board / Latest Updates section mockup.
 * Fetches notices dynamically from API.
 */
const Home_Notice = () => {
  const [AllNotices, setAllNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const res = await getAllNotices();
        // Handle both axios res.data or direct array response
        const data = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.data) ? res.data.data : [];
        setAllNotices(data);
      } catch (error) {
        console.log('error in notes data api ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <section className="w-full bg-[#F4F4F6] py-16 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-brand-amber font-bold text-xs sm:text-sm tracking-widest uppercase block">
              LATEST UPDATES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Notice Board
            </h2>
          </div>

          <a
            href="/Notices"
            className="inline-flex items-center justify-center px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-lg shadow-2xs transition self-start sm:self-auto"
          >
            View All Notices
          </a>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-12 text-center">
            <div className="w-8 h-8 border-4 border-brand-amber border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-semibold mt-3">Loading latest notices...</p>
          </div>
        )}

        {/* Notice Cards 3-Column Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AllNotices.length > 0 ? (
              AllNotices.map((notice, idx) => (
                <div
                  key={notice.id || notice._id || idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group cursor-pointer"
                >
                  <div className="space-y-3">
                    {/* Category Badge & Date Row */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wider ${
                          notice.categoryType === 'general' || notice.category === 'GENERAL'
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-red-50 text-red-700 border border-red-100'
                        }`}
                      >
                        {notice.category || 'NOTICE'}
                      </span>

                      <span className="text-[11px] font-medium text-slate-400 font-mono">
                        {notice.date || notice.createdAt?.slice(0, 10) || ''}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-amber transition line-clamp-2">
                      {notice.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {notice.description || notice.content}
                    </p>
                  </div>

                  {/* Read More link */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-amber group-hover:translate-x-1 transition-transform">
                    <span>Read details</span>
                    <span>→</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-sm font-semibold text-slate-500">No notices posted yet.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default Home_Notice;