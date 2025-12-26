const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./src/shared/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database on startup
initializeDatabase().catch(console.error);

// Import routes
const profileRoutes = require('./src/routes/profile');
const goalsRoutes = require('./src/routes/goals');
const habitsRoutes = require('./src/routes/habits');
const tasksRoutes = require('./src/routes/tasks');
const aiRoutes = require('./src/routes/ai');
const stressRoutes = require('./src/routes/stress');
const focusRoutes = require('./src/routes/focus');
const expensesRoutes = require('./src/routes/expenses');
const hobbiesRoutes = require('./src/routes/hobbies');
const reflectionsRoutes = require('./src/routes/reflections');
const careerRoutes = require('./src/routes/career');

// Use routes
app.use('/api/profile', profileRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/habits', habitsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/stress', stressRoutes);
app.use('/api/focus', focusRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/hobbies', hobbiesRoutes);
app.use('/api/reflections', reflectionsRoutes);
app.use('/api/career', careerRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});