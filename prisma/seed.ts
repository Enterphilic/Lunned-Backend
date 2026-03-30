import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Precisely load the .env file from the root
dotenv.config({ path: path.join(process.cwd(), '.env') });

console.log('Using DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded (masked)' : 'NOT FOUND');

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@luned.com';
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password: hashedPassword,
            full_name: 'System Administrator',
            role: 'ADMIN',
            agreed_to_terms: true,
        },
    });

    console.log({ admin: { id: admin.id, email: admin.email, role: admin.role } });
    console.log('Seed completed: Admin user created/verified');
}

main()
    .catch((e) => {
        console.error('Seed Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
