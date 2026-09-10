import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

/**
 * AcademicsPages Component
 * Matches Figma screenshot media_1788995512818.png
 * Supports tab switching & deep-linking via query param ?tab=fee-structure
 */
const AcademicsPages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab')?.toLowerCase() || 'structure';

  const [activeTab, setActiveTab] = useState('structure');

  useEffect(() => {
    const tabParam = searchParams.get('tab')?.toLowerCase();
    if (tabParam === 'fee-structure' || tabParam === 'fees' || tabParam === 'fee') {
      setActiveTab('fee-structure');
    } else if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: 'structure', label: 'Structure' },
    { id: 'timing', label: 'Timing' },
    { id: 'uniform', label: 'Uniform' },
    { id: 'holidays', label: 'Holidays' },
    { id: 'exam-pattern', label: 'Exam Pattern' },
    { id: 'fee-structure', label: 'Fee Structure' },
    { id: 'discipline', label: 'Discipline' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between">
      <div>
        <NavBar activePath="/Academics" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          
          {/* Page Subtitle & Title */}
          <div className="mb-8 sm:mb-10">
            <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest block mb-1">
              ACADEMICS
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
              Academic Programs & Policies
            </h1>
          </div>

          {/* Horizontal Nav Tabs */}
          <div className="border-b border-slate-200/90 mb-8 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6 sm:gap-8 min-w-max">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`py-3 text-xs sm:text-sm font-semibold transition-all duration-150 border-b-2 cursor-pointer ${
                      isActive
                        ? 'border-[#D97706] text-[#D97706] font-bold'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Container */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 sm:p-8">
            
            {/* 1. STRUCTURE TAB */}
            {activeTab === 'structure' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/60">
                      <th className="py-3.5 px-4 font-bold">STAGE</th>
                      <th className="py-3.5 px-4 font-bold">CLASSES</th>
                      <th className="py-3.5 px-4 font-bold">DURATION</th>
                      <th className="py-3.5 px-4 font-bold">SUBJECTS OFFERED</th>
                      <th className="py-3.5 px-4 font-bold">BOARD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Pre-Primary</td>
                      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">Nursery, LKG, UKG</td>
                      <td className="py-4 px-4 whitespace-nowrap">3 Years</td>
                      <td className="py-4 px-4 text-slate-600">English, Hindi, EVS, Maths, Drawing</td>
                      <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">School Board</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Primary</td>
                      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">Class I – V</td>
                      <td className="py-4 px-4 whitespace-nowrap">5 Years</td>
                      <td className="py-4 px-4 text-slate-600">English, Hindi, Maths, EVS, Computer</td>
                      <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">CBSE</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Middle</td>
                      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">Class VI – VIII</td>
                      <td className="py-4 px-4 whitespace-nowrap">3 Years</td>
                      <td className="py-4 px-4 text-slate-600">English, Hindi, Maths, Science, SST, Sanskrit/Computer</td>
                      <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">CBSE</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Secondary</td>
                      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">Class IX – X</td>
                      <td className="py-4 px-4 whitespace-nowrap">2 Years</td>
                      <td className="py-4 px-4 text-slate-600">English, Hindi, Maths, Science, Social Studies</td>
                      <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">CBSE</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Senior Secondary (Sci.)</td>
                      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">Class XI – XII</td>
                      <td className="py-4 px-4 whitespace-nowrap">2 Years</td>
                      <td className="py-4 px-4 text-slate-600">Physics, Chemistry, Maths/Biology, English</td>
                      <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">CBSE</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Senior Secondary (Com.)</td>
                      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">Class XI – XII</td>
                      <td className="py-4 px-4 whitespace-nowrap">2 Years</td>
                      <td className="py-4 px-4 text-slate-600">Accountancy, Business Studies, Economics, English</td>
                      <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">CBSE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* 2. TIMING TAB */}
            {activeTab === 'timing' && (
              <div className="space-y-6">
                <h3 className="text-base font-bold text-slate-900">School Operating Timings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-lg">
                    <h4 className="font-bold text-amber-900 text-sm mb-1">Summer Schedule (April – October)</h4>
                    <p className="text-xs text-slate-700">Pre-Primary: 7:30 AM – 11:30 AM</p>
                    <p className="text-xs text-slate-700">Class I to XII: 7:30 AM – 1:30 PM</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Winter Schedule (November – March)</h4>
                    <p className="text-xs text-slate-700">Pre-Primary: 8:30 AM – 12:30 PM</p>
                    <p className="text-xs text-slate-700">Class I to XII: 8:30 AM – 2:30 PM</p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. UNIFORM TAB */}
            {activeTab === 'uniform' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Official School Dress Code</h3>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-700 space-y-2">
                  <li><strong>Regular Days (Mon, Tue, Thu, Fri):</strong> Navy blue trousers/skirt, white shirt with school emblem, school tie, black shoes, and blue socks.</li>
                  <li><strong>Wednesday & Saturday:</strong> House sports t-shirt, white trousers/skirt, white canvas shoes, and white socks.</li>
                  <li><strong>Winter Uniform:</strong> Navy blue blazer with school crest badge and grey pullover.</li>
                </ul>
              </div>
            )}

            {/* 4. HOLIDAYS TAB */}
            {activeTab === 'holidays' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Annual Academic Vacation Schedule</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="p-4 border rounded-lg bg-slate-50">
                    <h4 className="font-bold text-slate-900 mb-1">Summer Break</h4>
                    <p className="text-slate-600">May 15 – June 15</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-slate-50">
                    <h4 className="font-bold text-slate-900 mb-1">Puja & Diwali Vacation</h4>
                    <p className="text-slate-600">October / November (10 Days)</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-slate-50">
                    <h4 className="font-bold text-slate-900 mb-1">Winter Break</h4>
                    <p className="text-slate-600">December 25 – January 5</p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. EXAM PATTERN TAB */}
            {activeTab === 'exam-pattern' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">CBSE Assessment Scheme</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  As per CBSE guidelines, student assessment is divided into Periodic Tests (PT1, PT2, PT3), Half-Yearly Examinations, and Annual Board/School Final Examinations along with continuous internal assessment for practicals, projects, and co-curricular activities.
                </p>
              </div>
            )}

            {/* 6. FEE STRUCTURE TAB */}
            {activeTab === 'fee-structure' && (
              <div className="space-y-6">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <h3 className="text-base font-bold text-slate-900">
                      Fee Structure for Academic Session 2026–27
                    </h3>
                    <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-semibold w-fit">
                      Approved by CBSE Management
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/60">
                          <th className="py-3.5 px-4 font-bold">CLASS / LEVEL</th>
                          <th className="py-3.5 px-4 font-bold">ADMISSION FEE (ONE-TIME)</th>
                          <th className="py-3.5 px-4 font-bold">ANNUAL CHARGES</th>
                          <th className="py-3.5 px-4 font-bold">MONTHLY TUITION FEE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        <tr className="hover:bg-slate-50/50 transition">
                          <td className="py-4 px-4 font-bold text-slate-900">Pre-Primary (Nursery - UKG)</td>
                          <td className="py-4 px-4 text-slate-700">₹ 5,000</td>
                          <td className="py-4 px-4 text-slate-700">₹ 3,500</td>
                          <td className="py-4 px-4 font-bold text-amber-600">₹ 1,200 / mo</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition">
                          <td className="py-4 px-4 font-bold text-slate-900">Primary (Class I – V)</td>
                          <td className="py-4 px-4 text-slate-700">₹ 6,000</td>
                          <td className="py-4 px-4 text-slate-700">₹ 4,000</td>
                          <td className="py-4 px-4 font-bold text-amber-600">₹ 1,500 / mo</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition">
                          <td className="py-4 px-4 font-bold text-slate-900">Middle (Class VI – VIII)</td>
                          <td className="py-4 px-4 text-slate-700">₹ 7,000</td>
                          <td className="py-4 px-4 text-slate-700">₹ 4,500</td>
                          <td className="py-4 px-4 font-bold text-amber-600">₹ 1,800 / mo</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition">
                          <td className="py-4 px-4 font-bold text-slate-900">Secondary (Class IX – X)</td>
                          <td className="py-4 px-4 text-slate-700">₹ 8,000</td>
                          <td className="py-4 px-4 text-slate-700">₹ 5,000</td>
                          <td className="py-4 px-4 font-bold text-amber-600">₹ 2,200 / mo</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition">
                          <td className="py-4 px-4 font-bold text-slate-900">Senior Secondary (Class XI – XII)</td>
                          <td className="py-4 px-4 text-slate-700">₹ 10,000</td>
                          <td className="py-4 px-4 text-slate-700">₹ 6,000</td>
                          <td className="py-4 px-4 font-bold text-amber-600">₹ 2,800 / mo</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Important Rules & Notes */}
                <div className="bg-[#FAF5ED] border border-amber-200/90 rounded-xl p-5 text-xs text-slate-700 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Fee Payment Guidelines:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    <li>School fees must be paid on or before the 10th of every calendar month.</li>
                    <li>Payments can be made online via School Portal or offline at the Accounts Office counter.</li>
                    <li>Transport facility fee is charged separately based on distance/route.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 7. DISCIPLINE TAB */}
            {activeTab === 'discipline' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Code of Conduct & Discipline</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Students are expected to maintain 75%+ attendance, adhere strictly to the school uniform policy, exhibit respectful behavior towards teachers and peers, and protect school property.
                </p>
              </div>
            )}

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AcademicsPages;