require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkUser() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });

  const [users] = await connection.query('SELECT id, email, firstName, lastName, LENGTH(password) as password_length FROM users');
  
  console.log('\n📋 Users in database:');
  users.forEach(user => {
    console.log(`\n  ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Name: ${user.firstName} ${user.lastName}`);
    console.log(`  Password Length: ${user.password_length || 'NULL/EMPTY'}`);
  });

  await connection.end();
  process.exit(0);
}

checkUser();
