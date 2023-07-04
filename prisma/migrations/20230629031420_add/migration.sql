/*
  Warnings:

  - Added the required column `userId` to the `ToDoItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ToDoItem" ADD COLUMN     "userId" TEXT NOT NULL;
