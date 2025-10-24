-- CreateTable
CREATE TABLE "parametros" (
    "id" SERIAL NOT NULL,
    "unidade" TEXT NOT NULL,
    "segregacao_fila" BOOLEAN NOT NULL DEFAULT false,
    "exibir_fila" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "parametros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parametro_filas_segregadas" (
    "id" SERIAL NOT NULL,
    "parametro_id" INTEGER NOT NULL,
    "nome_fila" TEXT NOT NULL,

    CONSTRAINT "parametro_filas_segregadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caminhoes_chamados" (
    "id" SERIAL NOT NULL,
    "nr_romaneio" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "data_chamado" TIMESTAMP(3) NOT NULL,
    "fila" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "nome_motorista" TEXT NOT NULL,

    CONSTRAINT "caminhoes_chamados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parametro_filas_segregadas" ADD CONSTRAINT "fila_parametros_fk" FOREIGN KEY ("parametro_id") REFERENCES "parametros"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
