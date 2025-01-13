-- AlterTable
ALTER TABLE "Personal_Data" ADD COLUMN     "pregnancies" INTEGER;

-- CreateTable
CREATE TABLE "medical_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "medical_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_tests" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "doctor_id" INTEGER,
    "patient_id" INTEGER NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "institution" VARCHAR(255),
    "doctor_notes" TEXT,

    CONSTRAINT "medical_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parameters" (
    "id" SERIAL NOT NULL,
    "medical_category_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "unit" VARCHAR(50),
    "type" VARCHAR(50),
    "min_val" DECIMAL,
    "max_val" DECIMAL,

    CONSTRAINT "parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "results" (
    "id" SERIAL NOT NULL,
    "parameter_id" INTEGER NOT NULL,
    "medical_test_id" INTEGER NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "medical_tests" ADD CONSTRAINT "medical_tests_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "medical_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medical_tests" ADD CONSTRAINT "medical_tests_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medical_tests" ADD CONSTRAINT "medical_tests_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parameters" ADD CONSTRAINT "parameters_medical_category_id_fkey" FOREIGN KEY ("medical_category_id") REFERENCES "medical_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_medical_test_id_fkey" FOREIGN KEY ("medical_test_id") REFERENCES "medical_tests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
