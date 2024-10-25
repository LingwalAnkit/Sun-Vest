const express = require("express")
const database = require("./Database/MongoDb");
const app = express()
const path = require('path')
const cors = require('cors');
const authRouter = require("./Routes/authRouter")
const projectRouter = require('./Routes/projectRouter');
const port = 3000

// CORS setup
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Body parsers
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use('/api/solar', projectRouter);
app.use('/api/auth', authRouter)

// Global error handler - MOVED AFTER ROUTES
app.use((err, req, res, next) => {
    console.error('Error:', err); // Add logging

    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    // Ensure we always send a structured JSON response
    res.status(statusCode).json({
        status: status,
        message: err.message || 'Internal server error',
        data: null,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 handler - ADD THIS
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
        data: null
    });
});

app.listen(port, () => {
    console.log(`App is running on ${port}`)
})