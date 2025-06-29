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
  { name: "Cardiologie", description: "Se ocupă cu afecțiunile inimii și ale sistemului circulator" },
  { name: "Endocrinologie", description: "Se concentrează pe bolile hormonale și metabolism" },
  { name: "Neurologie", description: "Tratează afecțiunile sistemului nervos" },
  { name: "Boli infecțioase", description: "Gestionează bolile infecțioase cauzate de agenți patogeni" },
  { name: "Reumatologie", description: "Este specializată în afecțiuni ale articulațiilor, mușchilor și boli autoimune" },
  { name: "Dermatologie", description: "Se ocupă de bolile pielii, părului și unghiilor" }
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
      ro_l18n: "Glicemie",
      unit: "mg/dL",
      type: "numeric",
      min_val: 70,
      max_val: 99,
      medicalCategoryId: categoryMap["Endocrinologie"],
    },
    {
      name: "SkinThickness",
      ro_l18n: "Grosimea pliului cutanat",
      unit: "mm",
      type: "numeric",
      min_val: 0,
      max_val: 50,
      medicalCategoryId: categoryMap["Endocrinologie"],
    },
    {
      name: "Insulin",
      ro_l18n: "Insulină",
      unit: "µU/mL",
      type: "numeric",
      min_val: 5,
      max_val: 40,
      medicalCategoryId: categoryMap["Endocrinologie"],
    },
    {
      name: "BMI",
      ro_l18n: "Indice de masă corporală",
      unit: "kg/m^2",
      type: "float",
      min_val: 18.5,
      max_val: 24.9,
      medicalCategoryId: categoryMap["Endocrinologie"],
    },
    {
      name: "DiabetesPedigreeFunction",
      ro_l18n: "Funcție ereditară diabetic",
      unit: "N/A",
      type: "numeric",
      min_val: 0,
      max_val: 2.5,
      medicalCategoryId: categoryMap["Endocrinologie"],
    },
    {
      name: "BloodPressure",
      ro_l18n: "Tensiune arterială",
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
