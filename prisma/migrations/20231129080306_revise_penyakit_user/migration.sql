/*
  Warnings:

  - You are about to drop the `dokter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pasien` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `medical_record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerified` to the `medical_record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penyakitId` to the `medical_record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "medical_record" DROP CONSTRAINT "medical_record_dokterId_fkey";

-- DropForeignKey
ALTER TABLE "medical_record" DROP CONSTRAINT "medical_record_pasienId_fkey";

-- AlterTable
ALTER TABLE "medical_record" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL,
ADD COLUMN     "penyakitId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "dokter";

-- DropTable
DROP TABLE "pasien";

-- CreateTable
CREATE TABLE "RecordObat" (
    "dosis" TEXT NOT NULL,
    "obatId" INTEGER NOT NULL,
    "recordId" INTEGER NOT NULL,

    CONSTRAINT "RecordObat_pkey" PRIMARY KEY ("recordId","obatId")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "RecordObat" ADD CONSTRAINT "RecordObat_obatId_fkey" FOREIGN KEY ("obatId") REFERENCES "obat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordObat" ADD CONSTRAINT "RecordObat_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "medical_record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_record" ADD CONSTRAINT "medical_record_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_record" ADD CONSTRAINT "medical_record_penyakitId_fkey" FOREIGN KEY ("penyakitId") REFERENCES "penyakit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
