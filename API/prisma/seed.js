import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Users
  const users = [
    { email: 'root@licentamedicala.ro', password: 'contadmin', role: 'ADMIN' },
    { email: 'doctor1@ims.com', password: 'doctor', role: 'DOCTOR' },
    { email: 'doctor2@ims.com', password: 'doctor', role: 'DOCTOR' },
    { email: 'client1@yahoo.com', password: 'client', role: 'CLIENT' },
    { email: 'client2@yahoo.com', password: 'client', role: 'CLIENT' },
    { email: 'client3@yahoo.com', password: 'client', role: 'CLIENT' },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        role: user.role,
      },
    });
  }

  // Medicamente
  const meds = [
    { name: 'Aspirina', description: 'Pain reliever and anti-inflammatory.' },
    { name: 'Paracetamol', description: 'Pain reliever and fever reducer.' },
  ];

  for (const med of meds) {
    await prisma.medicamente.upsert({
      where: { name: med.name },
      update: {},
      create: med,
    });
  }

  // Medical Categories
  const categories = [
    { name: "Cardiologie", description: "Deals with heart and circulatory system disorders" },
    { name: "Endocrinologie", description: "Focuses on hormone-related diseases and metabolism" },
    { name: "Neurologie", description: "Treats disorders of the nervous system" },
    { name: "Boli infectioase", description: "Handles infectious diseases caused by pathogens" },
    { name: "Reumatologie", description: "Specializes in joint, muscle, and autoimmune conditions" },
    { name: "Dermatologie", description: "Manages skin, hair, and nail diseases" },
  ];

  for (const category of categories) {
    await prisma.medical_Category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Fetch category IDs by name
  const categoryMap = Object.fromEntries(
    await Promise.all(
      categories.map(async (cat) => {
        const dbCat = await prisma.medical_Category.findUnique({ where: { name: cat.name } });
        return [cat.name, dbCat?.id];
      })
    )
  );

  // Medical Parameters
  const parameters = [
    {
      name: "Glucose",
      unit: "mg/dL",
      type: "numeric",
      min_val: 70,
      max_val: 99,
      medicalCategoryId: categoryMap["Endocrinologie"],
    },
    {
      name: "Skin Thickness",
      unit: "mm",
      type: "numeric",
      min_val: 0,
      max_val: 50,
      medicalCategoryId: categoryMap["Endocrinologie"],
    },
    {
      name: "Insulin",
      unit: "µU/mL",
      type: "numeric",
      min_val: 5,
      max_val: 40,
      medicalCategoryId: categoryMap["Endocrinologie"],
    },
    {
      name: "BMI",
      unit: "kg/m^2",
      type: "float",
      min_val: 18.5,
      max_val: 24.9,
      medicalCategoryId: categoryMap["Endocrinologie"],
    },
    {
      name: "Diabetes Pedigree Function",
      unit: "N/A",
      type: "numeric",
      min_val: 0,
      max_val: 2.5,
      medicalCategoryId: categoryMap["Endocrinologie"],
    },
    {
      name: "Blood Pressure",
      unit: "mmHg",
      type: "numeric",
      min_val: 80,
      max_val: 120,
      medicalCategoryId: categoryMap["Cardiologie"],
    },
  ];

  for (const param of parameters) {
    await prisma.medical_Parameter.upsert({
      where: {
        name_medicalCategoryId: {
          name: param.name,
          medicalCategoryId: param.medicalCategoryId,
        },
      },
      update: {},
      create: {
        name: param.name,
        unit: param.unit,
        type: param.type,
        min_val: param.min_val,
        max_val: param.max_val,
        category: {
          connect: { id: param.medicalCategoryId },
        },
      },
    });
  }
}

main()
  .then(() => console.log("✅ Seed uploaded successfully!"))
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
