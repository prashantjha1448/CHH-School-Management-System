import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { THEME_COLORS } from '../constant/globalVariables';

/**
 * Home_Addmission Banner Component
 * Matches Figma screenshot media_1788995441510.png
 * Fetches admission data from backend API with seamless fallback.
 */
const Home_Addmission = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [admissionData, setAdmissionData] = useState({
    session: '2026–27',
    title: 'Admissions Open for 2026–27',
    subtitle: "Enrol your child at one of Katihar's finest CBSE schools. Limited seats available for Nursery to Class XII.",
    applyBtnText: 'Apply Now',
    feeStructureBtnText: 'View Fee Structure',
    isOpen: true,
  });

  useEffect(() => {
    const fetchAdmissionData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admission');
        if (res?.data?.data) {
          setAdmissionData((prev) => ({ ...prev, ...res.data.data }));
        } else if (res?.data) {
          setAdmissionData((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        // Silently fallback to default frontend data if backend endpoint is not active
        console.warn('Backend /api/v1/admission API not reachable, using default admission data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissionData();
  }, []);

  // Handle CTA Navigation
  const handleApplyClick = () => {
    navigate('/Contact');
  };

  const handleFeeStructureClick = () => {
    navigate('/Academics?tab=fee-structure');
  };

  if (!admissionData.isOpen) return null;

  return (
    <section className="w-full bg-[#FAF5ED] border-y border-amber-900/10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        
        {/* Title */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#0F172A] tracking-tight leading-tight">
          {admissionData.title}
        </h2>

        {/* Subtitle / Description */}
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {admissionData.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleApplyClick}
            className="px-6 py-3 text-sm font-bold text-white bg-[#D97706] hover:bg-[#B45309] rounded-lg shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            {admissionData.applyBtnText}
          </button>
          
          <button
            onClick={handleFeeStructureClick}
            className="px-6 py-3 text-sm font-semibold text-slate-800 bg-[#F9F6F0] hover:bg-white border border-slate-300 hover:border-slate-400 rounded-lg shadow-2xs transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            {admissionData.feeStructureBtnText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home_Addmission;