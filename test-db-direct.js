const { Client } = require('pg');

async function test() {
    const connectionString = "postgresql://postgres.xakgevoaskxrynxwlifk:Danielenema@123@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"; // Decoded @ manually

    const client = new Client({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log('Attempting direct connection to port 5432...');
        await client.connect();
        console.log('Successfully connected to PostgreSQL');
        const res = await client.query('SELECT current_database(), current_user');
        console.log('DB Info:', res.rows[0]);
    } catch (err) {
        console.error('Connection error:', err.message);
        console.error('Stack trace:', err.stack);
    } finally {
        await client.end();
    }
}

test();
