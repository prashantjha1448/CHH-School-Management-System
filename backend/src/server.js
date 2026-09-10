const app = require('./app');

const PORT = process.env.PORT || 5005;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Children's Happy Home API Server running on port ${PORT}...`);
  });
}

module.exports = app;
