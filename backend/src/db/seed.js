require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Notice = require('../models/notice.model');
const Gallery = require('../models/gallery.model');
const AdmissionSettings = require('../models/admission.model');
const User = require('../models/user.model');
const connectDB = require('./db');

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting Database Seeding for Children\'s Happy Home...');

    // 1. Seed Admission Banner
    await AdmissionSettings.deleteMany({});
    const admissionData = await AdmissionSettings.create({
      session: '2026–27',
      title: 'Admissions Open for 2026–27',
      subtitle:
        "Enrol your child at one of Katihar's finest CBSE schools. Limited seats available for Nursery to Class XII.",
      applyBtnText: 'Apply Now',
      feeStructureBtnText: 'View Fee Structure',
      isOpen: true,
    });
    console.log('✅ Seeded Admission Banner settings');

    // 2. Seed Notices
    await Notice.deleteMany({});
    const sampleNotices = [
      {
        title: 'Annual Sports Day — Registration Open',
        category: 'Event',
        isHighPriority: true,
        date: '2026-09-05',
        content:
          'The Annual Sports Day will be held on 25th September 2026. All students from Class III to XII are encouraged to register for track events, field events, and team sports. Registration forms are available at the school physical education office.',
      },
      {
        title: 'Half-Yearly Examination Schedule 2026',
        category: 'Examination',
        isHighPriority: true,
        date: '2026-08-28',
        content:
          'Half-yearly examinations will commence from 12th October 2026. Detailed timetable has been uploaded on the student portal and displayed on respective classroom notice boards.',
      },
      {
        title: 'Parent-Teacher Meeting — Class IX & X',
        category: 'General',
        isHighPriority: false,
        date: '2026-08-20',
        content:
          'A Parent-Teacher Meeting is scheduled for Class IX and X students on 28th September 2026 from 10:00 AM to 1:00 PM in the senior block. All parents are requested to attend.',
      },
      {
        title: 'Fee Submission Deadline — September 2026',
        category: 'Admission',
        isHighPriority: false,
        date: '2026-08-15',
        content:
          'The last date for fee submission for the month of September is 10th September 2026. Parents are requested to clear monthly dues before the deadline to avoid late fee penalties.',
      },
      {
        title: 'Gandhi Jayanti Holiday Notice',
        category: 'Holiday',
        isHighPriority: false,
        date: '2026-08-01',
        content:
          'The school campus will remain closed on 2nd October 2026 on account of Gandhi Jayanti. Regular classes and bus transportation will resume on 3rd October 2026.',
      },
      {
        title: 'CBSE Mandatory Public Disclosure 2026–27',
        category: 'CBSE',
        isHighPriority: true,
        date: '2026-07-30',
        content:
          'As per CBSE Circular No. Acad-05/2026, the updated mandatory public disclosure documents including affiliation letter, NOC, building safety certificate, and DEO certificate have been published on the CBSE Corner tab.',
      },
    ];
    await Notice.insertMany(sampleNotices);
    console.log(`✅ Seeded ${sampleNotices.length} notices`);

    // 3. Seed Gallery Items
    await Gallery.deleteMany({});
    const sampleGallery = [
      {
        title: 'Modern Interactive Smart Classroom',
        category: 'Classrooms',
        imageUrl: '/Hero_image.png',
        caption: 'Spacious CBSE classrooms equipped with digital smart boards and ergonomic furniture.',
        displayOrder: 1,
      },
      {
        title: 'Annual Cultural Function in Main Auditorium',
        category: 'Annual Function',
        imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
        caption: 'Students performing at the annual cultural gala in the main auditorium.',
        displayOrder: 2,
      },
      {
        title: 'Inter-School Sports Ground & Athletic Field',
        category: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
        caption: 'State-of-the-art football turf and athletic grounds.',
        displayOrder: 3,
      },
      {
        title: 'Annual Sports Meet Opening Ceremony',
        category: 'Annual Function',
        imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
        caption: 'Enthusiastic participation during the annual intra-house sports competition.',
        displayOrder: 4,
      },
      {
        title: 'New Science & Tech Laboratories',
        category: 'Campus',
        imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
        caption: 'Advanced Physics, Chemistry, and Biology laboratories compliant with CBSE standards.',
        displayOrder: 5,
      },
      {
        title: 'Central Library & Digital Knowledge Hub',
        category: 'Campus',
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
        caption: 'Over 8,000 reference books, encyclopedias, and digital journals.',
        displayOrder: 6,
      },
    ];
    await Gallery.insertMany(sampleGallery);
    console.log(`✅ Seeded ${sampleGallery.length} gallery items`);

    // 4. Seed Admin & Demo Student User
    const existingAdmin = await User.findOne({ email: 'admin@chhkatihar.edu.in' });
    if (!existingAdmin) {
      await User.create({
        name: 'School Administrator',
        email: 'admin@chhkatihar.edu.in',
        password: 'AdminPassword@2026',
        role: 'admin',
        phone: '+91 78588 79081',
      });
      console.log('✅ Seeded Admin Account: admin@chhkatihar.edu.in / AdminPassword@2026');
    }

    const existingStudent = await User.findOne({ email: 'student@chhkatihar.edu.in' });
    if (!existingStudent) {
      await User.create({
        name: 'Rahul Kumar',
        email: 'student@chhkatihar.edu.in',
        enrollmentId: 'CHH2026-9042',
        password: 'StudentPassword@2026',
        role: 'student',
        phone: '+91 98000 00000',
      });
      console.log('✅ Seeded Student Account: CHH2026-9042 / StudentPassword@2026');
    }

    const existingFaculty = await User.findOne({ email: 'faculty@chhkatihar.edu.in' });
    if (!existingFaculty) {
      await User.create({
        name: 'Dr. Meena Agarwal',
        email: 'faculty@chhkatihar.edu.in',
        password: 'FacultyPassword@2026',
        role: 'faculty',
        phone: '+91 6452 224 815',
      });
      console.log('✅ Seeded Faculty Account: faculty@chhkatihar.edu.in / FacultyPassword@2026');
    }

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
