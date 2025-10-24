/*
  Warnings:

  - Added the required column `cultura` to the `caminhoes_chamados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "caminhoes_chamados" ADD COLUMN     "cultura" TEXT NOT NULL;
