-- CreateTable
CREATE TABLE "User" (
    "walletNumber" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("walletNumber")
);

-- CreateTable
CREATE TABLE "Donut" (
    "id" SERIAL NOT NULL,
    "toWalletNumber" TEXT NOT NULL,
    "fromWalletNumber" TEXT NOT NULL,
    "fromName" TEXT,
    "comment" TEXT,
    "amount" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donut_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "Donut_toWalletNumber_idx" ON "Donut"("toWalletNumber");

-- AddForeignKey
ALTER TABLE "Donut" ADD CONSTRAINT "Donut_toWalletNumber_fkey" FOREIGN KEY ("toWalletNumber") REFERENCES "User"("walletNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donut" ADD CONSTRAINT "Donut_fromWalletNumber_fkey" FOREIGN KEY ("fromWalletNumber") REFERENCES "User"("walletNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
