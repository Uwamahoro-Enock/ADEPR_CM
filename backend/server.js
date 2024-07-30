import express from 'express';
import cors from 'cors';
import { loginPool, communityPool } from './db.js'; // Adjust import based on your file structure
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS for all origins

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const [rows] = await loginPool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const user = rows[0];

    // Compare password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Register member route
app.post('/register-member', async (req, res) => {
  const { full_name, age, location, marital_status, ID_number, role, contact_number } = req.body;
  const token = req.headers.authorization?.split(' ')[1]; 

  try {
    // Validate the token and extract user information
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Insert new member into the community_list.users database
      const query = `
        INSERT INTO users (full_name, age, location, marital_status, ID_number, role, contact_number)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [full_name, age, location, marital_status, ID_number, role, contact_number];

      await communityPool.query(query, values);

      res.status(201).json({ message: 'Member registered successfully!' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch member route
app.get('/fetch-member/:id', async (req, res) => {
  const memberId = req.params.id;

  try {
    // Fetch member information from the users table
    const [rows] = await communityPool.query('SELECT * FROM members WHERE ID_number = ?', [memberId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User doesn\'t exist.' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Error occurred while fetching member.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
