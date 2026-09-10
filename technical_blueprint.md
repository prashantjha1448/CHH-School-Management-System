# Exhaustive Technical Architecture & Code Blueprint Specification
**File:** `technical_blueprint.md`  
**Target Project:** Children's Happy Home (CHH) — School Management System & ERP  
**Figma Design Reference:** `https://www.figma.com/make/Pc2KBng9Uwft82FPDFhhYX/Complete-School-Management-System?t=qSelLUEct9qCHXMN-1`  
**Document Purpose:** Complete SDLC Model, Technical Stack Justification, Folder Structures, Global Variables Model, API Strategy & File-by-File Blueprint  
**Status:** Architectural Blueprint Phase (NO FEATURE CODE WRITTEN UNTIL "start coding")

---

## 0. Software Engineering Lifecycle Model (SDLC)

We are utilizing an **Incremental & Phased SDLC Lifecycle Model** (Hybrid Agile-Waterfall Framework):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              SDLC DEVELOPMENT LIFECYCLE                                │
├─────────────────┬─────────────────┬─────────────────┬─────────────────┬────────────────┤
│   1. ANALYSIS   │   2. PLANNING   │   3. BUILDING   │   4. TESTING    │ 5. DEPLOYMENT  │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┼────────────────┤
│ • Audit live    │ • Global Config │ • Phase 1: Auth │ • Unit Tests    │ • Dockerize    │
│   site flaws    │ • Tech Stack    │   & Public Site │ • Integration   │ • AWS / Cloud  │
│ • Defect matrix │ • DB ERD Schema │ • Phase 2: Att. │   RBAC Tests    │ • SSL / Domain │
│ • Requirements  │ • Blueprint     │ • Phase 3: Fees │ • Load Stress   │ • CI/CD        │
│   (COMPLETED)   │   (COMPLETED)   │   (NEXT UP)     │   Testing       │   Pipeline     │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┴────────────────┘
```

---

## 1. Complete Technology Stack Justification & Rationale

| Layer | Chosen Technology | Why We Are Using It & What Problem It Solves |
|---|---|---|
| **Public Frontend** | **Next.js 14+ (App Router, TypeScript)** | Provides **Server-Side Rendering (SSR)** for instantaneous page loads and top SEO rankings in Katihar/Bihar. Solves the slow, non-indexable ASP.NET WebForms issue. Supports Hindi/English i18n seamlessly. |
| **Admin & Portals** | **React + Vite + Tailwind CSS** | Provides a single-page application (SPA) experience for Admin, Faculty, and Student portals with **zero full-page reloads**. Tailwind CSS allows responsive, modern Glassmorphism UI styling. |
| **UI Components & Figma** | **shadcn/ui + Lucide Icons + Figma Design Reference** | Figma UI design board ([Complete School Management System](https://www.figma.com/make/Pc2KBng9Uwft82FPDFhhYX/Complete-School-Management-System?t=qSelLUEct9qCHXMN-1)) serves as the master UI template. Accessible, production-ready React components with Google Stitch MCP. |
| **Backend Runtime** | **Node.js (v20+ LTS)** | Non-blocking, event-driven I/O engine capable of handling high concurrency (thousands of simultaneous attendance pings or parent portal hits) with minimal RAM footprint. |
| **API Framework** | **Express.js / NestJS** | Minimalist, battle-tested framework for building clean RESTful API pipelines, custom middlewares, and secure error handling. |
| **Primary Database** | **PostgreSQL 16** | Relational ACID-compliant database. Crucial for financial transactions (fees), marks entry, and attendance records where zero data corruption or race conditions can be tolerated. |
| **Database ORM** | **Prisma ORM** | Provides strict TypeScript type-safety, automatic SQL migrations, and complete immunity against SQL Injection attacks. |
| **Caching & Queues** | **Redis 7 + BullMQ** | Redis provides in-memory session caching and rate-limiting. BullMQ handles asynchronous background jobs (sending 2,000 parent SMS alerts without blocking the web API). |
| **Object Storage** | **AWS S3 / MinIO** | Secure, encrypted cloud storage for student photos, birth certificates, generated PDF report cards, and digital ID card files. |
| **Realtime Engine** | **Socket.io** | WebSocket engine for instant real-time alerts (gate attendance pings, emergency notice broadcasts, live transport tracking). |
| **Payments** | **Razorpay Node SDK** | Seamless payment gateway supporting UPI (Google Pay, PhonePe, Paytm), Netbanking, and Credit/Debit Cards with HMAC SHA256 Webhook signature verification. |

---

## 2. Centralized Global Variables Strategy

To eliminate manual code edits across dozens of files whenever a phone number, logo, school name, or theme color changes, **all static and dynamic constants are centralized into global configuration objects**.

### 2.1 Backend Global Config (`src/config/globalConfig.js`)
```javascript
// Centralized Backend Single-Source-of-Truth Config
module.exports = Object.freeze({
  APP: {
    NAME: "Children's Happy Home SMS ERP",
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 4000,
    API_PREFIX: '/api/v1',
  },

  SCHOOL: {
    NAME: process.env.SCHOOL_NAME || "Children's Happy Home",
    SHORT_NAME: "CHH Katihar",
    CODE: "CHH",
    AFFILIATION_NO: "CBSE-330123",
    ESTABLISHED_YEAR: 1998,
    ADDRESS: "Mirchaibari, Katihar, Bihar - 854105",
    EMAIL: "contact@childrenshappyhome.com",
    PHONES: {
      PRIMARY: "+91 78588 79081",
      ADMISSION: "+91 62035 60206",
      ACCOUNTS: "+91 73527 71509",
    },
    OFFICE_HOURS: "Mon-Sat 08:00 AM - 01:45 PM",
  },

  BRANDING: {
    LOGO_URL: process.env.LOGO_URL || "/assets/images/logo.png",
    FAVICON_URL: "/assets/images/favicon.ico",
    SCHOOL_CREST_URL: "/assets/images/crest.png",
  },

  SOCIAL_MEDIA: {
    FACEBOOK: "https://www.facebook.com/Childrens-Happy-Home-Katihar-100120898792254",
    YOUTUBE: "https://www.youtube.com/channel/UCAKDhCPvRGj7DyGc8Rx2pXA",
    TWITTER: "https://twitter.com/chh_katihar",
    INSTAGRAM: "https://instagram.com/chh_katihar",
  },

  THEME_TOKENS: {
    PRIMARY_COLOR: "#0056b3",
    SKY_BLUE: "#00a8ff",
    RED_ACCENT: "#e74c3c",
    GREEN_SUCCESS: "#2ecc71",
    BG_LIGHT: "#f8f9fa",
  },

  ID_FORMATS: {
    STUDENT_PREFIX: "CHH-STU",
    STAFF_PREFIX: "CHH-STF",
    PADDING_LENGTH: 5,
  }
});
```

### 2.2 Frontend Global Config (`frontend/src/config/siteConfig.ts`)
```typescript
// Centralized Frontend Single-Source-of-Truth Config
export const SITE_CONFIG = {
  name: "Children's Happy Home",
  shortName: "CHH Katihar",
  logoUrl: "/assets/images/logo.png",
  crestUrl: "/assets/images/crest.png",
  figmaDesignUrl: "https://www.figma.com/make/Pc2KBng9Uwft82FPDFhhYX/Complete-School-Management-System?t=qSelLUEct9qCHXMN-1",
  phones: {
    primary: "+91 78588 79081",
    admission: "+91 62035 60206",
    accounts: "+91 73527 71509",
  },
  socials: {
    facebook: "https://www.facebook.com/Childrens-Happy-Home-Katihar-100120898792254",
    youtube: "https://www.youtube.com/channel/UCAKDhCPvRGj7DyGc8Rx2pXA",
  },
  theme: {
    primary: "#0056b3",
    skyBlue: "#00a8ff",
  },
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1",
} as const;
```

---

## 3. Annotated Directory Tree Mapped to Tech Stack

```
childrens-happy-home/
├── report.md                       # Strategic Audit & Action Matrix Report
├── technical_blueprint.md          # Exhaustive Technical Code Specification
├── backend/                        # Node.js + Express + Prisma + PostgreSQL + Redis
│   ├── .env.example                # Template for server environment variables
│   ├── package.json                # Dependencies: express, prisma, bullmq, jsonwebtoken, zod
│   ├── prisma/
│   │   ├── schema.prisma           # PostgreSQL Data Models (Users, Students, Staff, Attendance)
│   │   └── migrations/             # SQL Migration History
│   ├── src/
│   │   ├── server.js               # Entry Point: HTTP server startup, DB connections, shutdown
│   │   ├── app.js                  # Express Pipeline: Middlewares, CORS, Helmet, Rate Limiter
│   │   ├── config/
│   │   │   ├── globalConfig.js     # Single-Source-of-Truth Global Constants
│   │   │   ├── db.js               # Prisma PostgreSQL Client connection pool
│   │   │   └── redis.js            # Redis connection client & BullMQ queue connection
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js  # JWT token verification
│   │   │   ├── rbac.middleware.js  # Role (Student/Faculty/Admin) & Designation scope guard
│   │   │   ├── validate.middleware.js # Zod Schema Validator middleware
│   │   │   └── error.middleware.js # Global Error Handler middleware
│   │   ├── controllers/
│   │   │   ├── auth.controller.js  # Login, Token Refresh, Password Reset logic
│   │   │   ├── student.controller.js # Student CRUD & admission processing
│   │   │   ├── staff.controller.js  # Staff onboarding & designation management
│   │   │   ├── attendance.controller.js # Polymorphic student & staff attendance logic
│   │   │   ├── fee.controller.js    # Razorpay orders, payments & webhook verification
│   │   │   ├── idcard.controller.js # ID card generation & QR code renderer
│   │   │   └── stats.controller.js  # Dynamic live statistics API controller
│   │   ├── routes/
│   │   │   ├── index.js            # Master Router (/api/v1)
│   │   │   ├── auth.routes.js      # Authentication endpoints
│   │   │   ├── student.routes.js   # Student management endpoints
│   │   │   ├── staff.routes.js     # Staff management endpoints
│   │   │   ├── attendance.routes.js# Attendance endpoints
│   │   │   ├── fee.routes.js       # Fee & payment endpoints
│   │   │   └── idcard.routes.js    # ID card endpoints
│   │   ├── services/
│   │   │   ├── notification.service.js # BullMQ Redis Queue producer (SMS/WhatsApp)
│   │   │   ├── pdf.service.js      # Puppeteer vector PDF generator for ID & report cards
│   │   │   └── payment.service.js  # Razorpay SDK integration service
│   │   └── utils/
│   │       ├── idGenerator.js      # Sequential ID generator (CHH-STU-YYYY-XXXXX)
│   │       └── logger.js           # Pino / Winston structured logging
└── frontend/                       # Next.js 14 + React + Vite + Tailwind CSS + shadcn/ui
    ├── package.json
    ├── next.config.mjs
    ├── tailwind.config.js
    └── src/
        ├── config/
        │   └── siteConfig.ts       # Centralized UI site config (includes Figma link)
        ├── app/                    # Next.js App Router (Public Marketing Site)
        │   ├── layout.tsx          # Root Layout with dynamic Navbar & Footer
        │   ├── page.tsx            # Redesigned Public Homepage
        │   ├── cbse-corner/page.tsx# CBSE Public Disclosures
        │   └── portal/page.tsx     # Unified Login Screen
        ├── components/
        │   ├── Navbar.tsx          # Dynamic Navbar pulling from siteConfig.ts
        │   ├── Footer.tsx          # Dynamic Footer pulling from siteConfig.ts
        │   ├── HeroSlider.tsx      # Framer Motion modern slider
        │   └── LiveStats.tsx       # Live counters fetching from /api/v1/stats
        └── dashboards/             # SPA Role-Gated Dashboards
            ├── admin/              # Admin System Control Panel
            ├── faculty/            # Scoped Teacher/Driver/Guard/Staff Panel
            └── student/            # Student/Parent Portal
