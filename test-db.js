const { Client } = require('pg');
require('dotenv').config();

async function test() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('Successfully connected to PostgreSQL');
        const res = await client.query('SELECT current_database(), current_user');
        console.log('DB Info:', res.rows[0]);

        const userRes = await client.query("SELECT email, role FROM \"User\" WHERE email = 'admin@luned.com'");
        if (userRes.rows.length > 0) {
            console.log('Admin found:', userRes.rows[0]);
        } else {
            console.log('Admin NOT found in database.');
        }
    } catch (err) {
        console.error('Connection error:', err.message);
    } finally {
        await client.end();
    }
}

test();
