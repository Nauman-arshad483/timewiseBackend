const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const authRouter = require('./routes/auth/authRoute'); // Import the router
const taskRouter=require('./routes/task/taskRoute')
const profileRouter=require('./routes/profile/profileRoute')
// Middleware
app.use(cors());
app.use(express.json());


// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connection successful!');
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});

// Routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use('/auth', authRouter); 
app.use('/task', taskRouter); 
app.use('/profile',profileRouter );