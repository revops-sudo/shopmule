/*
  Warnings:

  - You are about to drop the column `userId` on the `analysis` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `analysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "analysis" DROP CONSTRAINT "analysis_userId_fkey";

-- AlterTable
ALTER TABLE "analysis" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "analysis" ADD CONSTRAINT "analysis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
