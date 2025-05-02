
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  
  await prisma.user.create({
    data: {
      email: 'ROOT',
      password: await bcrypt.hash("admin", 10),
      role: 'ADMIN',
    },
  });

  await prisma.user.create({
    data: {
      email: 'doctor1@ims.com',
      password: await bcrypt.hash("doctor", 10),
      role: 'DOCTOR',
    },
  });

  await prisma.user.create({
    data: {
      email: 'doctor2@ims.com',
      password: await bcrypt.hash("doctor", 10),
      role: 'DOCTOR',
    },
  });

  await prisma.user.create({
    data: {
      email: 'client1@yahoo.com',
      password: await bcrypt.hash("client", 10),
      role: 'CLIENT',
    },
  });

  await prisma.user.create({
    data: {
      email: 'client2@yahoo.com',
      password: await bcrypt.hash("client", 10),
      role: 'CLIENT',
    },
  });

  await prisma.user.create({
    data: {
      email: 'client3@yahoo.com',
      password: await bcrypt.hash("client", 10),
      role: 'CLIENT',
    },
  });


  // Create initial Medicament entries
  await prisma.medicamente.create({
    data: {
      name: 'Aspirina',
      description: 'Pain reliever and anti-inflammatory.',
    },
  });

    await prisma.medicamente.create({
    data: {
      name: 'Paracetamol',
      description: 'Pain reliever and fever reducer.',
    },
  });


  

  // Create initial User entry
  
}

main()
  .then(_ => console.log("Seed uploaded successfully!"))
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
