-- DropForeignKey
ALTER TABLE "medical_record" DROP CONSTRAINT "medical_record_penyakitId_fkey";

-- DropIndex
DROP INDEX "obat_kategoriObatId_key";

-- AlterTable
ALTER TABLE "medical_record" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "isVerified" DROP NOT NULL,
ALTER COLUMN "penyakitId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "medical_record" ADD CONSTRAINT "medical_record_dokterId_fkey" FOREIGN KEY ("dokterId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_record" ADD CONSTRAINT "medical_record_penyakitId_fkey" FOREIGN KEY ("penyakitId") REFERENCES "penyakit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
