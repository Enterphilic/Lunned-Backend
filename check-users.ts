import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool as any);
    const prisma = new PrismaClient({ adapter });

    try {
        const users = await prisma.user.findMany({
            include: {
                student_profile: true,
                tutor_profile: true,
                mentor_profile: true,
            },
        });

        console.log('Total users:', users.length);
        users.forEach(u => {
            const spId = (u as any).student_profile?.id || 'N/A';
            console.log(`- ${u.email} (${u.role}): StudentID: ${spId}`);
        });
    } catch (err) {
        console.error('Error querying users:', err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main();
