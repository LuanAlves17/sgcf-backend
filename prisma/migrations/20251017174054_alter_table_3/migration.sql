/*
  Warnings:

  - Added the required column `telefone_motorista` to the `caminhoes_chamados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "caminhoes_chamados" ADD COLUMN     "telefone_motorista" TEXT NOT NULL;
