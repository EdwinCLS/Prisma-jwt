-- CreateTable
CREATE TABLE "perfilUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "numTel" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "perfilUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "perfilUser_email_key" ON "perfilUser"("email");
