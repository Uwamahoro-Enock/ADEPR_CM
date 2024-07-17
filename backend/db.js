import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lavitate1123#',
  database: 'Login_list',
});

export default pool;
