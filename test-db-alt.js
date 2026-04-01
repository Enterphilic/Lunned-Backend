const { Client } = require('pg');

async function test() {
    const connectionString = "postgresql://postgres.ddwazfkl9:f167_luned_2025@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"; // Trying direct 5432 first

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log('Attempting connection to ddwazfkl9 (Port 5432)...');
        await client.connect();
        console.log('Successfully connected to PostgreSQL');

        const userRes = await client.query("SELECT email, role FROM \"User\" WHERE email = 'admin@luned.com'");
        if (userRes.rows.length > 0) {
            console.log('Admin found:', userRes.rows[0]);
        } else {
            console.log('Admin NOT found in this database.');
        }
    } catch (err) {
        console.error('Connection error:', err.message);
    } finally {
        await client.end();
    }
}

test();
