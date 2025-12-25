require('dotenv').config();
const mysql = require('mysql2/promise');

async function testDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false }
    });

    console.log('✅ Connected to database');

    // Check if tables exist
    const [tables] = await connection.query('SHOW TABLES');
    console.log('\n📋 Tables in database:');
    if (tables.length === 0) {
      console.log('   ⚠️ No tables found - need to run schema.sql');
    } else {
      tables.forEach(table => {
        console.log(`   ✓ ${Object.values(table)[0]}`);
      });
    }

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    process.exit(1);
  }
}

testDatabase();
