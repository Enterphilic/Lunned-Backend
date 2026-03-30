const { Client } = require('pg');
const bcrypt = require('bcryptjs');

async function run() {
  const connectionString = "postgresql://postgres.ddwazfkl9:f167_luned_2025@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require";
  const client = new Client({ connectionString });
  
  try {
    console.log('Attempting to connect...');
    await client.connect();
    console.log('Connected to Supabase!');
    
    const password = 'admin123';
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const id = 'admin-0000-0000-0000-000000000000';
    
    console.log('Inserting admin...');
    const query = {
      text: 'INSERT INTO "User" (id, email, password, full_name, role, "agreed_to_terms") VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (email) DO UPDATE SET password = $3, role = $5 RETURNING id',
      values: [id, 'admin@luned.com', hash, 'Head of Operations', 'ADMIN', true],
    };
    
    const res = await client.query(query);
    console.log('SUCCESS: Admin ID is', res.rows[0].id);
    
  } catch (err) {
    console.error('CRITICAL ERROR:', err.message);
    console.error(err.stack);
  } finally {
    await client.end();
    console.log('Disconnected.');
  }
}

run();