```

---

## 4. File-by-File Detailed Technical Code Specification

### 4.1 Specification for `src/server.js`

```javascript
// src/server.js Blueprint
require('dotenv').config();
const http = require('http');
const app = require('./app');
const globalConfig = require('./config/globalConfig');
const { connectDB, disconnectDB } = require('./config/db');
const { connectRedis } = require('./config/redis');

// 1. Trap Uncaught Synchronous Exceptions
process.on('uncaughtException', (err) => {
  console.error('CRITICAL: UNCAUGHT EXCEPTION! Shutting down...', err);
  process.exit(1);
});

const PORT = globalConfig.APP.PORT;
const server = http.createServer(app);

async function startServer() {
  try {
    // Connect Database Pool & Redis Client
    await connectDB();
    await connectRedis();

    // Start HTTP Listener
    server.listen(PORT, () => {
      console.log(`🚀 ${globalConfig.SCHOOL.NAME} API Server running on PORT ${PORT} [${globalConfig.APP.ENV}]`);
    });
  } catch (error) {
    console.error('Server Initialization Failed:', error);
    process.exit(1);
  }
}

// 2. Trap Unhandled Asynchronous Promise Rejections
process.on('unhandledRejection', (err) => {
  console.error('CRITICAL: UNHANDLED REJECTION! Closing connections...', err);
  server.close(() => {
    process.exit(1);
  });
});

