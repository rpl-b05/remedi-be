/*
  Warnings:

  - You are about to drop the `RecordObat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecordObat" DROP CONSTRAINT "RecordObat_obatId_fkey";

-- DropForeignKey
ALTER TABLE "RecordObat" DROP CONSTRAINT "RecordObat_recordId_fkey";

-- DropTable
DROP TABLE "RecordObat";

-- CreateTable
CREATE TABLE "record_obat" (
    "dosis" TEXT NOT NULL,
    "obatId" INTEGER NOT NULL,
    "recordId" INTEGER NOT NULL,

    CONSTRAINT "record_obat_pkey" PRIMARY KEY ("recordId","obatId")
);

-- AddForeignKey
ALTER TABLE "record_obat" ADD CONSTRAINT "record_obat_obatId_fkey" FOREIGN KEY ("obatId") REFERENCES "obat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_obat" ADD CONSTRAINT "record_obat_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "medical_record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
