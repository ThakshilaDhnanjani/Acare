// // // 1. First, install required packages:
// // // npm init -y
// // // npm install express mongoose bcryptjs jsonwebtoken cors dotenv

// // // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   nicNumber: { type: String, required: true, unique: true },
//   address: { type: String, required: true },
//   workPlace: { type: String, required: true },
//   mobileNumber: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// const User = mongoose.model('User', userSchema);

// // Registration endpoint
// app.post('/api/register', async (req, res) => {
//   try {
//     const { fullName, nicNumber, address, workPlace, mobileNumber, email, password } = req.body;
    
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const bcrypt = require('bcryptjs');
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const user = new User({
//       fullName,
//       nicNumber,
//       address,
//       workPlace,
//       mobileNumber,
//       email,
//       password: hashedPassword
//     });

//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error: error.message });
//   }
// });

// // Login endpoint
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Check password
//     const bcrypt = require('bcryptjs');
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT
//     const jwt = require('jsonwebtoken');
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// //---------------------------------------------------------------------------
// //web app to mobile backend 

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// require('dotenv').config();

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// const MessageSchema = new mongoose.Schema({
//   message: String,
//   accepted: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// });

// const Message = mongoose.model('Message', MessageSchema);

// app.post('/messages', async (req, res) => {
//   try {
//     const newMessage = new Message(req.body);
//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.get('/messages', async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: -1 });
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.put('/messages/:id/accept', async (req, res) => {
//   try {
//     const message = await Message.findByIdAndUpdate(req.params.id, { accepted: true }, { new: true });
//     res.json(message);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// //---------------------------------------------------------------------------
// //mobile to web backend 

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.post('/send-message', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  io.emit('emergency-alert', {
    message,
    timestamp: new Date().toISOString()
  });

  res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//------------------------------------------------------------------------

// const express = require('express');
// const mongoose = require('mongoose');
// const http = require('http');
// const socketIO = require('socket.io');
// const cors = require('cors');
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

// // Schemas
// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   nicNumber: { type: String, required: true, unique: true },
//   address: { type: String, required: true },
//   workPlace: { type: String, required: true },
//   mobileNumber: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// const messageSchema = new mongoose.Schema({
//   message: String,
//   accepted: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// });

// // Models
// const User = mongoose.model('User', userSchema);
// const Message = mongoose.model('Message', messageSchema);

// // Socket.IO Connection
// io.on('connection', (socket) => {
//   console.log('Client connected');
  
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// // Routes

// // User Registration
// app.post('/api/register', async (req, res) => {
//   try {
//     const { fullName, nicNumber, address, workPlace, mobileNumber, email, password } = req.body;
    
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcryptjs.hash(password, 10);

//     const user = new User({
//       fullName,
//       nicNumber,
//       address,
//       workPlace,
//       mobileNumber,
//       email,
//       password: hashedPassword
//     });

//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error: error.message });
//   }
// });

// // User Login
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const validPassword = await bcryptjs.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error: error.message });
//   }
// });

// // Message Routes
// app.post('/messages', async (req, res) => {
//   try {
//     const newMessage = new Message(req.body);
//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.get('/messages', async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: -1 });
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.put('/messages/:id/accept', async (req, res) => {
//   try {
//     const message = await Message.findByIdAndUpdate(req.params.id, { accepted: true }, { new: true });
//     res.json(message);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Emergency Alert Route
// app.post('/send-message', (req, res) => {
//   const { message } = req.body;
  
//   if (!message) {
//     return res.status(400).json({ error: 'Message is required' });
//   }

//   io.emit('emergency-alert', {
//     message,
//     timestamp: new Date().toISOString()
//   });

//   res.status(200).json({ success: true });
// });

// // Server Start
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

//------------correct backend code----------------

// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const cors = require('cors');
// require('dotenv').config();
// const connectDB = require('./db/connection');
// const routes = require('./routes');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api', routes);

// // Socket.IO Connection
// io.on('connection', (socket) => {
//   console.log('Client connected');
  
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// // Database connection
// connectDB();

// // Server Start
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// module.exports = { io };