// 3. Handle System Signals (SIGTERM/SIGINT) for Graceful Shutdown
const gracefulShutdown = (signal) => {
  console.log(`Received ${signal}. Initiating graceful shutdown...`);
  server.close(async () => {
    await disconnectDB();
    console.log('Server and Database connections closed cleanly.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();
```

---

### 4.2 Specification for `src/app.js`

```javascript
// src/app.js Blueprint
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const globalConfig = require('./config/globalConfig');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

// 1. Security Headers
app.use(helmet());

// 2. CORS Whitelisting
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true,
}));

// 3. Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { status: 429, message: 'Too many requests from this IP, please try again later.' }
});
app.use(globalConfig.APP.API_PREFIX, limiter);

// 4. Request Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 5. Public System Configuration Endpoint
app.get(`${globalConfig.APP.API_PREFIX}/config/public`, (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      school: globalConfig.SCHOOL,
      branding: globalConfig.BRANDING,
      socials: globalConfig.SOCIAL_MEDIA,
      theme: globalConfig.THEME_TOKENS,
    }
  });
});

// 6. Mount API V1 Router
app.use(globalConfig.APP.API_PREFIX, router);

// 7. Global 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Cannot find endpoint ${req.originalUrl} on this server!`
  });
});

// 8. Central Error Handler
app.use(errorHandler);

