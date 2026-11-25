const { prisma } = require('../db/prisma');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get All Classes with Sections
 * @route   GET /api/v1/academic/classes
 * @access  Private / Public
 */
const getClassesAndSections = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const classes = await prisma.class.findMany({
    include: {
      sections: true,
      _count: { select: { students: true } },
    },
    orderBy: { order: 'asc' },
  });

  return res.status(200).json(
    new ApiResponse(200, classes, 'Classes and sections retrieved successfully')
  );
});

/**
 * @desc    Create a New Class
 * @route   POST /api/v1/academic/classes
 * @access  Private (Admin only)
 */
const createClass = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const { name, code, order = 0 } = req.body;
  if (!name || !code) {
    throw new ApiError(400, 'Class name and code are required');
  }

  const newClass = await prisma.class.create({
    data: {
      name,
      code: code.toUpperCase(),
      order: parseInt(order),
    },
  });

  return res.status(201).json(
    new ApiResponse(201, newClass, 'Class created successfully')
  );
});

/**
 * @desc    Create Section for a Class
 * @route   POST /api/v1/academic/sections
 * @access  Private (Admin only)
 */
const createSection = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const { name, classId, capacity = 40 } = req.body;
  if (!name || !classId) {
    throw new ApiError(400, 'Section name and classId are required');
  }

  const section = await prisma.section.create({
    data: {
      name: name.toUpperCase(),
      classId,
      capacity: parseInt(capacity),
    },
  });

  return res.status(201).json(
    new ApiResponse(201, section, 'Section created successfully')
  );
});

/**
 * @desc    Enroll / Register a Student in PostgreSQL
 * @route   POST /api/v1/academic/students
 * @access  Private (Admin only)
 */
const enrollStudent = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const {
    enrollmentId,
    mongoUserId,
    firstName,
    lastName,
    rollNumber,
    classId,
    sectionId,
    academicYearId,
    dateOfBirth,
    gender,
    bloodGroup,
    parentName,
    parentPhone,
    parentEmail,
  } = req.body;

  if (!enrollmentId || !firstName || !classId || !sectionId || !academicYearId) {
    throw new ApiError(400, 'enrollmentId, firstName, classId, sectionId, and academicYearId are required');
  }

  const student = await prisma.student.create({
    data: {
      enrollmentId: enrollmentId.toUpperCase(),
      mongoUserId: mongoUserId || null,
      firstName,
      lastName: lastName || '',
      rollNumber: rollNumber || '',
      classId,
      sectionId,
      academicYearId,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      gender: gender || 'OTHER',
      bloodGroup: bloodGroup || '',
      parentName: parentName || '',
      parentPhone: parentPhone || '',
      parentEmail: parentEmail || '',
    },
    include: {
      class: true,
      section: true,
      academicYear: true,
    },
  });

  return res.status(201).json(
    new ApiResponse(201, student, 'Student enrolled successfully in PostgreSQL')
  );
});

/**
 * @desc    Record Daily Attendance (Bulk for a Class/Section)
 * @route   POST /api/v1/academic/attendance
 * @access  Private (Admin / Faculty)
 */
const recordDailyAttendance = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const { classId, sectionId, date, records } = req.body;
  // records: [{ studentId, status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY', remarks }]

  if (!classId || !sectionId || !date || !Array.isArray(records) || records.length === 0) {
    throw new ApiError(400, 'classId, sectionId, date, and student records array are required');
  }

  const attendanceDate = new Date(date);

  const createdRecords = await prisma.$transaction(
    records.map((rec) =>
      prisma.attendance.upsert({
        where: {
          studentId_date: {
            studentId: rec.studentId,
            date: attendanceDate,
          },
        },
        update: {
          status: rec.status,
          remarks: rec.remarks || '',
          recordedBy: req.user._id.toString(),
        },
        create: {
          studentId: rec.studentId,
          classId,
          sectionId,
          date: attendanceDate,
          status: rec.status,
          remarks: rec.remarks || '',
          recordedBy: req.user._id.toString(),
        },
      })
    )
  );

  return res.status(200).json(
    new ApiResponse(200, createdRecords, `Recorded attendance for ${createdRecords.length} students`)
  );
});

/**
 * @desc    Get Student Attendance Statistics
 * @route   GET /api/v1/academic/attendance/student/:studentId
 * @access  Private (Admin / Faculty / Student)
 */
const getStudentAttendance = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const { studentId } = req.params;

  const records = await prisma.attendance.findMany({
    where: { studentId },
    orderBy: { date: 'desc' },
  });

  const totalDays = records.length;
  const presentDays = records.filter((r) => r.status === 'PRESENT').length;
  const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalDays,
        presentDays,
        percentage: `${percentage}%`,
        records,
      },
      'Student attendance retrieved successfully'
    )
  );
});

module.exports = {
  getClassesAndSections,
  createClass,
  createSection,
  enrollStudent,
  recordDailyAttendance,
  getStudentAttendance,
};
