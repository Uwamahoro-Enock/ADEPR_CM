import mysql from 'mysql2/promise';

// Connection pool for Login_list database
const loginPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lavitate1123#',
  database: 'Login_list',
});

// Connection pool for community_list database
const communityPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lavitate1123#',
  database: 'community_list',
});

export { loginPool, communityPool };
