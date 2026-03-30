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

        console.log(`Checking ${users.length} users...`);

        for (const user of users) {
            if ((user.role === 'STUDENT' || user.role === 'MENTEE') && !(user as any).student_profile) {
                console.log(`Creating student profile for ${user.email}...`);
                await prisma.studentProfile.create({
                    data: { userId: user.id, interests: [] }
                });
            } else if (user.role === 'TUTOR' && !(user as any).tutor_profile) {
                console.log(`Creating tutor profile for ${user.email}...`);
                await prisma.tutorProfile.create({
                    data: { userId: user.id, subjects: [] }
                });
            } else if (user.role === 'MENTOR' && !(user as any).mentor_profile) {
                console.log(`Creating mentor profile for ${user.email}...`);
                await prisma.mentorProfile.create({
                    data: { userId: user.id, expertise: [], industries: [] }
                });
            }
        }

        console.log('Repair completed.');
    } catch (err) {
        console.error('Error repairing users:', err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main();
