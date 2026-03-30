const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const client = new Client({
  connectionString: "postgresql://postgres.ddwazfkl9:f167_luned_2025@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require&supavisors=true",
});
async function run() {
  await client.connect();
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = 'admin-0000-0000-0000-000000000000';
  
  try {
     const insertQuery = "INSERT INTO \"User\" (id, email, password, full_name, role, agreed_to_terms) VALUES (, , , , , )";
     await client.query(insertQuery, [id, 'admin@luned.com', hashedPassword, 'Head of Operations', 'ADMIN', true]);
     console.log('Admin user created successfully');
  } catch (err) {
     console.error('Failed to create admin:', err.message);
  } finally {
     await client.end();
  }
}
run();
