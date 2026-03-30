process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');

async function run() {
  const connectionString = "postgresql://postgres.xakgevoaskxrynxwlifk:Danielenema%40123@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";
  const client = new Client({
    connectionString,
  });
  
  try {
    await client.connect();
    
    const password = 'admin123';
    const hash = await bcrypt.hash(password, 10);
    const id = 'admin-0000-0000-0000-000000000000';
    
    const query = {
      text: 'INSERT INTO "User" (id, email, password, full_name, role, agreed_to_terms) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (email) DO UPDATE SET password = $3, role = $5 RETURNING id',
      values: [id, 'admin@luned.com', hash, 'Head of Operations', 'ADMIN', true],
    };
    
    const res = await client.query(query);
    fs.writeFileSync('create_admin_result.txt', 'SUCCESS: Admin ID is ' + res.rows[0].id);
    
  } catch (err) {
    fs.writeFileSync('create_admin_result.txt', 'ERROR: ' + err.message);
  } finally {
    await client.end();
  }
}

run();
