// app.js

// Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const open = import('open');

// Find the root directory by locating the .env file
const findRootDir = (currentDir) => {
  if (fs.existsSync(path.join(currentDir, '.env'))) {
    return currentDir;
  }
  const parentDir = path.dirname(currentDir);
  if (parentDir === currentDir) {
    throw new Error('.env file not found');
  }
  return findRootDir(parentDir);
};

// Initialize the app
const app = express();
const rootDir = findRootDir(__dirname);

// Load environment variables
dotenv.config({ path: path.join(rootDir, '.env') });

// Define app port
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(rootDir, 'public')));
app.use('/assets', express.static(path.join(rootDir, 'assets')));
app.use('/index.css', express.static(path.join(rootDir, 'src', 'index.css')));
app.use('/css', express.static(path.join(rootDir, 'src', 'css')));
app.use('/js', express.static(path.join(rootDir, 'src', 'js')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the application
const startApp = async () => {
  app.listen(port, async () => {
    console.log(`App is running on http://localhost:${port}`);
    const openModule = await open;
    openModule.default(`http://localhost:${port}`);
  });
};

startApp().catch(console.error);

module.exports = app;