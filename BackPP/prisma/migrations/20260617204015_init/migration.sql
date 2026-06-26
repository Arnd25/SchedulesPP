-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('Финансы', 'Автоматизация', 'Транспорт', 'Землеустройство');

-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('ПЕРВАЯ', 'ВТОРАЯ');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "avatar" TEXT,
    "refresh_token" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "shift" "Shift" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_disciplines" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "teacher_disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pairs" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,
    "groupId" TEXT NOT NULL,
    "remaingHours" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pairs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "pairId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "lessonNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "groups_name_key" ON "groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_name_key" ON "disciplines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pairs_teacherId_disciplineId_groupId_key" ON "pairs"("teacherId", "disciplineId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_pairId_date_lessonNumber_key" ON "schedules"("pairId", "date", "lessonNumber");

-- AddForeignKey
ALTER TABLE "teacher_disciplines" ADD CONSTRAINT "teacher_disciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_disciplines" ADD CONSTRAINT "teacher_disciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pairs" ADD CONSTRAINT "pairs_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pairs" ADD CONSTRAINT "pairs_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pairs" ADD CONSTRAINT "pairs_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_pairId_fkey" FOREIGN KEY ("pairId") REFERENCES "pairs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
