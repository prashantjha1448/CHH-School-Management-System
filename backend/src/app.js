const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Health Check Endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: "Children's Happy Home API Server is healthy",
//     timestamp: new Date().toISOString(),
//   });
// });




module.exports = app;
