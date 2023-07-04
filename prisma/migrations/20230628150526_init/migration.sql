-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('TODO', 'FINISHED', 'DELETED');

-- CreateTable
CREATE TABLE "ToDoItem" (
    "id" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ItemStatus" NOT NULL DEFAULT 'TODO'
);

-- CreateIndex
CREATE UNIQUE INDEX "ToDoItem_id_key" ON "ToDoItem"("id");
