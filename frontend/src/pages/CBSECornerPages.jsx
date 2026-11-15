import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { SCHOOL_INFO } from '../constant/globalVariables';

const CBSECornerPages = () => {
  const generalInfo = [
    { label: 'Name of the School', value: SCHOOL_INFO.NAME },
    { label: 'Affiliation Number', value: SCHOOL_INFO.CBSE_AFFILIATION_NO },
    { label: 'School Code', value: SCHOOL_INFO.SCHOOL_CODE },
    { label: 'Year of Establishment', value: '1972' },
    { label: 'Registration Act', value: 'Societies Registration Act 1861' },
    { label: 'Complete Address', value: SCHOOL_INFO.ADDRESS },
    { label: 'Principal Name & Qualification', value: 'Mr. Ajay Kumar Mishra (M.A., B.Ed.)' },
    { label: 'School Email ID', value: SCHOOL_INFO.EMAIL },
    { label: 'Contact Phone Number', value: `${SCHOOL_INFO.PHONES.PRIMARY} / ${SCHOOL_INFO.PHONES.ADMISSION}` },
  ];

  const documents = [
    { title: 'Copies of Affiliation / Upgradation Letter & Recent Extension of Affiliation', status: 'Verified' },
    { title: 'Copies of Societies / Trust / Company Registration / Renewal Certificate', status: 'Verified' },
    { title: 'Copy of No Objection Certificate (NOC) Issued by the State Govt.', status: 'Verified' },
    { title: 'Copies of Recognition Certificate Under RTE Act, 2009', status: 'Verified' },
    { title: 'Copy of Valid Building Safety Certificate as per the National Building Code', status: 'Verified' },
    { title: 'Copy of Valid Fire Safety Certificate Issued by the Competent Authority', status: 'Verified' },
    { title: 'Copy of Safe Drinking Water & Sanitary Condition Certificate', status: 'Verified' },
  ];

  const academicInfo = [
    { title: 'Fee Structure of the School (Academic Session 2026–27)', linkText: 'View Fee Structure', href: '/Academics?tab=fee-structure' },
    { title: 'Annual Academic Calendar & Holiday Schedule', linkText: 'View Calendar', href: '/Academics?tab=holidays' },
    { title: 'List of School Management Committee (SMC)', linkText: 'View Leadership & SMC', href: '/About' },
    { title: 'Parent-Teacher Association (PTA) Members List', linkText: 'View Details', href: '/Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between">
      <div>
        <NavBar activePath="/CBSE_Corner" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
          {/* Header */}
          <div className="space-y-3">
            <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest block">
              MANDATORY PUBLIC DISCLOSURE (APPENDIX - IX)
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
              CBSE Corner & Regulatory Disclosures
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              In accordance with the Central Board of Secondary Education (CBSE) circulars, the mandatory public disclosure documents of Children's Happy Home are published below for transparent public access.
            </p>
          </div>

          {/* Section A: General Information */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="bg-[#FAF5ED] px-6 py-4 border-b border-amber-900/10">
              <h2 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                A. General Information
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {generalInfo.map((item, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-12 px-6 py-3.5 text-xs sm:text-sm">
                  <div className="sm:col-span-5 font-semibold text-slate-600">{item.label}</div>
                  <div className="sm:col-span-7 font-bold text-slate-900 mt-0.5 sm:mt-0">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Documents & Compliance */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="bg-[#FAF5ED] px-6 py-4 border-b border-amber-900/10 flex items-center justify-between">
              <h2 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                B. Documents and Information
              </h2>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                CBSE Compliant
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {documents.map((doc, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 text-xs sm:text-sm">
                  <span className="text-slate-700 font-medium">
                    {index + 1}. {doc.title}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-md shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section C: Results & Academics */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="bg-[#FAF5ED] px-6 py-4 border-b border-amber-900/10">
              <h2 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                C. Results and Academics
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {academicInfo.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 text-xs sm:text-sm">
                  <span className="text-slate-800 font-medium">
                    {index + 1}. {item.title}
                  </span>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#D97706] hover:text-[#B45309] hover:underline shrink-0"
                  >
                    {item.linkText} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default CBSECornerPages;
