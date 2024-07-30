import { loginPool } from './backend/db.js';

const testConnection = async () => {
  try {
    const connection = await loginPool.getConnection();
    console.log('Database connected successfully!');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

testConnection();
