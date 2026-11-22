const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error.middleware");
const authRoutes = require("./routes/auth.routes");
const noticeRoutes = require("./routes/notice.routes");
const galleryRoutes = require("./routes/gallery.routes");
const admissionRoutes = require("./routes/admission.routes");
const contactRoutes = require("./routes/contact.routes");
const ApiError = require("./utils/ApiError");

const app = express();

// 1. HTTP Security Headers
app.use(helmet());

// 2. Safe CORS Configuration
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : [
      "http://localhost:5173",
      "https://chh-school-management-system.vercel.app",
    ];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// 3. Body Parsers with payload size limits to mitigate DoS attacks
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// 4. Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Children's Happy Home API Server is healthy",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// 5. API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notices", noticeRoutes);
app.use("/api/v1/gallery", galleryRoutes);
app.use("/api/v1/admission", admissionRoutes);
app.use("/api/v1/contact", contactRoutes);

// 6. Handle Undefined / 404 Routes
app.use((req, res, next) => {
  next(new ApiError(404, `Cannot find ${req.method} ${req.originalUrl} on this server`));
});

// 7. Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;
