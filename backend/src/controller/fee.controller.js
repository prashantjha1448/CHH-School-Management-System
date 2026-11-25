const { prisma } = require('../db/prisma');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get all Fee Structures (Class-wise)
 * @route   GET /api/v1/fees/structures
 * @access  Private / Public
 */
const getFeeStructures = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const { academicYearId, classId } = req.query;
  const where = {};
  if (academicYearId) where.academicYearId = academicYearId;
  if (classId) where.classId = classId;

  const structures = await prisma.feeStructure.findMany({
    where,
    include: {
      class: true,
      academicYear: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return res.status(200).json(
    new ApiResponse(200, structures, 'Fee structures retrieved successfully')
  );
});

/**
 * @desc    Create a Fee Structure for a Class
 * @route   POST /api/v1/fees/structures
 * @access  Private (Admin only)
 */
const createFeeStructure = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const {
    name,
    classId,
    academicYearId,
    admissionFee = 0,
    tuitionFeeMonthly = 0,
    annualCharges = 0,
    examFee = 0,
    labCharges = 0,
    sportsFee = 0,
  } = req.body;

  if (!name || !classId || !academicYearId) {
    throw new ApiError(400, 'name, classId, and academicYearId are required');
  }

  const feeStructure = await prisma.feeStructure.create({
    data: {
      name,
      classId,
      academicYearId,
      admissionFee: parseFloat(admissionFee),
      tuitionFeeMonthly: parseFloat(tuitionFeeMonthly),
      annualCharges: parseFloat(annualCharges),
      examFee: parseFloat(examFee),
      labCharges: parseFloat(labCharges),
      sportsFee: parseFloat(sportsFee),
    },
    include: {
      class: true,
      academicYear: true,
    },
  });

  return res.status(201).json(
    new ApiResponse(201, feeStructure, 'Fee structure created successfully')
  );
});

/**
 * @desc    Generate a Monthly Fee Invoice for a Student
 * @route   POST /api/v1/fees/invoices
 * @access  Private (Admin only)
 */
const generateInvoice = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const {
    studentId,
    academicYearId,
    month,
    year,
    amount,
    lateFee = 0,
    dueDate,
  } = req.body;

  if (!studentId || !academicYearId || !month || !year || !amount || !dueDate) {
    throw new ApiError(400, 'studentId, academicYearId, month, year, amount, and dueDate are required');
  }

  const invoiceNumber = `INV-${year}-${month.toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  const invoice = await prisma.feeInvoice.create({
    data: {
      invoiceNumber,
      studentId,
      academicYearId,
      month: parseInt(month),
      year: parseInt(year),
      amount: parseFloat(amount),
      lateFee: parseFloat(lateFee),
      dueDate: new Date(dueDate),
      status: 'PENDING',
    },
    include: {
      student: true,
      academicYear: true,
    },
  });

  return res.status(201).json(
    new ApiResponse(201, invoice, 'Fee invoice generated successfully')
  );
});

/**
 * @desc    Record Fee Payment (ACID Transaction)
 * @route   POST /api/v1/fees/payments
 * @access  Private (Admin / Student)
 */
const recordFeePayment = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const { invoiceId, amount, paymentMode = 'ONLINE', transactionId, remarks } = req.body;

  if (!invoiceId || !amount) {
    throw new ApiError(400, 'invoiceId and amount are required');
  }

  const paidAmountFloat = parseFloat(amount);
  if (paidAmountFloat <= 0) {
    throw new ApiError(400, 'Payment amount must be greater than zero');
  }

  // ACID Transaction via Prisma
  const result = await prisma.$transaction(async (tx) => {
    // 1. Fetch invoice and check validity
    const invoice = await tx.feeInvoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoice) {
      throw new ApiError(404, 'Fee invoice not found');
    }

    const totalPayable = Number(invoice.amount) + Number(invoice.lateFee);
    const currentPaid = Number(invoice.paidAmount);
    const remainingDue = totalPayable - currentPaid;

    if (remainingDue <= 0) {
      throw new ApiError(400, 'This invoice is already fully paid');
    }

    if (paidAmountFloat > remainingDue) {
      throw new ApiError(400, `Amount exceeds remaining due of ₹${remainingDue}`);
    }

    // 2. Generate Receipt Number & Payment Record
    const receiptNumber = `RCPT-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const payment = await tx.feePayment.create({
      data: {
        invoiceId,
        studentId: invoice.studentId,
        amount: paidAmountFloat,
        paymentMode,
        receiptNumber,
        transactionId: transactionId || `TXN-${Date.now()}`,
        status: 'SUCCESS',
        remarks: remarks || '',
      },
    });

    // 3. Update Invoice Status & Paid Amount
    const newPaidAmount = currentPaid + paidAmountFloat;
    const newStatus = newPaidAmount >= totalPayable ? 'PAID' : 'PARTIAL';

    const updatedInvoice = await tx.feeInvoice.update({
      where: { id: invoiceId },
      data: {
        paidAmount: newPaidAmount,
        status: newStatus,
      },
    });

    return { payment, updatedInvoice };
  });

  return res.status(200).json(
    new ApiResponse(200, result, 'Fee payment processed and recorded successfully')
  );
});

/**
 * @desc    Get Student Invoices & Payment History
 * @route   GET /api/v1/fees/student/:studentId
 * @access  Private (Admin / Faculty / Authenticated Student)
 */
const getStudentFeeHistory = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const { studentId } = req.params;

  const invoices = await prisma.feeInvoice.findMany({
    where: { studentId },
    include: {
      payments: {
        orderBy: { paymentDate: 'desc' },
      },
      academicYear: true,
    },
    orderBy: { dueDate: 'desc' },
  });

  return res.status(200).json(
    new ApiResponse(200, invoices, 'Student fee history retrieved successfully')
  );
});

/**
 * @desc    Get Overall Fee Analytics / Financial Summary
 * @route   GET /api/v1/fees/analytics
 * @access  Private (Admin only)
 */
const getFeeAnalytics = asyncHandler(async (req, res) => {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'PostgreSQL DATABASE_URL is not configured yet');
  }

  const [totalInvoices, totalPayments, paidInvoices, pendingInvoices] = await Promise.all([
    prisma.feeInvoice.aggregate({
      _sum: { amount: true, paidAmount: true, lateFee: true },
      _count: { id: true },
    }),
    prisma.feePayment.aggregate({
      _sum: { amount: true },
      _count: { id: true },
    }),
    prisma.feeInvoice.count({ where: { status: 'PAID' } }),
    prisma.feeInvoice.count({ where: { status: 'PENDING' } }),
  ]);

  const totalBilled = Number(totalInvoices._sum.amount || 0) + Number(totalInvoices._sum.lateFee || 0);
  const totalCollected = Number(totalPayments._sum.amount || 0);
  const totalOutstanding = totalBilled - totalCollected;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalBilled,
        totalCollected,
        totalOutstanding,
        invoiceCount: totalInvoices._count.id,
        paymentCount: totalPayments._count.id,
        paidInvoices,
        pendingInvoices,
      },
      'Fee analytics summary calculated successfully'
    )
  );
});

module.exports = {
  getFeeStructures,
  createFeeStructure,
  generateInvoice,
  recordFeePayment,
  getStudentFeeHistory,
  getFeeAnalytics,
};
