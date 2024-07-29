import express from 'express';
import cors from 'cors';
import { loginPool, communityPool } from './db.js';

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
    const connection = await loginPool.getConnection();
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

// Define the member registration route handler
app.post('/register-member', async (req, res) => {
  const { full_name, age, location, marital_status, ID_number, role, contact_number } = req.body;

  try {
    const connection = await communityPool.getConnection();

    const query = 'INSERT INTO members (full_name, age, location, marital_status, ID_number, role, contact_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [full_name, age, location, marital_status, ID_number, role, contact_number];
    await connection.query(query, values);
    connection.release();

    res.status(201).json({ message: 'Member registered successfully' });
  } catch (error) {
    console.error('Error registering member:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Define the member fetching route handler
app.get('/fetch-member/:id', async (req, res) => {
  const memberId = req.params.id;

  try {
    const connection = await communityPool.getConnection();
    const [rows] = await connection.query('SELECT * FROM members WHERE ID_number = ?', [memberId]);
    connection.release();

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'User does not exist' });
    }
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, async () => {
  try {
    const loginConnection = await loginPool.getConnection(); // Test login database connection
    const communityConnection = await communityPool.getConnection(); // Test community database connection
    console.log(`Backend Server is running on: http://localhost:${PORT}`);
    console.log('Connected to MySQL databases');
    loginConnection.release();
    communityConnection.release();
  } catch (error) {
    console.error('Unable to connect to MySQL:', error);
  }
});
