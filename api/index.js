const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database/database");
const UserDAO = require("./dao/UserDAO");
const QuizDAO = require("./dao/QuizDAO")
// Connect to database
connectDB();

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON requests
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Health check endpoint
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Instantiate UserDAO
const userDAO = new UserDAO();

// Routes for User
app.get("/api/users/", (req, res) => userDAO.getAll(req, res));
app.post("/api/users/", (req, res) => userDAO.create(req, res));
app.get("/api/users/:id", (req, res) => userDAO.getById(req, res));
app.put("/api/users/:id", (req, res) => userDAO.update(req, res));
app.delete("/api/users/:id", (req, res) => userDAO.delete(req, res));

// Routes for quiz
const quizDAO = new QuizDAO();

app.get("/api/quizzes/", (req, res) => quizDAO.getAll(req, res));
app.post("/api/quizzes/", (req, res) => quizDAO.create(req, res));
app.put("/api/quizzes/:id", (req, res) => quizDAO.update(req, res));



// Configure port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/test', (req, res) => {
    res.status(200).json({ message: 'El servidor está funcionando correctamente!' });
});
