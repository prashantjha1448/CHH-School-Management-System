const app = require('./app');

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Children's Happy Home API Server running on port ${PORT}...`);
});
