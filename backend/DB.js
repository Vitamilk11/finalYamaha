const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '26.189.225.143',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'yamaha'
});
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL database!');
});

module.exports = db;
