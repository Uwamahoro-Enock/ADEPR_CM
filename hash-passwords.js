import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lavitate1123#',
  database: 'Login_list',
});

// Number of bcrypt salt rounds
const saltRounds = 10;

async function hashPasswords() {
  const connection = await pool.getConnection();
  try {
    // Fetch all users with plain-text passwords
    const [rows] = await connection.query('SELECT id, password FROM users');

    for (const row of rows) {
      const hashedPassword = await bcrypt.hash(row.password, saltRounds);
      await connection.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, row.id]);
      console.log(`Updated user ${row.id} with hashed password.`);
    }

    console.log('All passwords have been hashed.');
  } catch (err) {
    console.error('Error hashing passwords:', err);
  } finally {
    connection.release();
  }
}

hashPasswords();
