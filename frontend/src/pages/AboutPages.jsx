import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

/**
 * AboutPages Component
 * Updated per user instructions:
 * 1. Removed redundant small Leadership card row.
 * 2. Enhanced Leadership Messages section matching media_1788996316063.png with Image + Text layout.
 */
const AboutPages = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);

  const messagesData = [
    {
      id: 'president',
      role: 'PRESIDENT',
      name: 'Shri Ashok Agarwal',
      title: 'M.L.C. & President, School Management Committee',
      sectionTitle: 'From the Desk of the President',
      hindiHeader: 'अध्यक्ष की कलम से',
      image: '/president_image.jpg',
      avatarText: 'AA',
      summary: "As the President of the School Management Committee of Children's Happy Home, Katihar, and Member of Legislative Council (M.L.C.), I urge all parents to recognize the importance of quality education and a disciplined life for your children. Established in 1972 under the Societies Registration Act 1861, Children's Happy Home is one of the oldest and most reputed public schools in Katihar...",
      fullMessage: `As the President of the School Management Committee of Children's Happy Home, Katihar, and Member of Legislative Council (M.L.C.), I urge all parents to recognize the importance of quality education and a disciplined life for your children. 

Established in 1972 under the Societies Registration Act 1861, Children's Happy Home is one of the oldest and most reputed public schools in Katihar. Our institution operates not for commercial interests, but is dedicated solely to the holistic development of every child. 

Let us join hands together to build an educated, disciplined, and empowered society.`,
    },
    {
      id: 'secretary',
      role: 'SECRETARY',
      name: 'Shri Gopal Soni',
      title: 'Secretary, School Management Committee',
      sectionTitle: 'From the Desk of the Secretary',
      hindiHeader: 'प्रिय अभिभावक एवं छात्रों',
      image: '/secretary_image.jpg',
      avatarText: 'GS',
      summary: "With great joy, I extend my greetings to the people of Katihar. Children's Happy Home stands as one of the town's pioneer educational institutions, delivering top-quality education based on the CBSE curriculum to children of our society. As Secretary of the School Management Committee, I take pride in sharing that since our inception in 1972...",
      fullMessage: `With great joy, I extend my greetings to the people of Katihar. Children's Happy Home stands as one of the town's pioneer educational institutions, delivering top-quality education based on the CBSE curriculum to children of our society. 

As Secretary of the School Management Committee, I take pride in sharing that since our inception in 1972, this trust-run institution has earned unmatched trust for schooling from Nursery up to Class XII. 

Children's Happy Home is affiliated with CBSE, New Delhi. Together, let us grant our children quality education and empower them to become responsible citizens of our nation. With best wishes!`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between">
      <div>
        <NavBar activePath="/About" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16 sm:space-y-20">
          
          {/* SECTION 1: HEADER & HERO BANNER (media_1788996240369.png) */}
          <div className="space-y-6">
            <div>
              <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest block mb-1">
                ABOUT US
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight mb-4">
                A History of Serving the Children of Bihar
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
                Since 1972, Children's Happy Home has stood as a pillar of educational excellence in Katihar, Bihar, committed to nurturing the potential of every child.
              </p>
            </div>

            {/* Main Classroom Banner Image */}
            <div className="w-full h-[280px] sm:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden shadow-xs border border-slate-200/90 relative bg-slate-800">
              <img
                src="/Hero_image.png"
                alt="Children's Happy Home Classroom"
                className="w-full h-full object-cover object-center opacity-90"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/10 to-transparent flex items-end p-6 sm:p-8">
                <p className="text-white text-xs sm:text-sm font-medium tracking-wide drop-shadow">
                  School Campus & Classrooms — Katihar, Bihar (Est. 1972)
                </p>
              </div>
            </div>

            {/* 3 CARDS: Vision, Mission, Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              
              {/* Vision Card */}
              <div className="bg-[#FAF5ED] border border-amber-200/90 rounded-xl p-6 space-y-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#0F172A]">
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To be the leading centre of holistic education in North Bihar, producing responsible, compassionate, and skilled citizens.
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-6 space-y-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#0F172A]">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To deliver quality, value-based CBSE education that prepares students for life's challenges through academic, moral, and physical development.
                </p>
              </div>

              {/* Values Card */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-6 space-y-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#0F172A]">
                  Our Values
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Integrity · Excellence · Discipline · Compassion · Service — the five pillars that guide every decision at Children's Happy Home.
                </p>
              </div>

            </div>
          </div>

          {/* SECTION 2: TIMELINE THROUGH THE YEARS (media_1788996258940.png) */}
          <div className="space-y-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Our Journey Through the Years
            </h2>

            <div className="relative border-l-2 border-amber-500/40 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
              
              {/* 1972 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-[#D97706] ring-4 ring-[#FAF9F6]"></div>
                <h3 className="font-bold text-[#D97706] text-base sm:text-lg">1972</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-0.5">
                  School founded by the Late Shri Narayan Prasad Sharma with 3 classrooms and 48 students under the Societies Registration Act 1861.
                </p>
              </div>

              {/* 1985 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-[#D97706] ring-4 ring-[#FAF9F6]"></div>
                <h3 className="font-bold text-[#D97706] text-base sm:text-lg">1985</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-0.5">
                  Affiliated with CBSE under Affiliation No. 330759. First Board examination results — 100% pass rate.
                </p>
              </div>

              {/* 1995 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-[#D97706] ring-4 ring-[#FAF9F6]"></div>
                <h3 className="font-bold text-[#D97706] text-base sm:text-lg">1995</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-0.5">
                  New main building constructed. Library and first computer lab established.
                </p>
              </div>

              {/* 2005 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-[#D97706] ring-4 ring-[#FAF9F6]"></div>
                <h3 className="font-bold text-[#D97706] text-base sm:text-lg">2005</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-0.5">
                  Science wing and laboratories inaugurated. Introduction of Classes XI and XII (Science and Commerce streams).
                </p>
              </div>

              {/* 2015 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-[#D97706] ring-4 ring-[#FAF9F6]"></div>
                <h3 className="font-bold text-[#D97706] text-base sm:text-lg">2015</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-0.5">
                  Digital classrooms introduced. School bus fleet expanded to 6 routes across Katihar.
                </p>
              </div>

              {/* 2022 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-[#D97706] ring-4 ring-[#FAF9F6]"></div>
                <h3 className="font-bold text-[#D97706] text-base sm:text-lg">2022</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-0.5">
                  Golden Jubilee celebrations. 50 years of excellence in education in Katihar, Bihar.
                </p>
              </div>

              {/* 2026 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-[#D97706] ring-4 ring-[#FAF9F6]"></div>
                <h3 className="font-bold text-[#D97706] text-base sm:text-lg">2026</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-0.5">
                  School Management System launched. Digital records, online fee payment, and student portal introduced.
                </p>
              </div>

            </div>
          </div>

          {/* SECTION 3: LEADERSHIP MESSAGES WITH IMAGE + TEXT (media_1788996316063.png) */}
          <div className="space-y-8 pt-4 border-t border-slate-200/80">
            <div>
              <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest block mb-1">
                LEADERSHIP MESSAGES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A]">
                Messages from Our Leadership
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* CARD 1: PRESIDENT MESSAGE WITH IMAGE */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  {/* Header Title Badge */}
                  <div className="inline-block bg-sky-50 border border-sky-200/80 text-[#0088CC] font-bold text-xs px-3.5 py-1.5 rounded-full">
                    अध्यक्ष की कलम से (From the Desk of President)
                  </div>

                  {/* Image + Message Grid Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                    
                    {/* Message Text (7 cols) */}
                    <div className="sm:col-span-7 space-y-3">
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        "{messagesData[0].summary}"
                      </p>
                      <button
                        onClick={() => setSelectedLeader(messagesData[0])}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#6B21A8] hover:bg-[#581C87] rounded-lg shadow-2xs transition cursor-pointer"
                      >
                        Read More
                      </button>
                    </div>

                    {/* Photo Container (5 cols) */}
                    <div className="sm:col-span-5 flex flex-col items-center">
                      <div className="w-full h-48 sm:h-52 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 border border-slate-200 overflow-hidden shadow-xs relative flex items-center justify-center">
                        <img
                          src={messagesData[0].image}
                          alt={messagesData[0].name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        {/* Fallback Avatar Placeholder when image is missing */}
                        <div className="text-center p-4">
                          <div className="w-16 h-16 rounded-full bg-[#D97706] text-white font-bold text-xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                            {messagesData[0].avatarText}
                          </div>
                          <span className="text-[11px] font-semibold text-amber-900 block">
                            Photo: {messagesData[0].image}
                          </span>
                        </div>
                      </div>

                      <div className="text-center pt-2">
                        <h4 className="font-serif font-bold text-slate-900 text-sm">
                          {messagesData[0].name}
                        </h4>
                        <p className="text-[11px] font-semibold text-slate-500">
                          M.L.C. & President
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Children's Happy Home Committee</span>
                  <span className="text-[#D97706] font-semibold">Katihar, Bihar</span>
                </div>
              </div>

              {/* CARD 2: SECRETARY MESSAGE WITH IMAGE */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  {/* Header Title Badge */}
                  <div className="inline-block bg-sky-50 border border-sky-200/80 text-[#0088CC] font-bold text-xs px-3.5 py-1.5 rounded-full">
                    प्रिय अभिभावक एवं छात्रों, (Secretary's Desk)
                  </div>

                  {/* Image + Message Grid Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                    
                    {/* Photo Container (5 cols) */}
                    <div className="sm:col-span-5 flex flex-col items-center">
                      <div className="w-full h-48 sm:h-52 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 border border-slate-200 overflow-hidden shadow-xs relative flex items-center justify-center">
                        <img
                          src={messagesData[1].image}
                          alt={messagesData[1].name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        {/* Fallback Avatar Placeholder when image is missing */}
                        <div className="text-center p-4">
                          <div className="w-16 h-16 rounded-full bg-[#D97706] text-white font-bold text-xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                            {messagesData[1].avatarText}
                          </div>
                          <span className="text-[11px] font-semibold text-amber-900 block">
                            Photo: {messagesData[1].image}
                          </span>
                        </div>
                      </div>

                      <div className="text-center pt-2">
                        <h4 className="font-serif font-bold text-slate-900 text-sm">
                          {messagesData[1].name}
                        </h4>
                        <p className="text-[11px] font-semibold text-slate-500">
                          Secretary
                        </p>
                      </div>
                    </div>

                    {/* Message Text (7 cols) */}
                    <div className="sm:col-span-7 space-y-3">
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        "{messagesData[1].summary}"
                      </p>
                      <button
                        onClick={() => setSelectedLeader(messagesData[1])}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#6B21A8] hover:bg-[#581C87] rounded-lg shadow-2xs transition cursor-pointer"
                      >
                        Read More
                      </button>
                    </div>

                  </div>

                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Children's Happy Home Trust</span>
                  <span className="text-[#D97706] font-semibold">CBSE Affiliated</span>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>

      {/* INTERACTIVE LEADERSHIP MESSAGE MODAL */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-xl space-y-6 relative animate-in fade-in zoom-in duration-150">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedLeader(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg transition cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-amber-100 text-amber-900 font-bold text-lg flex items-center justify-center shrink-0 border border-amber-200">
                {selectedLeader.avatarText}
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest block">
                  {selectedLeader.role}
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {selectedLeader.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedLeader.title}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {selectedLeader.sectionTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedLeader.fullMessage}
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedLeader(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#D97706] hover:bg-[#B45309] rounded-lg transition cursor-pointer"
              >
                Close Message
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AboutPages;