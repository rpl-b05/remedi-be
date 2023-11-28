-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DOKTER', 'PASIEN');

-- CreateTable
CREATE TABLE "obat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "kategoriObatId" INTEGER NOT NULL,

    CONSTRAINT "obat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_obat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "kategori_obat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penyakit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "penyakit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pasien" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "pasien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dokter" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "dokter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_record" (
    "id" SERIAL NOT NULL,
    "dokterId" INTEGER NOT NULL,
    "pasienId" INTEGER NOT NULL,

    CONSTRAINT "medical_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "obat_kategoriObatId_key" ON "obat"("kategoriObatId");

-- CreateIndex
CREATE UNIQUE INDEX "pasien_email_key" ON "pasien"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dokter_email_key" ON "dokter"("email");

-- AddForeignKey
ALTER TABLE "obat" ADD CONSTRAINT "obat_kategoriObatId_fkey" FOREIGN KEY ("kategoriObatId") REFERENCES "kategori_obat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_record" ADD CONSTRAINT "medical_record_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "pasien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_record" ADD CONSTRAINT "medical_record_dokterId_fkey" FOREIGN KEY ("dokterId") REFERENCES "dokter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
