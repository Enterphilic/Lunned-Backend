const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://postgres.ddwazfkl9:f167_luned_2025@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require&supavisors=true",
});
async function run() {
  await client.connect();
  const res = await client.query("SELECT id, email, role FROM \"User\" WHERE email = 'admin@luned.com'");
  console.log(JSON.stringify(res.rows, null, 2));
  await client.end();
}
run();
