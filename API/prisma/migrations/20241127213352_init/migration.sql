-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT', 'DOCTOR');

-- CreateEnum
CREATE TYPE "Analyze_Jornul_Type" AS ENUM ('ACTIV', 'RETRO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personal_Data" (
    "id" SERIAL NOT NULL,
    "cnp" VARCHAR(13) NOT NULL,
    "firstName" VARCHAR(40) NOT NULL,
    "lastName" VARCHAR(40) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Personal_Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boli" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(125) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Boli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jurnal_Medical" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "Analyze_Jornul_Type" NOT NULL DEFAULT 'ACTIV',
    "medicalAnalyzes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jurnal_Medical_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_Data_cnp_key" ON "Personal_Data"("cnp");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_Data_userId_key" ON "Personal_Data"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Jurnal_Medical_userId_key" ON "Jurnal_Medical"("userId");

-- AddForeignKey
ALTER TABLE "Personal_Data" ADD CONSTRAINT "Personal_Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jurnal_Medical" ADD CONSTRAINT "Jurnal_Medical_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
