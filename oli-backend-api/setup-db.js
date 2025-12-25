require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
      multipleStatements: true
    });

    console.log('✅ Connected to Azure MySQL');

    // Read schema file
    const schemaPath = path.join(__dirname, 'database', 'sql', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Remove CREATE DATABASE and USE commands (already connected to database)
    const statements = schema
      .split(';')
      .filter(stmt => {
        const trimmed = stmt.trim();
        return trimmed && 
               !trimmed.startsWith('CREATE DATABASE') && 
               !trimmed.startsWith('USE');
      })
      .map(stmt => stmt.trim() + ';');

    console.log('\n🔧 Creating tables...');
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }

    // Verify tables created
    const [tables] = await connection.query('SHOW TABLES');
    console.log('\n✅ Database setup complete!');
    console.log('\n📋 Created tables:');
    tables.forEach(table => {
      console.log(`   ✓ ${Object.values(table)[0]}`);
    });

    await connection.end();
    console.log('\n🎉 Ready to use!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    if (connection) await connection.end();
    process.exit(1);
  }
}

setupDatabase();
