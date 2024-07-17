import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Define the login route handler
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    connection.release();

    if (rows.length > 0) {
      // Login successful
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Incorrect credentials
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, async () => {
  try {
    await pool.getConnection(); // Test database connection
    console.log(`Backend Server is running on: http://localhost:${PORT}`);
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Unable to connect to MySQL:', error);
  }
});
