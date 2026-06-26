/*
  Warnings:

  - A unique constraint covering the columns `[groupId,date,lessonNumber]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupId` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "groupId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "schedules_groupId_date_lessonNumber_key" ON "schedules"("groupId", "date", "lessonNumber");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
