const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const client = new Client({
  connectionString: "postgresql://postgres.ddwazfkl9:f167_luned_2025@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require",
});
async function run() {
  try {
     console.log('Connecting to database...');
     await client.connect();
     console.log('Connected!');
     const password = 'admin123';
     const hashedPassword = await bcrypt.hash(password, 10);
     const id = 'admin-0000-0000-0000-000000000000';
     
     const res = await client.query("INSERT INTO \"User\" (id, email, password, full_name, role, agreed_to_terms) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (email) DO UPDATE SET password = $3, role = $5 RETURNING id", 
     [id, 'admin@luned.com', hashedPassword, 'Head of Operations', 'ADMIN', true]);
     
     console.log('Admin user created/updated successfully:', res.rows[0]);
  } catch (err) {
     console.error('ERROR:', err.message);
     process.exit(1);
  } finally {
     await client.end();
  }
}
run();