module.exports = app;
```

---

### 4.3 Middlewares Specification (`src/middlewares/`)

- **`auth.middleware.js`:** Extracts `Authorization: Bearer <token>`, verifies JWT access token signature, checks if token is expired, and populates `req.user`.
- **`rbac.middleware.js`:** Protects routes based on user role (`admin`, `faculty`, `student`). For `faculty`, validates `req.user.designation` against required designations (`teacher`, `bus_driver`, `security_guard`, `servant`, `librarian`, `accountant`).
- **`validate.middleware.js`:** Takes a Zod schema and validates `req.body`, `req.query`, and `req.params`. Returns 400 Bad Request with field validation errors if validation fails.

---

### 4.4 Redis & BullMQ Notification Pipeline (`src/services/notification.service.js`)

1. **Queue Producer:** When an event occurs (e.g. Student Marked Absent), `notificationQueue.add('send_absence_sms', payload)` enqueues a job into Redis.
2. **Worker Process:** BullMQ worker retrieves the job asynchronously, invokes MSG91 / Twilio REST API, logs delivery status in PostgreSQL `notification_logs`, and auto-retries up to 3 times on network failures.

---

### 4.5 Payment Gateway & Webhook Signature Verification (`src/controllers/fee.controller.js`)

1. **Order Creation:** `POST /api/v1/fees/create-order` creates a Razorpay Order with specified amount & currency.
2. **Payment Checkout:** Frontend executes Razorpay modal. Upon completion, Razorpay sends payment credentials to `/api/v1/fees/webhook`.
3. **HMAC Signature Check:** Server computes `crypto.createHmac('sha256', secret).update(body).digest('hex')` and compares with `x-razorpay-signature`. On match, marks fee status as `PAID` and triggers instant PDF receipt generation.

---

## 5. PostgreSQL ERD Database Schema (DDL)

```sql
-- 1. USERS & ROLES
CREATE TYPE user_role AS ENUM ('admin', 'faculty', 'student');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    system_id VARCHAR(30) UNIQUE NOT NULL, -- e.g. CHH-STU-2026-00042
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    must_change_password BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIMEZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. STUDENTS
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    admission_no VARCHAR(30) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    father_name VARCHAR(100) NOT NULL,
    mother_name VARCHAR(100) NOT NULL,
    photo_url TEXT,
    qr_code_url TEXT,
    status VARCHAR(20) DEFAULT 'active'
);

-- 3. STAFF (Faculty Sub-categories)
CREATE TYPE staff_designation AS ENUM (
    'teacher', 'bus_driver', 'security_guard', 'servant', 'librarian', 'accountant'
);

CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    employee_code VARCHAR(30) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    designation staff_designation NOT NULL,
    joining_date DATE NOT NULL,
    photo_url TEXT,
    qr_code_url TEXT,
    status VARCHAR(20) DEFAULT 'active'
);

-- 4. POLYMORPHIC ATTENDANCE
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID NOT NULL,
    person_type VARCHAR(10) CHECK (person_type IN ('student', 'staff')),
    date DATE NOT NULL,
    time_in TIME,
    time_out TIME,
    status VARCHAR(20) CHECK (status IN ('present', 'absent', 'late', 'on_leave')),
    marked_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIMEZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. Phase 1 Start Checklist

When you instruct **"start coding"**, development will proceed as follows:

1. **Step 1:** Setup Node.js backend directory, install core packages (`express`, `dotenv`, `cors`, `helmet`, `jsonwebtoken`, `prisma`, `pg`, `redis`, `bullmq`, `zod`).
2. **Step 2:** Implement `globalConfig.js` binding all global variables.
3. **Step 3:** Setup `src/app.js` and `src/server.js` server pipeline.
4. **Step 4:** Deploy PostgreSQL database schema using Prisma ORM.
5. **Step 5:** Build Auth & RBAC endpoints (`/api/v1/auth/login`).
6. **Step 6:** Build Redesigned Next.js Public Website connected to `/api/v1/config/public` & `/api/v1/stats/summary`.

---

> [!IMPORTANT]
> **NO FEATURE CODE HAS BEEN WRITTEN OR MODIFIED AT THIS STAGE.**  
> Development is strictly awaiting your instruction: **"start coding"**.
