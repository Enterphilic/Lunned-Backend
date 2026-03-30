import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

async function main() {
    const email = process.argv[2];
    if (!email) {
        console.error('Please provide an email: npx ts-node approve-tutor.ts <email>');
        process.exit(1);
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool as any);
    const prisma = new PrismaClient({ adapter });

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { tutor_profile: true }
        });

        if (!user) {
            console.error(`User with email ${email} not found.`);
            return;
        }

        if (user.role !== 'TUTOR') {
            console.error(`User ${email} is not a TUTOR (Role: ${user.role}).`);
            return;
        }

        if (!user.tutor_profile) {
            console.log(`User ${email} has no tutor profile. Creating one...`);
            await prisma.tutorProfile.create({
                data: {
                    userId: user.id,
                    verification_status: 'APPROVED',
                    onboarding_completed: true,
                    subjects: []
                }
            });
        } else {
            console.log(`Approving tutor profile for ${email}...`);
            await prisma.tutorProfile.update({
                where: { userId: user.id },
                data: {
                    verification_status: 'APPROVED',
                    onboarding_completed: true
                }
            });
        }

        console.log(`Success! Tutor ${email} is now approved and onboarding is marked complete.`);
    } catch (err) {
        console.error('Error approving tutor:', err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main();
